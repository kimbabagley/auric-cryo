"use client";

import { products } from "../data/catalog";
import { useCart } from "../lib/cart";
import { Icon } from "./icons";
import { Price } from "./price";
import { Vial } from "./vial";

export function CrossSell() {
  const { lines, add } = useCart();
  const inCart = new Set(lines.map((l) => l.sku));
  const picks = products.filter((p) => !inCart.has(p.sku)).slice(0, 3);
  if (picks.length === 0) return null;
  return (
    <div className="xsell">
      <h3>Add to your order</h3>
      <ul>
        {picks.map((p) => (
          <li key={p.sku}>
            <span className="thumb glow">
              <Vial sku={p.sku} name={p.name} />
            </span>
            <span className="xsell-name">
              {p.name}
              <Price cents={p.priceCents} />
            </span>
            <button type="button" className="icon-btn xsell-add" aria-label={`Add ${p.name} to cart`} onClick={() => add(p.sku, 1, false)}>
              <Icon name="plus" size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
