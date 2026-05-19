"use client";

import { useEffect, useState } from "react";

/**
 * Live Dubai (GMT+4) clock pill, ticks once per second on the client.
 * Used in the nav as a presence marker; can be reused in modals/footers.
 */
export function HQTimePill() {
  const [time, setTime] = useState<string>("--:--");

  useEffect(() => {
    function update() {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const dubai = new Date(utc + 4 * 3600000);
      const hh = String(dubai.getHours()).padStart(2, "0");
      const mm = String(dubai.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="hidden md:inline-flex items-center gap-2 h-9 px-3 rounded-full
                 font-[var(--font-brand)] text-[11px] text-white/55
                 border border-white/[0.10] bg-white/[0.02]"
      aria-label="Time in Dubai headquarters"
    >
      <span className="relative inline-block w-1.5 h-1.5 rounded-full bg-brand-sky shadow-[0_0_8px_#18DEFF]">
        <span className="absolute inset-[-3px] rounded-full bg-brand-sky/30 animate-pulse-dot" />
      </span>
      Dubai · <span className="tabular-nums">{time}</span>
    </span>
  );
}
