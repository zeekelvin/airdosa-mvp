"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
      <div className="flex flex-col gap-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
          Direct lines
        </span>
        <h2 className="font-display text-3xl uppercase leading-[0.95] tracking-[-0.01em] sm:text-4xl">
          The concierge desk.
        </h2>
        <div className="mt-4 flex flex-col gap-5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/65">
          <div className="flex flex-col gap-1">
            <span className="text-fg/35">Email</span>
            <a href="mailto:concierge@chechexotics.com" className="text-fg hover:text-accent">
              concierge@chechexotics.com
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-fg/35">Hours</span>
            <span>24 / 7 — every day</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-fg/35">Headquartered</span>
            <span>Atlanta · Service worldwide</span>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-fg/55">
          Send a message
        </span>
        <Field label="Full name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone (optional)" name="phone" type="tel" />
        <Field label="How can we help?" name="message" multiline required />
        <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/40">
            We respond within 24 hours.
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
                {status === "idle" && "Send →"}
                {status === "submitting" && "Sending…"}
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
          rows={4}
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
