import type { CSSProperties } from "react";

// Filigranes d'arrière-plan — presets repris du guide de placement
// (docs-syoul/assets/opsec-assets/backgrounds/Guide-filigranes.html).
//
// Règles du guide, respectées ici :
//  - opacité 0.04–0.10, jamais plus : le motif ne concurrence jamais le texte ;
//  - un seul filigrane par écran (ne pas empiler) ;
//  - réservé aux sections SANS photo de fond (Hero, Méthodologie et Parcours en
//    ont déjà une, on n'y touche pas).
//
// Adaptatif au thème : plutôt que de poser le SVG en background-image (couleur
// ardoise figée, qui s'efface sur le thème clair crème), on l'utilise comme MASQUE
// CSS et on peint au travers avec --ds-watermark. La teinte suit donc le thème —
// ardoise sur le fond marine, encre navy sur le crème — définie dans app/theme.css.
// Le motif reste une texture discrète sur les deux.

type Preset = "shield-corner" | "wave-band" | "tapa";

type MaskSpec = {
  url: string;
  repeat: string;
  position: string;
  size: string;
  opacity: number;
};

// Opacités au-dessus du plafond 0.10 du guide, à dessein : ses motifs sont des
// traits fins (~1px au rendu), quasi imperceptibles à 8% sur le fond marine. Le but
// réel est « discret mais visible » — on privilégie donc le visible. Le bouclier et
// la vague sont sur fond uni (montés davantage) ; le tapa se répète (gardé plus bas).
const PRESETS: Record<Preset, MaskSpec> = {
  // Grand bouclier tiki ancré dans l'angle bas-droit. Sections héro/method/contact.
  "shield-corner": { url: "/bg/wm-tiki-shield.svg", repeat: "no-repeat", position: "right -60px bottom -80px", size: "420px", opacity: 0.18 },
  // Bandeau vague & réseau étiré en bas. Footer ou bandeau pleine largeur.
  "wave-band": { url: "/bg/wm-wave-network.svg", repeat: "no-repeat", position: "center bottom", size: "100% auto", opacity: 0.16 },
  // Motif tapa répété en tuile. Fond de pages de contenu entières.
  tapa: { url: "/bg/wm-pattern-tapa.svg", repeat: "repeat", position: "0 0", size: "200px", opacity: 0.10 },
};

// À poser comme premier enfant d'un conteneur `relative overflow-hidden`, le
// contenu réel devant être `relative` pour passer au-dessus (voir les sections).
export default function Watermark({ preset, className = "" }: { preset: Preset; className?: string }) {
  const s = PRESETS[preset];
  const style: CSSProperties = {
    backgroundColor: "var(--ds-watermark)",
    maskImage: `url("${s.url}")`,
    WebkitMaskImage: `url("${s.url}")`,
    maskRepeat: s.repeat,
    WebkitMaskRepeat: s.repeat,
    maskPosition: s.position,
    WebkitMaskPosition: s.position,
    maskSize: s.size,
    WebkitMaskSize: s.size,
    opacity: s.opacity,
  };
  return <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} style={style} />;
}
