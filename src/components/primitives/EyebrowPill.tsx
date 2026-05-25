import { cn } from "@/lib/cn";

/**
 * Eyebrow pill — design-system §8.2.
 * Glass + glass-edge, brand-cyan live dot, Montserrat-mono caps label.
 */
export function EyebrowPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 ps-2 pe-4 py-1.5 rounded-full",
        "glass glass-edge",
        "font-[var(--font-brand)] text-[11px] uppercase tracking-[0.18em] text-white/70",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand-sky opacity-75 animate-pulse-dot" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-sky shadow-[0_0_12px_#18DEFF]" />
      </span>
      {children}
    </span>
  );
}
