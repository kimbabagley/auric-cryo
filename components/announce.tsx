"use client";

import { useEffect, useState } from "react";

const messages = [
  "Demo storefront: nothing ships and no payment is taken.",
  "For laboratory research use only.",
  "Every price on this site is a demo price.",
  "COA is not included on this demo.",
];

export function Announce() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % messages.length), 3800);
    return () => window.clearInterval(t);
  }, [paused]);

  return (
    <div
      className="announce"
      role="region"
      aria-label="Store notes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="announce-track" aria-live="off">
        {messages.map((m, n) => (
          <p key={m} className={n === i ? "is-on" : ""} aria-hidden={n !== i}>
            {m}
          </p>
        ))}
      </div>
    </div>
  );
}
