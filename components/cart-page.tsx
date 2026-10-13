"use client";

import Link from "next/link";
import { useCart } from "../lib/cart";
import { CartLines } from "./cart-lines";
import { Icon } from "./icons";
import { Price } from "./price";

export function CartPage() {
  const { lines, subtotalCents, ready } = useCart();
  if (!ready) return <div className="loading" aria-busy="true" />;
  if (lines.length === 0) {
    return (
      <div className="confirm">
        <p className="confirm-lead">Your cart is empty.</p>
        <Link href="/catalog" className="btn btn-primary">
          Browse the catalog
        </Link>
      </div>
    );
  }
  return (
    <div className="checkout">
      <div className="checkout-main">
        <CartLines />
      </div>
      <aside className="summary">
        <h2>Summary</h2>
        <div className="sum-row">
          <span>Subtotal</span>
          <Price cents={subtotalCents} />
        </div>
        <div className="sum-row muted">
          <span>Shipping</span>
          <span>None, demo only</span>
        </div>
        <div className="sum-row sum-total">
          <span>Total</span>
          <Price cents={subtotalCents} className="price-lg" />
        </div>
        <Link href="/checkout" className="btn btn-primary btn-block">
          <Icon name="lock" size={18} /> Continue to checkout
        </Link>
        <p className="fine">The cart stays in this browser. No order is placed.</p>
      </aside>
    </div>
  );
}
