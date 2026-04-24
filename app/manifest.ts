import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OPSEC-IT — Sylvestre MIGNOT",
    short_name: "OPSEC-IT",
    description:
      "Sécurité, administration d'infrastructures et création web pour les associations et les PME.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#4F46E5",
    lang: "fr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
