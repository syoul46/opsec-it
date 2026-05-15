"use client";

import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/i18n/LocaleSwitcher";

const navKeys = ["services", "creationWeb", "parcours", "methodologie", "contact"] as const;
const navAnchors: Record<(typeof navKeys)[number], string> = {
  services:     "/#services",
  creationWeb:  "/#creation-web",
  parcours:     "/#parcours",
  methodologie: "/#methodologie",
  contact:      "/#contact",
};

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
      scrolled
        ? "bg-surf/85 backdrop-blur-md shadow-card border-border"
        : "bg-transparent border-transparent"
    }`}>
      <div className="wrap h-20 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="w-6 h-6 text-blue" />
          <span className="font-bold text-xl tracking-tight">
            <span className="text-ink">OPSEC</span><span className="text-blue">-IT</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {navKeys.map(k => (
            <Link key={k} href={navAnchors[k]}
               className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">
              {t(k)}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LocaleSwitcher />
          <Link href="/#contact"
             className="inline-flex items-center rounded-xl bg-blue text-surf text-sm font-semibold hover:bg-blue/90 transition-all shadow-sm hover:shadow-md hover:shadow-blue/30 min-h-11 px-5 py-2.5">
            {t("cta")}
          </Link>
        </div>

        <button className="md:hidden p-1 text-ink-soft hover:text-ink" onClick={() => setOpen(!open)} aria-label={t("openMenu")}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surf-mid border-t border-border px-6 py-4 space-y-3">
          {navKeys.map(k => (
            <Link key={k} href={navAnchors[k]} onClick={() => setOpen(false)}
               className="block text-sm font-medium text-ink-soft hover:text-ink">{t(k)}</Link>
          ))}
          <div className="pt-2"><LocaleSwitcher /></div>
          <Link href="/#contact" onClick={() => setOpen(false)}
             className="block text-center px-4 py-2 rounded-lg bg-blue text-surf text-sm font-semibold">
            {t("cta")}
          </Link>
        </div>
      )}
    </header>
  );
}
