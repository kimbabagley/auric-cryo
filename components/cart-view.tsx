"use client";

import { useEffect, useState } from "react";
import { demoPrice, getProduct } from "../data/catalog";

const KEY = "auric-cryo-cart";

type CartRow = { sku: string; qty: number };

export function CartView() {
  const [items, setItems] = useState<CartRow[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(KEY);
    setItems(raw ? (JSON.parse(raw) as CartRow[]) : []);
  }, []);

  function remove(sku: string) {
    const next = items.filter((item) => item.sku !== sku);
    window.localStorage.setItem(KEY, JSON.stringify(next));
    setItems(next);
  }

  if (items.length === 0) {
    return <p>Cart is empty.</p>;
  }

  return (
    <ul className="catalog">
      {items.map((item) => {
        const product = getProduct(item.sku);
        return (
          <li className="row" key={item.sku}>
            <span>{product ? product.name : item.sku}</span>
            <span>{product ? demoPrice(product.priceCents) : "DEMO"}</span>
            <span>Qty {item.qty}</span>
            <button type="button" onClick={() => remove(item.sku)}>
              Remove
            </button>
          </li>
        );
      })}
    </ul>
  );
}
