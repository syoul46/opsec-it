import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://opsec-it.fr";

// `lastModified` était `new Date()`, donc l'heure du build : identique sur toutes
// les pages et modifiée à chaque redéploiement même sans changement de contenu.
// C'est le genre de signal que Google finit par ignorer entièrement.
//
// Les dates sont donc écrites à la main, par page. `.git` est exclu du contexte
// Docker (cf. .dockerignore), on ne peut pas les dériver de l'historique au build.
// → À mettre à jour quand le contenu de la page change vraiment. Pas à chaque
//   déploiement, pas pour une correction de style.
const PATHS: {
  path: string;
  lastModified: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "",                           lastModified: "2026-08-20", changeFrequency: "monthly", priority: 1   },
  { path: "/packs",                     lastModified: "2026-08-20", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mentions-legales",          lastModified: "2026-08-20", changeFrequency: "yearly",  priority: 0.3 },
  { path: "/politique-confidentialite", lastModified: "2026-08-20", changeFrequency: "yearly",  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap(({ path, lastModified, changeFrequency, priority }) =>
    routing.locales.map((locale) => {
      const url = `${BASE_URL}/${locale}${path}`;
      const languages = Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      );
      return {
        url,
        lastModified: new Date(lastModified),
        changeFrequency,
        priority,
        alternates: { languages },
      };
    }),
  );
}
