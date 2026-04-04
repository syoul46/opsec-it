"use client";

import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";

const links = [
  { href: "#services",     label: "Services" },
  { href: "#parcours",     label: "Parcours" },
  { href: "#methodologie", label: "Méthodologie" },
  { href: "#contact",      label: "Contact" },
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
    <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300 border-b ${
      scrolled ? "shadow-card border-border" : "border-border/40"
    }`}>
      <div className="wrap h-20 flex items-center justify-between">

        <a href="#" className="flex items-center gap-2 group">
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

        <a href="#contact"
           className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl bg-blue text-white text-sm font-semibold hover:bg-blue/90 transition-all shadow-sm hover:shadow-md hover:shadow-blue/20">
          Prendre contact
        </a>

        <button className="md:hidden p-1 text-ink-soft" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 space-y-3">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
               className="block text-sm font-medium text-ink-soft hover:text-ink">{l.label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}
             className="block text-center px-4 py-2 rounded-lg bg-blue text-white text-sm font-semibold">
            Prendre contact
          </a>
        </div>
      )}
    </header>
  );
}
