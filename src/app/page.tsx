import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Divisions from "@/components/Divisions";
import Services from "@/components/Services";
import Process from "@/components/Process";
import StackMarquee from "@/components/StackMarquee";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-ink text-paper">
      <Hero />
      <Manifesto />
      <Divisions />
      <Services />
      <Process />
      <StackMarquee />
      <Work />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
