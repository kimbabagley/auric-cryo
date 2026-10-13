"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cartCount, onCart, readCart } from "@/lib/cart";
import { openDrawer } from "@/lib/drawer";

export function CartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const read = () => setCount(cartCount(readCart()));
    read();
    return onCart(read);
  }, []);

  return (
    <Link
      id="open-cart"
      className="cart-link"
      href="/cart/"
      aria-label={`Open cart, ${count} items`}
      onClick={(event) => {
        event.preventDefault();
        openDrawer();
      }}
    >
      Cart <span className="cart-count">{count}</span>
    </Link>
  );
}
