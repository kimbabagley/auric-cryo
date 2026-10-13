"use client";

import { useState } from "react";

const KEY = "auric-cryo-cart";

type CartRow = { sku: string; qty: number };

export function AddToCart({ sku }: { sku: string }) {
  const [note, setNote] = useState("");

  function add() {
    const raw = window.localStorage.getItem(KEY);
    const items: CartRow[] = raw ? (JSON.parse(raw) as CartRow[]) : [];
    const found = items.find((item) => item.sku === sku);
    if (found) {
      found.qty += 1;
    } else {
      items.push({ sku, qty: 1 });
    }
    window.localStorage.setItem(KEY, JSON.stringify(items));
    setNote("Added to the cart in this browser.");
  }

  return (
    <div>
      <button type="button" onClick={add}>
        Add to cart
      </button>
      {note ? <p>{note}</p> : null}
    </div>
  );
}
