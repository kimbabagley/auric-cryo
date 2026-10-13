import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research use, Auric Cryo",
};

export default function ResearchUsePage() {
  return (
    <main className="page">
      <h1>Research use</h1>
      <div className="lead">
        <p>
          These vials are listed for laboratory research. This demo does not sell them and
          does not place an order.
        </p>
        <p>This page does not give mixing steps or amounts.</p>
        <p>A certificate of analysis is not on this demo.</p>
        <p>For laboratory research use only. Not for human consumption.</p>
      </div>
    </main>
  );
}
