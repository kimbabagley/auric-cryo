"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getCategory, products } from "../data/catalog";
import { Icon } from "./icons";
import { Price } from "./price";
import { Vial } from "./vial";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  const term = q.trim().toLowerCase();
  const hits = products.filter((p) =>
    [p.name, p.sku, p.size, getCategory(p.category).label].join(" ").toLowerCase().includes(term),
  );

  return (
    <dialog
      ref={ref}
      className="search"
      aria-label="Search products"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="search-panel">
        <div className="search-field">
          <Icon name="search" />
          <input
            type="search"
            placeholder="Search by name, SKU or category"
            aria-label="Search by name, SKU or category"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
          />
          <button type="button" className="icon-btn" aria-label="Close search" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <ul className="search-results">
          {hits.map((p) => (
            <li key={p.sku}>
              <Link href={`/product/${p.sku}`} onClick={onClose}>
                <span className="thumb" style={{ background: getCategory(p.category).tint }}>
                  <Vial sku={p.sku} name={p.name} />
                </span>
                <span className="search-name">
                  {p.name}
                  <small>
                    {p.size} vial, {getCategory(p.category).label}
                  </small>
                </span>
                <Price cents={p.priceCents} />
              </Link>
            </li>
          ))}
          {hits.length === 0 ? <li className="search-empty">No product matches “{q}”. Try a SKU like AC-BPC-5.</li> : null}
        </ul>
      </div>
    </dialog>
  );
}
