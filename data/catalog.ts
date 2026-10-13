export const DESCRIPTION =
  "Synthetic research peptide. For laboratory research use only.";

export type CatalogItem = {
  sku: string;
  name: string;
  size: string;
  priceCents: number;
  description: string;
  category: CategorySlug;
};

export type CategorySlug = "fragments" | "secretagogues" | "neuropeptides" | "short-chain";

export const categories: { slug: CategorySlug; label: string; blurb: string; tint: string }[] = [
  { slug: "fragments", label: "Peptide fragments", blurb: "BPC-157 and TB-500", tint: "var(--tint-1)" },
  { slug: "secretagogues", label: "Secretagogues", blurb: "Ipamorelin and CJC-1295", tint: "var(--tint-2)" },
  { slug: "neuropeptides", label: "Neuropeptide analogs", blurb: "Semax and Selank", tint: "var(--tint-3)" },
  { slug: "short-chain", label: "Short-chain peptides", blurb: "GHK-Cu and Epithalon", tint: "var(--tint-4)" },
];

export function getCategory(slug: CategorySlug) {
  return categories.find((c) => c.slug === slug)!;
}

export const products: CatalogItem[] = [
  {
    sku: "AC-BPC-5",
    name: "BPC-157",
    size: "5 mg",
    priceCents: 3900,
    description: DESCRIPTION,
    category: "fragments",
  },
  {
    sku: "AC-TB-5",
    name: "TB-500",
    size: "5 mg",
    priceCents: 4700,
    description: DESCRIPTION,
    category: "fragments",
  },
  {
    sku: "AC-IPA-5",
    name: "Ipamorelin",
    size: "5 mg",
    priceCents: 3300,
    description: DESCRIPTION,
    category: "secretagogues",
  },
  {
    sku: "AC-CJC-5",
    name: "CJC-1295 (no DAC)",
    size: "5 mg",
    priceCents: 3500,
    description: DESCRIPTION,
    category: "secretagogues",
  },
  {
    sku: "AC-GHK-50",
    name: "GHK-Cu",
    size: "50 mg",
    priceCents: 4100,
    description: DESCRIPTION,
    category: "short-chain",
  },
  {
    sku: "AC-EPI-10",
    name: "Epithalon",
    size: "10 mg",
    priceCents: 2900,
    description: DESCRIPTION,
    category: "short-chain",
  },
  {
    sku: "AC-SEM-10",
    name: "Semax",
    size: "10 mg",
    priceCents: 3100,
    description: DESCRIPTION,
    category: "neuropeptides",
  },
  {
    sku: "AC-SEL-10",
    name: "Selank",
    size: "10 mg",
    priceCents: 2800,
    description: DESCRIPTION,
    category: "neuropeptides",
  },
];

export function getProduct(sku: string): CatalogItem | undefined {
  return products.find((item) => item.sku === sku);
}

export function demoPrice(cents: number): string {
  const dollars = Math.floor(cents / 100);
  const remainder = cents % 100;
  const padded = String(remainder).padStart(2, "0");
  return `DEMO $${dollars}.${padded}`;
}

export function priceAmount(cents: number): string {
  return demoPrice(cents).replace("DEMO ", "");
}
