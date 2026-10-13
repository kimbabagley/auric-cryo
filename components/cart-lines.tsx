"use client";

import Link from "next/link";
import { getCategory, getProduct } from "../data/catalog";
import { useCart } from "../lib/cart";
import { Price } from "./price";
import { Qty } from "./qty";
import { Vial } from "./vial";

export function CartLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQty, remove } = useCart();
  return (
    <ul className="lines">
      {lines.map((l) => {
        const p = getProduct(l.sku);
        if (!p) return null;
        return (
          <li key={l.sku} className="line">
            <Link href={`/product/${p.sku}`} className="thumb" style={{ background: getCategory(p.category).tint }} onClick={onNavigate}>
              <Vial sku={p.sku} name={p.name} />
            </Link>
            <div className="line-main">
              <div className="line-top">
                <Link href={`/product/${p.sku}`} className="line-name" onClick={onNavigate}>
                  {p.name}
                </Link>
                <Price cents={p.priceCents * l.qty} />
              </div>
              <p className="line-meta">
                {p.size} vial, {p.sku}
              </p>
              <div className="line-actions">
                <Qty value={l.qty} label={p.name} onChange={(n) => setQty(p.sku, n)} />
                <button type="button" className="link-btn" onClick={() => remove(p.sku)}>
                  Remove
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
