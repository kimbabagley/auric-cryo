"use client";

import Link from "next/link";
import { Price } from "@/components/price";
import { CartLines, lineTotal, useCartLines } from "@/components/cart-lines";

export function CartView() {
  const lines = useCartLines();

  return (
    <>
      <CartLines lines={lines} />
      {lines.length > 0 ? (
        <>
          <p className="subtotal">
            <span>Subtotal</span>
            <span>
              <Price cents={lineTotal(lines)} />
            </span>
          </p>
          <div className="actions">
            <Link className="btn" href="/checkout/contact/">
              Continue to checkout
            </Link>
          </div>
        </>
      ) : null}
    </>
  );
}
