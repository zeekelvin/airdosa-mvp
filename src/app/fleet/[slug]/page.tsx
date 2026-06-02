import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { PageHero } from "@/components/ui/PageHero";
import { getVehicleBySlug, getFleetSlugs } from "@/lib/fleet";

export async function generateStaticParams() {
  return getFleetSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getVehicleBySlug(slug);
  if (!car) return { title: "Vehicle · Cheche Exotics" };
  return {
    title: `${car.brand} ${car.model} · Cheche Exotics`,
    description: car.description,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getVehicleBySlug(slug);
  if (!car) notFound();

  return (
    <main className="relative z-[1] min-h-screen bg-bg text-fg">
      <PageHero
        eyebrow={`${car.category} · ${car.brand}`}
        title={car.model}
        subtitle={car.tagline}
      />
      <section className="mx-auto max-w-[1600px] px-6 pb-32 pt-12 sm:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Visual */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-fg/10 bg-muted/60">
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Detail */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
                Specifications
              </span>
              <ul className="grid grid-cols-3 gap-4 border-t border-fg/10 pt-5">
                {car.specs.map((s) => (
                  <li key={s.label} className="flex flex-col gap-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/45">
                      {s.label}
                    </span>
                    <span className="font-display text-2xl tracking-tight">
                      {s.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
                About
              </span>
              <p className="border-t border-fg/10 pt-5 text-base leading-relaxed text-fg/70 sm:text-lg">
                {car.description}
              </p>
            </div>

            {car.baseDayRate ? (
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
                  Rate
                </span>
                <div className="flex items-baseline justify-between border-t border-fg/10 pt-5">
                  <div>
                    <span className="font-display text-3xl">
                      ${car.baseDayRate.toLocaleString()}
                    </span>
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.32em] text-fg/45">
                      / day
                    </span>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/45">
                    Members receive preferred pricing
                  </span>
                </div>
              </div>
            ) : null}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href={car.reserveUrl ?? "/contact"}
                data-cursor="hover"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:bg-accent/90"
              >
                Reserve Your Experience →
              </Link>
              <Link
                href="/loyalty"
                data-cursor="hover"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-fg/15 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                Unlock member rate
              </Link>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
