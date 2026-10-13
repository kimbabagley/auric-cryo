"use client";

import { useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import { Icon } from "./icons";
import { Vial } from "./vial";

type View = "vial" | "label" | "coa";

export function Gallery({ sku, name, tint, size }: { sku: string; name: string; tint: string; size: string }) {
  const [view, setView] = useState<View>("vial");
  const [zoom, setZoom] = useState<CSSProperties | null>(null);

  function move(e: MouseEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setZoom({ transformOrigin: `${x}% ${y}%`, transform: "scale(1.7)" });
  }

  return (
    <div className="gallery">
      <div
        className={`gallery-main glow view-${view}`}
        data-tint={tint}
        onMouseMove={view === "coa" ? undefined : move}
        onMouseLeave={() => setZoom(null)}
      >
        {view === "coa" ? (
          <div className="coa-card">
            <Icon name="doc" size={28} />
            <p className="coa-title">Certificate of analysis</p>
            <p>A COA is not included on this demo. A live store would attach the lab report for each lot here.</p>
          </div>
        ) : (
          <div className="gallery-img" style={zoom ?? undefined}>
            <Vial sku={sku} name={name} small={false} eager />
          </div>
        )}
        <span className="gallery-badge">{size} vial</span>
        {view !== "coa" ? <span className="gallery-hint">Hover to zoom</span> : null}
      </div>
      <div className="thumbs" role="group" aria-label="Product views">
        {(["vial", "label", "coa"] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            className={`thumb-btn glow view-${v}`}
            aria-pressed={view === v}
            aria-label={v === "vial" ? "Full vial" : v === "label" ? "Label close-up" : "Certificate of analysis"}
            data-tint={tint}
            onClick={() => setView(v)}
          >
            {v === "coa" ? <span className="thumb-coa">COA</span> : <Vial sku={sku} name="" />}
          </button>
        ))}
      </div>
    </div>
  );
}
