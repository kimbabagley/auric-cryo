"use client";

import { useEffect, useState } from "react";
import { categories, products } from "../data/catalog";
import type { CategorySlug } from "../data/catalog";
import { ProductCard } from "./product-card";

type Sort = "featured" | "low" | "high" | "name";

export function FilterableGrid() {
  const [active, setActive] = useState<CategorySlug | "all">("all");
  const [sort, setSort] = useState<Sort>("featured");

  // Category tiles link here with ?c=slug; read it once on load.
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    if (c && categories.some((x) => x.slug === c)) setActive(c as CategorySlug);
  }, []);

  function choose(next: CategorySlug | "all") {
    setActive(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("c");
    else url.searchParams.set("c", next);
    window.history.replaceState(null, "", url);
  }

  const shown = (active === "all" ? products : products.filter((p) => p.category === active)).slice();
  if (sort === "low") shown.sort((a, b) => a.priceCents - b.priceCents);
  if (sort === "high") shown.sort((a, b) => b.priceCents - a.priceCents);
  if (sort === "name") shown.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Filter by category">
          <button type="button" className="chip" aria-pressed={active === "all"} onClick={() => choose("all")}>
            All <span className="chip-n">{products.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className="chip"
              aria-pressed={active === c.slug}
              onClick={() => choose(c.slug)}
            >
              {c.label} <span className="chip-n">{products.filter((p) => p.category === c.slug).length}</span>
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <p className="result-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "product" : "products"}
          </p>
          <label className="sort">
            <span className="sr-only">Sort products</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>
      </div>
      <div className="grid">
        {shown.map((item) => (
          <ProductCard key={item.sku} item={item} />
        ))}
      </div>
    </>
  );
}
