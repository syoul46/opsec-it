import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import CreationWeb from "@/components/sections/CreationWeb";
import About from "@/components/sections/About";
import Methodology from "@/components/sections/Methodology";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-20" aria-hidden="true" />
      <main>
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
