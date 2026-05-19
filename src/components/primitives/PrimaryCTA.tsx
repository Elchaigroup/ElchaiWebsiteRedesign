import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Primary CTA — design-system §8.3.
 * White pill, ink-on-white text, brand-cyan glow shadow, lift on hover.
 */
export function PrimaryCTA({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-3 h-[60px] px-8 rounded-full",
        "bg-white text-ink",
        "font-[var(--font-brand)] font-medium text-[15px] tracking-[0.04em]",
        "shadow-[0_30px_80px_-30px_rgba(24,222,255,0.55)]",
        "transition-transform duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-0.5",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-sky focus-visible:outline-offset-4",
        className
      )}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </Link>
  );
}
