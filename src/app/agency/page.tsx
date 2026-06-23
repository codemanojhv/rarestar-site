import Hero from "@/components/agency/Hero";
import Manifesto from "@/components/agency/Manifesto";
import Services from "@/components/agency/Services";
import Process from "@/components/agency/Process";
import StackMarquee from "@/components/agency/StackMarquee";
import Work from "@/components/agency/Work";
import Testimonials from "@/components/agency/Testimonials";
import Contact from "@/components/agency/Contact";
import Footer from "@/components/agency/Footer";
import caseStudies from "@/data/case-studies.json";
import type { CaseStudy } from "@/types/case-study";

export default function Home() {
  const projects = caseStudies as CaseStudy[];

  return (
    <main className="relative overflow-hidden bg-ink text-paper">
      <Hero />
      <Manifesto />
      <Services />
      <Process />
      <StackMarquee />
      <Work projects={projects} />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
