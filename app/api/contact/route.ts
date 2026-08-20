import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  nom:     z.string().trim().min(2).max(100),
  societe: z.string().trim().min(2).max(150),
  email:   z.string().trim().email().max(200),
  objet:   z.enum(["audit", "administration", "cloud", "creation-web", "urgence", "autre"]),
  message: z.string().trim().min(20).max(5000),
  // Honeypot — doit rester vide, mais le schema l'accepte REMPLI a dessein.
  // Avec un `.max(0)`, un bot qui mordait a l'hameçon recevait un 400 « Champs
  // invalides » avant meme d'atteindre le rejet silencieux plus bas : on lui
  // apprenait exactement ce qu'on voulait lui cacher, et la branche « on renvoie
  // 200 pour ne pas informer le bot » etait du code mort.
  website: z.string().max(200).optional(),
});

// Adresses du formulaire. Elles ne sont PAS en dur : le depot est public, et le
// destinataire est une boite personnelle. Valeurs lues au runtime, cf. deploy/.env.
//
// CONTACT_FROM doit appartenir a un domaine verifie chez Resend. Tant que
// opsec-it.fr ne l'est pas, le repli reste l'expediteur bac a sable
// `onboarding@resend.dev`, qui ne sait livrer qu'au titulaire du compte et arrive
// tres souvent en indesirables. Procedure de bascule : voir README, section E-mail.
// `||` et non `??` : docker-compose passe `CONTACT_FROM=` (chaine vide) quand la
// variable n'est pas definie dans deploy/.env, et une chaine vide n'est pas
// nullish — avec `??` on enverrait depuis une adresse vide.
const CONTACT_FROM = process.env.CONTACT_FROM || "OPSEC-IT <onboarding@resend.dev>";
const CONTACT_TO   = process.env.CONTACT_TO || "";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX    = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
// Plafond d'entrees : la Map ne se vidait jamais. Une IP = une entree, conservee
// pour toujours, dans un conteneur limite a 512 Mo (cf. deploy/docker-compose.yml).
// Un balayage lent depuis beaucoup d'adresses la faisait croitre sans limite.
const RATE_LIMIT_MAX_ENTRIES = 10_000;

// Purge les fenetres expirees. Appelee a chaque nouvelle IP, donc au plus une fois
// par visiteur distinct : le cout est amorti et la Map reste bornee dans le temps.
function sweepRateLimit(now: number): void {
  for (const [key, entry] of rateLimitMap) {
    if (entry.resetAt < now) rateLimitMap.delete(key);
  }
}

function rateLimit(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    if (!entry) sweepRateLimit(now);
    // Filet en cas d'afflux d'IP toutes actives dans la meme fenetre : on refuse
    // plutot que de laisser la Map grossir. Degrade le service avant de saturer
    // la memoire du conteneur — et donc avant de faire tomber le voisin.
    if (rateLimitMap.size >= RATE_LIMIT_MAX_ENTRIES) return false;
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count += 1;
  return true;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ATTENTION : prendre la premiere valeur de X-Forwarded-For n'est sur que parce
// que Caddy REMPLACE l'en-tete fourni par le client au lieu de s'y ajouter (teste
// le 2026-08-20 : six requetes avec un XFF usurpe declenchent bien le 429, et une
// septieme avec une autre valeur usurpee reste bloquee). Si le site passait derriere
// un proxy qui concatene, ou si `trusted_proxies` etait configure dans Caddy, cette
// ligne rendrait la limite de debit contournable en changeant un en-tete.
// Ne pas modifier la chaine de reverse proxy sans revalider ce point.
function getClientIp(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: "Trop de requêtes, réessayez plus tard." }, { status: 429 });
    }

    const body   = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
    }

    const { nom, societe, email, objet, message, website } = parsed.data;

    // Honeypot rempli → silent reject (on renvoie 200 pour ne pas informer le bot)
    if (website && website.length > 0) {
      return NextResponse.json({ success: true });
    }

    const resendKey = process.env.RESEND_API_KEY;

    // Sans cle OU sans destinataire, on retombe sur le journal : mieux vaut un
    // message retrouvable dans `docker compose logs` qu'un envoi vers le vide.
    if (resendKey && CONTACT_TO) {
      const safe = {
        nom:     escapeHtml(nom),
        societe: escapeHtml(societe),
        email:   escapeHtml(email),
        objet:   escapeHtml(objet),
        message: escapeHtml(message),
      };

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: CONTACT_FROM,
          to: [CONTACT_TO],
          reply_to: email,
          subject: `[OPSEC-IT] Nouveau contact — ${safe.objet}`,
          html: `
            <h2>Nouveau message via opsec-it.fr</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #ddd">${safe.nom}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Société</strong></td><td style="padding:8px;border:1px solid #ddd">${safe.societe}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${safe.email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Objet</strong></td><td style="padding:8px;border:1px solid #ddd">${safe.objet}</td></tr>
            </table>
            <h3>Message</h3>
            <p style="white-space:pre-wrap">${safe.message}</p>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Échec envoi email" }, { status: 500 });
      }
    } else {
      console.warn(
        "[CONTACT FORM] envoi desactive —",
        !resendKey ? "RESEND_API_KEY absente" : "CONTACT_TO absente",
        "— le message n'existe que dans ce journal :",
        { nom, societe, email, objet, message },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
