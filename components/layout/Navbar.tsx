"use client";

import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";

const links = [
  { href: "/#services",      label: "Services" },
  { href: "/#creation-web",  label: "Création web" },
  { href: "/#parcours",      label: "Parcours" },
  { href: "/#methodologie",  label: "Méthodologie" },
  { href: "/#contact",       label: "Contact" },
];

export default function Navbar() {
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

        <a href="/" className="flex items-center gap-2 group">
          <Shield className="w-6 h-6 text-blue" />
          <span className="font-bold text-xl tracking-tight">
            <span className="text-ink">OPSEC</span><span className="text-blue">-IT</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map(l => (
            <a key={l.href} href={l.href}
               className="text-sm font-semibold text-ink-soft hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <a href="/#contact"
           className="hidden md:inline-flex items-center rounded-xl bg-blue text-surf text-sm font-semibold hover:bg-blue/90 transition-all shadow-sm hover:shadow-md hover:shadow-blue/30 min-h-11 px-5 py-2.5">
          Prendre contact
        </a>

        <button className="md:hidden p-1 text-ink-soft hover:text-ink" onClick={() => setOpen(!open)} aria-label="Ouvrir le menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surf-mid border-t border-border px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="block text-sm font-medium text-ink-soft hover:text-ink">{l.label}</a>
          ))}
          <a href="/#contact" onClick={() => setOpen(false)}
             className="block text-center px-4 py-2 rounded-lg bg-blue text-surf text-sm font-semibold">
            Prendre contact
          </a>
        </div>
      )}
    </header>
  );
}
