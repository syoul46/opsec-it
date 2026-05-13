import Image from "next/image";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";

const stats = [
  { value: "6 ans", label: "d'expérience terrain" },
  { value: "AIS",   label: "titre obtenu — IPSSI" },
  { value: "24h",   label: "délai de réponse" },
];

const checks = [
  "Réduction des risques cyber",
  "Conformité RGPD & ANSSI",
  "Continuité d'activité assurée",
  "Tarifs adaptés aux asso et PME",
];

export default function Hero() {
  return (
    <section className="relative bg-surf pt-28 pb-36 overflow-hidden">
      {/* Image de fond polynésienne */}
      <Image
        src="/bg/hero-sunset.png"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center pointer-events-none select-none"
      />
      {/* Overlay sombre — texte lisible à gauche, photo visible à droite */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-surf/95 via-surf/70 to-surf/10 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surf pointer-events-none" />

      <div className="relative wrap">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

          {/* Texte */}
          <div className="lg:col-span-3">
            {/* Badge AIS */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-soft border border-amber-mid text-amber text-xs font-semibold mb-8">
              <Shield className="w-3.5 h-3.5" />
              Administrateur d&apos;Infrastructures Sécurisées · AIS
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-ink leading-[1.1] tracking-tight mb-6 text-balance">
              Des sites web <span className="text-blue">sécurisés</span>,<br />
              pensés pour <span className="text-blue">durer</span>.
            </h1>

            {/* Sous-titre */}
            <p className="text-lg text-ink-soft leading-relaxed mb-8 max-w-xl">
              Sylvestre MIGNOT, titulaire du titre AIS (IPSSI), sécurise et
              administre les systèmes d&apos;information des associations et
              des PME — et conçoit leurs sites web sur mesure.
            </p>

            {/* Check list */}
            <ul className="space-y-3 mb-14">
              {checks.map(c => (
                <li key={c} className="flex items-center gap-3 text-sm font-medium text-ink-soft">
                  <CheckCircle className="w-4 h-4 text-blue flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contact"
                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue text-surf font-semibold text-sm hover:bg-blue/90 transition-all shadow-md hover:shadow-lg hover:shadow-blue/40 hover:-translate-y-0.5 min-h-11 px-5 py-2.5">
                Prendre contact
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#services"
                 className="inline-flex items-center justify-center gap-2 rounded-xl border border-border text-ink text-sm font-semibold hover:bg-surf-mid hover:border-blue/40 transition-all min-h-11 px-5 py-2.5">
                Voir les services
              </a>
            </div>
          </div>

          {/* Logo transparent — flotte sur l'image polynésienne */}
          <div className="relative hidden lg:flex lg:col-span-2 justify-center items-center">
            <div className="relative w-full max-w-[340px]">
              <Image
                src="/logo.png"
                alt="Logo OPSEC-IT — Sécurité & Innovation Web"
                width={760}
                height={520}
                priority
                className="w-full h-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
              />

              {/* Badge flottant — disponible */}
              <div className="absolute -bottom-2 -left-2 bg-surf-mid/90 backdrop-blur-sm rounded-xl shadow-card-md border border-border px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green/15 border border-green/30 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green" />
                </div>
                <div>
                  <p className="text-xs font-bold text-ink">Disponible</p>
                  <p className="text-xs text-ink-dim">Réponse 24h ouvrées</p>
                </div>
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
