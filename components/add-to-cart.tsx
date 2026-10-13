"use client";

import { useState } from "react";
import { addSku } from "@/lib/cart";
import { openDrawer } from "@/lib/drawer";

export function AddToCart({ sku, name }: { sku: string; name: string }) {
  const [added, setAdded] = useState(false);

  function add() {
    addSku(sku);
    setAdded(true);
    openDrawer(`Added ${name}.`);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button type="button" className="btn" onClick={add} aria-live="polite">
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
