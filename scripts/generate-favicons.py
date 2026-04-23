"""
Generate public/favicon.png, public/favico.png, public/favicon.ico from the source logo.
Zoom = center-crop a tighter square from the source, then resize — so the mark fills more of the icon (less padding).
"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

# Crop inner (1/ZOOM) of min side, centered — larger ZOOM => tighter crop => bigger logo in frame
ZOOM = 1.22
OUT_SIZE = 512

ROOT = Path(__file__).resolve().parent.parent
# Prefer committed source under /assets; fall back to Cursor workspace upload path.
SOURCE = ROOT / "assets" / "brand-logo-source.png"
SOURCE_FALLBACK = Path(
    r"C:\Users\Aditya\.cursor\projects\c-Users-Aditya-Documents-automation-sites-tobeetoetech-com\assets"
    r"\c__Users_Aditya_AppData_Roaming_Cursor_User_workspaceStorage_33a2036c5fb3c4ceb7366969e8747395_images_image-6ed03b38-4221-497a-b6b2-d23f2c4ed2f7.png"
)
PUBLIC = ROOT / "public"


def zoom_square(img: Image.Image, out_size: int) -> Image.Image:
    w, h = img.size
    side = min(w, h)
    crop_side = max(1, int(side / ZOOM))
    left = (w - crop_side) // 2
    top = (h - crop_side) // 2
    cropped = img.crop((left, top, left + crop_side, top + crop_side))
    return cropped.resize((out_size, out_size), Image.Resampling.LANCZOS)


def main() -> None:
    src = SOURCE if SOURCE.is_file() else SOURCE_FALLBACK
    if not src.is_file():
        raise SystemExit(f"Source logo not found. Tried:\n  {SOURCE}\n  {SOURCE_FALLBACK}")

    PUBLIC.mkdir(parents=True, exist_ok=True)
    base = Image.open(src).convert("RGBA")
    zoomed = zoom_square(base, OUT_SIZE)

    favicon_png = PUBLIC / "favicon.png"
    favico_png = PUBLIC / "favico.png"
    favicon_ico = PUBLIC / "favicon.ico"

    zoomed.save(favicon_png, "PNG", optimize=True)
    zoomed.save(favico_png, "PNG", optimize=True)

    # Multi-resolution ICO for browsers / Windows
    zoomed.save(
        favicon_ico,
        format="ICO",
        sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64)],
    )

    print("Wrote:", favicon_png, favico_png, favicon_ico, sep="\n  ")


if __name__ == "__main__":
    main()
