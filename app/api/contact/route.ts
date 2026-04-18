import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, societe, email, objet, message } = body;

    // Validation basique serveur
    if (!nom || !societe || !email || !objet || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Si RESEND_API_KEY est configuré, on envoie le mail
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
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
          subject: `[OPSEC-IT] Nouveau contact — ${objet}`,
          html: `
            <h2>Nouveau message via opsec-it.fr</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Nom</strong></td><td style="padding:8px;border:1px solid #ddd">${nom}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Société</strong></td><td style="padding:8px;border:1px solid #ddd">${societe}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
              <tr><td style="padding:8px;border:1px solid #ddd"><strong>Objet</strong></td><td style="padding:8px;border:1px solid #ddd">${objet}</td></tr>
            </table>
            <h3>Message</h3>
            <p style="white-space:pre-wrap">${message}</p>
          `,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Resend error:", err);
        return NextResponse.json({ error: "Échec envoi email" }, { status: 500 });
      }
    } else {
      // Mode dev : on log juste
      console.log("[CONTACT FORM]", { nom, societe, email, objet, message });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
