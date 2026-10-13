"use client";

import { useState } from "react";
import { addSku } from "@/lib/cart";
import { openDrawer } from "@/lib/drawer";

export function AddToCart({ sku, name }: { sku: string; name: string }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function add() {
    addSku(sku, qty);
    setAdded(true);
    openDrawer(`Added ${name}.`);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="buy-row">
      <div className="qty" aria-label="Quantity">
        <button
          type="button"
          className="btn btn-quiet"
          aria-label={`Decrease ${name}`}
          onClick={() => setQty((value) => Math.max(1, value - 1))}
        >
          −
        </button>
        <span>{qty}</span>
        <button
          type="button"
          className="btn btn-quiet"
          aria-label={`Increase ${name}`}
          onClick={() => setQty((value) => Math.min(12, value + 1))}
        >
          +
        </button>
      </div>
      <button type="button" className="btn buy-btn" onClick={add} aria-live="polite">
        {added ? "Added" : "Add to cart"}
      </button>
    </div>
  );
}
