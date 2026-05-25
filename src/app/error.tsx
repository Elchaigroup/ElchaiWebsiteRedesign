"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to console; replace with Sentry/observability sink in production.
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6">
      <div className="section-box mx-auto max-w-[720px] px-8 py-16 w-full text-center">
        <div className="inline-flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-brand-sky shadow-[0_0_10px_#18DEFF]" />
          <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/65 uppercase">
            500 · Something went wrong
          </span>
        </div>

        <h1 className="mt-8 font-[var(--font-display)] font-bold leading-[1.08] tracking-[-0.025em] text-[clamp(28px,4vw,56px)]">
          We hit an unexpected error.
        </h1>

        <p className="mt-6 text-[15px] leading-[1.65] text-white/65 mx-auto max-w-[520px]">
          Our team has been notified. Try again, or head back to the homepage.
          If the issue persists, reach out via consultation and we&rsquo;ll
          help directly.
        </p>

        <div className="mt-10 flex flex-wrap justify-center items-center gap-3">
          <button onClick={reset} className="cta cta--primary" type="button">
            Try again
          </button>
          <Link href="/" className="cta cta--ghost">
            Back to home
          </Link>
        </div>

        {error.digest ? (
          <p className="mt-8 font-[var(--font-mono)] text-[10px] tracking-[0.18em] text-white/30 uppercase">
            Ref · {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
