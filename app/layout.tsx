import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPSEC-IT — Sylvestre MIGNOT, AIS | Sécurité & Infra pour Asso et PME",
  description:
    "Titulaire AIS (IPSSI), Sylvestre MIGNOT accompagne les associations et PME dans l'audit, l'administration et la sécurisation de leurs infrastructures.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
