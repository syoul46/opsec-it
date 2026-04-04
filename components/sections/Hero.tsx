import { ArrowRight, Shield, CheckCircle } from "lucide-react";

const stats = [
  { value: "7 ans", label: "d'expérience terrain" },
  { value: "AIS",   label: "titre obtenu — IPSSI" },
  { value: "48h",   label: "délai de réponse" },
];

const checks = [
  "Réduction des risques cyber",
  "Conformité RGPD & ANSSI",
  "Continuité d'activité garantie",
  "Tarifs adaptés aux asso et PME",
];

export default function Hero() {
  return (
    <section className="relative bg-white pt-16 pb-20 overflow-hidden">
      {/* Blob décoratif */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-soft opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-16 w-72 h-72 rounded-full bg-blue-mid opacity-30 blur-2xl pointer-events-none" />

      <div className="relative wrap">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

          {/* Texte */}
          <div className="lg:col-span-3">
            {/* Badge AIS */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-soft border border-blue-mid text-blue text-xs font-semibold mb-8">
              <Shield className="w-3.5 h-3.5" />
              Administrateur d&apos;Infrastructures Sécurisées · AIS
            </div>

            {/* H1 */}
            <h1 className="text-5xl lg:text-6xl font-black text-ink leading-[1.08] tracking-tight mb-6">
              Sécurisez votre<br />
              <span className="text-blue">infrastructure.</span><br />
              Protégez votre<br />activité.
            </h1>

            {/* Sous-titre */}
            <p className="text-lg text-ink-soft leading-relaxed mb-8 max-w-md">
              Sylvestre MIGNOT, titulaire du titre AIS (IPSSI), accompagne
              les associations et les PME dans la sécurisation et
              l&apos;administration de leurs systèmes d&apos;information.
            </p>

            {/* Check list */}
            <ul className="space-y-3 mb-10">
              {checks.map(c => (
                <li key={c} className="flex items-center gap-3 text-sm font-medium text-ink-soft">
                  <CheckCircle className="w-4 h-4 text-green flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact"
                 className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue text-white font-semibold text-sm hover:bg-blue/90 transition-all shadow-md hover:shadow-lg hover:shadow-blue/25 hover:-translate-y-0.5">
                Prendre contact
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services"
                 className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border text-ink text-sm font-semibold hover:bg-surf hover:border-ink/20 transition-all">
                Voir les services
              </a>
            </div>
          </div>

          {/* Carte illustration */}
          <div className="relative hidden lg:block lg:col-span-2">
            {/* Card principale */}
            <div className="bg-white rounded-2xl shadow-card-lg border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">OPSEC-IT</p>
                  <p className="text-xs text-ink-dim">Tableau de bord sécurité</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green" />
                  <span className="text-xs font-medium text-green">Opérationnel</span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Posture sécurité",        value: "94/100",      color: "bg-green",  width: "w-[94%]" },
                  { label: "Vulnérabilités ouvertes",  value: "2 mineures",  color: "bg-blue",   width: "w-[12%]" },
                  { label: "Sauvegardes",              value: "100% OK",     color: "bg-green",  width: "w-full"  },
                  { label: "Conformité RGPD",          value: "Conforme",    color: "bg-blue",   width: "w-[88%]" },
                ].map(row => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-ink-soft font-medium">{row.label}</span>
                      <span className="text-ink font-bold">{row.value}</span>
                    </div>
                    <div className="h-2 bg-blue-mid/50 rounded-full overflow-hidden">
                      <div className={`h-full ${row.color} ${row.width} rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-border grid grid-cols-3 gap-4 text-center">
                {[
                  { v: "0",   l: "Incidents" },
                  { v: "12",  l: "Audits/an" },
                  { v: "99.9%", l: "Uptime" },
                ].map(m => (
                  <div key={m.l}>
                    <p className="text-xl font-black text-ink">{m.v}</p>
                    <p className="text-xs text-ink-dim mt-0.5">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge flottant */}
            <div className="absolute -bottom-4 -left-6 bg-white rounded-xl shadow-card-md border border-border px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-soft flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink">Audit terminé</p>
                <p className="text-xs text-ink-dim">Rapport disponible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 pt-10 border-t border-border flex flex-wrap gap-10">
          {stats.map((s, i) => (
            <div key={s.label} className={`${i > 0 ? "pl-10 border-l border-border" : ""}`}>
              <p className="text-2xl font-black text-ink">{s.value}</p>
              <p className="text-sm text-ink-soft mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
