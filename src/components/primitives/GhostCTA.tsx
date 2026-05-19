import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Ghost CTA — design-system §8.4.
 * Glass pill with hairline border, cyan text + border on hover.
 */
export function GhostCTA({
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
        "inline-flex items-center gap-3 h-[60px] px-8 rounded-full",
        "glass glass-edge text-white/85",
        "font-[var(--font-brand)] font-medium text-[15px] tracking-[0.04em]",
        "transition-colors duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:text-brand-sky hover:border-brand-sky",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-sky focus-visible:outline-offset-4",
        className
      )}
    >
      {children}
    </Link>
  );
}
