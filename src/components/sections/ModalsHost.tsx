"use client";

/**
 * §20 — Modal host.
 * Hash-driven modals — any `<Link href="#whatsapp">` or `#consultation`
 * opens the corresponding modal. Closing replaces the hash without
 * scroll-jump.
 *
 * Forms are stubbed:
 *   • WhatsApp — TODO wire to WhatsApp Business API
 *   • Consultation — TODO wire to lead capture endpoint
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/modal";
import { modals } from "@/lib/content";

type ModalId = "whatsapp" | "consultation" | null;

function renderBold(copy: string) {
  const parts = copy.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="text-white font-medium">
          {part.slice(2, -2)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ModalsHost() {
  const [open, setOpen] = useState<ModalId>(null);

  useEffect(() => {
    function read() {
      const h = window.location.hash.slice(1).toLowerCase();
      if (h === "whatsapp" || h === "consultation") setOpen(h);
      else setOpen(null);
    }
    read();
    window.addEventListener("hashchange", read);

    // Next.js App Router's <Link> uses history.pushState for hash links,
    // which doesn't fire `hashchange`. Catch the click and re-check.
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a[href^='#']");
      if (link) setTimeout(read, 0);
    }
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("hashchange", read);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
  }, []);

  return (
    <>
      <Modal
        isOpen={open === "whatsapp"}
        onClose={close}
        title={modals.whatsapp.heading}
        type="blur"
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire to WhatsApp Business API
            close();
          }}
        >
          <div className="grid grid-cols-[120px_1fr] gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/50">
                Country
              </span>
              <select
                defaultValue={modals.whatsapp.defaultDial}
                className="h-11 rounded-lg bg-white/[0.04] border border-white/[0.10]
                           px-3 text-[14px] text-white focus:outline-none
                           focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/40"
              >
                <option value="+47">🇳🇴 +47</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+39">🇮🇹 +39</option>
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/50">
                WhatsApp number
              </span>
              <input
                type="tel"
                inputMode="tel"
                placeholder="Your number"
                className="h-11 rounded-lg bg-white/[0.04] border border-white/[0.10]
                           px-3 text-[14px] text-white placeholder:text-white/35
                           focus:outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/40"
                required
              />
            </label>
          </div>
          <button type="submit" className="cta cta--primary self-stretch justify-center">
            {modals.whatsapp.submit}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={open === "consultation"}
        onClose={close}
        type="blur"
        className="sm:max-w-2xl"
        ariaLabel="Schedule a consultation"
      >
        <div className="flex flex-col gap-5">
          <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-brand-sky">
            {modals.consultation.pretitle}
          </span>
          <h2 className="font-[var(--font-display)] font-bold tracking-[-0.02em] leading-[1.08] text-[clamp(22px,2.2vw,32px)]">
            {modals.consultation.heading}
          </h2>
          <p className="text-[14px] leading-[1.6] text-white/65">
            {modals.consultation.description}
          </p>

          <p className="text-[14px] leading-[1.65] text-white/65">
            {renderBold(modals.consultation.formHeading)}
          </p>

          <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: wire to lead capture endpoint
              close();
            }}
          >
            <input
              required
              placeholder="Name"
              className="h-11 rounded-lg bg-white/[0.04] border border-white/[0.10] px-3
                         text-[14px] text-white placeholder:text-white/35
                         focus:outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/40"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="h-11 rounded-lg bg-white/[0.04] border border-white/[0.10] px-3
                         text-[14px] text-white placeholder:text-white/35
                         focus:outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/40"
            />
            <textarea
              placeholder="Tell us about your project"
              rows={4}
              className="sm:col-span-2 rounded-lg bg-white/[0.04] border border-white/[0.10] px-3 py-2.5
                         text-[14px] text-white placeholder:text-white/35
                         focus:outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/40"
            />
            <button type="submit" className="cta cta--primary sm:col-span-2 justify-center">
              Send
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
          </form>

          <p className="text-[11px] text-white/40">
            {modals.consultation.confidentialityNote}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/[0.08]">
            <span className="font-[var(--font-mono)] text-[10px] uppercase tracking-[0.22em] text-white/45">
              Or reach us
            </span>
            <Link
              href={`mailto:${modals.consultation.email}`}
              className="text-[13px] text-white/80 hover:text-brand-sky transition-colors"
            >
              {modals.consultation.email}
            </Link>
            {modals.consultation.quickActions.map((qa) => (
              <Link
                key={qa.label}
                href={qa.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cta cta--ghost h-9 text-[12px]"
              >
                {qa.label}
              </Link>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
