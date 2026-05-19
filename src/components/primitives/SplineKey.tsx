"use client";

/**
 * SplineKey — embeds a Spline 3D scene as the Hero centerpiece via iframe.
 *
 * Uses the my.spline.design viewer URL directly (simpler than the runtime
 * package — the iframe handles loading, materials, and interaction).
 *
 * Positioned absolute inset-0 inside the Hero's sticky frame, z-index 0,
 * so the Hero's text content (at z-10) sits above and stays clickable.
 * Lazy-loaded to keep first paint fast.
 */

const SPLINE_SCENE_URL = "https://my.spline.design/untitled-De0VHFd4GJSKylPiW9pDewwG/";

export function SplineKey() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <iframe
        src={SPLINE_SCENE_URL}
        title="Elchai key — 3D scene"
        loading="lazy"
        className="absolute inset-0 w-full h-full pointer-events-auto"
        style={{ border: 0, background: "transparent" }}
      />
    </div>
  );
}
