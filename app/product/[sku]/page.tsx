import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { Price } from "@/components/price";
import { ProductGrid } from "@/components/product-grid";
import { getProduct, products } from "@/data/catalog";
import { productImage } from "@/lib/assets";

export function generateStaticParams() {
  return products.map((item) => ({ sku: item.sku }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sku: string }>;
}): Promise<Metadata> {
  const { sku } = await params;
  const item = getProduct(sku);
  return { title: item ? `${item.name}, Auric Cryo` : "Auric Cryo" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const item = getProduct(sku);
  if (!item) notFound();

  return (
    <main className="page">
      <p className="crumb">
        <Link href="/#catalog">Shop</Link>
        <span aria-hidden="true"> / </span>
        {item.name}
      </p>
      <article className="product-layout">
        <div className="product-photo">
          <img
            src={productImage(item.sku)}
            alt={`${item.name} research vial, ${item.size}`}
            width={1000}
            height={1250}
          />
        </div>
        <div className="product-copy">
          <h1>{item.name}</h1>
          <p className="card-size">{item.size}</p>
          <p className="sku-line">SKU {item.sku}</p>
          <p className="product-price">
            <Price cents={item.priceCents} />
          </p>
          <p>{item.description}</p>
          <p>COA not on this demo.</p>
          <p>For laboratory research use only. Not for human consumption.</p>
          <AddToCart sku={item.sku} name={item.name} />
        </div>
      </article>
      <section className="more" aria-label="More vials">
        <h2>More vials</h2>
        <ProductGrid except={item.sku} />
      </section>
    </main>
  );
}
