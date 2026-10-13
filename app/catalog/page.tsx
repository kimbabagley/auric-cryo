import type { Metadata } from "next";
import { ProductGrid } from "@/components/product-grid";

export const metadata: Metadata = {
  title: "Shop, Auric Cryo",
};

export default function CatalogPage() {
  return (
    <main className="page">
      <h1>Shop</h1>
      <ProductGrid />
    </main>
  );
}
