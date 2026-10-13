import { demoPrice } from "../data/catalog";

// Renders "DEMO $39.00" with the DEMO marker styled as a small tag.
export function Price({ cents, className = "" }: { cents: number; className?: string }) {
  const text = demoPrice(cents);
  return (
    <span className={`price ${className}`}>
      <span className="price-demo">DEMO</span> {text.slice(5)}
    </span>
  );
}
