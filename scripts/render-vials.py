"""Original studio renders of the eight catalog vials. Not copied photos."""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "products"
W, H = 1000, 1250
CX = W / 2.0

ITEMS = [
    ("AC-BPC-5", "BPC-157", "5 mg"),
    ("AC-TB-5", "TB-500", "5 mg"),
    ("AC-IPA-5", "Ipamorelin", "5 mg"),
    ("AC-CJC-5", "CJC-1295 (no DAC)", "5 mg"),
    ("AC-GHK-50", "GHK-Cu", "50 mg"),
    ("AC-EPI-10", "Epithalon", "10 mg"),
    ("AC-SEM-10", "Semax", "10 mg"),
    ("AC-SEL-10", "Selank", "10 mg"),
]

FONT = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"


def half_width(y: np.ndarray) -> np.ndarray:
    neck_bot = 418.0
    shoulder_bot = 505.0
    straight_bot = 1048.0
    body_bot = 1102.0
    body_half = 156.0
    neck_half = 54.0
    bottom_r = body_bot - straight_bot
    hw = np.zeros_like(y, dtype=np.float32)
    neck = (y >= 352.0) & (y <= neck_bot)
    hw = np.where(neck, neck_half, hw)
    shoulder = (y > neck_bot) & (y <= shoulder_bot)
    t = np.clip((y - neck_bot) / (shoulder_bot - neck_bot), 0.0, 1.0)
    t = t * t * (3.0 - 2.0 * t)
    hw = np.where(shoulder, neck_half + (body_half - neck_half) * t, hw)
    straight = (y > shoulder_bot) & (y <= straight_bot)
    hw = np.where(straight, body_half, hw)
    bottom = (y > straight_bot) & (y <= body_bot)
    dy = np.clip((y - straight_bot) / bottom_r, 0.0, 1.0)
    hw = np.where(bottom, body_half * np.sqrt(np.clip(1.0 - dy * dy, 0.0, 1.0)), hw)
    return hw


def render_glass() -> Image.Image:
    yy, xx = np.mgrid[0:H, 0:W]
    y = yy.astype(np.float32)
    x = xx.astype(np.float32)
    hw = half_width(y)
    dist = hw - np.abs(x - CX)
    coverage = np.where(hw > 0.5, np.clip(dist + 0.85, 0.0, 1.0), 0.0)
    rel = (x - CX) / np.maximum(hw, 1.0)
    rim = np.clip(1.0 - np.abs(dist - 1.15) / 1.7, 0.0, 1.0)
    refract = np.clip(1.0 - np.abs(dist - 5.2) / 2.4, 0.0, 1.0)
    shade = 0.62 + 0.38 * (1.0 - np.clip(np.abs(rel), 0.0, 1.0) ** 1.35)
    spec = np.exp(-((rel + 0.30) ** 2) / (2.0 * 0.055**2))
    spec2 = 0.45 * np.exp(-((rel - 0.58) ** 2) / (2.0 * 0.028**2))
    br = 206.0 * shade + 255.0 * spec * 0.92 + 255.0 * spec2 + 255.0 * refract * 0.42
    bg = 214.0 * shade + 255.0 * spec * 0.92 + 255.0 * spec2 + 255.0 * refract * 0.42
    bb = 222.0 * shade + 255.0 * spec * 0.88 + 250.0 * spec2 + 255.0 * refract * 0.36
    br = br * (1.0 - 0.62 * rim) + 62.0 * rim
    bg = bg * (1.0 - 0.62 * rim) + 70.0 * rim
    bb = bb * (1.0 - 0.58 * rim) + 78.0 * rim
    rgb = np.dstack(
        [
            np.clip(br, 0, 255),
            np.clip(bg, 0, 255),
            np.clip(bb, 0, 255),
            coverage * 255.0,
        ]
    ).astype(np.uint8)
    return Image.fromarray(rgb, "RGBA")


