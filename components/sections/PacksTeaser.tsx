import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Bandeau placé entre Services et Création web sur la landing : c'est la couture
// entre les deux métiers, et donc l'endroit où l'idée « les deux dans un seul
// devis » se comprend sans explication. Le détail vit sur /packs, une vraie page
// pour pouvoir être collée dans un e-mail de prospection.
export default function PacksTeaser() {
  const t = useTranslations("packs.teaser");

  return (
    <div className="wrap">
      <div className="rounded-2xl border border-amber-mid bg-amber-soft p-8 md:p-10 flex flex-col lg:flex-row lg:items-center gap-6">
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-black text-ink mb-2 leading-tight">
            {t("title")}
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">{t("body")}</p>
        </div>
        <Link
          href="/packs"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue text-surf text-sm font-semibold hover:bg-blue/90 transition-all shadow-md hover:shadow-lg hover:shadow-blue/30 min-h-11 px-5 py-2.5 flex-shrink-0"
        >
          {t("cta")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
