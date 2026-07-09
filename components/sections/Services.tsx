import {
  ShieldCheck, Server, Lock, Cloud, RefreshCw, Headphones, ArrowUpRight, type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";

type Item = { title: string; description: string; tags: string[] };

// Grille bento : la 1re tuile (diagnostic) est mise en avant en 2×2,
// la dernière (support/DSI externalisée) ferme la grille en pleine largeur.
// L'ordre doit correspondre à messages.services.items
type Tile = {
  Icon: LucideIcon;
  span: string;
  featured?: boolean;
  wide?: boolean;
  iconBox: string;
  icon: string;
  tag: string;
  border: string;
};

const TILES: Tile[] = [
  {
    Icon: ShieldCheck,
    span: "md:col-span-2 lg:row-span-2",
    featured: true,
    iconBox: "bg-surf/15 border-surf/25",
    icon: "text-surf",
    tag: "bg-surf/10 text-surf/90 border-surf/25",
    border: "",
  },
  {
    Icon: Server,
    span: "",
    iconBox: "bg-green/10 border-green/25",
    icon: "text-green",
    tag: "bg-green/10 text-green border-green/25",
    border: "hover:border-green/40",
  },
  {
    Icon: Lock,
    span: "",
    iconBox: "bg-amber/10 border-amber/25",
    icon: "text-amber",
    tag: "bg-amber/10 text-amber border-amber/25",
    border: "hover:border-amber/40",
  },
  {
    Icon: Cloud,
    span: "",
    iconBox: "bg-blue/10 border-blue/25",
    icon: "text-blue",
    tag: "bg-blue/10 text-blue border-blue/25",
    border: "hover:border-blue/40",
  },
  {
    Icon: RefreshCw,
    span: "",
    iconBox: "bg-green/10 border-green/25",
    icon: "text-green",
    tag: "bg-green/10 text-green border-green/25",
    border: "hover:border-green/40",
  },
  {
    Icon: Headphones,
    span: "md:col-span-2 lg:col-span-4",
    wide: true,
    iconBox: "bg-amber/10 border-amber/25",
    icon: "text-amber",
    tag: "bg-amber/10 text-amber border-amber/25",
    border: "hover:border-amber/40",
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((s, i) => {
            const tile = TILES[i];
            const { Icon } = tile;
            return (
              <div
                key={s.title}
                className={`group relative rounded-2xl border p-7 flex flex-col shadow-card hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 ${tile.span} ${
                  tile.featured
                    ? "bg-blue border-blue text-surf shadow-blue/20 md:p-9"
                    : `bg-surf border-border ${tile.border}`
                }`}
              >
                <ArrowUpRight
                  className={`absolute top-5 right-5 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    tile.featured ? "text-surf/70" : tile.icon
                  }`}
                />
                <div className={tile.wide ? "lg:flex lg:items-center lg:gap-8" : "flex flex-col flex-1"}>
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 flex-shrink-0 ${tile.iconBox} ${
                      tile.wide ? "lg:mb-0" : ""
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${tile.featured ? "text-surf" : tile.icon}`} />
                  </div>
                  <div className={tile.wide ? "lg:flex-1" : "flex flex-col flex-1"}>
                    <h3 className={`font-bold mb-2 ${tile.featured ? "text-surf text-xl" : "text-ink text-base"}`}>
                      {s.title}
                    </h3>
                    <p
                      className={`leading-relaxed mb-5 ${
                        tile.featured ? "text-surf/85 text-base max-w-md" : "text-ink-soft text-sm"
                      } ${tile.wide ? "lg:mb-0 lg:max-w-2xl" : "flex-1"}`}
                    >
                      {s.description}
                    </p>
                  </div>
                  <div className={`flex flex-wrap gap-2 ${tile.wide ? "lg:flex-col lg:items-end" : "mt-auto pt-1"}`}>
                    {s.tags.map(tag => (
                      <span
                        key={tag}
                        className={`text-xs px-3 py-1 rounded-full font-medium border ${tile.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
