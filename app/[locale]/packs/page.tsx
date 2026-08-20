import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Watermark from "@/components/ui/Watermark";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const BASE_URL = "https://opsec-it.fr";

type Pack = {
  name: string;
  price: string;
  priceXpf: string;
  listPrice: string;
  saving: string;
  note?: string;
  description: string;
  features: string[];
  highlight: boolean;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "packs" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/packs`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${BASE_URL}/${l}/packs`])),
    },
    robots: { index: true, follow: true },
  };
}

// Le prix « à la carte » est affiché en valeur totale, jamais décomposé ligne par
// ligne. C'est délibéré : les composants sécurité (diagnostic simplifié, audit,
// sécurisation des formulaires) n'ont pas de prix public sur le site, et les
// publier ici par la bande serait une décision commerciale prise à la sauvette.
// Le comparatif justifie la remise sans engager cette décision.
function PackCard({
  pack,
  listLabel,
  savingLabel,
  ctaLabel,
}: {
  pack: Pack;
  listLabel: string;
  savingLabel: string;
  ctaLabel: string;
}) {
  const hi = pack.highlight;
  return (
    <div
      className={`rounded-2xl border p-8 flex flex-col shadow-card transition-all duration-200 hover:shadow-card-md hover:-translate-y-1 ${
        hi ? "bg-blue border-blue text-surf shadow-blue/20" : "bg-surf-mid border-border hover:border-blue/40"
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${hi ? "text-surf/80" : "text-blue"}`}>
        {pack.name}
      </p>

      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-4xl font-black ${hi ? "text-surf" : "text-ink"}`}>{pack.price}</span>
      </div>
      <p className={`text-sm font-medium mb-3 ${hi ? "text-surf/75" : "text-ink-soft"}`}>
        ≈ {pack.priceXpf}
      </p>

      <p className={`text-xs mb-4 ${hi ? "text-surf/80" : "text-ink-dim"}`}>
        {listLabel} <s>{pack.listPrice}</s>{" "}
        <span className={`font-semibold ${hi ? "text-surf" : "text-green"}`}>
          — {savingLabel} {pack.saving}
        </span>
      </p>

      {pack.note && (
        <p className={`text-xs font-semibold mb-4 ${hi ? "text-surf/90" : "text-amber"}`}>{pack.note}</p>
      )}

      <p className={`text-sm mb-6 leading-relaxed ${hi ? "text-surf/90" : "text-ink-soft"}`}>
        {pack.description}
      </p>

      <ul className="flex flex-col gap-3 flex-1">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${hi ? "text-surf" : "text-blue"}`} />
            <span className={`text-sm ${hi ? "text-surf/95" : "text-ink-soft"}`}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/#contact"
        className={`mt-8 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all hover:shadow-md min-h-11 px-5 py-2.5 ${
          hi ? "bg-surf text-blue hover:bg-surf-mid" : "bg-blue text-surf hover:bg-blue/90 hover:shadow-blue/30"
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default async function Packs({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as AppLocale);

  const t = await getTranslations({ locale, namespace: "packs" });
  const items = t.raw("items") as Pack[];
  const commonItems = t.raw("commonItems") as string[];

  return (
    <>
      <Navbar />
      <div className="h-20" aria-hidden="true" />
      <main id="contenu" className="relative overflow-hidden bg-surf pt-20 pb-28">
        <Watermark preset="tapa" />
        <div className="wrap relative">

          <div className="max-w-2xl mb-12">
            <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
              {t("kicker")}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">
              {t("title")}
            </h1>
            <p className="text-ink-soft leading-relaxed">{t("intro")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {items.map((pack) => (
              <PackCard
                key={pack.name}
                pack={pack}
                listLabel={t("listLabel")}
                savingLabel={t("savingLabel")}
                ctaLabel={t("ctaLabel")}
              />
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-surf-mid p-8 md:p-10 mb-12">
            <h2 className="text-xl md:text-2xl font-black text-ink mb-6 leading-tight">
              {t("commonTitle")}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {commonItems.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-soft leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="max-w-2xl">
            <h2 className="text-xl font-black text-ink mb-3 leading-tight">{t("alacarteTitle")}</h2>
            <p className="text-ink-soft leading-relaxed mb-5">{t("alacarteBody")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#creation-web"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border text-ink text-sm font-semibold hover:bg-surf-mid hover:border-blue/40 transition-all min-h-11 px-5 py-2.5"
              >
                {t("alacarteWeb")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border text-ink text-sm font-semibold hover:bg-surf-mid hover:border-blue/40 transition-all min-h-11 px-5 py-2.5"
              >
                {t("alacarteServices")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
