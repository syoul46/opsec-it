import {
  ShieldCheck, Server, Lock, Cloud, RefreshCw, Headphones,
} from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionWrapper from "@/components/ui/SectionWrapper";

const services = [
  { Icon: ShieldCheck, title: "Diagnostic sécurité",          description: "Analyse de votre infrastructure : identification des vulnérabilités, mauvaises configurations et points d'amélioration. Rapport clair avec recommandations priorisées.",  tags: ["Analyse", "Recommandations", "Rapport"] },
  { Icon: Server,      title: "Administration systèmes",      description: "Gestion de vos serveurs Linux/Windows, routeurs et firewalls. Supervision avec Zabbix, mises à jour et interventions rapides.",                                              tags: ["Linux", "Windows Server", "Zabbix"] },
  { Icon: Lock,        title: "Sécurisation d'infrastructures", description: "Durcissement des systèmes, segmentation réseau, gestion des accès et des mots de passe. Des bases solides pour réduire votre exposition.",                                tags: ["Hardening", "Segmentation", "Accès"] },
  { Icon: Cloud,       title: "Virtualisation",               description: "Déploiement et administration de vos environnements virtualisés on-premise (Proxmox, VMware). Conteneurisation avec Docker.",                                                tags: ["Proxmox", "VMware", "Docker"] },
  { Icon: RefreshCw,   title: "Continuité d'activité",        description: "Stratégie de sauvegarde, procédures de reprise documentées et tests réguliers. Pour que votre activité survive à un incident.",                                              tags: ["Sauvegarde", "PRA", "Documentation"] },
  { Icon: Headphones,  title: "Support & accompagnement",     description: "Interlocuteur technique unique pour les structures sans DSI. Suivi régulier, réponse aux incidents, documentation et accompagnement de vos équipes.",                       tags: ["DSI externalisée", "Associations", "PME"] },
];

export default function Services() {
  return (
    <SectionWrapper id="services" className="pt-32 pb-28 bg-surf">
      <div className="wrap">
        <div style={{ marginBottom: "20px" }}>
          <span className="inline-block text-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Expertise & Services
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">
            Ce que j&apos;apporte à votre structure
          </h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Des prestations adaptées aux associations et PME : pragmatiques,
            documentées, sans jargon. Vous n&apos;avez pas besoin d&apos;un DSI
            à plein temps — vous avez besoin d&apos;un interlocuteur technique
            de confiance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </SectionWrapper>
  );
}
