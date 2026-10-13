import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart, Auric Cryo",
};

export default function CartPage() {
  return (
    <main className="page">
      <h1>Cart</h1>
      <CartView />
    </main>
  );
}
