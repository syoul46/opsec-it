import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Link } from "@/i18n/navigation";
import { TikiIcon, TileSecurity, type TikiIconName } from "@/components/ui/tiki";

type Item = { title: string; description: string; tags: string[] };

// Grille bento : la 1re tuile (diagnostic) est mise en avant en 2×2,
// la dernière (support/DSI externalisée) ferme la grille en pleine largeur.
// L'ordre doit correspondre à messages.services.items
//
// `Art` : planche tatouage marquisienne en filigrane. Seule la tuile 2×2 en porte
// une : c'est la seule dont le format crée un vide réel. Ailleurs le texte occupe
// déjà toute la surface, et un filigrane n'y serait pas un décor mais du bruit
// derrière le paragraphe.
//
// Aucune tuile n'est cliquable : ce sont des `<div>`, et la seule cible du bloc
// est le lien « packs » de l'intro. Le chevron ↗ au survol promettait donc une
// navigation qui n'existe pas ; il a été retiré plutôt que rendu vrai.
type Tile = {
  glyph: TikiIconName;
  Art?: (p: { className?: string }) => React.ReactElement;
  artClass?: string;
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
    glyph: "security-checkup",
    Art: TileSecurity,
    // Ancrée dans l'angle bas-droit et débordante : `overflow-hidden` de la tuile
    // la recadre, il n'en reste qu'un quart de bouclier qui se lit comme une
    // texture de coin. Taille réduite hors `lg`, où la tuile retombe de 750 à
    // 290 px : au format `lg` le motif remonterait jusque derrière le paragraphe.
    // Centrée, elle ne marchait à aucun des deux formats de la tuile : en `lg` la
    // tuile fait 750 px pour 300 px de contenu et le bouclier flottait seul au
    // milieu d'un aplat cuivre (l'aspect « image cassée ») ; en une colonne la
    // tuile retombe à 290 px alors que le motif en fait 352, et il passait
    // par-dessus le paragraphe.
    artClass: "-right-32 -bottom-44 h-64 lg:h-[22rem] text-surf/[0.16]",
    span: "md:col-span-2 lg:row-span-2",
    featured: true,
    iconBox: "bg-surf/15 border-surf/25",
    icon: "text-surf",
    tag: "bg-surf/10 text-surf/90 border-surf/25",
    border: "",
  },
  {
    glyph: "systems-admin",
    span: "",
    iconBox: "bg-green/10 border-green/25",
    icon: "text-green",
    tag: "bg-green/10 text-green border-green/25",
    border: "hover:border-green/40",
  },
  {
    glyph: "tattoo-hardening",
    span: "",
    iconBox: "bg-amber/10 border-amber/25",
    icon: "text-amber",
    tag: "bg-amber/10 text-amber border-amber/25",
    border: "hover:border-amber/40",
  },
  {
    glyph: "virtualization",
    span: "",
    iconBox: "bg-blue/10 border-blue/25",
    icon: "text-blue",
    tag: "bg-blue/10 text-blue border-blue/25",
    border: "hover:border-blue/40",
  },
  {
    glyph: "business-continuity",
    span: "",
    iconBox: "bg-green/10 border-green/25",
    icon: "text-green",
    tag: "bg-green/10 text-green border-green/25",
    border: "hover:border-green/40",
  },
  {
    glyph: "maintenance-support",
    // Pas de planche ici : malgré sa largeur, cette tuile n'a pas de vide. Icône,
    // texte et tags occupent la bande de bout en bout, et un filigrane passait
    // derrière les tags — du bruit, pas du décor.
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
          {/* Le volet sécurité reste sans prix affiché : un audit dépend du parc,
              et un montant au mur devient un plafond en négociation. Le silence
              total, en revanche, laisse croire que c'est hors de prix, d'où cette
              ligne, qui dit pourquoi et où trouver un tarif ferme. */}
          <p className="text-sm text-ink-dim max-w-xl leading-relaxed mt-4">
            {t.rich("pricingNote", {
              packs: (chunks) => (
                <Link href="/packs" className="text-blue hover:underline">{chunks}</Link>
              ),
            })}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((s, i) => {
            const tile = TILES[i];
            const { Art } = tile;
            return (
              <div
                key={s.title}
                className={`group relative overflow-hidden rounded-2xl border p-7 flex flex-col shadow-card hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 ${tile.span} ${
                  tile.featured
                    ? "bg-blue border-blue text-surf shadow-blue/20 md:p-9"
                    : `bg-surf border-border ${tile.border}`
                }`}
              >
                {Art && (
                  <Art className={`pointer-events-none absolute w-auto ${tile.artClass}`} />
                )}
                {/* `relative` : repasse le contenu au-dessus du filigrane, qui est en absolute.
                    `justify-center` sur la tuile mise en avant : elle occupe deux rangées
                    en `lg` (750 px) pour ~300 px de contenu. Avec les tags collés en bas
                    par `mt-auto`, les 450 px restants formaient un seul bloc de vide sous
                    le paragraphe. Centré, le même vide se répartit en haut et en bas et
                    se lit comme une marge. */}
                <div className={`relative ${tile.wide ? "lg:flex lg:items-center lg:gap-8" : "flex flex-col flex-1"} ${tile.featured ? "lg:justify-center" : ""}`}>
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 flex-shrink-0 ${tile.iconBox} ${
                      tile.wide ? "lg:mb-0" : ""
                    }`}
                  >
                    <TikiIcon
                      name={tile.glyph}
                      className={`w-6 h-6 ${tile.featured ? "text-surf" : tile.icon}`}
                    />
                  </div>
                  <div className={tile.wide ? "lg:flex-1" : `flex flex-col ${tile.featured ? "lg:flex-none flex-1" : "flex-1"}`}>
                    <h3 className={`font-bold mb-2 ${tile.featured ? "text-surf text-xl" : "text-ink text-base"}`}>
                      {s.title}
                    </h3>
                    <p
                      className={`leading-relaxed mb-5 ${
                        tile.featured ? "text-surf/85 text-base max-w-md" : "text-ink-soft text-sm"
                      } ${tile.wide ? "lg:mb-0 lg:max-w-2xl" : tile.featured ? "lg:flex-none flex-1" : "flex-1"}`}
                    >
                      {s.description}
                    </p>
                  </div>
                  <div className={`flex flex-wrap gap-2 ${tile.wide ? "lg:flex-col lg:items-end" : tile.featured ? "mt-auto lg:mt-0 pt-1" : "mt-auto pt-1"}`}>
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
