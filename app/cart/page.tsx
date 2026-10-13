import { CartView } from "../../components/cart-view";

export default function CartPage() {
  return (
    <main>
      <h1>Cart</h1>
      <p>For laboratory research use only. Not for human consumption.</p>
      <p>This cart stays in this browser. No order is placed.</p>
      <CartView />
      <button type="button" disabled>
        Checkout disabled on this demo.
      </button>
    </main>
  );
}
