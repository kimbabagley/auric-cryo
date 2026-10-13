"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useCart } from "../lib/cart";
import { CartLines } from "./cart-lines";
import { CrossSell } from "./cross-sell";
import { Icon } from "./icons";
import { Price } from "./price";

export function CartDrawer() {
  const { open, setOpen, lines, count, subtotalCents } = useCart();
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname, setOpen]);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("no-scroll");
      prev?.focus();
    };
  }, [open, setOpen]);

  const close = () => setOpen(false);

  return (
    <div className={`drawer-root ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
      <div className="drawer-scrim" onClick={close} />
      <div ref={panel} className="drawer" role="dialog" aria-modal="true" aria-label="Cart" tabIndex={-1}>
        <div className="drawer-head">
          <h2>
            Your cart <span className="drawer-count">{count}</span>
          </h2>
          <button type="button" className="icon-btn" aria-label="Close cart" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <Link href="/catalog" className="btn btn-primary" onClick={close}>
              Browse the catalog
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              <CartLines onNavigate={close} />
              <CrossSell />
            </div>
            <div className="drawer-foot">
              <div className="sum-row">
                <span>Subtotal</span>
                <Price cents={subtotalCents} className="price-lg" />
              </div>
              <p className="fine">Demo prices. Nothing is charged and no order is placed.</p>
              <Link href="/checkout" className="btn btn-primary btn-block" onClick={close}>
                <Icon name="lock" size={18} /> Checkout
              </Link>
              <Link href="/cart" className="btn btn-ghost btn-block" onClick={close}>
                View cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
