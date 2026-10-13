import { vialSrc } from "../lib/site";

export function Vial({
  sku,
  name,
  small = true,
  eager = false,
  className = "",
}: {
  sku: string;
  name: string;
  small?: boolean;
  eager?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`vial ${className}`}
      src={vialSrc(sku, small)}
      alt={`${name} vial`}
      width={small ? 600 : 1200}
      height={small ? 600 : 1200}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
