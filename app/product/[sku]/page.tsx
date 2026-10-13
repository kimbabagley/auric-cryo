import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "../../../components/buy-box";
import { Gallery } from "../../../components/gallery";
import { Icon } from "../../../components/icons";
import { Price } from "../../../components/price";
import { ProductCard } from "../../../components/product-card";
import { getCategory, getProduct, products } from "../../../data/catalog";

export function generateStaticParams() {
  return products.map((item) => ({ sku: item.sku }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ sku: string }> }): Promise<Metadata> {
  const { sku } = await params;
  const p = getProduct(sku);
  return { title: p ? `${p.name} ${p.size}` : "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = getProduct(sku);
  if (!product) {
    notFound();
  }
  const cat = getCategory(product.category);
  const related = [
    ...products.filter((p) => p.category === product.category && p.sku !== product.sku),
    ...products.filter((p) => p.category !== product.category),
  ].slice(0, 4);

  const specs: [string, string][] = [
    ["SKU", product.sku],
    ["Net content", `${product.size} per vial`],
    ["Form", "Lyophilized powder"],
    ["Vial", "Clear glass, crimp-sealed cap"],
    ["Sequence", "Shown on the COA (not on demo)"],
    ["Assay", "Purity: see COA (not on demo)"],
    ["Category", cat.label],
  ];

  return (
    <main className="pdp page-top">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/catalog">Shop</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/catalog/?c=${cat.slug}`}>{cat.label}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <div className="pdp-grid">
          <Gallery sku={product.sku} name={product.name} tint={cat.tint} size={product.size} />
          <div className="pdp-info">
            <Link href={`/catalog/?c=${cat.slug}`} className="pdp-cat">
              {cat.label}
            </Link>
            <h1>{product.name}</h1>
            <p className="pdp-sub">
              {product.size} vial, lyophilized powder. SKU {product.sku}.
            </p>
            <Price cents={product.priceCents} className="price-xl" />
            <p className="pdp-desc">{product.description}</p>
            <BuyBox sku={product.sku} name={product.name} size={product.size} priceCents={product.priceCents} />
            <ul className="mini-trust">
              <li>
                <Icon name="vial" size={20} />
                <span>Sealed glass vial</span>
              </li>
              <li>
                <Icon name="thermo" size={20} />
                <span>Store at −20 °C</span>
              </li>
              <li>
                <Icon name="doc" size={20} />
                <span>COA not on demo</span>
              </li>
            </ul>
            <div className="fineprint">
              <p>Demo catalog. Not a live store. No orders are placed.</p>
              <p>For laboratory research use only. Not for human consumption.</p>
            </div>
            <div className="accordion accordion-pdp">
              <details open>
                <summary>
                  Specifications
                  <Icon name="plus" size={18} />
                </summary>
                <dl className="specs">
                  {specs.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </details>
              <details>
                <summary>
                  Storage and handling
                  <Icon name="plus" size={18} />
                </summary>
                <p>
                  Keep the vial sealed and frozen at −20 °C, away from light and moisture. Let it reach room
                  temperature before opening to limit condensation. Handle with gloves in a laboratory setting.
                </p>
              </details>
              <details>
                <summary>
                  Certificate of analysis
                  <Icon name="plus" size={18} />
                </summary>
                <p>
                  A live store would link the lab report for each lot here. No COA is included on this demo, so no
                  test result is shown or implied.
                </p>
              </details>
              <details>
                <summary>
                  Research use only
                  <Icon name="plus" size={18} />
                </summary>
                <p>
                  Sold as a research material for qualified laboratories. No use instructions or amounts are given.
                  See the <Link href="/research-use">research use policy</Link>.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>You may also need</h2>
            <Link href="/catalog" className="text-link">
              View all products
            </Link>
          </div>
          <div className="grid">
            {related.map((item) => (
              <ProductCard key={item.sku} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
