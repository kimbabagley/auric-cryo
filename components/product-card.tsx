import Link from "next/link";
import type { CatalogItem } from "../data/catalog";
import { getCategory } from "../data/catalog";
import { Price } from "./price";
import { QuickAdd } from "./quick-add";
import { Vial } from "./vial";

export function ProductCard({ item }: { item: CatalogItem }) {
  const cat = getCategory(item.category);
  return (
    <article className="card">
      <Link href={`/product/${item.sku}`} className="card-media" style={{ background: cat.tint }}>
        <Vial sku={item.sku} name={item.name} />
        <span className="card-size">{item.size}</span>
      </Link>
      <div className="card-body">
        <p className="card-cat">{cat.label}</p>
        <h3 className="card-name">
          <Link href={`/product/${item.sku}`}>{item.name}</Link>
        </h3>
        <div className="card-foot">
          <Price cents={item.priceCents} />
          <QuickAdd sku={item.sku} name={item.name} />
        </div>
      </div>
    </article>
  );
}
