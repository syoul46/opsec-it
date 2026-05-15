import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://opsec-it.fr";

const PATHS: { path: string; changeFrequency: "monthly" | "yearly"; priority: number }[] = [
  { path: "",                          changeFrequency: "monthly", priority: 1   },
  { path: "/mentions-legales",         changeFrequency: "yearly",  priority: 0.3 },
  { path: "/politique-confidentialite", changeFrequency: "yearly",  priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PATHS.flatMap(({ path, changeFrequency, priority }) =>
    routing.locales.map((locale) => {
      const url = `${BASE_URL}/${locale}${path}`;
      const languages = Object.fromEntries(
        routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      );
      return {
        url,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      };
    }),
  );
}
