import type { Metadata } from "next";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { LoyaltyForm } from "@/components/sections/LoyaltyForm";

export const metadata: Metadata = {
  title: "Loyalty Programme · Cheche Exotics",
  description:
    "Apply to the Cheche Exotics loyalty programme. Earn referral commissions, unlock member rates, and partner with the concierge.",
};

export default function LoyaltyPage() {
  return (
    <main className="relative z-[1] min-h-screen bg-bg text-fg">
      <PageHero
        eyebrow="Members Only"
        title="The Cheche Loyalty Programme."
        subtitle="Apply to become a member or affiliate. Earn referral commissions on every booking, unlock member rates, and join an inner circle built around exceptional machines."
      />
      <section className="mx-auto max-w-[1600px] px-6 pb-32 pt-12 sm:px-12">
        <LoyaltyForm />
      </section>
      <SiteFooter />
    </main>
  );
}
