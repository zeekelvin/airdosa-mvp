"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/fleet", label: "Fleet" },
  { href: "/loyalty", label: "Loyalty" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] hidden md:block">
      <div className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between px-12 py-4">
        <Link
          href="/"
          className="group flex items-center"
          aria-label="Cheche Exotics — home"
          data-cursor="hover"
        >
          <Image
            src="/assets/brand/logo-shield-transparent.png"
            alt="Cheche Exotics"
            width={200}
            height={228}
            priority
            quality={100}
            sizes="80px"
            className="h-20 w-auto drop-shadow-[0_2px_12px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>

        <nav className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="hover"
                className={[
                  "rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.32em] transition-colors",
                  active ? "text-accent" : "text-fg/55 hover:text-fg",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/loyalty"
            data-cursor="hover"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-accent/90"
          >
            Reserve Your Experience →
          </Link>
        </nav>
      </div>
    </header>
  );
}
