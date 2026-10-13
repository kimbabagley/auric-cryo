"use client";

import { useEffect, useState } from "react";
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
    <button
      id="open-cart"
      className="cart-link"
      type="button"
      aria-label={`Open cart, ${count} items`}
      onClick={() => openDrawer()}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="cart-icon">
        <path
          d="M6 7h12l-1 12H7L6 7zm0 0 1-3h10l1 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="9" cy="20.5" r="1" fill="currentColor" />
        <circle cx="16" cy="20.5" r="1" fill="currentColor" />
      </svg>
      <span className="cart-count">{count}</span>
    </button>
  );
}
