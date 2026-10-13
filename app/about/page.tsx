import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

const aboutCopy =
  "Auric Cryo is a demo storefront for a research peptide catalog. It shows how eight lyophilized peptides could be listed, compared and added to a cart, with each vial size, SKU and storage note in plain view. Every price is marked DEMO and is not a quote. The checkout walks through contact, shipping and review, then stops: payment is not connected and no order is placed. A Wyoming company is in formation; that line records a plan, not a completed filing. No person, phone number or street address is printed here. Nothing on this site is an offer to sell.";

export default function AboutPage() {
  return (
    <main className="section page-top">
      <div className="container prose-wrap">
        <h1>About Auric Cryo</h1>
        <p className="lead">{aboutCopy}</p>
        <div className="facts">
          <div>
            <strong>8</strong>
            <span>research peptides listed</span>
          </div>
          <div>
            <strong>5–50 mg</strong>
            <span>vial sizes</span>
          </div>
          <div>
            <strong>0</strong>
            <span>orders placed</span>
          </div>
        </div>
        <p className="fine">For laboratory research use only. Not for human consumption.</p>
        <Link href="/catalog" className="btn btn-primary">
          Browse the catalog
        </Link>
      </div>
    </main>
  );
}
