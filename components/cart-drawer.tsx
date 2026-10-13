"use client";

import { useEffect, useState } from "react";
import { closeDrawer, drawerNote, isDrawerOpen, onDrawer } from "@/lib/drawer";
import { CartLines, CartTotals, useCartLines } from "@/components/cart-lines";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const [active, setActive] = useState(false);
  const [note, setNote] = useState("");
  const lines = useCartLines();

  useEffect(() => {
    return onDrawer(() => {
      setNote(drawerNote());
      setOpen(isDrawerOpen());
      if (isDrawerOpen()) setPresent(true);
    });
  }, []);

  useEffect(() => {
    if (!present) return;
    if (!open) {
      setActive(false);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const id = window.setTimeout(() => setPresent(false), reduced ? 0 : 240);
      return () => window.clearTimeout(id);
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setActive(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setActive(true));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, present]);

  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = document.getElementById("cart-drawer");
    const closer = document.getElementById("close-cart");
    closer?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>("a, button")).filter(
        (el) => !el.hasAttribute("disabled"),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      document.getElementById("open-cart")?.focus();
    };
  }, [active]);

  if (!present) return null;

  return (
    <div className={active ? "drawer-root open" : "drawer-root"}>
      <div className="scrim" onClick={closeDrawer} />
      <div
        id="cart-drawer"
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer-head">
          <h2 id="drawer-title">Cart</h2>
          <button id="close-cart" type="button" className="btn btn-quiet" onClick={closeDrawer}>
            Close
          </button>
        </div>
        <p className="drawer-note" role="status">
          {note}
        </p>
        <div className="drawer-body">
          <CartLines lines={lines} />
        </div>
        <CartTotals lines={lines} />
      </div>
    </div>
  );
}
