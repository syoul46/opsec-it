import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Search, ShieldCheck, Eye, Zap } from "lucide-react";

const steps = [
  { num: "01", Icon: Search,      title: "Analyse des risques",     desc: "Cartographie du SI, identification des actifs critiques et des vecteurs d'attaque. Rapport de risques priorisé selon votre métier.", tags: ["EBIOS RM", "Threat modeling"] },
  { num: "02", Icon: ShieldCheck, title: "Durcissement",            desc: "Hardening des OS, segmentation réseau, gestion des privilèges, chiffrement et politique de mises à jour selon les référentiels CIS.", tags: ["CIS Benchmarks", "Least privilege"] },
  { num: "03", Icon: Eye,         title: "Surveillance continue",   desc: "Déploiement d'outils de monitoring et de détection d'anomalies. Tableaux de bord, alertes et revue périodique des journaux.", tags: ["SIEM", "Alerting"] },
  { num: "04", Icon: Zap,         title: "Réponse aux incidents",   desc: "Procédures documentées pour chaque type d'incident : ransomware, intrusion, défaillance. Tests réguliers et amélioration continue.", tags: ["PRI", "Forensics"] },
];

export default function Methodology() {
  return (
    <SectionWrapper id="methodologie" className="relative pt-32 pb-28 bg-surf overflow-hidden">
      <Image
        src="/bg/methodology-sunset.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-right pointer-events-none select-none opacity-55"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-surf via-surf/65 to-surf/25 pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surf pointer-events-none" />
      <div className="relative wrap">
        <div className="mb-5">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            Méthodologie OPSEC
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">
            Comment j&apos;interviens
          </h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Une approche structurée en quatre phases, adaptée à la réalité opérationnelle
            de votre structure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {steps.map(s => (
            <div key={s.num}
                 className="group bg-surf-mid rounded-2xl border border-border p-7 shadow-card hover:shadow-card-md hover:-translate-y-0.5 hover:border-blue/40 transition-all duration-200">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 text-center">
                  <span className="block text-3xl font-black text-blue/30 leading-none mb-2.5">{s.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center mx-auto group-hover:bg-blue group-hover:border-blue transition-colors duration-200">
                    <s.Icon className="w-5 h-5 text-blue group-hover:text-surf transition-colors duration-200" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-ink mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-blue/10 font-medium text-blue border border-blue/25">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue/10 border-l-4 border-blue rounded-r-xl px-8 py-6 max-w-2xl">
          <p className="text-ink leading-relaxed">
            La sécurité opérationnelle n&apos;est pas un état final — c&apos;est un processus
            continu d&apos;adaptation aux menaces et aux évolutions de votre structure.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
