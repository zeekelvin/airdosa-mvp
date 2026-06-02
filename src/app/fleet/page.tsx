import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { FLEET } from "@/lib/fleet";

export const metadata: Metadata = {
  title: "Fleet · Cheche Exotics",
  description:
    "Explore the Cheche Exotics fleet — a curated collection of hypercars, luxury SUVs, and grand-touring machines available for concierge rental.",
};

export default function FleetPage() {
  return (
    <main className="relative z-[1] min-h-screen bg-bg text-fg">
      <PageHero
        eyebrow={`Inventory · 0${FLEET.length} Machines`}
        title="The Fleet"
        subtitle="A curated collection. Each vehicle hand-picked, fully insured, and concierge-delivered. Reserve a day, a week, or the moment that matters."
      />
      <section className="mx-auto max-w-[1600px] px-6 pb-32 pt-12 sm:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FLEET.map((car, i) => (
            <Link
              key={car.slug}
              href={`/fleet/${car.slug}`}
              data-cursor="hover"
              className="group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-sm border border-fg/10 bg-muted/60 p-6 transition-colors hover:border-accent/40"
            >
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover object-center opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="relative flex items-start justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-fg/65">
                  CE / {String(i + 1).padStart(2, "0")} · {car.brand}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
                  {car.category}
                </span>
              </div>
              <div className="relative flex flex-col gap-3">
                <h3 className="font-display text-2xl uppercase leading-[0.95] tracking-[0.02em] sm:text-3xl">
                  {car.model}
                </h3>
                <p className="max-w-xs text-sm text-fg/55">{car.tagline}</p>
                <div className="mt-3 flex items-end justify-between">
                  <ul className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/55">
                    {car.specs.slice(0, 2).map((s) => (
                      <li key={s.label} className="flex flex-col">
                        <span className="text-fg/35">{s.label}</span>
                        <span className="text-fg">{s.value}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
                    Reserve →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
