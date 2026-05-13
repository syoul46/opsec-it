import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — OPSEC-IT",
  description: "Politique de confidentialité et traitement des données personnelles — opsec-it.fr",
  alternates: { canonical: "https://opsec-it.fr/politique-confidentialite" },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialite() {
  return (
    <>
      <Navbar />
      <div className="h-20" aria-hidden="true" />
      <main className="bg-surf pt-20 pb-28">
        <div className="wrap max-w-3xl">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            RGPD
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-ink mb-10 leading-tight">
            Politique de confidentialité
          </h1>

          <div className="space-y-10 text-ink-soft leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Responsable du traitement</h2>
              <p>
                Les données personnelles collectées sur opsec-it.fr sont traitées par
                Sylvestre MIGNOT, éditeur du site, agissant en qualité de responsable du traitement
                au sens du Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p className="mt-3">
                Contact&nbsp;: <a href="mailto:contact@opsec-it.fr" className="text-blue hover:underline">contact@opsec-it.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Données collectées</h2>
              <p>
                Seules les données strictement nécessaires au traitement de votre demande sont
                collectées via le formulaire de contact&nbsp;:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>Nom</li>
                <li>Organisation / société</li>
                <li>Adresse email</li>
                <li>Objet et contenu du message</li>
              </ul>
              <p className="mt-3">
                Aucune donnée sensible au sens de l&apos;article 9 du RGPD n&apos;est collectée.
                Aucun cookie de suivi, aucun outil d&apos;analytics tiers n&apos;est déployé sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Finalités et base légale</h2>
              <p>
                Les données sont collectées et traitées pour&nbsp;:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>répondre à votre demande de contact&nbsp;;</li>
                <li>établir, le cas échéant, une proposition commerciale&nbsp;;</li>
                <li>assurer le suivi de la relation contractuelle si elle aboutit.</li>
              </ul>
              <p className="mt-3">
                La base légale est votre <strong>consentement</strong> (article 6.1.a du RGPD),
                donné par l&apos;envoi volontaire du formulaire, ainsi que l&apos;<strong>exécution
                de mesures précontractuelles</strong> à votre demande (article 6.1.b).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Destinataires</h2>
              <p>
                Les données sont destinées exclusivement à Sylvestre MIGNOT. Elles ne sont ni
                vendues, ni louées, ni cédées à des tiers.
              </p>
              <p className="mt-3">
                L&apos;envoi des emails de contact transite par le prestataire Resend
                (<a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">resend.com</a>)
                agissant en qualité de sous-traitant au sens du RGPD.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Durée de conservation</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Demandes sans suite commerciale&nbsp;: <strong>12 mois</strong> maximum</li>
                <li>Demandes ayant abouti à une relation commerciale&nbsp;: durée de la relation + 3 ans (prospection), 10 ans (obligations comptables)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Vos droits</h2>
              <p>
                Conformément aux articles 15 à 22 du RGPD, vous disposez des droits suivants&nbsp;:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                <li>droit d&apos;accès à vos données&nbsp;;</li>
                <li>droit de rectification&nbsp;;</li>
                <li>droit à l&apos;effacement&nbsp;;</li>
                <li>droit à la limitation du traitement&nbsp;;</li>
                <li>droit à la portabilité&nbsp;;</li>
                <li>droit d&apos;opposition&nbsp;;</li>
                <li>droit de retirer votre consentement à tout moment.</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, contactez&nbsp;:
                {" "}
                <a href="mailto:contact@opsec-it.fr" className="text-blue hover:underline">contact@opsec-it.fr</a>.
              </p>
              <p className="mt-3">
                Vous disposez également du droit d&apos;introduire une réclamation auprès de la{" "}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">
                  CNIL
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Cookies</h2>
              <p>
                Ce site n&apos;utilise <strong>aucun cookie de suivi ni de mesure d&apos;audience</strong>.
                Seuls des cookies techniques strictement nécessaires peuvent être déposés
                (le cas échéant, aucun à ce jour).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink mb-3">Sécurité</h2>
              <p>
                Les données collectées sont transmises en HTTPS et stockées de manière sécurisée.
                Compte tenu de la nature de l&apos;activité, des mesures techniques et
                organisationnelles proportionnées sont mises en œuvre pour protéger vos données
                contre tout accès non autorisé.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
