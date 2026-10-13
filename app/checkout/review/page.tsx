import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutFrame } from "@/components/checkout-frame";
import { OrderSummary } from "@/components/checkout-steps";

export const metadata: Metadata = {
  title: "Review, Auric Cryo",
};

export default function ReviewPage() {
  return (
    <main className="page">
      <CheckoutFrame current="review" />
      <h1>Review</h1>
      <OrderSummary />
      <div className="actions">
        <Link className="btn btn-quiet" href="/checkout/method/">
          Back
        </Link>
        <Link className="btn" href="/checkout/payment/">
          Continue to payment
        </Link>
      </div>
    </main>
  );
}
