import type { Metadata } from "next";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact · Cheche Exotics",
  description:
    "Reach the Cheche Exotics concierge. Available 24/7 for reservations, members, and partnership enquiries.",
};

export default function ContactPage() {
  return (
    <main className="relative z-[1] min-h-screen bg-bg text-fg">
      <PageHero
        eyebrow="Concierge"
        title="Talk to a human."
        subtitle="Reservations, members, partnerships, or anything bespoke. We respond within 24 hours."
      />
      <section className="mx-auto max-w-[1600px] px-6 pb-32 pt-12 sm:px-12">
        <ContactForm />
      </section>
      <SiteFooter />
    </main>
  );
}
