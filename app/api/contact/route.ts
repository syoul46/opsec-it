import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  nom:     z.string().trim().min(2).max(100),
  societe: z.string().trim().min(2).max(150),
  email:   z.string().trim().email().max(200),
  objet:   z.enum(["audit", "administration", "cloud", "creation-web", "urgence", "autre"]),
  message: z.string().trim().min(20).max(5000),
  // Honeypot — doit rester vide. Les bots le remplissent automatiquement.
  website: z.string().max(0).optional().or(z.literal("")),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX    = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;

function rateLimit(ip: string): boolean {
  const now   = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
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

    if (resendKey) {
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
          from: "OPSEC-IT <onboarding@resend.dev>",
          to: ["sioulmig@gmail.com"],
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
      console.log("[CONTACT FORM]", { nom, societe, email, objet, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
