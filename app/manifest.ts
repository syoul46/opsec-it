import type { MetadataRoute } from "next";

// Les couleurs sont celles du thème par défaut `polynesian-dark` (app/theme.css).
// Elles étaient restées sur la charte précédente : `theme_color` en indigo #4F46E5
// et `background_color` en crème #FAFAF8, ce qui contredisait le
// `<meta name="theme-color" content="#0D1B2A">` émis par app/[locale]/layout.tsx —
// l'écran de démarrage s'ouvrait en clair avant de basculer en sombre.
const SURF   = "#0D1B2A";
const COPPER = "#D2742F";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OPSEC-IT — Sylvestre MIGNOT",
    short_name: "OPSEC-IT",
    description:
      "Sécurité, administration d'infrastructures et création web pour les associations et les PME.",
    // `/` redirige vers la locale négociée (cf. proxy.ts) : on garde la racine
    // pour que l'app installée suive la langue du visiteur plutôt que de figer le FR.
    start_url: "/",
    display: "standalone",
    background_color: SURF,
    theme_color: SURF,
    lang: "fr",
    // Chrome exige du 192 et du 512 pour considérer le site installable ; il n'y
    // avait que le favicon.ico. `maskable` permet à Android de recadrer l'icône
    // dans sa forme système sans rogner le glyphe (d'où la marge dans le PNG).
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
