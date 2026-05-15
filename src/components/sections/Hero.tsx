"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CinematicAtmosphere } from "@/components/ui/CinematicAtmosphere";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll-driven cinematic moves
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  // Mouse-driven cinematic parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.6 });

  const carX = useTransform(sx, [-1, 1], [-12, 12]);
  const carY = useTransform(sy, [-1, 1], [-8, 8]);
  const lightX = useTransform(sx, [-1, 1], [-80, 80]);
  const lightY = useTransform(sy, [-1, 1], [-40, 40]);

  const [driveReady, setDriveReady] = useState(false);
  const [loopReady, setLoopReady] = useState(false);
  const [driveExists, setDriveExists] = useState(true);

  useEffect(() => {
    // Skip cursor parallax on touch — it interferes with scroll and feels janky
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mx.set((e.clientX / w) * 2 - 1);
      my.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[700px] w-full overflow-hidden bg-bg"
    >
      {/* Layer -1: atmospheric base */}
      <CinematicAtmosphere intensity={1} />

      {/* Layer 0: car (HERO subject — driving video preferred, loop fallback, still fallback) */}
      <motion.div
        className="absolute inset-0 z-[1] will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        <motion.div
          className="absolute inset-[-4%] will-change-transform"
          style={{ x: carX, y: carY }}
        >
          {/* Tier 3: still poster (always there) */}
          <Image
            src="/assets/hero-still.png"
            alt="Lamborghini Huracán STO"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ${
              loopReady || driveReady ? "opacity-0" : "opacity-100"
            }`}
          />
          {/* Tier 2: ambient loop */}
          <video
            src="/assets/hero-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/hero-still.png"
            onCanPlay={() => setLoopReady(true)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
              driveReady ? "opacity-0" : loopReady ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Tier 1: driving footage (when present) */}
          {driveExists && (
            <video
              src="/assets/hero-drive.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onCanPlay={() => setDriveReady(true)}
              onError={() => setDriveExists(false)}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
                driveReady ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </motion.div>

        {/* Cinematic grade */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/65" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/25" />
        </motion.div>

        {/* Cursor-tracked warm light */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl mix-blend-screen"
          style={{
            x: lightX,
            y: lightY,
            background:
              "radial-gradient(closest-side, rgba(245,200,80,0.55), transparent 75%)",
          }}
        />
      </motion.div>

      {/* Layer 2: refined cinematic title card — TOP CENTER, never blocking the car */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="pointer-events-none absolute inset-x-0 top-8 z-[10] flex flex-col items-center px-6 text-center sm:top-14"
      >
        <motion.span
          initial={{ opacity: 0, y: -8, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.42em" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-[10px] uppercase text-fg/75 sm:text-[11px]"
          style={{ letterSpacing: "0.42em" }}
        >
          AIRDOSA
        </motion.span>
        <motion.div
          aria-hidden
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 h-px bg-accent/70"
        />
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 font-serif text-xs italic text-fg/60 sm:text-sm"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          presents
        </motion.span>
        <motion.div
          aria-hidden
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1.2, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 h-px bg-accent/70"
        />
        <motion.span
          initial={{ opacity: 0, y: 12, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.32em" }}
          transition={{ duration: 1.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-3xl uppercase text-fg sm:text-4xl"
          style={{ letterSpacing: "0.32em" }}
        >
          MVP
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="mt-4 max-w-md text-center font-mono text-[10px] uppercase tracking-[0.32em] text-fg/45"
        >
          Luxury · Performance · Concierge Rental
        </motion.span>
      </motion.div>

      {/* Layer 3: nav (desktop only — mobile uses MobileNav overlay) */}
      <header className="pointer-events-none absolute inset-x-0 top-10 z-[11] hidden items-start justify-between px-6 sm:top-14 sm:px-12 md:flex">
        <span
          className="pointer-events-auto font-mono text-[10px] uppercase tracking-[0.42em] text-fg/55"
          data-cursor="hover"
        >
          MIA · 24/7
        </span>
        <nav className="pointer-events-auto flex gap-8 pt-1 text-[10px] font-medium uppercase tracking-[0.32em] text-fg/60">
          <a
            href="#fleet"
            data-cursor="hover"
            className="transition-colors hover:text-accent"
          >
            Fleet
          </a>
          <a
            href="#rotate"
            data-cursor="hover"
            className="transition-colors hover:text-accent"
          >
            Showcase
          </a>
          <a
            href="#reserve"
            data-cursor="hover"
            className="transition-colors hover:text-accent"
          >
            Reserve
          </a>
        </nav>
      </header>

      {/* Layer 4: bottom tagline + CTAs */}
      <motion.div
        style={{ y: subY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-12 z-[10] px-6 sm:bottom-16 sm:px-12"
      >
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
              <span className="h-px w-10 bg-accent" />
              Drive what doesn't exist
            </span>
            <p className="mt-3 font-display text-2xl uppercase leading-[1] tracking-tight text-fg/95 sm:text-3xl">
              Six machines.<br />
              <span className="text-accent">Zero compromise.</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MagneticButton className="bg-accent text-black hover:bg-accent/90">
              Reserve a Drive
            </MagneticButton>
            <MagneticButton className="hairline border text-fg hover:border-accent hover:text-accent">
              View Fleet
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-4 left-1/2 z-[10] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.42em] text-fg/40"
        animate={{ y: [0, 6, 0], opacity: [0.3, 0.85, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
