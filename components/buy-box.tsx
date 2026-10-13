"use client";

import { useEffect, useRef, useState } from "react";
import { demoPrice } from "../data/catalog";
import { useCart } from "../lib/cart";
import { Icon } from "./icons";
import { Price } from "./price";
import { Qty } from "./qty";

export function BuyBox({ sku, name, size, priceCents }: { sku: string; name: string; size: string; priceCents: number }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const zone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(t);
  }, [added]);

  // Sticky phone bar appears once the main button has scrolled away.
  useEffect(() => {
    const el = zone.current;
    if (!el) return;
    const check = () => setShowBar(el.getBoundingClientRect().bottom < 0);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  function addNow() {
    add(sku, qty, true);
    setAdded(true);
  }

  return (
    <>
      <div className="buy" ref={zone}>
        <Qty value={qty} label={name} onChange={(n) => setQty(Math.max(1, Math.min(99, n)))} />
        <button type="button" className={`btn btn-primary btn-add ${added ? "is-added" : ""}`} onClick={addNow}>
          {added ? (
            <>
              <Icon name="check" size={18} /> Added to cart
            </>
          ) : (
            <>
              Add to cart
              <span className="btn-price">
                <span className="btn-sep" aria-hidden="true" /> {demoPrice(priceCents * qty)}
              </span>
            </>
          )}
        </button>
      </div>
      <div className={`buy-bar ${showBar ? "is-shown" : ""}`} aria-hidden={!showBar} inert={!showBar}>
        <div className="buy-bar-info">
          <strong>{name}</strong>
          <span>
            {size} <Price cents={priceCents} />
          </span>
        </div>
        <button type="button" className="btn btn-primary" onClick={addNow}>
          {added ? "Added" : "Add to cart"}
        </button>
      </div>
    </>
  );
}
