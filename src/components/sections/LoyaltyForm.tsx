"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

// CE-22 — Apply to Become an Affiliate
// Form fields per Jira story:
//   First Name · Last Name · Email · Location ·
//   Why do you want to become an affiliate · Schedule a Call · Leave a message

export function LoyaltyForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    // TODO: wire to API route (Resend / Supabase / HubSpot).
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
            What you unlock
          </span>
          <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-[-0.01em] sm:text-4xl">
            More than a rental.
          </h2>
        </div>
        <ul className="flex flex-col gap-5">
          {[
            ["01", "Member rates", "Preferred pricing on every booking."],
            ["02", "Referral commissions", "Earn on every guest you bring in."],
            ["03", "Concierge priority", "Skip the queue. First access to new arrivals."],
            ["04", "Members-only offers", "Bespoke drops, partner perks, off-menu cars."],
          ].map(([n, t, d]) => (
            <li key={n} className="flex items-start gap-5 border-t border-fg/10 pt-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/45">
                {n}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-display text-lg uppercase tracking-[0.02em]">
                  {t}
                </span>
                <span className="text-sm text-fg/60">{d}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-fg/55">
          Application
        </span>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="First name" name="firstName" required />
          <Field label="Last name" name="lastName" required />
        </div>
        <Field label="Email address" name="email" type="email" required />
        <Field label="Location" name="location" required />
        <Field
          label="Why do you want to become a member"
          name="why"
          multiline
          required
        />
        <Field label="Schedule a call (date & time, optional)" name="schedule" />
        <Field label="Leave a message (optional)" name="message" multiline />
        <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
            Applications reviewed by the Cheche Exotics concierge within 48 hours.
          </p>
          <MagneticButton
            type="submit"
            disabled={status !== "idle"}
            className="bg-accent text-black hover:bg-accent/90 disabled:opacity-60"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={status}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="inline-block"
              >
                {status === "idle" && "Apply →"}
                {status === "submitting" && "Submitting…"}
                {status === "done" && "Received ✓"}
              </motion.span>
            </AnimatePresence>
          </MagneticButton>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  multiline,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  return (
    <label className="group flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/50 transition-colors group-focus-within:text-accent">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {multiline ? (
        <textarea
          name={name}
          required={required}
          rows={3}
          data-cursor="hover"
          className="w-full resize-none border-b border-fg/20 bg-transparent py-3 text-base text-fg outline-none transition-colors placeholder:text-fg/30 focus:border-accent"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          data-cursor="hover"
          className="w-full border-b border-fg/20 bg-transparent py-3 text-base text-fg outline-none transition-colors placeholder:text-fg/30 focus:border-accent"
        />
      )}
    </label>
  );
}
