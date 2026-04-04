import {
  ShieldCheck, Server, Lock, Cloud, RefreshCw, Headphones,
} from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionWrapper from "@/components/ui/SectionWrapper";

const services = [
  { Icon: ShieldCheck, title: "Audit de sécurité",            description: "Évaluation complète de votre surface d'attaque : vulnérabilités, configurations, rapport priorisé avec plan de remédiation.",         tags: ["Pentest", "Conformité", "ANSSI"] },
  { Icon: Server,      title: "Administration systèmes",      description: "Gestion de vos serveurs Linux/Windows, routeurs et firewalls. Supervision proactive, mises à jour et interventions rapides.",            tags: ["Linux", "Windows Server", "Firewall"] },
  { Icon: Lock,        title: "Sécurisation d'infrastructures", description: "Durcissement des systèmes, segmentation réseau, chiffrement des données et gestion des accès (IAM) selon les référentiels ANSSI.",    tags: ["Hardening", "IAM", "Chiffrement"] },
  { Icon: Cloud,       title: "Cloud & virtualisation",       description: "Déploiement et sécurisation de vos environnements cloud (AWS, OVH) et on-premise (Proxmox, VMware). Infrastructure as Code.",            tags: ["Cloud", "Proxmox", "Terraform"] },
  { Icon: RefreshCw,   title: "Continuité d'activité",        description: "Conception de votre PRA/PCA, stratégie de sauvegarde 3-2-1, procédures de reprise et tests réguliers en conditions réelles.",            tags: ["PRA", "PCA", "Backup"] },
  { Icon: Headphones,  title: "Support & accompagnement B2B", description: "Externalisation de DSI, interlocuteur unique, SLA définis contractuellement, formation de vos équipes et documentation complète.",       tags: ["DSI externalisée", "SLA", "Formation"] },
];

export default function Services() {
  return (
    <SectionWrapper id="services" className="py-24 bg-surf">
      <div className="wrap">
        <div className="mb-14">
          <span className="inline-block text-blue text-sm font-semibold uppercase tracking-widest mb-3">
            Expertise & Services
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">
            Ce que j&apos;apporte à votre entreprise
          </h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Des prestations techniques ciblées pour protéger, administrer et faire
            évoluer vos systèmes d&apos;information en toute sérénité.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </SectionWrapper>
  );
}
