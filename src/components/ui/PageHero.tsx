export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative w-full overflow-hidden border-b border-fg/10 px-6 pb-16 pt-40 sm:px-12 sm:pt-48">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6">
        <span className="inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.42em] text-accent">
          <span className="h-px w-10 bg-accent" />
          {eyebrow}
        </span>
        <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] uppercase leading-[0.95] tracking-[-0.01em]">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-2xl text-base text-fg/65 sm:text-lg">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}
