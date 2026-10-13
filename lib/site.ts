// Plain <img> tags do not get basePath, so asset URLs carry it themselves.
export const BASE = "/auric-cryo";

export function vialSrc(sku: string, small = false) {
  return `${BASE}/products/${sku}${small ? "-600" : ""}.webp`;
}
