"use client";

import { useEffect, useState } from "react";

const KEY = "auric-cryo-age";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(KEY) !== "21") {
      setOpen(true);
    }
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div className="gate">
      <p className="wordmark">Auric Cryo</p>
      <p>Confirm you are 21 or older to view this demo catalog.</p>
      <button
        type="button"
        onClick={() => {
          window.sessionStorage.setItem(KEY, "21");
          setOpen(false);
        }}
      >
        I am 21 or older
      </button>
    </div>
  );
}
