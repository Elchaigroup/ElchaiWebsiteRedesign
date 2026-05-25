export default function Loading() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-brand-sky shadow-[0_0_10px_#18DEFF] animate-pulse" />
        <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/65 uppercase">
          Loading
        </span>
      </div>
    </main>
  );
}
