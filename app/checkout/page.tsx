import type { Metadata } from "next";
import { CheckoutFlow } from "../../components/checkout-flow";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <main className="section page-top">
      <div className="container">
        <CheckoutFlow />
      </div>
    </main>
  );
}
