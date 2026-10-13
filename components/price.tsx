import { demoPrice } from "../data/catalog";

// Renders "DEMO $39.00" with the DEMO marker styled as a small tag.
export function Price({ cents, className = "", tag = true }: { cents: number; className?: string; tag?: boolean }) {
  const text = demoPrice(cents);
  return (
    <span className={`price ${className}`}>
      {tag ? <span className="price-demo">DEMO</span> : null} {text.slice(5)}
    </span>
  );
}
