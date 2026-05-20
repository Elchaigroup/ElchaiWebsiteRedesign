"use client";

import { useEffect, useRef } from "react";

type Symbol = { proName: string; title: string };

const SYMBOLS: Symbol[] = [
  { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
  { proName: "FOREXCOM:NSXUSD", title: "US 100" },
  { proName: "TVC:DXY", title: "Dollar Index" },
  { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
  { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
  { proName: "FX_IDC:EURUSD", title: "EUR/USD" },
  { proName: "TVC:GOLD", title: "Gold" },
];

const CONFIG = JSON.stringify({
  symbols: SYMBOLS,
  showSymbolLogo: true,
  isTransparent: true,
  displayMode: "adaptive",
  colorTheme: "dark",
  locale: "en",
});

export function TickerTape() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    while (host.firstChild) host.removeChild(host.firstChild);

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    host.appendChild(widget);

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.type = "text/javascript";
    script.text = CONFIG;
    host.appendChild(script);

    return () => {
      while (host.firstChild) host.removeChild(host.firstChild);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="tradingview-widget-container w-full border-y border-white/5 bg-black/40 backdrop-blur-sm"
      ref={hostRef}
    />
  );
}
