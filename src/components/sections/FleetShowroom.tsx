"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";

type FleetVehicle = {
  slug: string;
  brand: string;
  model: string;
  tagline: string;
  image: string;
  video: string;
  span: "wide" | "tall" | "square" | "feature";
  specs: { label: string; value: string }[];
};

const FLEET: FleetVehicle[] = [
  {
    slug: "aventador-svj",
    brand: "Lamborghini",
    model: "Aventador SVJ",
    tagline: "The last analogue V12.",
    image: "/assets/fleet-aventador.png",
    video: "/assets/fleet-aventador.mp4",
    span: "feature",
    specs: [
      { label: "Power", value: "759 hp" },
      { label: "0–60", value: "2.8s" },
      { label: "Top", value: "217 mph" },
    ],
  },
  {
    slug: "sf90",
    brand: "Ferrari",
    model: "SF90 Stradale",
    tagline: "Maranello's first 1,000-horse hybrid.",
    image: "/assets/fleet-sf90.png",
    video: "/assets/fleet-sf90.mp4",
    span: "tall",
    specs: [
      { label: "Power", value: "986 hp" },
      { label: "0–60", value: "2.5s" },
      { label: "Top", value: "211 mph" },
    ],
  },
  {
    slug: "765lt",
    brand: "McLaren",
    model: "765LT",
    tagline: "Surgical. Weightless. Unhinged.",
    image: "/assets/fleet-mclaren.png",
    video: "/assets/fleet-mclaren.mp4",
    span: "wide",
    specs: [
      { label: "Power", value: "755 hp" },
      { label: "0–60", value: "2.7s" },
      { label: "Top", value: "205 mph" },
    ],
  },
  {
    slug: "cullinan-bb",
    brand: "Rolls-Royce",
    model: "Cullinan Black Badge",
    tagline: "Magic carpet, midnight edition.",
    image: "/assets/fleet-cullinan.png",
    video: "/assets/fleet-cullinan.mp4",
    span: "square",
    specs: [
      { label: "Power", value: "593 hp" },
      { label: "0–60", value: "4.9s" },
      { label: "Top", value: "155 mph" },
    ],
  },
  {
    slug: "g800-brabus",
    brand: "Mercedes-AMG",
    model: "G 63 Brabus 800",
    tagline: "Brutalist luxury. Tactical comfort.",
    image: "/assets/fleet-gwagon.png",
    video: "/assets/fleet-gwagon.mp4",
    span: "wide",
    specs: [
      { label: "Power", value: "789 hp" },
      { label: "0–60", value: "4.1s" },
      { label: "Top", value: "149 mph" },
    ],
  },
];

export function FleetShowroom() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.85, 1],
    [0, 1, 1, 0.4],
  );

  return (
    <section
      ref={sectionRef}
      id="fleet"
      className="relative w-full overflow-hidden border-t border-fg/10 bg-bg py-24 sm:py-32"
      aria-label="Luxury Fleet Showroom"
    >
      {/* Header */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="mx-auto mb-12 w-full max-w-[1600px] px-6 sm:mb-20 sm:px-12"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
              <span className="h-px w-12 bg-accent" />
              The Fleet · 05 Machines
            </span>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,8vw,7rem)] uppercase leading-[0.9]">
              <span className="block">Curated.</span>
              <span className="block text-accent">Ready.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-fg/60 sm:text-base">
            Hover any machine to bring it to life. Reserve a drive — daily,
            weekly, or for the moment that matters.
          </p>
        </div>
      </motion.div>

      {/* Showroom bento grid */}
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-3 px-6 sm:grid-cols-6 sm:gap-4 sm:px-12">
        {FLEET.map((car, i) => (
          <FleetTile key={car.slug} car={car} index={i} />
        ))}
      </div>
    </section>
  );
}

function FleetTile({ car, index }: { car: FleetVehicle; index: number }) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoExists, setVideoExists] = useState(true);
  const tileRef = useRef<HTMLDivElement | null>(null);
  const inViewActive = useInView(tileRef, { margin: "-20%" });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  // Bento span classes
  const spanClass = {
    feature: "sm:col-span-6 sm:row-span-2 aspect-[16/9] sm:aspect-[16/7]",
    wide: "sm:col-span-4 aspect-[16/9]",
    tall: "sm:col-span-2 sm:row-span-2 aspect-[4/5] sm:aspect-[3/5]",
    square: "sm:col-span-2 aspect-[16/10] sm:aspect-square",
  }[car.span];

  // Play state: desktop = hover, mobile = in viewport
  const shouldPlay = isTouch ? inViewActive : hover;
  const shouldRevealSpecs = hover || (isTouch && inViewActive);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoExists) return;
    if (shouldPlay) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [shouldPlay, videoExists]);

  const onEnter = () => setHover(true);
  const onLeave = () => setHover(false);

  return (
    <motion.div
      ref={tileRef}
      data-cursor="hover"
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-sm border border-fg/8 bg-muted",
        spanClass,
      )}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: imgScale, y: imgY }}
      >
        <Image
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className={`object-cover object-center transition-all duration-700 ${
            shouldPlay ? "scale-110 opacity-30" : "scale-100 opacity-100"
          }`}
        />
        {videoExists && (
          <video
            ref={videoRef}
            src={car.video}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoExists(false)}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              shouldPlay && videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </motion.div>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30" />

      {/* Headlight ember when active */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-32 w-32 rounded-full blur-3xl mix-blend-screen"
        style={{
          left: "30%",
          top: "55%",
          background:
            "radial-gradient(closest-side, rgba(255,238,170,0.6), transparent 70%)",
        }}
        animate={{
          opacity: shouldPlay ? [0.4, 0.95, 0.6, 1, 0.4] : 0,
          scale: shouldPlay ? [0.9, 1.15, 1.0, 1.2, 0.9] : 0.8,
        }}
        transition={{
          duration: 3.6,
          repeat: shouldPlay ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-fg/55 sm:text-[10px]">
            {String(index + 1).padStart(2, "0")} · {car.brand}
          </span>
          <motion.span
            animate={{ scale: shouldPlay ? 1.2 : 1 }}
            className="h-2 w-2 rounded-full bg-accent"
          />
        </div>
        <div>
          <h3 className="font-display text-2xl uppercase leading-[0.95] tracking-tight sm:text-3xl md:text-4xl">
            {car.model}
          </h3>
          <p className="mt-2 text-xs text-fg/55 sm:text-sm">{car.tagline}</p>
          <motion.div
            animate={{
              height: shouldRevealSpecs ? "auto" : 0,
              opacity: shouldRevealSpecs ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-4 flex gap-6">
              {car.specs.map((s) => (
                <li key={s.label} className="flex flex-col gap-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-fg/40">
                    {s.label}
                  </span>
                  <span className="font-display text-lg leading-none">
                    {s.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <MagneticButton className="bg-accent px-5 py-2 text-xs text-black hover:bg-accent/90">
                Reserve →
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Accent corner line */}
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-accent"
        animate={{ width: shouldPlay ? "100%" : "0%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
