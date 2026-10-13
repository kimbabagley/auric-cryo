import Link from "next/link";

const steps = [
  { id: "contact", href: "/checkout/contact/", label: "Contact" },
  { id: "address", href: "/checkout/address/", label: "Address" },
  { id: "method", href: "/checkout/method/", label: "Method" },
  { id: "review", href: "/checkout/review/", label: "Review" },
  { id: "payment", href: "/checkout/payment/", label: "Payment" },
] as const;

export function CheckoutFrame({ current }: { current: (typeof steps)[number]["id"] }) {
  return (
    <nav className="steps" aria-label="Checkout">
      {steps.map((step) =>
        step.id === current ? (
          <span key={step.id} className="step" aria-current="step">
            {step.label}
          </span>
        ) : (
          <Link key={step.id} className="step" href={step.href}>
            {step.label}
          </Link>
        ),
      )}
    </nav>
  );
}
