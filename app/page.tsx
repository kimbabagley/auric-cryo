import { products } from "@/data/catalog";
import { productImage } from "@/lib/assets";
import { ProductGrid } from "@/components/product-grid";

export default function HomePage() {
  const lead = products[0];

  return (
    <main className="page">
      <section className="hero">
        <div>
          <h1>Research peptide catalog</h1>
          <p>Eight research peptides. Prices are marked DEMO.</p>
        </div>
        <img
          src={productImage(lead.sku)}
          alt={`${lead.name} research vial, ${lead.size}`}
          width={1000}
          height={1250}
        />
      </section>
      <ProductGrid />
    </main>
  );
}
