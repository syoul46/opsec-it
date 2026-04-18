import { Globe, LayoutTemplate, Paintbrush, Search, Zap, Wrench, Check } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";
import SectionWrapper from "@/components/ui/SectionWrapper";

const webServices = [
  {
    Icon: Globe,
    title: "Site vitrine",
    description: "Une présence web professionnelle en one-page ou multi-sections. Design responsive, chargement rapide, formulaire de contact. Livré clé en main.",
    tags: ["Responsive", "One-page", "Next.js"],
  },
  {
    Icon: LayoutTemplate,
    title: "Site multi-pages",
    description: "Site structuré de 3 à 5 pages, sans CMS. Idéal pour les structures dont le contenu évolue peu : présentation, équipe, contact.",
    tags: ["3–5 pages", "Statique", "Responsive"],
  },
  {
    Icon: Paintbrush,
    title: "Design & identité",
    description: "Création de charte graphique, maquettes et intégration. Un site à votre image, cohérent avec votre communication.",
    tags: ["UI/UX", "Charte graphique", "Figma"],
  },
  {
    Icon: Search,
    title: "SEO & performance",
    description: "Optimisation du référencement naturel et des performances : Core Web Vitals, balises, sitemap. Pour être trouvé sur Google.",
    tags: ["SEO", "Core Web Vitals", "Lighthouse"],
  },
  {
    Icon: Zap,
    title: "Refonte",
    description: "Modernisation d'un site existant : nouveau design, migration technique, amélioration des performances et de l'accessibilité.",
    tags: ["Migration", "Accessibilité", "Performance"],
  },
  {
    Icon: Wrench,
    title: "Maintenance",
    description: "Mises à jour régulières, sauvegardes automatiques, surveillance de disponibilité et corrections rapides. Votre site entre de bonnes mains.",
    tags: ["Hébergement", "Backup", "Support"],
  },
];

const pricingTiers = [
  {
    name: "Site vitrine",
    price: "1 200 €",
    sub: "forfait",
    description: "Une page responsive, design soigné, formulaire de contact.",
    features: [
      "Design sur mesure",
      "Responsive mobile / desktop",
      "Formulaire de contact",
      "Optimisation SEO de base",
      "Livraison sous 2 semaines",
    ],
    highlight: false,
  },
  {
    name: "Site multi-pages",
    price: "2 500 €",
    sub: "forfait",
    description: "3 à 5 pages structurées, sans CMS. Contenu stable, site rapide.",
    features: [
      "3 à 5 pages sur mesure",
      "Responsive mobile / desktop",
      "SEO on-page complet",
      "Formulaire de contact",
      "Livraison sous 3 semaines",
    ],
    highlight: false,
  },
  {
    name: "Site + CMS",
    price: "3 900 €",
    sub: "forfait",
    description: "Jusqu'à 5 pages + back-office pour gérer vos contenus en autonomie.",
    features: [
      "Jusqu'à 5 pages",
      "CMS intégré (admin simple)",
      "Blog ou actualités",
      "SEO avancé",
      "Formation à la prise en main",
    ],
    highlight: true,
  },
  {
    name: "Maintenance",
    price: "100 €",
    sub: "/ mois",
    description: "Tranquillité d'esprit : mises à jour, sauvegardes, support.",
    features: [
      "Hébergement inclus",
      "Mises à jour mensuelles",
      "Sauvegardes automatiques",
      "Surveillance de disponibilité",
      "1h de support / mois",
    ],
    highlight: false,
  },
];

export default function CreationWeb() {
  return (
    <SectionWrapper id="creation-web" className="pt-32 pb-28 bg-white">
      <div className="wrap">

        <div style={{ marginBottom: "20px" }}>
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            Création web
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">
            Votre présence en ligne, sans prise de tête
          </h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Des sites modernes, rapides et accessibles — conçus pour les associations
            et PME qui veulent une vitrine professionnelle sans les coûts ni les délais d&apos;une agence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginBottom: "56px" }}>
          {webServices.map(s => <ServiceCard key={s.title} {...s} />)}
        </div>

        {/* Tarifs */}
        <div style={{ marginBottom: "20px" }}>
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            Tarifs
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-ink mb-2 leading-tight">
            Des forfaits clairs
          </h3>
          <p className="text-ink-soft max-w-lg leading-relaxed text-sm">
            Pas de surprise. Les tarifs ci-dessous couvrent les besoins les plus courants.
            Devis gratuit pour tout projet spécifique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingTiers.map(tier => (
            <div
              key={tier.name}
              className={`rounded-2xl border p-8 flex flex-col shadow-card transition-all duration-200 hover:shadow-card-md hover:-translate-y-1 ${
                tier.highlight
                  ? "bg-amber border-amber text-white"
                  : "bg-white border-border"
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${tier.highlight ? "text-white/70" : "text-blue"}`}>
                {tier.name}
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className={`text-4xl font-black ${tier.highlight ? "text-white" : "text-ink"}`}>
                  {tier.price}
                </span>
                <span className={`text-sm font-medium ${tier.highlight ? "text-white/70" : "text-ink-soft"}`}>
                  {tier.sub}
                </span>
              </div>
              <p className={`text-sm mb-6 leading-relaxed ${tier.highlight ? "text-white/80" : "text-ink-soft"}`}>
                {tier.description}
              </p>
              <ul className="flex flex-col gap-3 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.highlight ? "text-white/80" : "text-blue"}`} />
                    <span className={`text-sm ${tier.highlight ? "text-white/90" : "text-ink-soft"}`}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all hover:shadow-md ${
                  tier.highlight
                    ? "bg-white text-amber hover:bg-white/90"
                    : "bg-amber text-white hover:bg-amber/90 hover:shadow-amber/20"
                }`}
                style={{ padding: "10px 20px" }}
              >
                Demander un devis
              </a>
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
}
