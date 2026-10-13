"""Cut the studio vial renders out of their white ground so they sit on the site's navy glow."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter
from PIL import ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "products"
SKUS = ["AC-BPC-5","AC-TB-5","AC-IPA-5","AC-CJC-5","AC-GHK-50","AC-EPI-10","AC-SEM-10","AC-SEL-10"]

for sku in SKUS:
    src = Image.open(OUT / f"{sku}.png").convert("RGB")
    a = np.asarray(src).astype(np.int16)
    light = (a.min(axis=2) > 236) & ((a.max(axis=2) - a.min(axis=2)) < 10)
    m = Image.fromarray(np.where(light, 128, 0).astype(np.uint8)).copy()
    h, w = light.shape
    for x, y in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1)]:
        if m.getpixel((x, y)) == 128:
            ImageDraw.floodfill(m, (x, y), 255)
    bg = np.asarray(m) == 255
    # Drop the pale floor-shadow fringe under the base.
    rows = np.where((~bg).any(axis=1))[0]
    y0 = int(rows.max() - (rows.max() - rows.min()) * 0.03)
    fringe = np.zeros_like(bg)
    fringe[y0:] = (a[y0:].min(axis=2) > 200)
    bg = bg | fringe
    # Clip shadow wisps that spread wider than the vial body.
    mid = (rows.min() + rows.max()) // 2
    cols = np.where(~bg[mid])[0]
    y1 = int(rows.max() - (rows.max() - rows.min()) * 0.12)
    bg[y1:, : cols.min() + 2] = True
    bg[y1:, cols.max() - 1 :] = True
    alpha = Image.fromarray(np.where(bg, 0, 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    rgba = src.copy(); rgba.putalpha(alpha)
    rgba.save(OUT / f"{sku}.png", optimize=True)
    rgba.save(OUT / f"{sku}.webp", quality=90, method=6)
    rgba.resize((600, 600), Image.LANCZOS).save(OUT / f"{sku}-600.webp", quality=88, method=6)
    print(sku, "ok")
