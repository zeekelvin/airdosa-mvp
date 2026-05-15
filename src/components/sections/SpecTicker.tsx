"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "motion/react";

type Spec = {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  caption: string;
};

const SPECS: Spec[] = [
  { label: "0–60 MPH", value: 3.0, suffix: "s", decimals: 1, caption: "Launch" },
  { label: "Top Speed", value: 192, suffix: "mph", caption: "Verified" },
  { label: "Power", value: 631, suffix: "hp", caption: "5.2L V10" },
  { label: "Dry Weight", value: 2952, suffix: "lbs", caption: "Stripped" },
];

export function SpecTicker() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="relative w-full overflow-hidden bg-bg py-32 sm:py-48"
    >
      {/* Subtle accent grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-12">
        <div className="mb-16 flex flex-col gap-6 sm:mb-24">
          <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-10 bg-accent" />
            By the numbers
          </span>
          <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] uppercase leading-[0.9]">
            <span className="block">Track DNA.</span>
            <span className="block text-accent">Street License.</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-px overflow-hidden border-fg/10 sm:grid-cols-2 lg:grid-cols-4 lg:border-y">
          {SPECS.map((spec, i) => (
            <SpecCard key={spec.label} spec={spec} index={i} active={inView} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function SpecCard({
  spec,
  index,
  active,
}: {
  spec: Spec;
  index: number;
  active: boolean;
}) {
  const motionVal = useMotionValue(0);
  const nodeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const controls = animate(motionVal, spec.value, {
      duration: 1.8,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (!nodeRef.current) return;
        const formatted =
          spec.decimals != null
            ? latest.toFixed(spec.decimals)
            : Math.round(latest).toLocaleString();
        nodeRef.current.textContent = formatted;
      },
    });
    return () => controls.stop();
  }, [active, motionVal, spec.value, spec.decimals, index]);

  return (
    <li
      data-cursor="hover"
      className="group relative flex flex-col gap-3 border-fg/10 px-6 py-10 transition-colors hover:bg-accent/[0.04] sm:border-r sm:px-8 sm:py-14 lg:last:border-r-0"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/40">
        {spec.label}
      </span>
      <div className="flex items-baseline gap-2">
        <span
          ref={nodeRef}
          className="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight text-fg"
        >
          {spec.decimals != null ? "0.0" : "0"}
        </span>
        <span className="font-mono text-sm uppercase tracking-widest text-fg/50">
          {spec.suffix}
        </span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent/70">
        {spec.caption}
      </span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-700 group-hover:w-full" />
    </li>
  );
}
