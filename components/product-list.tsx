import Link from "next/link";
import { demoPrice, products } from "../data/catalog";

export function ProductList() {
  return (
    <ul className="catalog">
      {products.map((item) => (
        <li className="row" key={item.sku}>
          <Link href={`/product/${item.sku}`}>{item.name}</Link>
          <span>{item.size}</span>
          <span>{item.sku}</span>
          <span>{demoPrice(item.priceCents)}</span>
        </li>
      ))}
    </ul>
  );
}
