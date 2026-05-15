import {
  ShieldCheck, Server, Lock, Cloud, RefreshCw, Headphones, type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionWrapper from "@/components/ui/SectionWrapper";

// L'ordre doit correspondre à messages.services.items
const ICONS: LucideIcon[] = [ShieldCheck, Server, Lock, Cloud, RefreshCw, Headphones];

type Item = { title: string; description: string; tags: string[] };

export default function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <SectionWrapper id="services" className="pt-32 pb-28 bg-surf-mid">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s, i) => (
            <ServiceCard key={s.title} Icon={ICONS[i]} title={s.title} description={s.description} tags={s.tags} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
