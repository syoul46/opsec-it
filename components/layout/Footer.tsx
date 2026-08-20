import { TikiIcon } from "@/components/ui/tiki";
import Watermark from "@/components/ui/Watermark";
import GithubMark from "@/components/ui/GithubMark";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { REPO_URL, LICENSE_SPDX } from "@/lib/site";

const navKeys = ["services", "creationWeb", "packs", "parcours", "methodologie", "contact"] as const;
const navAnchors: Record<(typeof navKeys)[number], string> = {
  services:     "/#services",
  creationWeb:  "/#creation-web",
  packs:        "/packs",
  parcours:     "/#parcours",
  methodologie: "/#methodologie",
  contact:      "/#contact",
};

export default function Footer() {
  const t    = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-surf-mid border-t border-border text-ink">
      <Watermark preset="wave-band" />
      <div className="wrap py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TikiIcon name="networking-security" className="w-5 h-5 text-blue" />
              <span className="font-bold text-base">OPSEC<span className="text-blue">-IT</span></span>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">{t("tagline")}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-dim mb-4">{t("navigation")}</p>
            <ul className="space-y-2">
              {navKeys.map(k => (
                <li key={k}>
                  <Link href={navAnchors[k]} className="text-sm text-ink-soft hover:text-blue transition-colors">
                    {tNav(k)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-dim mb-4">{t("contact")}</p>
            <ul className="space-y-2">
              <li><a href="mailto:contact@opsec-it.fr" className="text-sm text-ink-soft hover:text-blue transition-colors">contact@opsec-it.fr</a></li>
              <li><a href="https://www.linkedin.com/in/sylvestre-mignot-261a7461/" target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft hover:text-blue transition-colors">{t("linkedin")}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-dim">{t("rights", { year })}</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <li>
              {/* Le lien vers le dépôt est permanent et présent sur toutes les pages :
                  c'est le signal minimum crédible pour une offre qui promet que le
                  code appartient au client. */}
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
                 title={t("sourceCodeTitle")}
                 className="inline-flex items-center gap-1.5 text-xs text-ink-dim hover:text-blue transition-colors">
                <GithubMark className="w-3.5 h-3.5" />
                {t("sourceCode")}
                <span className="text-ink-dim/60">· {LICENSE_SPDX}</span>
              </a>
            </li>
            <li aria-hidden="true" className="text-xs text-ink-dim">·</li>
            <li>
              <Link href="/mentions-legales" className="text-xs text-ink-dim hover:text-blue transition-colors">
                {t("legal")}
              </Link>
            </li>
            <li aria-hidden="true" className="text-xs text-ink-dim">·</li>
            <li>
              <Link href="/politique-confidentialite" className="text-xs text-ink-dim hover:text-blue transition-colors">
                {t("privacy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
