import { products } from "@/data/catalog";
import { productImage } from "@/lib/assets";
import { ProductGrid } from "@/components/product-grid";

export default function HomePage() {
  const cluster = products.slice(0, 5);

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-copy">
          <h1>Research peptide catalog</h1>
          <p>Eight research peptides. Prices are marked DEMO.</p>
          <a className="btn" href="#catalog">
            Shop the catalog
          </a>
        </div>
        <div className="hero-stage">
          {cluster.map((item) => (
            <img
              key={item.sku}
              src={productImage(item.sku)}
              alt=""
              width={1000}
              height={1250}
            />
          ))}
        </div>
      </section>
      <section id="catalog" aria-label="Research peptide catalog">
        <ProductGrid />
      </section>
    </main>
  );
}
