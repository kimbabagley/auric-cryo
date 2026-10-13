import { ProductList } from "../../components/product-list";

export default function CatalogPage() {
  return (
    <main>
      <h1>Catalog</h1>
      <p>Demo catalog. Not a live store. No orders are placed.</p>
      <p>For laboratory research use only. Not for human consumption.</p>
      <ProductList />
    </main>
  );
}