def render_cap() -> Image.Image:
    yy, xx = np.mgrid[0:H, 0:W]
    y = yy.astype(np.float32)
    x = xx.astype(np.float32)
    cap_top = 236.0
    cap_bot = 348.0
    cap_half = 70.0
    skirt = np.clip((y - 322.0) / 26.0, 0.0, 1.0)
    hw = cap_half + skirt * 10.0
    wall = (y >= cap_top) & (y <= cap_bot)
    dist = np.where(wall, hw - np.abs(x - CX), -1.0)
    top_ry = 15.0
    top = ((y - cap_top) / top_ry) ** 2 + ((x - CX) / cap_half) ** 2 <= 1.0
    top = top & (y <= cap_top + 2)
    coverage = np.clip(np.maximum(dist, np.where(top, 2.0, -1.0)) + 0.8, 0.0, 1.0)
    rel = (x - CX) / cap_half
    ridge = 0.5 + 0.5 * np.sin(y * 1.35)
    spec = np.exp(-((rel + 0.34) ** 2) / (2.0 * 0.06**2))
    shade = 0.55 + 0.45 * (1.0 - np.clip(np.abs(rel), 0.0, 1.0) ** 1.2)
    metal = (148.0 + 34.0 * ridge) * shade + 90.0 * spec
    top_face = top & (y < cap_top)
    metal = np.where(top_face, 188.0 + 28.0 * (1.0 - np.abs(rel)), metal)
    rim = np.clip(1.0 - np.abs(dist - 1.0) / 1.5, 0.0, 1.0)
    metal = metal * (1.0 - 0.45 * rim) + 96.0 * rim
    rgb = np.dstack(
        [
            np.clip(metal + 6.0, 0, 255),
            np.clip(metal + 8.0, 0, 255),
            np.clip(metal + 10.0, 0, 255),
            coverage * 255.0,
        ]
    ).astype(np.uint8)
    return Image.fromarray(rgb, "RGBA")


def render_stopper() -> Image.Image:
    yy, xx = np.mgrid[0:H, 0:W]
    y = yy.astype(np.float32)
    x = xx.astype(np.float32)
    hw = np.where((y >= 336.0) & (y <= 372.0), 48.0, 0.0)
    dist = hw - np.abs(x - CX)
    coverage = np.where(hw > 0.5, np.clip(dist + 0.8, 0.0, 1.0), 0.0)
    rel = np.abs(x - CX) / 48.0
    tone = 58.0 + 18.0 * (1.0 - np.clip(rel, 0.0, 1.0))
    rgb = np.dstack(
        [
            np.full_like(tone, tone),
            np.full_like(tone, tone + 2.0),
            np.full_like(tone, tone + 4.0),
            coverage * 255.0,
        ]
    ).astype(np.uint8)
    return Image.fromarray(rgb, "RGBA")


def render_powder(rng: np.random.Generator) -> Image.Image:
    yy, xx = np.mgrid[0:H, 0:W]
    y = yy.astype(np.float32)
    x = xx.astype(np.float32)
    hw = half_width(y)
    dist = hw - np.abs(x - CX)
    rel = (x - CX) / np.maximum(hw, 1.0)
    powder_top = 980.0
    bulge = 26.0 * np.sqrt(np.clip(1.0 - np.clip(rel, -1.0, 1.0) ** 2, 0.0, 1.0))
    inside = dist > 7.0
    mound = inside & (y >= powder_top - bulge) & (y <= 1096.0)
    coverage = np.clip(np.where(mound, np.minimum(dist - 6.0, 8.0) / 8.0, 0.0), 0.0, 1.0)
    grain = rng.normal(0.0, 3.5, (H, W)).astype(np.float32)
    depth = np.clip((y - 960.0) / 140.0, 0.0, 1.0)
    tone = 236.0 - 14.0 * depth + grain
    rgb = np.dstack(
        [
            np.clip(tone, 0, 255),
            np.clip(tone + 1.0, 0, 255),
            np.clip(tone - 1.0, 0, 255),
            coverage * 255.0,
        ]
    ).astype(np.uint8)
    return Image.fromarray(rgb, "RGBA")


