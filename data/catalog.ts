export const DESCRIPTION =
  "Synthetic research peptide. For laboratory research use only.";

export type CatalogItem = {
  sku: string;
  name: string;
  size: string;
  priceCents: number;
  description: string;
};

export const products: CatalogItem[] = [
  {
    sku: "AC-BPC-5",
    name: "BPC-157",
    size: "5 mg",
    priceCents: 3900,
    description: DESCRIPTION,
  },
  {
    sku: "AC-TB-5",
    name: "TB-500",
    size: "5 mg",
    priceCents: 4700,
    description: DESCRIPTION,
  },
  {
    sku: "AC-IPA-5",
    name: "Ipamorelin",
    size: "5 mg",
    priceCents: 3300,
    description: DESCRIPTION,
  },
  {
    sku: "AC-CJC-5",
    name: "CJC-1295 (no DAC)",
    size: "5 mg",
    priceCents: 3500,
    description: DESCRIPTION,
  },
  {
    sku: "AC-GHK-50",
    name: "GHK-Cu",
    size: "50 mg",
    priceCents: 4100,
    description: DESCRIPTION,
  },
  {
    sku: "AC-EPI-10",
    name: "Epithalon",
    size: "10 mg",
    priceCents: 2900,
    description: DESCRIPTION,
  },
  {
    sku: "AC-SEM-10",
    name: "Semax",
    size: "10 mg",
    priceCents: 3100,
    description: DESCRIPTION,
  },
  {
    sku: "AC-SEL-10",
    name: "Selank",
    size: "10 mg",
    priceCents: 2800,
    description: DESCRIPTION,
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
