"""Original studio shots on a clear ground. Label text stays readable. Not a copied photo."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "products"
W, H = 1000, 1250
SUP = "/System/Library/Fonts/Supplemental"
SERIF = f"{SUP}/Didot.ttc"
SANS = "/System/Library/Fonts/Helvetica.ttc"
SANS_BOLD = f"{SUP}/Arial Bold.ttf"

CX = 500.0
BODY_R = 196.0
NECK_R = 52.0
CAP_R = 78.0
SH_Y = 390.0
BODY_Y1 = 1040.0
BASE_Y = 1104.0
NECK_Y0, NECK_Y1 = 268.0, 330.0

ITEMS = [
    ("AC-BPC-5", "BPC-157", "5 mg", "navy"),
    ("AC-TB-5", "TB-500", "5 mg", "ink"),
    ("AC-IPA-5", "Ipamorelin", "5 mg", "paper"),
    ("AC-CJC-5", "CJC-1295", "5 mg", "navy"),
    ("AC-GHK-50", "GHK-Cu", "50 mg", "paper"),
    ("AC-EPI-10", "Epithalon", "10 mg", "ink"),
    ("AC-SEM-10", "Semax", "10 mg", "navy"),
    ("AC-SEL-10", "Selank", "10 mg", "paper"),
]
NOTES = {"AC-CJC-5": "(no DAC)"}


def font(path: str, size: int, index: int = 0) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size, index=index)


def glass_half(y: np.ndarray) -> np.ndarray:
    hw = np.zeros_like(y, dtype=np.float32)
    neck = (y >= NECK_Y0) & (y <= NECK_Y1)
    hw = np.where(neck, NECK_R, hw)
    shoulder = (y > NECK_Y1) & (y <= SH_Y)
    t = np.clip((y - NECK_Y1) / (SH_Y - NECK_Y1), 0.0, 1.0)
    t = t * t * (3.0 - 2.0 * t)
    hw = np.where(shoulder, NECK_R + (BODY_R - NECK_R) * t, hw)
    body = (y > SH_Y) & (y <= BODY_Y1)
    hw = np.where(body, BODY_R, hw)
    bottom = (y > BODY_Y1) & (y <= BASE_Y)
    dy = np.clip((y - BODY_Y1) / (BASE_Y - BODY_Y1), 0.0, 1.0)
    hw = np.where(bottom, BODY_R * np.sqrt(np.clip(1.0 - dy * dy, 0.0, 1.0)), hw)
    return hw


def make_label(name: str, size: str, note: str, kind: str) -> Image.Image:
    lw, lh = 520, 620
    plate = Image.new("RGBA", (lw, lh), (0, 0, 0, 0))
    draw = ImageDraw.Draw(plate)
    if kind == "paper":
        field, ink, mute = (246, 247, 248, 255), (20, 24, 31, 255), (31, 78, 121, 255)
    elif kind == "ink":
        field, ink, mute = (20, 24, 31, 255), (255, 255, 255, 255), (230, 232, 236, 255)
    else:
        field, ink, mute = (31, 78, 121, 255), (255, 255, 255, 255), (230, 232, 236, 255)
    draw.rectangle((8, 8, lw - 9, lh - 9), fill=field)

    def center(text: str, face: ImageFont.FreeTypeFont, y: int, fill: tuple[int, int, int, int]) -> None:
        box = draw.textbbox((0, 0), text, font=face)
        x = (lw - (box[2] - box[0])) // 2
        draw.text((x, y), text, font=face, fill=fill)

    center("AURIC", font(SANS, 28), 48, mute)
    name_px = 72 if len(name) <= 8 else 52
    center(name, font(SERIF, name_px), 168, ink)
    y = 280
    if note:
        center(note, font(SERIF, 36), y, ink)
        y = 332
    center(size, font(SANS_BOLD, 44), y + 24, ink)
    center("Research use only", font(SANS, 24), lh - 78, mute)
    return plate


def render(sku: str, name: str, size: str, kind: str) -> Image.Image:
    yy, xx = np.mgrid[0:H, 0:W]
    y = yy.astype(np.float32)
    x = xx.astype(np.float32)
    hw = glass_half(y)
    dist = hw - np.abs(x - CX)
    glass = hw > 0.5
    rel = (x - CX) / np.maximum(hw, 1.0)
    alpha = np.where(glass, np.clip(dist + 0.8, 0.0, 1.0), 0.0)

    shade = 0.55 + 0.45 * (1.0 - np.clip(np.abs(rel), 0.0, 1.0) ** 1.2)
    spec = np.exp(-((rel + 0.34) ** 2) / (2.0 * 0.035**2))
    rim = np.clip(1.0 - dist / 2.2, 0.0, 1.0) * glass
    br = 214.0 * shade + 255.0 * spec
    bg = 220.0 * shade + 255.0 * spec
    bb = 228.0 * shade + 255.0 * spec
    br = br * (1 - 0.82 * rim) + 28.0 * rim
    bg = bg * (1 - 0.82 * rim) + 36.0 * rim
    bb = bb * (1 - 0.72 * rim) + 52.0 * rim

    # Cake stays inside the glass. The outline is still the bottle.
    cake = glass & (y > 930) & (y < BASE_Y - 8) & (dist > 6)
    cake_tone = 232.0 - 16.0 * np.clip(np.abs(rel), 0, 1)
    br = np.where(cake, cake_tone, br)
    bg = np.where(cake, cake_tone + 1, bg)
    bb = np.where(cake, cake_tone + 3, bb)

    label = np.asarray(make_label(name, size, NOTES.get(sku, ""), kind)).astype(np.float32)
    lh, lw = label.shape[:2]
    face = glass & (y > 430) & (y < 980) & (np.abs(rel) < 0.78) & (dist > 8)
    u = (rel / 0.78 + 1.0) * 0.5
    v = (y - 430.0) / (980.0 - 430.0)
    ui = np.clip((u * (lw - 1)).astype(np.int32), 0, lw - 1)
    vi = np.clip((v * (lh - 1)).astype(np.int32), 0, lh - 1)
    sampled = label[vi, ui]
    wrap = 0.82 + 0.18 * (1.0 - rel**2)
    tint = sampled[:, :, :3] * wrap[:, :, None]
    plate = (sampled[:, :, 3] / 255.0) * face
    br = br * (1 - plate) + tint[:, :, 0] * plate
    bg = bg * (1 - plate) + tint[:, :, 1] * plate
    bb = bb * (1 - plate) + tint[:, :, 2] * plate

    rgb = np.dstack([br, bg, bb])

    # Crimp seen from just above: an ellipse, then a short aluminum skirt.
    cap_cy = 214.0
    cap_ell = ((x - CX) / CAP_R) ** 2 + ((y - cap_cy) / 28.0) ** 2 <= 1.0
    btn = ((x - CX) / 46.0) ** 2 + ((y - (cap_cy - 1)) / 16.0) ** 2 <= 1.0
    skirt = (y >= 228) & (y <= 278) & (np.abs(x - CX) <= CAP_R - 2)
    metal_rel = (x - CX) / CAP_R
    metal = 0.42 + 0.48 * (1 - np.clip(np.abs(metal_rel), 0, 1) ** 1.05)
    spec_m = np.exp(-((metal_rel + 0.22) ** 2) / 0.01)
    for channel, base in enumerate((168.0, 174.0, 182.0)):
        tone = np.clip(base * metal + 255.0 * spec_m, 0, 255)
        rgb[:, :, channel] = np.where(skirt | (cap_ell & ~btn), tone, rgb[:, :, channel])
        alpha = np.where(skirt | cap_ell, 1.0, alpha)

    if kind == "paper":
        color = np.array([242.0, 243.0, 244.0])
    elif kind == "ink":
        color = np.array([28.0, 32.0, 38.0])
    else:
        color = np.array([31.0, 78.0, 121.0])
    btn_shade = 0.72 + 0.28 * (1 - np.clip(np.abs((x - CX) / 46.0), 0, 1))
    for channel in range(3):
        rgb[:, :, channel] = np.where(btn, color[channel] * btn_shade, rgb[:, :, channel])

    image = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB")
    mask = Image.fromarray((np.clip(alpha, 0, 1) * 255).astype(np.uint8), "L")
    cut = image.convert("RGBA")
    cut.putalpha(mask)

    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).ellipse((CX - 150, 1088, CX + 150, 1136), fill=(20, 24, 31, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    return Image.alpha_composite(shadow, cut)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for sku, name, size, kind in ITEMS:
        image = render(sku, name, size, kind)
        path = OUT / f"{sku}.png"
        image.save(path, "PNG", optimize=True)
        print(sku, path.stat().st_size)


if __name__ == "__main__":
    main()
