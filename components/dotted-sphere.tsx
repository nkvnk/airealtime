"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type SpherePoint = { x: number; y: number; z: number };

type DottedSphereProps = {
  color?: string;
  density?: number;
  speed?: number;
};

function useResizeObserver<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [rect, setRect] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      setRect({ width: Math.max(1, r.width), height: Math.max(1, r.height) });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, rect };
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Canvas 2D のドット球アバター。
 * - three.js なし
 * - Fibonacci sphere + 簡易パース
 */
export function DottedSphere({
  color = "#22c55e",
  density = 1400,
  speed = 0.55,
}: DottedSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { ref: wrapRef, rect } = useResizeObserver<HTMLDivElement>();

  // 単位球上の点群を事前計算
  const points = useMemo<SpherePoint[]>(() => {
    const pts: SpherePoint[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < density; i++) {
      const t = i / (density - 1 || 1);
      const y = 1 - 2 * t;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      pts.push({ x, y, z });
    }
    return pts;
  }, [density]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let last = performance.now();
    let rot = 0;

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      rot += dt * speed;

      const { width, height } = rect;
      const dpr = Math.max(1, Math.min(2.5, window.devicePixelRatio || 1));
      const w = Math.max(1, Math.floor(width * dpr));
      const h = Math.max(1, Math.floor(height * dpr));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.34;

      // コアのグロー
      ctx.save();
      ctx.globalAlpha = 0.18;
      const g = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.1,
        cx,
        cy,
        radius * 0.98
      );
      g.addColorStop(0, color);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // パース設定
      const camZ = 3.2;
      const persp = (z: number) => 1 / (camZ - z);

      const sin = Math.sin(rot);
      const cos = Math.cos(rot);

      const projected = points
        .map((p) => {
          const x = p.x * cos + p.z * sin;
          const z = -p.x * sin + p.z * cos;
          const y = p.y;

          const k = persp(z);
          const px = cx + x * radius * k;
          const py = cy + y * radius * k;

          const depth = clamp((z + 1) / 2, 0, 1);
          const size = (0.75 + 1.35 * k) * dpr;
          const alpha = 0.18 + 0.55 * k;

          return { px, py, z, k, depth, size, alpha, x, y };
        })
        .sort((a, b) => a.z - b.z);

      const edgeR = radius * 0.98;
      ctx.lineCap = "round";

      for (const q of projected) {
        const dx = q.px - cx;
        const dy = q.py - cy;
        const pr = Math.hypot(dx, dy) || 1;
        const edge = clamp((pr - edgeR * 0.78) / (edgeR * 0.22), 0, 1);

        // ドット
        ctx.globalAlpha = clamp(
          q.alpha * (0.6 + 0.5 * (1 - q.depth)),
          0.05,
          0.95
        );
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(
          q.px,
          q.py,
          q.size * (0.35 + 0.45 * (1 - q.depth)),
          0,
          Math.PI * 2
        );
        ctx.fill();

        // 外周の「スパイク」風ストローク
        if (edge > 0.01) {
          const ux = dx / pr;
          const uy = dy / pr;
          const len = (2.2 + 6.2 * edge) * dpr;
          ctx.globalAlpha = clamp(0.08 + edge * 0.22, 0.04, 0.38);
          ctx.strokeStyle = color;
          ctx.lineWidth = (0.5 + edge * 1.2) * dpr;
          ctx.beginPath();
          ctx.moveTo(
            q.px + ux * (q.size * 0.3),
            q.py + uy * (q.size * 0.3)
          );
          ctx.lineTo(q.px + ux * len, q.py + uy * len);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [points, rect.height, rect.width, speed, color]);

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* 薄いリングハイライト */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[72%] w-[72%] rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_0_40px_rgba(33,215,90,0.12)]" />
      </div>
    </div>
  );
}


