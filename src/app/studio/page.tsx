import StudioHero from "@/components/studio/StudioHero";
import Mission from "@/components/studio/Mission";

export default function StudioHome() {
  return (
    <main className="relative overflow-hidden bg-ink text-paper">
      <StudioHero />
      <Mission />
    </main>
  );
}
