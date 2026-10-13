import Link from "next/link";
import { Icon } from "../components/icons";
import type { IconName } from "../components/icons";
import { ProductCard } from "../components/product-card";
import { Vial } from "../components/vial";
import { categories, products } from "../data/catalog";

const heroVials = [
  { sku: "AC-SEM-10", name: "Semax", cls: "hv-1" },
  { sku: "AC-TB-5", name: "TB-500", cls: "hv-2" },
  { sku: "AC-BPC-5", name: "BPC-157", cls: "hv-3" },
  { sku: "AC-GHK-50", name: "GHK-Cu", cls: "hv-4" },
  { sku: "AC-SEL-10", name: "Selank", cls: "hv-5" },
];

const trust: { icon: IconName; text: string }[] = [
  { icon: "flask", text: "Third-party tested on this demo: COA not included" },
  { icon: "shield", text: "Research use only" },
  { icon: "box", text: "Ships from a demo warehouse — not real" },
  { icon: "tag", text: "Every price is marked DEMO" },
];

const faq = [
  ["Is this a real store?", "No. Auric Cryo is a demo storefront. You can browse, fill a cart and walk the checkout, but no order is placed and nothing ships."],
  ["Can I pay for an order?", "No. Payment is not connected. The checkout stops at a disabled payment step and there is no card form anywhere on the site."],
  ["Is there a certificate of analysis?", "Not on this demo. Each product page shows where a lot's COA would sit on a live store."],
  ["Who are these products for?", "Listings describe research materials for qualified laboratories. Browsing is limited to visitors who confirm they are 21 or older."],
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>Research peptides, sealed and catalogued.</h1>
            <p className="lead">
              Eight lyophilized peptides in 5 to 50 mg vials. Every listing shows the SKU, the vial size and how
              it should be stored.
            </p>
            <div className="hero-ctas">
              <Link href="/catalog" className="btn btn-primary btn-lg">
                Shop all peptides
              </Link>
              <Link href="/research-use" className="btn btn-ghost btn-lg">
                Research use policy
              </Link>
            </div>
            <ul className="hero-checks">
              <li>
                <Icon name="check" size={16} /> 8 SKUs
              </li>
              <li>
                <Icon name="check" size={16} /> Storage notes listed
              </li>
              <li>
                <Icon name="check" size={16} /> Demo checkout
              </li>
            </ul>
          </div>
          <div className="hero-stage">
            <p className="stage-chip">Eight vials, 5 to 50 mg each</p>
            <div className="stage-floor" aria-hidden="true" />
            <div className="stage-row" aria-hidden="true">
              {heroVials.map((v) => (
                <div key={v.sku} className={`hv ${v.cls}`}>
                  <Vial sku={v.sku} name={v.name} small={v.cls !== "hv-3"} eager />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Store facts">
        <ul className="container trust-list">
          {trust.map((t) => (
            <li key={t.text}>
              <Icon name={t.icon} size={22} />
              <span>{t.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Shop by category</h2>
            <Link href="/catalog" className="text-link">
              View all products
            </Link>
          </div>
          <div className="cats">
            {categories.map((c) => {
              const pair = products.filter((p) => p.category === c.slug);
              return (
                <Link key={c.slug} href={`/catalog/?c=${c.slug}`} className="cat" style={{ background: c.tint }}>
                  <span className="cat-text">
                    <span className="cat-name">{c.label}</span>
                    <span className="cat-blurb">{c.blurb}</span>
                  </span>
                  <span className="cat-vials" aria-hidden="true">
                    {pair.map((p) => (
                      <Vial key={p.sku} sku={p.sku} name={p.name} />
                    ))}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="section-head">
            <h2>The full catalog</h2>
            <p className="section-sub">Eight vials. Add any of them to the demo cart.</p>
          </div>
          <div className="grid">
            {products.map((item) => (
              <ProductCard key={item.sku} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="how">
        <div className="container">
          <h2>How the demo works</h2>
          <ol className="how-steps">
            <li>
              <span className="how-n">1</span>
              <h3>Pick your vials</h3>
              <p>Browse eight listings by category, compare vial sizes and add them to the cart.</p>
            </li>
            <li>
              <span className="how-n">2</span>
              <h3>Review the cart</h3>
              <p>Change quantities in the cart drawer. The cart lives in this browser only.</p>
            </li>
            <li>
              <span className="how-n">3</span>
              <h3>Walk the checkout</h3>
              <p>Contact, shipping and review all work. The payment step is switched off.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container faq-wrap">
          <div>
            <h2>Questions</h2>
            <p className="section-sub">Straight answers about what this site is and is not.</p>
            <div className="faq-links">
              <Link href="/research-use" className="text-link">
                Research use policy
              </Link>
              <Link href="/contact" className="text-link">
                Contact
              </Link>
            </div>
          </div>
          <div className="accordion">
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Icon name="plus" size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
