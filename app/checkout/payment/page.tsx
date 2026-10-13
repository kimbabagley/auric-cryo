import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutFrame } from "@/components/checkout-frame";
import { OrderSummary } from "@/components/checkout-steps";

export const metadata: Metadata = {
  title: "Payment, Auric Cryo",
};

export default function PaymentPage() {
  return (
    <main className="page">
      <CheckoutFrame current="payment" />
      <h1>Payment</h1>
      <p>No card is collected on this demo.</p>
      <OrderSummary />
      <div className="actions">
        <button type="button" className="btn" disabled>
          Payment is not connected on this demo.
        </button>
        <Link className="btn btn-quiet" href="/checkout/confirmation/">
          Finish demo
        </Link>
      </div>
    </main>
  );
}
