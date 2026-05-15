import { Hero } from "@/components/sections/Hero";
import { RotationScrub } from "@/components/sections/RotationScrub";
import { FleetShowroom } from "@/components/sections/FleetShowroom";
import { SpecTicker } from "@/components/sections/SpecTicker";
import { Reserve } from "@/components/sections/Reserve";
import { Marquee } from "@/components/ui/Marquee";

export default function Home() {
  return (
    <main className="relative z-[1] bg-bg text-fg">
      <Hero />
      <Marquee
        items={[
          "Reserve a Drive",
          "White-Glove Delivery",
          "24/7 Concierge",
          "Documented Service",
          "Insurance Included",
          "AIRDOSA Presents",
        ]}
      />
      <RotationScrub />
      <Marquee
        items={[
          "Six Machines",
          "Zero Compromise",
          "Luxury Performance",
          "Hand-Picked Inventory",
          "Miami · Worldwide",
        ]}
        baseDuration={40}
      />
      <FleetShowroom />
      <SpecTicker />
      <Reserve />
    </main>
  );
}
