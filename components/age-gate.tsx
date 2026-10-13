"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "auric-cryo-age";

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [left, setLeft] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ok = false;
    try {
      ok = window.sessionStorage.getItem(KEY) === "21";
    } catch {}
    if (!ok) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("no-scroll");
    btn.current?.focus();
    return () => document.documentElement.classList.remove("no-scroll");
  }, [open]);

  if (!open) return null;

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title" aria-describedby="gate-desc">
      <div className="gate-card">
        <p className="gate-brand">Auric Cryo</p>
        <h2 id="gate-title">Confirm your age to browse</h2>
        <p id="gate-desc">
          This is a demo catalog of research peptides. You must be 21 or older to view it.
        </p>
        <ul className="gate-list">
          <li>Products are for laboratory research only.</li>
          <li>This demo takes no orders and no payment.</li>
        </ul>
        {left ? (
          <p className="gate-left" role="status">
            You chose to leave. Close this tab, or confirm below if you pressed it by mistake.
          </p>
        ) : null}
        <div className="gate-actions">
          <button
            ref={btn}
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              try {
                window.sessionStorage.setItem(KEY, "21");
              } catch {}
              setOpen(false);
            }}
          >
            I am 21 or older
          </button>
          <button type="button" className="btn btn-ghost btn-block" onClick={() => setLeft(true)}>
            I am under 21
          </button>
        </div>
      </div>
    </div>
  );
}
