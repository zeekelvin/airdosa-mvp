"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

export function RotationScrub() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const inView = useInView(sectionRef, { margin: "-10%" });

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
  const degreeOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Detect touch on mount
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Video readiness — defensive: check on mount + several events.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const setReadyIfAble = () => {
      if (isFinite(v.duration) && v.duration > 0) {
        setReady(true);
      }
    };
    // Cache hit may have already loaded metadata before listener attached
    setReadyIfAble();
    v.addEventListener("loadedmetadata", setReadyIfAble);
    v.addEventListener("durationchange", setReadyIfAble);
    v.addEventListener("canplay", setReadyIfAble);
    const onError = () => setHasVideo(false);
    v.addEventListener("error", onError);
    return () => {
      v.removeEventListener("loadedmetadata", setReadyIfAble);
      v.removeEventListener("durationchange", setReadyIfAble);
      v.removeEventListener("canplay", setReadyIfAble);
      v.removeEventListener("error", onError);
    };
  }, []);

  // DESKTOP: scroll-scrub. On every scroll change, set currentTime.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isTouch) return;
    const v = videoRef.current;
    if (!v || !ready || !isFinite(v.duration) || v.duration === 0) return;
    const target = Math.max(0, Math.min(v.duration - 0.05, latest * v.duration));
    if (Math.abs(v.currentTime - target) > 0.03) {
      v.currentTime = target;
    }
  });

  // DESKTOP: ensure paused once ready so scrub controls position
  useEffect(() => {
    if (isTouch) return;
    const v = videoRef.current;
    if (!v || !ready) return;
    v.pause();
  }, [isTouch, ready]);

  // MOBILE/TOUCH: auto-play loop while section is in viewport
  useEffect(() => {
    if (!isTouch || !hasVideo) return;
    const v = videoRef.current;
    if (!v) return;
    if (inView) {
      v.play().catch(() => {
        /* autoplay may be blocked — first scroll/touch will retry */
      });
    } else {
      v.pause();
    }
  }, [isTouch, inView, hasVideo]);

  // MOBILE: first user interaction unblocks autoplay if it was blocked.
  useEffect(() => {
    if (!isTouch) return;
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      if (inView) v.play().catch(() => {});
    };
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    window.addEventListener("scroll", tryPlay, { once: true, passive: true });
    return () => {
      window.removeEventListener("touchstart", tryPlay);
      window.removeEventListener("scroll", tryPlay);
    };
  }, [isTouch, inView]);

  return (
    <section
      ref={sectionRef}
      id="rotate"
      className="relative h-[200vh] w-full bg-bg sm:h-[180vh]"
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden">
        {/* Rotation video — mobile: contain (full car, atmosphere fills letterbox)
            Desktop: cover (full-bleed cinematic) */}
        <video
          ref={videoRef}
          src="/assets/rotation.mp4"
          muted
          // On touch we loop the playback; on desktop we scrub manually
          loop={isTouch}
          playsInline
          preload="auto"
          autoPlay={isTouch}
          poster="/assets/hero-still.png"
          className="absolute inset-0 h-full w-full object-contain object-center sm:object-cover"
        />

        {/* Cinematic vignette — softened */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15" />

        {/* Side progress bar */}
        <div className="absolute right-6 top-1/2 z-10 -translate-y-1/2 sm:right-12">
          <div className="flex flex-col items-end gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/40">
              Orbit
            </span>
            <div className="relative h-40 w-px bg-fg/20 sm:h-64">
              <motion.div
                style={{ height: fillHeight }}
                className="absolute left-0 top-0 w-px bg-accent"
              />
            </div>
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent"
              style={{ opacity: degreeOpacity }}
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
          <span className="mb-4 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
            <span className="h-px w-10 bg-accent" />
            Every angle · Every detail
          </span>
          <h2 className="font-display text-[clamp(2.5rem,10vw,9rem)] uppercase leading-[0.9]">
            <span className="block">Engineered</span>
            <span className="block text-accent">Without Compromise</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm text-fg/70 sm:text-base">
            {isTouch
              ? "The car rotates while you watch. Every weld, every vent, every line carved for one purpose — performance."
              : "Scroll to rotate. Every weld, every vent, every line carved for one purpose — performance."}
          </p>
        </motion.div>

        {!hasVideo && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-bg/80 text-fg/40">
            <span className="font-mono text-xs uppercase tracking-[0.32em]">
              Rotation loading…
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
