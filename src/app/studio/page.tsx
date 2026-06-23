import StudioHero from "@/components/studio/StudioHero";
import Ventures from "@/components/studio/Ventures";
import Mission from "@/components/studio/Mission";

export default function StudioHome() {
  return (
    <main className="relative overflow-hidden bg-ink text-paper">
      <StudioHero />
      <Ventures />
      <Mission />
    </main>
  );
}
