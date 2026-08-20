// Carte de partage social (LinkedIn, Slack, Signal…).
//
// Ce fichier DOIT rester dans `app/[locale]/` : à la racine `app/`, la convention
// ne s'attache à aucune page — toutes les routes du site vivent sous `[locale]` —
// et le HTML sort alors sans balise `og:image`. C'était le cas jusqu'en août 2026.
//
// Les couleurs sont figées ici plutôt que lues dans app/theme.css : Satori (le
// moteur de rendu de `next/og`) ne résout pas les variables CSS. Les garder
// alignées à la main sur le thème `polynesian-dark`.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export const alt = "OPSEC-IT — Sylvestre MIGNOT, Administrateur d'Infrastructures Sécurisées";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Thème polynesian-dark (cf. app/theme.css)
const SURF     = "#0D1B2A";
const SURF_MID = "#14253A";
const INK      = "#E8EAF0";
const INK_SOFT = "#BFC3CC";
const INK_DIM  = "#7A8294";
const COPPER   = "#D2742F";
const GOLD     = "#C6A857";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations({ locale, namespace: "seo" });
  const tags = t.raw("ogTags") as string[];

  const [fontRegular, fontBold] = await Promise.all([
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf")),
    readFile(join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: SURF,
          padding: "60px 70px",
          position: "relative",
          fontFamily: "Geist",
        }}
      >
        {/* Halos cuivre — l'équivalent statique des couchers de soleil du site */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -140,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(210,116,47,0.30) 0%, rgba(210,116,47,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(198,168,87,0.14) 0%, rgba(198,168,87,0) 70%)",
          }}
        />

        {/* Logo — glyphe tiki `networking-security` (cf. components/ui/tiki.tsx) */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 52 }}>
          <svg
            width="46"
            height="46"
            viewBox="10.2 9.2 43.5 43.5"
            fill="none"
            stroke={COPPER}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: 14 }}
          >
            <path d="M32 15 L44 20 V30 C44 39 39 44 32 47 C25 44 20 39 20 30 V20 Z" />
            <path d="M26 27 L32 37 M38 27 L32 37 M26 27 L38 27" />
          </svg>
          <span style={{ color: INK, fontSize: 34, fontWeight: 700 }}>OPSEC</span>
          <span style={{ color: COPPER, fontSize: 34, fontWeight: 700 }}>-IT</span>
        </div>

        <div
          style={{
            color: INK,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: 18,
            letterSpacing: "-1px",
          }}
        >
          Sylvestre MIGNOT
        </div>

        <div style={{ color: COPPER, fontSize: 26, fontWeight: 700, marginBottom: 8 }}>
          {t("jobTitle")}
        </div>
        <div style={{ color: INK_DIM, fontSize: 20, fontWeight: 400, marginBottom: 44 }}>
          AIS · IPSSI Paris
        </div>

        <div
          style={{
            color: INK_SOFT,
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {t("businessDescription")}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex" }}>
            {tags.map((tag, i) => (
              <div
                key={tag}
                style={{
                  background: SURF_MID,
                  border: `1px solid ${GOLD}59`,
                  borderRadius: 24,
                  padding: "9px 22px",
                  color: GOLD,
                  fontSize: 17,
                  fontWeight: 700,
                  marginRight: i < tags.length - 1 ? 12 : 0,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ color: INK_DIM, fontSize: 20, fontWeight: 400 }}>opsec-it.fr</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: fontRegular, style: "normal", weight: 400 },
        { name: "Geist", data: fontBold, style: "normal", weight: 700 },
      ],
    }
  );
}
