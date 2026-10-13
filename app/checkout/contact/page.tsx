import type { Metadata } from "next";
import { CheckoutFrame } from "@/components/checkout-frame";
import { ContactStep, OrderSummary } from "@/components/checkout-steps";

export const metadata: Metadata = {
  title: "Contact, Auric Cryo",
};

export default function ContactCheckoutPage() {
  return (
    <main className="page">
      <CheckoutFrame current="contact" />
      <h1>Contact</h1>
      <ContactStep />
      <OrderSummary />
    </main>
  );
}
