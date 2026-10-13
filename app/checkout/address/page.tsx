import type { Metadata } from "next";
import { CheckoutFrame } from "@/components/checkout-frame";
import { AddressStep, OrderSummary } from "@/components/checkout-steps";

export const metadata: Metadata = {
  title: "Shipping address, Auric Cryo",
};

export default function AddressPage() {
  return (
    <main className="page">
      <CheckoutFrame current="address" />
      <h1>Shipping address</h1>
      <AddressStep />
      <OrderSummary />
    </main>
  );
}
