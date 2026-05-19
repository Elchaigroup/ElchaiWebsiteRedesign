/**
 * SectionMarker — small mono "01 / 14" label + thin hairline divider above
 * each homepage section's content. Provides editorial structure without
 * needing card chrome around the section.
 *
 * Used at the top of each major homepage section's inner container, right
 * before the eyebrow / heading.
 */

interface SectionMarkerProps {
  index: number;
  total?: number;
}

export function SectionMarker({ index, total = 14 }: SectionMarkerProps) {
  const num = String(index).padStart(2, "0");
  const totalNum = String(total).padStart(2, "0");
  return (
    <div className="mb-9 flex items-center gap-5">
      <span className="font-[var(--font-mono)] text-[10px] tracking-[0.34em] uppercase tabular-nums">
        <span className="text-white/85">{num}</span>
        <span className="text-white/20 mx-1.5">/</span>
        <span className="text-white/35">{totalNum}</span>
      </span>
      <span aria-hidden="true" className="block h-px flex-1 bg-white/[0.06]" />
    </div>
  );
}
