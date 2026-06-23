import RehaiHero from "@/components/rehai/RehaiHero";
import HowItWorks from "@/components/rehai/HowItWorks";
import DualAudience from "@/components/rehai/DualAudience";
import SolutionsSection from "@/components/rehai/SolutionsSection";

export default function RehaiHome() {
  return (
    <main className="relative overflow-hidden bg-ink text-paper">
      <RehaiHero />
      <HowItWorks />
      <DualAudience />
      <SolutionsSection />
    </main>
  );
}
