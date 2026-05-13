import { Shield } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-surf-mid border-t border-border text-ink">
      <div className="wrap py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue" />
              <span className="font-bold text-base">OPSEC<span className="text-blue">-IT</span></span>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
              Sécurisation, administration d&apos;infrastructures et création web pour les associations et les PME. Sylvestre MIGNOT, AIS.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-dim mb-4">Navigation</p>
            <ul className="space-y-2">
              {["/#services", "/#creation-web", "/#parcours", "/#methodologie", "/#contact"].map((h, i) => (
                <li key={h}>
                  <a href={h} className="text-sm text-ink-soft hover:text-blue transition-colors">
                    {["Services", "Création web", "Parcours", "Méthodologie", "Contact"][i]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-dim mb-4">Contact</p>
            <ul className="space-y-2">
              <li><a href="mailto:contact@opsec-it.fr" className="text-sm text-ink-soft hover:text-blue transition-colors">contact@opsec-it.fr</a></li>
              <li><a href="https://www.linkedin.com/in/sylvestre-mignot-261a7461/" target="_blank" rel="noopener noreferrer" className="text-sm text-ink-soft hover:text-blue transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-dim">&copy; {year} OPSEC-IT — Sylvestre MIGNOT. Tous droits réservés.</p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <li>
              <a href="/mentions-legales" className="text-xs text-ink-dim hover:text-blue transition-colors">
                Mentions légales
              </a>
            </li>
            <li aria-hidden="true" className="text-xs text-ink-dim">·</li>
            <li>
              <a href="/politique-confidentialite" className="text-xs text-ink-dim hover:text-blue transition-colors">
                Confidentialité
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
