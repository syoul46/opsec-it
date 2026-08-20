import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CreationWeb from "@/components/sections/CreationWeb";
import About from "@/components/sections/About";
import Methodology from "@/components/sections/Methodology";
import Contact from "@/components/sections/Contact";
import { routing, type AppLocale } from "@/i18n/routing";

// `setRequestLocale` n'est pas décoratif : sans lui next-intl bascule la page en
// rendu dynamique, et l'accueil repartait en SSR à chaque visite (Cache-Control
// no-store, TTFB ~0,9 s) pendant que les pages légales, elles, étaient prérendues.
// À appeler dans CHAQUE layout et CHAQUE page, pas seulement dans le layout.
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as AppLocale);

  return (
    <>
      <Navbar />
      <div className="h-20" aria-hidden="true" />
      <main id="contenu">
        <Hero />
        <Services />
        <CreationWeb />
        <About />
        <Methodology />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
