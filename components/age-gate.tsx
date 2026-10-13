"use client";

import { useEffect, useRef } from "react";

export function AgeGate() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (document.documentElement.dataset.age === "ok") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    buttonRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function confirmAge() {
    try {
      sessionStorage.setItem("auric-cryo-age", "21");
    } catch {
      /* the gate still closes for this view */
    }
    document.documentElement.dataset.age = "ok";
    document.body.style.overflow = "";
  }

  return (
    <div className="age-gate" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="age-dialog">
        <h2 id="age-title">Adults 21 and older</h2>
        <p>This catalog is for adults 21 and older.</p>
        <button ref={buttonRef} type="button" className="btn" onClick={confirmAge}>
          I am 21 or older
        </button>
      </div>
    </div>
  );
}
