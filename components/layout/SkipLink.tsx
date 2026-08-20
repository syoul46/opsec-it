import { useTranslations } from "next-intl";

// Lien d'évitement : premier élément focusable du document, invisible tant qu'il
// n'a pas le focus. Il cible `#contenu`, l'id porté par le <main> de chaque page.
export default function SkipLink() {
  const t = useTranslations("a11y");

  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-surf-hi focus:text-ink
                 focus:text-sm focus:font-semibold focus:shadow-lg
                 focus:outline-none focus:ring-2 focus:ring-blue"
    >
      {t("skipToContent")}
    </a>
  );
}
