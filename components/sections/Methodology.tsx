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
    <SectionWrapper id="methodologie" className="pt-32 pb-28 bg-surf">
      <div className="wrap">
        <div className="mb-14">
          <span className="inline-block text-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Méthodologie OPSEC
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">
            Comment j&apos;interviens
          </h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Une approche structurée en quatre phases, adaptée à la réalité opérationnelle
            de votre entreprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {steps.map(s => (
            <div key={s.num}
                 className="group bg-white rounded-2xl border border-border p-7 shadow-card hover:shadow-card-md hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 text-center">
                  <span className="block text-3xl font-black text-blue/20 leading-none mb-2.5">{s.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center mx-auto group-hover:bg-blue group-hover:border-blue transition-colors duration-200">
                    <s.Icon className="w-5 h-5 text-blue group-hover:text-white transition-colors duration-200" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-ink mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-soft leading-relaxed mb-3">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-blue/5 font-medium text-blue border border-blue/15">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Citation */}
        <blockquote className="bg-blue-soft border-l-4 border-blue rounded-r-xl px-8 py-6 max-w-2xl">
          <p className="text-ink italic leading-relaxed mb-3">
            &ldquo;La sécurité opérationnelle n&apos;est pas un état final mais un processus
            continu d&apos;adaptation aux menaces et aux évolutions de votre organisation.&rdquo;
          </p>
          <cite className="text-sm font-bold text-blue not-italic">— Sylvestre MIGNOT, AIS</cite>
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
