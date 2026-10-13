import type { Metadata } from "next";
import { CheckoutFrame } from "@/components/checkout-frame";
import { MethodStep } from "@/components/checkout-steps";

export const metadata: Metadata = {
  title: "Shipping method, Auric Cryo",
};

export default function MethodPage() {
  return (
    <main className="page">
      <CheckoutFrame current="method" />
      <h1>Shipping method</h1>
      <MethodStep />
    </main>
  );
}
