import { cn } from "@/lib/cn";

/**
 * Numbered bullet list (left-rail) — design-system §8.6.
 * Mono numbers in brand-cyan; Inter 15px body; left hairline border.
 * Used for hero tenets and any 3–6-item "tenets" presentation.
 */
export function NumberedList({
  items,
  className,
}: {
  items: ReadonlyArray<string>;
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "border-l border-white/10 pl-5 grid gap-2.5 list-none p-0 m-0",
        className
      )}
    >
      {items.map((text, i) => (
        <li
          key={i}
          className="text-[15px] leading-[1.5] text-white/82 grid grid-cols-[28px_1fr] gap-3 items-start"
        >
          <span
            className="font-[var(--font-brand)] text-[10px] tracking-[0.18em]
                       text-brand-sky pt-[3px] tabular-nums"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>{text}</span>
        </li>
      ))}
    </ol>
  );
}
