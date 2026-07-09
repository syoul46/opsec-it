import { Globe, LayoutTemplate, Paintbrush, Search, Zap, Wrench, Check, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Link } from "@/i18n/navigation";

// L'ordre doit correspondre à messages.creationWeb.items
const ICONS: LucideIcon[] = [Globe, LayoutTemplate, Paintbrush, Search, Zap, Wrench];

type ServiceItem = { title: string; description: string; tags: string[] };
type Tier = {
  name: string;
  price: string;
  priceXpf: string;
  sub: string;
  from: boolean;
  note?: string;
  description: string;
  features: string[];
  highlight: boolean;
};

function TierCard({ tier, fromLabel, ctaLabel }: { tier: Tier; fromLabel: string; ctaLabel: string }) {
  return (
    <div
      className={`rounded-2xl border p-8 flex flex-col shadow-card transition-all duration-200 hover:shadow-card-md hover:-translate-y-1 ${
        tier.highlight
          ? "bg-blue border-blue text-surf shadow-blue/20"
          : "bg-surf-mid border-border hover:border-blue/40"
      }`}
    >
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${tier.highlight ? "text-surf/80" : "text-blue"}`}>
        {tier.name}
      </p>
      {tier.from && (
        <p className={`text-xs font-medium mb-1 ${tier.highlight ? "text-surf/75" : "text-ink-soft"}`}>
          {fromLabel}
        </p>
      )}
      <div className="flex items-baseline gap-1 mb-1">
        <span className={`text-4xl font-black ${tier.highlight ? "text-surf" : "text-ink"}`}>
          {tier.price}
        </span>
        <span className={`text-sm font-medium ${tier.highlight ? "text-surf/75" : "text-ink-soft"}`}>
          {tier.sub}
        </span>
      </div>
      <p className={`text-sm font-medium mb-4 ${tier.highlight ? "text-surf/80" : "text-ink-soft"}`}>
        ≈ {tier.priceXpf}{tier.sub && ` ${tier.sub}`}
      </p>
      {tier.note && (
        <p className={`text-xs font-semibold mb-4 ${tier.highlight ? "text-surf/90" : "text-amber"}`}>
          {tier.note}
        </p>
      )}
      <p className={`text-sm mb-6 leading-relaxed ${tier.highlight ? "text-surf/90" : "text-ink-soft"}`}>
        {tier.description}
      </p>
      <ul className="flex flex-col gap-3 flex-1">
        {tier.features.map(f => (
          <li key={f} className="flex items-start gap-2">
            <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? "text-surf" : "text-blue"}`} />
            <span className={`text-sm ${tier.highlight ? "text-surf/95" : "text-ink-soft"}`}>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className={`mt-8 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all hover:shadow-md min-h-11 px-5 py-2.5 ${
          tier.highlight
            ? "bg-surf text-blue hover:bg-surf-mid"
            : "bg-blue text-surf hover:bg-blue/90 hover:shadow-blue/30"
        }`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}

export default function CreationWeb() {
  const t = useTranslations("creationWeb");
  const tp = useTranslations("creationWeb.pricing");
  const items = t.raw("items") as ServiceItem[];
  const tiers = tp.raw("tiers") as Tier[];
  const maintenanceTiers = tp.raw("maintenanceTiers") as Tier[];

  return (
    <SectionWrapper id="creation-web" className="pt-32 pb-28 bg-surf">
      <div className="wrap">

        <div className="mb-5">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            {t("kicker")}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">
            {t("title")}
          </h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">{t("intro")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {items.map((s, i) => (
            <ServiceCard key={s.title} Icon={ICONS[i]} title={s.title} description={s.description} tags={s.tags} />
          ))}
        </div>

        {/* Tarifs */}
        <div className="mb-5">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            {tp("kicker")}
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-ink mb-2 leading-tight">
            {tp("title")}
          </h3>
          <p className="text-ink-soft max-w-lg leading-relaxed text-sm">{tp("intro")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {tiers.map(tier => (
            <TierCard key={tier.name} tier={tier} fromLabel={tp("fromLabel")} ctaLabel={tp("ctaLabel")} />
          ))}
        </div>

        {/* Maintenance */}
        <div className="mb-5">
          <h3 className="text-xl md:text-2xl font-black text-ink mb-2 leading-tight">
            {tp("maintenanceTitle")}
          </h3>
          <p className="text-ink-soft max-w-lg leading-relaxed text-sm">{tp("maintenanceIntro")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
          {maintenanceTiers.map(tier => (
            <TierCard key={tier.name} tier={tier} fromLabel={tp("fromLabel")} ctaLabel={tp("ctaLabel")} />
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
