import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demo finished, Auric Cryo",
};

export default function ConfirmationPage() {
  return (
    <main className="page">
      <h1>No order was placed. No payment was taken.</h1>
      <p>Nothing was sent.</p>
      <div className="actions">
        <Link className="btn" href="/">
          Back to shop
        </Link>
      </div>
    </main>
  );
}
