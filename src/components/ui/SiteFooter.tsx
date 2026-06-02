import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="relative w-full border-t border-fg/10 bg-bg">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 py-16 sm:px-12 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/brand/logo-shield-transparent.png"
              alt=""
              width={44}
              height={50}
              className="h-11 w-auto"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-fg/55">
              Cheche Exotics
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg/55">
            A luxury mobility brand delivering premium exotic vehicle experiences — designed for individuals who value prestige, comfort, and excellence.
          </p>
          <p className="font-display text-[13px] uppercase tracking-[0.32em] text-accent">
            Experience Excellence
          </p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg/55">
          <span className="text-fg/35">Explore</span>
          <Link href="/fleet" className="hover:text-accent">Fleet</Link>
          <Link href="/loyalty" className="hover:text-accent">Loyalty</Link>
          <Link href="/about" className="hover:text-accent">About</Link>
          <Link href="/contact" className="hover:text-accent">Contact</Link>
        </div>
        <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg/55">
          <span className="text-fg/35">Reach</span>
          <a href="mailto:concierge@chechexotics.com" className="hover:text-accent">
            concierge@chechexotics.com
          </a>
          <span>Atlanta · Worldwide</span>
          <span>24 / 7 Concierge</span>
        </div>
      </div>
      <div className="border-t border-fg/10 px-6 py-6 sm:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.32em] text-fg/35 sm:flex-row sm:items-center">
          <span>© 2026 Cheche Exotics · All rights reserved</span>
          <span>Independent luxury mobility brand · All vehicle marks property of their respective owners.</span>
        </div>
      </div>
    </footer>
  );
}
