import { demoPrice } from "@/data/catalog";

export function Price({ cents }: { cents: number }) {
  const amount = demoPrice(cents).slice("DEMO ".length);

  return (
    <span className="price">
      <span className="price-mark">DEMO</span>
      <span className="price-num">{amount}</span>
    </span>
  );
}
