import { notFound } from "next/navigation";
import { AddToCart } from "../../../components/add-to-cart";
import { demoPrice, getProduct, products } from "../../../data/catalog";

export function generateStaticParams() {
  return products.map((item) => ({ sku: item.sku }));
}

export const dynamicParams = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ sku: string }>;
}) {
  const { sku } = await params;
  const product = getProduct(sku);
  if (!product) {
    notFound();
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.size}</p>
      <p>{demoPrice(product.priceCents)}</p>
      <p>{product.sku}</p>
      <p>{product.description}</p>
      <p>Demo catalog. Not a live store. No orders are placed.</p>
      <p>For laboratory research use only. Not for human consumption.</p>
      <p>COA not on this demo.</p>
      <AddToCart sku={product.sku} />
    </main>
  );
}
