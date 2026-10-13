"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getProduct } from "../data/catalog";

const KEY = "auric-cryo-cart";

export type CartLine = { sku: string; qty: number };

type Cart = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  subtotalCents: number;
  open: boolean;
  bump: number;
  setOpen: (open: boolean) => void;
  add: (sku: string, qty?: number, openDrawer?: boolean) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
};

const CartContext = createContext<Cart | null>(null);

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    // Drop rows for SKUs that no longer exist or have bad quantities.
    return parsed.filter((l) => getProduct(l.sku) && Number.isInteger(l.qty) && l.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLines(read());
    setReady(true);
  }, []);

  const save = useCallback((next: CartLine[]) => {
    setLines(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // Private mode: cart still works for this page view.
    }
  }, []);

  const add = useCallback(
    (sku: string, qty = 1, openDrawer = true) => {
      const current = read();
      const found = current.find((l) => l.sku === sku);
      const next = found
        ? current.map((l) => (l.sku === sku ? { ...l, qty: Math.min(99, l.qty + qty) } : l))
        : [...current, { sku, qty }];
      save(next);
      setBump((b) => b + 1);
      if (openDrawer) setOpen(true);
    },
    [save],
  );

  const setQty = useCallback(
    (sku: string, qty: number) => {
      save(
        qty < 1
          ? lines.filter((l) => l.sku !== sku)
          : lines.map((l) => (l.sku === sku ? { ...l, qty: Math.min(99, qty) } : l)),
      );
    },
    [lines, save],
  );

  const remove = useCallback((sku: string) => save(lines.filter((l) => l.sku !== sku)), [lines, save]);
  const clear = useCallback(() => save([]), [save]);

  const value = useMemo<Cart>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotalCents = lines.reduce((n, l) => n + (getProduct(l.sku)?.priceCents ?? 0) * l.qty, 0);
    return { lines, ready, count, subtotalCents, open, bump, setOpen, add, setQty, remove, clear };
  }, [lines, ready, open, bump, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be inside CartProvider");
  return cart;
}
