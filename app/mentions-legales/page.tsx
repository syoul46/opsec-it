import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Mentions légales — OPSEC-IT",
  description: "Mentions légales du site opsec-it.fr",
  alternates: { canonical: "https://opsec-it.fr/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegales() {
  return (
    <>
      <Navbar />
      <div className="h-20" aria-hidden="true" />
      <main className="bg-surf pt-20 pb-28">
        <div className="wrap max-w-3xl">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            Informations légales
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-ink mb-10 leading-tight">
            Mentions légales
          </h1>

          <div className="space-y-10 text-ink-soft leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Éditeur du site</h2>
              <p>
                Le présent site <strong>opsec-it.fr</strong> est édité par&nbsp;:
              </p>
              <ul className="mt-3 space-y-1">
                <li><strong className="text-ink">Sylvestre MIGNOT</strong></li>
                <li>Entrepreneur individuel — micro-entreprise</li>
                <li>Activité&nbsp;: administration et sécurisation de systèmes d&apos;information, création de sites web</li>
                <li>Email&nbsp;: <a href="mailto:contact@opsec-it.fr" className="text-blue hover:underline">contact@opsec-it.fr</a></li>
              </ul>
              <p className="mt-3 text-sm text-ink-dim">
                Les informations SIREN / SIRET et numéro de TVA intracommunautaire sont communiqués sur demande.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Directeur de la publication</h2>
              <p>Sylvestre MIGNOT, en qualité d&apos;éditeur du site.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Hébergement</h2>
              <p>
                Le site est hébergé sur une infrastructure privée administrée par l&apos;éditeur.
                Les informations relatives au prestataire technique d&apos;hébergement peuvent
                être communiquées sur simple demande à <a href="mailto:contact@opsec-it.fr" className="text-blue hover:underline">contact@opsec-it.fr</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble des contenus présents sur le site opsec-it.fr (textes, images,
                graphismes, logos, code source) est la propriété exclusive de Sylvestre MIGNOT,
                sauf mention contraire. Toute reproduction, représentation, modification ou
                exploitation, totale ou partielle, est interdite sans autorisation écrite préalable.
              </p>
              <p className="mt-3">
                Les témoignages clients publiés sur ce site le sont avec l&apos;accord explicite
                des personnes citées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Responsabilité</h2>
              <p>
                L&apos;éditeur s&apos;efforce de fournir des informations exactes et tenues à jour.
                Il ne saurait toutefois être tenu responsable des erreurs, d&apos;une absence de
                disponibilité des informations ou de la présence de virus sur son site.
              </p>
              <p className="mt-3">
                Les liens externes présents sur le site ne constituent pas une approbation de
                leur contenu. L&apos;éditeur décline toute responsabilité quant aux sites tiers
                accessibles via ces liens.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Données personnelles</h2>
              <p>
                Le traitement des données personnelles collectées via le formulaire de contact
                est détaillé dans la{" "}
                <a href="/politique-confidentialite" className="text-blue hover:underline">
                  politique de confidentialité
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Droit applicable</h2>
              <p>
                Le présent site est soumis au droit français. Tout litige relatif à son
                utilisation relève de la compétence exclusive des tribunaux français.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
