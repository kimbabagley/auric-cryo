import type { Metadata } from "next";
import { FilterableGrid } from "../../components/product-grid";

export const metadata: Metadata = { title: "Shop research peptides" };

export default function CatalogPage() {
  return (
    <main className="section page-top">
      <div className="container">
        <div className="page-head">
          <h1>Shop research peptides</h1>
          <p className="lead">
            Eight lyophilized peptides in sealed glass vials. Filter by category, then open a listing for its specs
            and storage note.
          </p>
        </div>
        <FilterableGrid />
      </div>
    </main>
  );
}
