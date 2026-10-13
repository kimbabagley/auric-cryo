const aboutCopy =
  "Auric Cryo is the name on this research peptide demo. Eight sample rows show a catalog list, a product page, and a cart. No orders are placed. A Wyoming company is in formation. That sentence records a plan, not a completed filing. No person is named. No phone number and no street are printed. Prices are marked DEMO and are not a quote. The cart stays in the browser. Checkout stays off. This page is a layout review, not a shop. Nothing here is an offer to sell.";

export default function AboutPage() {
  return (
    <main>
      <h1>About</h1>
      <p>{aboutCopy}</p>
      <p>For laboratory research use only. Not for human consumption.</p>
    </main>
  );
}
