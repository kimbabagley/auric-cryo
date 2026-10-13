import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { demoPrice, getProduct, products } from "@/data/catalog";
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
          <p className="card-price">{demoPrice(item.priceCents)}</p>
          <p>SKU {item.sku}</p>
          <p>{item.description}</p>
          <p>COA not on this demo.</p>
          <p>For laboratory research use only. Not for human consumption.</p>
          <AddToCart sku={item.sku} name={item.name} />
        </div>
      </article>
    </main>
  );
}
