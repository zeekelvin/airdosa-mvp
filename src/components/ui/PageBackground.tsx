"use client";

import { CinematicAtmosphere } from "@/components/ui/CinematicAtmosphere";

/**
 * Fixed full-viewport atmospheric backdrop.
 * Sits behind every section. Particles, fog, vignette breath persist as
 * the user scrolls — the whole page feels like one continuous film.
 */
export function PageBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      <CinematicAtmosphere intensity={0.8} />
    </div>
  );
}
