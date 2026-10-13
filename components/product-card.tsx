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
      <Link href={`/product/${item.sku}`} className="card-media glow">
        <Vial sku={item.sku} name={item.name} />
      </Link>
      <div className="card-body">
        <div className="card-row">
          <h3 className="card-name">
            <Link href={`/product/${item.sku}`}>{item.name}</Link>
          </h3>
          <Price cents={item.priceCents} tag={false} />
        </div>
        <div className="card-foot">
          <p className="card-cat">
            {item.size} · {cat.label}
          </p>
          <QuickAdd sku={item.sku} name={item.name} />
        </div>
      </div>
    </article>
  );
}
