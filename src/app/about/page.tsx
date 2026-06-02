import type { Metadata } from "next";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About · Cheche Exotics",
  description:
    "Cheche Exotics — the story, the standard, and the people behind the curated luxury rental concierge.",
};

export default function AboutPage() {
  return (
    <main className="relative z-[1] min-h-screen bg-bg text-fg">
      <PageHero
        eyebrow="The Story"
        title="Built for the uncompromising."
        subtitle="Cheche Exotics was founded on a single belief: the experience around the car should be as exceptional as the car itself."
      />
      <section className="mx-auto max-w-3xl px-6 pb-32 pt-12 sm:px-12">
        <div className="prose-luxury flex flex-col gap-8 text-fg/75">
          <p className="text-lg leading-relaxed">
            Founder copy block. Brand voice anchor page — to be replaced with
            real story, mission, and standards copy.
          </p>
          <p className="text-lg leading-relaxed">
            What sets Cheche Exotics apart: hand-picked machines, documented
            service history, concierge delivery, and a members-only loyalty
            programme built around the people who refuse the ordinary.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
