import type { Metadata } from "next";

export const metadata: Metadata = { title: "Research use" };

const rules = [
  ["Laboratory research only", "Listings describe research materials for qualified laboratories and researchers."],
  ["No use instructions", "This site gives no mixing steps and no amounts, and answers no questions about personal use."],
  ["21 and older", "Browsing is limited to visitors who confirm they are 21 or older."],
  ["No COA on this demo", "A live store would publish a lab report per lot. None is included here, and no result is implied."],
];

export default function ResearchUsePage() {
  return (
    <main className="section page-top">
      <div className="container prose-wrap">
        <h1>Research use policy</h1>
        <p className="lead">
          Auric Cryo lists research peptides on a demo storefront. The listings are samples, not an offer to sell,
          and nothing on the site is advice.
        </p>
        <p className="callout">For laboratory research use only. Not for human consumption.</p>
        <dl className="rules">
          {rules.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
}
