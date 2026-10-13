import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About, Auric Cryo",
};

const copy =
  "Auric Cryo is a demo catalog of eight research peptides. Each card shows one vial, one size, and a price marked DEMO. That price is not a quote and it is not an offer to sell. This site does not take payment and it does not place an order. The cart stays in this browser. A certificate of analysis is not on this demo. No person, phone, or street is listed on this page. A company filing is not claimed here. Use the shop to review the catalog, then stop. Nothing here is advice.";

export default function AboutPage() {
  return (
    <main className="page">
      <h1>About</h1>
      <div className="lead">
        <p>{copy}</p>
      </div>
    </main>
  );
}
