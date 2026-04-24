import SectionWrapper from "@/components/ui/SectionWrapper";
import { CheckCircle, Award, Terminal, Network, Activity, Layers, Package, Lock, Quote, LucideIcon } from "lucide-react";

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

const testimonials = [
  {
    quote: "Nous avions besoin d'un site à la hauteur de notre cadre et de notre accueil. Sylvestre a su traduire l'esprit du Clos en un site clair, élégant et efficace. Les réservations ont suivi très vite, et son suivi reste d'une grande réactivité.",
    author: "Christelle & David Bernadou",
    initials: "CB",
    structure: "Le Clos de Gamel",
    url: "https://closdegamel.com",
    display: "closdegamel.com",
  },
  {
    quote: "Sylvestre a entièrement repensé notre site et modernisé notre infrastructure. Rigueur technique, sens du détail et vraie compréhension de nos enjeux : un partenaire de confiance sur la durée, toujours force de proposition.",
    author: "Fred Bordier",
    initials: "FB",
    structure: "Anuanua — Gravure & découpe laser",
    url: "https://anuanua.fr",
    display: "anuanua.fr",
  },
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
            <ol className="space-y-0">
              {experience.map((e, i) => (
                <li key={i} className="flex gap-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="w-4 h-4 rounded-full bg-blue border-2 border-white ring-2 ring-blue-mid mt-0.5 flex-shrink-0" />
                    {i < experience.length - 1 && (
                      <div className="w-0.5 bg-blue-mid flex-1 mt-1.5 mb-0" />
                    )}
                  </div>
                  <div className="pb-10">
                    <p className="text-xs font-semibold text-blue uppercase tracking-wider mb-1">{e.period}</p>
                    <p className="text-base font-bold text-ink">{e.role}</p>
                    <p className="text-sm text-blue font-medium mb-1.5">{e.company}</p>
                    <p className="text-sm text-ink-soft leading-relaxed">{e.desc}</p>
                  </div>
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

            {/* Témoignages clients */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue mb-4">Témoignages clients</p>
              <div className="space-y-4">
                {testimonials.map(t => (
                  <div key={t.author} className="p-6 rounded-xl border border-border bg-surf">
                    <div className="relative">
                      <Quote className="w-6 h-6 text-amber/40 absolute -top-1 -left-1" />
                      <blockquote className="pl-8">
                        <p className="text-sm text-ink-soft leading-relaxed italic mb-4">
                          « {t.quote} »
                        </p>
                        <footer className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-blue">{t.initials}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-ink">{t.author}</p>
                            <a href={t.url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-soft hover:text-blue transition-colors">
                              {t.structure} — {t.display}
                            </a>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
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
