export type CartLine = {
  sku: string;
  qty: number;
};

const KEY = "auric-cryo-cart";
const EVENT = "auric-cart";

function isLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const line = value as CartLine;
  return typeof line.sku === "string" && typeof line.qty === "number" && line.qty > 0;
}

export function readCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isLine);
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]): void {
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(EVENT));
}

export function addSku(sku: string): void {
  const lines = readCart();
  const found = lines.find((line) => line.sku === sku);
  if (found) found.qty += 1;
  else lines.push({ sku, qty: 1 });
  writeCart(lines);
}

export function setQty(sku: string, qty: number): void {
  writeCart(
    readCart()
      .map((line) => (line.sku === sku ? { ...line, qty } : line))
      .filter((line) => line.qty > 0),
  );
}

export function removeSku(sku: string): void {
  writeCart(readCart().filter((line) => line.sku !== sku));
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function onCart(fn: () => void): () => void {
  const handler = () => fn();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
