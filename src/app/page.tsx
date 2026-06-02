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
          "Experience Excellence",
          "Luxury in Motion",
          "Drive Prestige",
          "Arrive Different",
          "Elevated Mobility",
          "More Than a Ride",
        ]}
      />
      <RotationScrub />
      <Marquee
        items={[
          "Concierge Delivery",
          "Members Privilege",
          "Atlanta · Worldwide",
          "Reserve Your Experience",
          "Elevate Your Journey",
        ]}
        baseDuration={40}
      />
      <FleetShowroom />
      <SpecTicker />
      <Reserve />
    </main>
  );
}
