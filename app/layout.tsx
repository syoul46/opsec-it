import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = "https://opsec-it.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "OPSEC-IT — Sylvestre MIGNOT, AIS | Sécurité & Infra pour Asso et PME",
  description:
    "Titulaire AIS (IPSSI), Sylvestre MIGNOT sécurise et administre les systèmes d'information des associations et PME. Audit, hardening, virtualisation, création web.",
  keywords: [
    "sécurité informatique",
    "administrateur systèmes",
    "infrastructure sécurisée",
    "AIS",
    "audit sécurité",
    "PME",
    "associations",
    "RGPD",
    "création site web",
    "Next.js",
  ],
  authors: [{ name: "Sylvestre MIGNOT" }],
  creator: "Sylvestre MIGNOT",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "OPSEC-IT",
    title: "OPSEC-IT — Sécurité & Infra pour Asso et PME",
    description:
      "Sylvestre MIGNOT, AIS — Audit, administration et sécurisation d'infrastructures pour associations et PME. Création web sur mesure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OPSEC-IT — Sécurité & Infra pour Asso et PME",
    description:
      "Sylvestre MIGNOT, AIS — Audit, administration et sécurisation d'infrastructures pour associations et PME.",
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Sylvestre MIGNOT",
      jobTitle: "Administrateur d'Infrastructures Sécurisées",
      description:
        "Titulaire du titre AIS (IPSSI), spécialisé en sécurisation et administration d'infrastructures pour associations et PME.",
      url: BASE_URL,
      sameAs: ["https://www.linkedin.com/in/sylvestre-mignot-261a7461/"],
      knowsAbout: [
        "Sécurité informatique",
        "Administration systèmes Linux",
        "Réseaux et firewalls",
        "Virtualisation Proxmox VMware",
        "Docker",
        "RGPD",
        "Création de sites web Next.js",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "OPSEC-IT",
      description:
        "Sécurisation, administration d'infrastructures et création web pour les associations et les PME.",
      url: BASE_URL,
      email: "contact@opsec-it.fr",
      founder: { "@id": `${BASE_URL}/#person` },
      areaServed: "FR",
      knowsLanguage: "fr",
      priceRange: "€€",
      serviceType: [
        "Audit de sécurité",
        "Administration systèmes",
        "Sécurisation d'infrastructures",
        "Virtualisation",
        "Création de site web",
        "Maintenance web",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
