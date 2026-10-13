import Link from "next/link";
import { demoPrice, products } from "@/data/catalog";
import { productImage } from "@/lib/assets";

export function ProductGrid() {
  return (
    <ul className="catalog-grid">
      {products.map((item) => (
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
              <span className="card-price">{demoPrice(item.priceCents)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
