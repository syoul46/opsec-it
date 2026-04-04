import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Methodology from "@/components/sections/Methodology";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Spacer pour compenser la navbar fixe (h-20 = 80px) */}
      <div className="h-20" aria-hidden="true" />
      <main>
        <Hero />
        <Services />
        <About />
        <Methodology />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
