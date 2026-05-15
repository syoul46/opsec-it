"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const t = useTranslations("locale");
  const tNav = useTranslations("nav");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onChange = (next: AppLocale) => {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      role="group"
      aria-label={tNav("switchLanguage")}
      className={`inline-flex items-center rounded-lg border border-border bg-surf-mid p-0.5 text-xs font-semibold ${
        isPending ? "opacity-60" : ""
      }`}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            aria-pressed={active}
            className={`px-2 py-1 rounded-md uppercase tracking-wider transition-colors ${
              active
                ? "bg-blue text-surf"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {l}
            <span className="sr-only"> — {t(l)}</span>
          </button>
        );
      })}
    </div>
  );
}
