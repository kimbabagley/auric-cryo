import Link from "next/link";
import { products } from "@/data/catalog";
import { productImage } from "@/lib/assets";
import { Price } from "@/components/price";

export function ProductGrid({ except }: { except?: string }) {
  const items = except ? products.filter((item) => item.sku !== except).slice(0, 4) : products;

  return (
    <ul className="catalog-grid">
      {items.map((item) => (
        <li key={item.sku}>
          <Link href={`/product/${item.sku}/`} className="product-card">
            <span className="card-photo">
              <img
                src={productImage(item.sku)}
                alt={`${item.name} research vial, ${item.size}`}
                width={1000}
                height={1250}
              />
            </span>
            <span className="card-copy">
              <span className="card-name">{item.name}</span>
              <span className="card-size">{item.size}</span>
              <Price cents={item.priceCents} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
