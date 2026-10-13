"use client";

import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import { Icon } from "./icons";

export function QuickAdd({ sku, name }: { sku: string; name: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setDone(false), 1400);
    return () => window.clearTimeout(t);
  }, [done]);

  return (
    <button
      type="button"
      className={`quick-add ${done ? "is-done" : ""}`}
      aria-label={`Add ${name} to cart`}
      onClick={() => {
        add(sku, 1, false);
        setDone(true);
      }}
    >
      <Icon name={done ? "check" : "plus"} size={18} />
      <span className="sr-only">{done ? "Added" : "Add"}</span>
    </button>
  );
}
