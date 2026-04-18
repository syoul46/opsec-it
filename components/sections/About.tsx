import SectionWrapper from "@/components/ui/SectionWrapper";
import { CheckCircle, Award, Terminal, Network, Activity, Layers, Package, Lock, LucideIcon } from "lucide-react";

const certification = { label: "AIS", sub: "Administrateur d'Infrastructures Sécurisées — IPSSI Paris, 2026" };

const skills: { label: string; sub: string; Icon: LucideIcon }[] = [
  { label: "Linux / Systèmes",        sub: "Administration serveurs, gestion de services, maintenance",  Icon: Terminal },
  { label: "Réseaux & Sécurité",      sub: "TCP/IP, Firewall, VPN, segmentation",                        Icon: Network  },
  { label: "Supervision",             sub: "Zabbix, monitoring infrastructure",                           Icon: Activity },
  { label: "Virtualisation",          sub: "Environnements virtualisés : Proxmox, VMware",                Icon: Layers   },
  { label: "Conteneurisation",        sub: "Docker, Docker Compose",                                      Icon: Package  },
  { label: "Protection des données",  sub: "Conformité RGPD, chiffrement, contrôle des accès",             Icon: Lock     },
];

const experience = [
  { period: "2025 — 2026", role: "Formation AIS", company: "IPSSI Paris", desc: "Administrateur d'Infrastructures Sécurisées — titre obtenu. Spécialisation : audit, sécurisation et administration d'infrastructures." },
  { period: "2018 — 2024", role: "Technicien réseau, systèmes & DevOps", company: "SAS ANUANUA", desc: "Administration systèmes Linux/Windows, gestion d'infrastructure réseau, déploiements cloud, automatisation DevOps. Environnement multi-projets." },
  { period: "2008 — 2017", role: "Technicien interfaces MIDI", company: "Spectacle vivant", desc: "Conception et mise en place de systèmes d'interfaçage MIDI pour le spectacle. Contraintes de fiabilité temps réel, matériel sur-mesure, autonomie technique totale." },
];

const values = [
  { t: "Sécurité by design",    d: "La sécurité intégrée dès la conception, pas ajoutée après coup." },
  { t: "Pragmatisme technique", d: "Des solutions adaptées à votre contexte, sans sur-ingénierie." },
  { t: "Communication claire",  d: "Des rapports compréhensibles pour les décideurs, pas seulement les techniciens." },
];

export default function About() {
  return (
    <SectionWrapper id="parcours" className="pt-32 pb-28 bg-surf-mid">
      <div className="wrap">
        <div className="mb-14 flex items-center gap-6">
          <img
            src="/sylvestre.jpg"
            alt="Sylvestre MIGNOT"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue/20 shadow-md flex-shrink-0"
          />
          <div>
            <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
              Parcours
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-ink leading-tight">
              Expertise forgée sur le terrain
            </h2>
          </div>
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

            <div style={{ marginTop: "10px" }} className="space-y-4">
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

          {/* Certification + Compétences */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-4">Certification</h3>
            <div className="mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl border bg-blue/8 border-blue/30 shadow-sm">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue">{certification.label}</p>
                  <p className="text-xs text-ink-soft">{certification.sub}</p>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-4">Compétences techniques</h3>
            <div className="space-y-3">
              {skills.map(s => (
                <div key={s.label}
                     className="flex items-center gap-4 p-4 rounded-xl border bg-surf border-border hover:border-blue-mid hover:bg-blue/5 transition-all">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue/5 border border-blue/15">
                    <s.Icon className="w-4 h-4 text-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">{s.label}</p>
                    <p className="text-xs text-ink-soft">{s.sub}</p>
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
