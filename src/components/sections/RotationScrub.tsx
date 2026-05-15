"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

export function RotationScrub() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Vertical progress bar fill
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Headline drift
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 1],
    [0, 1, 1, 0.4],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const v = videoRef.current;
    if (!v || !ready || !isFinite(v.duration) || v.duration === 0) return;
    const target = Math.max(0, Math.min(v.duration - 0.05, latest * v.duration));
    // Only seek when meaningfully different to avoid thrashing
    if (Math.abs(v.currentTime - target) > 0.03) {
      v.currentTime = target;
    }
  });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      if (isFinite(v.duration) && v.duration > 0) {
        v.pause();
        setReady(true);
      }
    };
    const onError = () => setHasVideo(false);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("error", onError);
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("error", onError);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="rotate"
      className="relative h-[280vh] w-full bg-bg"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Rotation video — scrubbed by scroll */}
        <video
          ref={videoRef}
          src="/assets/rotation.mp4"
          muted
          playsInline
          preload="auto"
          poster="/assets/hero-still.png"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />

        {/* Side progress bar */}
        <div className="absolute right-8 top-1/2 z-10 -translate-y-1/2 sm:right-12">
          <div className="flex flex-col items-end gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/40">
              Orbit
            </span>
            <div className="relative h-48 w-px bg-fg/20 sm:h-64">
              <motion.div
                style={{ height: fillHeight }}
                className="absolute left-0 top-0 w-px bg-accent"
              />
            </div>
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent"
              style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
            >
              360°
            </motion.span>
          </div>
        </div>

        {/* Headline */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-[1600px] flex-col justify-end px-6 pb-12 sm:px-12 sm:pb-20"
        >
          <span className="mb-5 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-10 bg-accent" />
            Every angle, every detail
          </span>
          <h2 className="font-display text-[clamp(3rem,10vw,9rem)] uppercase leading-[0.85]">
            <span className="block">Engineered</span>
            <span className="block text-accent">Without Compromise</span>
          </h2>
          <p className="mt-6 max-w-xl text-base text-fg/70 sm:text-lg">
            Scroll to rotate. Every weld, every vent, every line carved for one
            purpose — performance.
          </p>
        </motion.div>

        {!hasVideo && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg/80 text-fg/40">
            <span className="font-mono text-xs uppercase tracking-[0.32em]">
              Rotation rendering…
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
