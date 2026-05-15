"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Reserve() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    // TODO: wire to Supabase / API route. For now, simulate the flow.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  return (
    <section
      id="reserve"
      className="relative w-full overflow-hidden border-t border-fg/10 bg-bg py-32 sm:py-48"
    >
      {/* Yellow accent slash */}
      <div
        aria-hidden
        className="absolute -left-20 top-1/2 h-px w-[120%] origin-left -rotate-[2deg] bg-accent/30"
      />

      <div className="relative mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 sm:px-12 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-10 bg-accent" />
            Allocation 04 / 24
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] uppercase leading-[0.9]">
            <span className="block">Reserve</span>
            <span className="block text-accent">Yours</span>
          </h2>
          <p className="max-w-md text-base text-fg/70 sm:text-lg">
            Limited deliveries each quarter. Reserve a build slot and our
            concierge will reach out within 24 hours with availability,
            specification options, and delivery timeline.
          </p>
          <ul className="mt-4 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg/50">
            <li>· White-glove delivery, US-wide</li>
            <li>· Documented service & provenance</li>
            <li>· Trade-in valuation on request</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <Field label="Full name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" />
          <Field
            label="Notes (optional)"
            name="notes"
            multiline
          />
          <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
              By submitting, you agree to be contacted by MVP concierge.
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
                  {status === "idle" && "Reserve →"}
                  {status === "submitting" && "Reserving…"}
                  {status === "done" && "Received ✓"}
                </motion.span>
              </AnimatePresence>
            </MagneticButton>
          </div>
        </form>
      </div>

      <footer className="relative mt-32 flex flex-col items-start justify-between gap-6 px-6 font-mono text-[10px] uppercase tracking-[0.32em] text-fg/40 sm:flex-row sm:items-center sm:px-12">
        <span>MVP · Miami · Est. 2026</span>
        <span>Authorized independent dealer · No affiliation with Automobili Lamborghini S.p.A.</span>
      </footer>
    </section>
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
