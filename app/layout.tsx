import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPSEC-IT — Sylvestre MIGNOT, AIS | Sécurité des Infrastructures",
  description:
    "Expert en sécurisation d'infrastructures (AIS). Audit, administration systèmes & réseaux, cloud et continuité d'activité pour les entreprises.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
