import SectionWrapper from "@/components/ui/SectionWrapper";
import { CheckCircle, Award } from "lucide-react";

const certs = [
  { label: "AIS", sub: "Administrateur d'Infrastructures Sécurisées", highlight: true },
  { label: "Linux / Systèmes",    sub: "Administration avancée" },
  { label: "Réseaux & Sécurité",  sub: "TCP/IP, Firewall, VPN" },
  { label: "Cloud & IaC",         sub: "AWS, OVH, Terraform, Ansible" },
  { label: "Virtualisation",      sub: "Proxmox, VMware, Docker" },
  { label: "RGPD & Conformité",   sub: "Protection des données" },
];

const experience = [
  { period: "2023 — présent", role: "Consultant indépendant", company: "OPSEC-IT",                    desc: "Audit, sécurisation et administration d'infrastructures pour des PME et ETI françaises." },
  { period: "2021 — 2023",    role: "Administrateur systèmes & réseaux", company: "[À compléter]",     desc: "Gestion d'un parc de 200+ postes, migration cloud, mise en conformité RGPD." },
  { period: "2019 — 2021",    role: "Technicien infrastructure",          company: "[À compléter]",     desc: "Déploiement et maintenance d'infrastructures hybrides, support N2/N3." },
];

const values = [
  { t: "Sécurité by design",    d: "La sécurité intégrée dès la conception, pas ajoutée après coup." },
  { t: "Pragmatisme technique", d: "Des solutions adaptées à votre contexte, sans sur-ingénierie." },
  { t: "Communication claire",  d: "Des rapports compréhensibles pour les décideurs, pas seulement les techniciens." },
];

export default function About() {
  return (
    <SectionWrapper id="parcours" className="py-24 bg-white">
      <div className="wrap">
        <div className="mb-14">
          <span className="inline-block text-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Parcours & Crédibilité
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink leading-tight">
            Expertise forgée sur le terrain
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-8">Expérience</h3>
            <ol className="relative pl-5 border-l-2 border-blue-mid space-y-10">
              {experience.map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[21px] top-0.5 w-4 h-4 rounded-full bg-blue border-2 border-white ring-2 ring-blue-mid" />
                  <p className="text-xs font-semibold text-blue uppercase tracking-wider mb-1">{e.period}</p>
                  <p className="text-base font-bold text-ink">{e.role}</p>
                  <p className="text-sm text-blue font-medium mb-1.5">{e.company}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">{e.desc}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-6">Mon approche</h3>
              {values.map(v => (
                <div key={v.t} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-ink">{v.t}</p>
                    <p className="text-sm text-ink-soft">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-8">Certifications</h3>
            <div className="space-y-3">
              {certs.map(c => (
                <div key={c.label}
                     className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                       c.highlight
                         ? "bg-blue/8 border-blue/30 shadow-sm"
                         : "bg-surf border-border hover:border-blue-mid hover:bg-blue/5"
                     }`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    c.highlight ? "bg-blue" : "bg-blue/5 border border-blue/15"
                  }`}>
                    <Award className={`w-4 h-4 ${c.highlight ? "text-white" : "text-blue"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${c.highlight ? "text-blue" : "text-ink"}`}>{c.label}</p>
                    <p className="text-xs text-ink-soft">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Placeholder témoignages */}
            <div className="mt-8 p-5 rounded-xl border border-dashed border-border bg-surf">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-dim mb-4">Témoignages clients</p>
              <div className="space-y-2">
                {[1, 2].map(i => (
                  <div key={i} className="h-14 rounded-lg bg-blue/5 border border-blue/15 flex items-center justify-center">
                    <p className="text-xs text-ink-dim">Témoignage client {i} — à venir</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
