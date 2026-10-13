"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { products } from "@/data/catalog";
import { productImage } from "@/lib/assets";
import { Price } from "@/components/price";
import { onCart, readCart, removeSku, setQty, type CartLine } from "@/lib/cart";

export function useCartLines(): CartLine[] {
  const [lines, setLines] = useState<CartLine[]>([]);
  useEffect(() => {
    const read = () => setLines(readCart());
    read();
    return onCart(read);
  }, []);
  return lines;
}

export function lineTotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const item = products.find((product) => product.sku === line.sku);
    return sum + (item ? item.priceCents * line.qty : 0);
  }, 0);
}

export function CartLines({ lines }: { lines: CartLine[] }) {
  if (lines.length === 0) {
    return (
      <div className="empty-cart">
        <p>Nothing in the cart.</p>
        <Link className="btn" href="/">
          Shop
        </Link>
      </div>
    );
  }

  return (
    <ul className="cart-lines">
      {lines.map((line) => {
        const item = products.find((product) => product.sku === line.sku);
        if (!item) return null;
        return (
          <li key={line.sku} className="cart-line">
            <img
              src={productImage(item.sku)}
              alt=""
              width={1000}
              height={1250}
            />
            <div>
              <p className="line-name">{item.name}</p>
              <p>{item.size}</p>
              <Price cents={item.priceCents} />
              <div className="qty">
                <button
                  type="button"
                  className="btn btn-quiet"
                  aria-label={`Decrease ${item.name}`}
                  onClick={() => setQty(item.sku, line.qty - 1)}
                >
                  −
                </button>
                <span>{line.qty}</span>
                <button
                  type="button"
                  className="btn btn-quiet"
                  aria-label={`Increase ${item.name}`}
                  onClick={() => setQty(item.sku, line.qty + 1)}
                >
                  +
                </button>
                <button type="button" className="btn btn-quiet" onClick={() => removeSku(item.sku)}>
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

export function CartTotals({ lines }: { lines: CartLine[] }) {
  if (lines.length === 0) return null;
  return (
    <div className="drawer-foot">
      <p className="subtotal">
        <span>Subtotal</span>
        <span>
          <Price cents={lineTotal(lines)} />
        </span>
      </p>
      <Link className="btn" href="/checkout/contact/">
        Continue to checkout
      </Link>
      <Link className="btn btn-quiet" href="/cart/">
        View cart
      </Link>
    </div>
  );
}
