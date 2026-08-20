import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import ThemeScript from "@/components/theme/ThemeScript";
import SkipLink from "@/components/layout/SkipLink";
import { routing, type AppLocale } from "@/i18n/routing";
import { REPO_URL, LICENSE_URL } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const BASE_URL = "https://opsec-it.fr";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    metadataBase: new URL(BASE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [{ name: "Sylvestre MIGNOT" }],
    creator: "Sylvestre MIGNOT",
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${BASE_URL}/${locale}`,
      siteName: "OPSEC-IT",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        fr: `${BASE_URL}/fr`,
        en: `${BASE_URL}/en`,
      },
    },
    robots: { index: true, follow: true },
    // Sans ça, iOS fabrique l'icône de l'écran d'accueil en photographiant la page.
    icons: { apple: "/apple-touch-icon.png" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0D1B2A",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale as AppLocale);

  const t  = await getTranslations({ locale, namespace: "seo" });
  const tp = await getTranslations({ locale, namespace: "creationWeb.pricing" });

  // Les prix affiches sont des chaines localisees (« 1 200 € », « €1,200 ») : on en
  // extrait les chiffres plutot que de redeclarer les montants ailleurs, ce qui
  // finirait par diverger de la grille visible. Le formatage differe, les chiffres non.
  const tiers = (tp.raw("tiers") as { name: string; price: string; description: string }[])
    .map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      description: tier.description,
      price: Number(tier.price.replace(/\D/g, "")),
      priceCurrency: "EUR",
      url: `${BASE_URL}/${locale}#creation-web`,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Sylvestre MIGNOT",
        jobTitle: t("jobTitle"),
        description: t("personDescription"),
        url: BASE_URL,
        sameAs: [
          "https://www.linkedin.com/in/sylvestre-mignot-261a7461/",
          REPO_URL,
        ],
      },
      {
        // ProfessionalService plutot que LocalBusiness : sans `address`, un
        // LocalBusiness n'est de toute facon pas eligible aux resultats enrichis
        // locaux de Google. Le jour ou une adresse professionnelle est publiable,
        // ajouter un bloc `address` (PostalAddress) reactive cette piste.
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#business`,
        name: "OPSEC-IT",
        description: t("businessDescription"),
        url: BASE_URL,
        email: "contact@opsec-it.fr",
        founder: { "@id": `${BASE_URL}/#person` },
        // Deux zones, pas une : l'activite est metropole ET Polynesie francaise —
        // c'est aussi ce qu'expliquent les prix affiches en francs Pacifique.
        areaServed: [
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Polynésie française" },
        ],
        // La langue de l'entreprise ne change pas selon la page consultee.
        knowsLanguage: ["fr", "en"],
        priceRange: "€€",
        sameAs: [REPO_URL],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: t("offerCatalogName"),
          itemListElement: tiers,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "OPSEC-IT",
        inLanguage: locale,
        publisher: { "@id": `${BASE_URL}/#business` },
        license: LICENSE_URL,
      },
    ],
  };

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <SkipLink />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