def fit_font(text: str, max_width: int, start: int, bold: bool) -> ImageFont.FreeTypeFont:
    path = FONT_BOLD if bold else FONT
    size = start
    while size > 14:
        font = ImageFont.truetype(path, size)
        if font.getlength(text) <= max_width:
            return font
        size -= 1
    return ImageFont.truetype(path, 14)


def render_label(name: str, size: str, sku: str) -> Image.Image:
    label = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(label)
    left = int(CX - 118)
    right = int(CX + 118)
    top = 590
    bot = 860
    draw.rectangle([left, top, right, bot], fill=(255, 255, 255, 245))
    draw.rectangle([left, top, left + 10, bot], fill=(31, 78, 121, 255))
    draw.rectangle([left, top, right, top + 1], fill=(230, 232, 236, 255))
    draw.rectangle([left, bot - 1, right, bot], fill=(230, 232, 236, 255))
    text_left = left + 22
    text_width = right - text_left - 12
    lines: list[tuple[str, bool, int]] = []
    if " (" in name:
        head, tail = name.split(" (", 1)
        lines.append((head, True, 40))
        lines.append(("(" + tail, True, 28))
    else:
        lines.append((name, True, 42))
    lines.append((size, False, 26))
    lines.append(("Research use only", False, 18))
    lines.append((sku, False, 16))
    y = top + 28
    for text, bold, start in lines:
        font = fit_font(text, text_width, start, bold)
        fill = (31, 78, 121, 255) if text == sku else (20, 24, 31, 255)
        draw.text((text_left, y), text, font=font, fill=fill)
        y += font.size + (10 if bold else 8)
    arr = np.asarray(label).astype(np.float32)
    xx = np.arange(W, dtype=np.float32)
    rel = (xx - CX) / 118.0
    shade = 0.86 + 0.14 * (1.0 - np.clip(rel, -1.0, 1.0) ** 2)
    arr[:, :, 0] *= shade
    arr[:, :, 1] *= shade
    arr[:, :, 2] *= shade
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


def shadow() -> Image.Image:
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    draw.ellipse([CX - 150, 1092, CX + 150, 1136], fill=(20, 24, 31, 78))
    return layer.filter(ImageFilter.GaussianBlur(14))


def over(base: np.ndarray, layer: Image.Image) -> np.ndarray:
    src = np.asarray(layer).astype(np.float32)
    src_a = src[:, :, 3:4] / 255.0
    dst_a = base[:, :, 3:4] / 255.0
    out_a = src_a + dst_a * (1.0 - src_a)
    out_rgb = src[:, :, :3] * src_a + base[:, :, :3] * dst_a * (1.0 - src_a)
    out_rgb = out_rgb / np.maximum(out_a, 1e-6)
    out = np.dstack([out_rgb, out_a * 255.0])
    return out


def compose(name: str, size: str, sku: str, seed: int) -> Image.Image:
    rng = np.random.default_rng(seed)
    base = np.zeros((H, W, 4), dtype=np.float32)
    base[:, :, :3] = 255.0
    base[:, :, 3] = 255.0
    for layer in (
        shadow(),
        render_glass(),
        render_powder(rng),
        render_label(name, size, sku),
        render_stopper(),
        render_cap(),
    ):
        base = over(base, layer)
    rgb = base[:, :, :3]
    alpha = base[:, :, 3:4]
    noise = rng.normal(0.0, 1.4, (H, W, 1)).astype(np.float32)
    # Keep the page-white ground clean. Grain stays on the vial only.
    changed = np.any(np.abs(rgb - 255.0) > 2.0, axis=2, keepdims=True)
    rgb = np.where(changed, np.clip(rgb + noise, 0, 255), 255.0)
    out = Image.fromarray(rgb.astype(np.uint8), "RGB")
    return out


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for index, (sku, name, size) in enumerate(ITEMS):
        image = compose(name, size, sku, 1100 + index)
        path = OUT / f"{sku}.png"
        image.save(path, "PNG", optimize=False)
        print(f"{path.name} {path.stat().st_size}")


if __name__ == "__main__":
    main()
