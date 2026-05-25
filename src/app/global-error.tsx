"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to console; Sentry (if wired) will also pick this up via its
    // global handlers.
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060a",
          color: "#e8ecf3",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, system-ui, sans-serif",
          padding: "32px",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 600, margin: "0 0 12px" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: 15, color: "#9aa3b2", margin: "0 0 24px" }}>
            We hit an unexpected error. The team has been notified — please try
            again, or refresh the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "12px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "linear-gradient(135deg,#18DEFF,#7B6CFF)",
              color: "#0a0c12",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
