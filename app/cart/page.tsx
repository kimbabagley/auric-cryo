import type { Metadata } from "next";
import { CartPage } from "../../components/cart-page";

export const metadata: Metadata = { title: "Cart" };

export default function Cart() {
  return (
    <main className="section page-top">
      <div className="container">
        <div className="page-head">
          <h1>Your cart</h1>
          <p className="fine">For laboratory research use only. Not for human consumption.</p>
        </div>
        <CartPage />
      </div>
    </main>
  );
}
