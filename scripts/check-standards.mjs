import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

const forbidden = [
  "organic",
  "natural",
  "fda approved",
  "fda-approved",
  "weight loss",
  "anti-aging",
  "anti aging",
  "cure",
  "treat",
  "healing",
  "injection",
  "reconstitution",
  "dosage",
  "purity",
  "99.45",
  "99%",
  "coa available",
  "free shipping",
  "same-day",
  "same day",
  "northwest",
  "aman",
  "teton",
  "cryoruo",
  "cryotides",
  "llc is filed",
  "registered llc",
];

const allowedHex = new Set(["#f6f1e8", "#1a1814", "#8a6a2f", "#fff", "#ffffff"]);
const demoLine = "Demo catalog. Not a live store. No orders are placed.";
const ruoLine = "For laboratory research use only. Not for human consumption.";
const allowedHuman = "not for human consumption.";

const expected = [
  ["AC-BPC-5", "BPC-157", "5 mg", 3900],
  ["AC-TB-5", "TB-500", "5 mg", 4700],
  ["AC-IPA-5", "Ipamorelin", "5 mg", 3300],
  ["AC-CJC-5", "CJC-1295 (no DAC)", "5 mg", 3500],
  ["AC-GHK-50", "GHK-Cu", "50 mg", 4100],
  ["AC-EPI-10", "Epithalon", "10 mg", 2900],
  ["AC-SEM-10", "Semax", "10 mg", 3100],
  ["AC-SEL-10", "Selank", "10 mg", 2800],
];

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      files.push(...walk(path));
    } else {
      files.push(path);
    }
  }
  return files;
}

function rel(path) {
  return path.slice(root.length + 1);
}

const sourceFiles = ["app", "components", "data"].flatMap((dir) =>
  walk(join(root, dir)),
);

for (const path of sourceFiles) {
  const text = readFileSync(path, "utf8");
  const lower = text.toLowerCase();
  for (const term of forbidden) {
    if (lower.includes(term)) {
      failures.push(`${rel(path)} contains forbidden string: ${term}`);
    }
  }
  const stripped = lower.split(allowedHuman).join(" ");
  if (stripped.includes("for human")) {
    failures.push(`${rel(path)} has a for-human sentence other than the allowed line`);
  }
  if (/\bgradient\b|linear-gradient|radial-gradient|conic-gradient/i.test(text)) {
    failures.push(`${rel(path)} contains a gradient`);
  }
  const hexes = text.match(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})\b/g) || [];
  for (const hex of hexes) {
    if (!allowedHex.has(hex.toLowerCase())) {
      failures.push(`${rel(path)} contains forbidden color ${hex}`);
    }
  }
}

function mustContain(path, sentence) {
  const text = readFileSync(join(root, path), "utf8");
  if (!text.includes(sentence)) {
    failures.push(`${path} is missing: ${sentence}`);
  }
}

for (const path of [
  "app/page.tsx",
  "app/catalog/page.tsx",
  "app/product/[sku]/page.tsx",
]) {
  mustContain(path, demoLine);
  mustContain(path, ruoLine);
}

for (const path of [
  "app/layout.tsx",
  "app/about/page.tsx",
  "app/research-use/page.tsx",
  "app/contact/page.tsx",
  "app/cart/page.tsx",
]) {
  mustContain(path, ruoLine);
}

const cart = readFileSync(join(root, "app/cart/page.tsx"), "utf8");
if (!cart.includes("Checkout disabled on this demo.")) {
  failures.push("cart is missing the disabled checkout label");
}
if (!cart.includes("disabled")) {
  failures.push("cart checkout control is not disabled");
}

const catalog = readFileSync(join(root, "data/catalog.ts"), "utf8");
const skus = [...catalog.matchAll(/sku:\s*"([^"]+)"/g)].map((match) => match[1]);
const names = [...catalog.matchAll(/name:\s*"([^"]+)"/g)].map((match) => match[1]);
const sizes = [...catalog.matchAll(/size:\s*"([^"]+)"/g)].map((match) => match[1]);
const prices = [...catalog.matchAll(/priceCents:\s*(\d+)/g)].map((match) => Number(match[1]));

if (skus.length !== 8) {
  failures.push(`SKU count is ${skus.length}, expected 8`);
}

expected.forEach((row, index) => {
  if (skus[index] !== row[0] || names[index] !== row[1] || sizes[index] !== row[2] || prices[index] !== row[3]) {
    failures.push(`catalog row ${index + 1} is ${skus[index]} / ${names[index]} / ${sizes[index]} / ${prices[index]}`);
  }
});

if (!catalog.includes("Synthetic research peptide. For laboratory research use only.")) {
  failures.push("catalog is missing the one description sentence");
}

const about = readFileSync(join(root, "app/about/page.tsx"), "utf8");
const aboutStrings = [...about.matchAll(/"([^"]{40,})"/g)].map((match) => match[1]);
const aboutCopy = aboutStrings.sort((a, b) => b.length - a.length)[0] || "";
const aboutWords = aboutCopy.trim().split(/\s+/).filter(Boolean).length;
if (aboutWords < 80 || aboutWords > 120) {
  failures.push(`about word count is ${aboutWords}, expected 80 to 120`);
}

const pkg = readFileSync(join(root, "package.json"), "utf8").toLowerCase();
for (const banned of ["stripe", "paypal", "supabase"]) {
  if (pkg.includes(banned)) {
    failures.push(`package.json contains ${banned}`);
  }
}

const config = readFileSync(join(root, "next.config.ts"), "utf8");
for (const required of [
  'output: "export"',
  "trailingSlash: true",
  "unoptimized: true",
  'basePath: "/auric-cryo"',
  'assetPrefix: "/auric-cryo"',
]) {
  if (!config.includes(required)) {
    failures.push(`next.config.ts is missing ${required}`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) {
    console.error(failure);
  }
  process.exit(1);
}

console.log("standards ok");
