"use client";
import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
  color: string;
}

function hexAlpha(hex: string, a: number) {
  return hex + Math.floor(Math.max(0, Math.min(1, a)) * 255).toString(16).padStart(2, "0");
}

export default function Wallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animId: number;
    let frame = 0;
    let w = 0, h = 0;

    const initParticles = () => {
      particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -Math.random() * 0.32 - 0.05,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.35 + 0.06,
        color: ["#00D4FF", "#7B2FFF", "#00ff80", "#ffffff"][Math.floor(Math.random() * 4)],
      }));
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initParticles();
    };

    const drawAurora = (
      yCenterRatio: number,
      heightRatio: number,
      colorA: string,
      colorB: string,
      phase: number,
      alpha: number,
      freq: number
    ) => {
      const yC = h * yCenterRatio;
      const hh = h * heightRatio;
      const yT = yC - hh / 2;
      const yB = yC + hh / 2;
      const segs = 50;

      const grad = ctx.createLinearGradient(0, yT, 0, yB);
      grad.addColorStop(0,    hexAlpha(colorA, 0));
      grad.addColorStop(0.18, hexAlpha(colorA, alpha * 0.55));
      grad.addColorStop(0.5,  hexAlpha(colorB, alpha));
      grad.addColorStop(0.82, hexAlpha(colorA, alpha * 0.45));
      grad.addColorStop(1,    hexAlpha(colorA, 0));
      ctx.fillStyle = grad;

      ctx.beginPath();
      for (let s = 0; s <= segs; s++) {
        const t = s / segs;
        const x = t * w;
        const y = yT
          + Math.sin(t * Math.PI * freq + phase) * (hh * 0.2)
          + Math.sin(t * Math.PI * freq * 1.9 + phase * 1.4) * (hh * 0.07)
          + Math.sin(t * Math.PI * freq * 0.6 + phase * 0.8) * (hh * 0.05);
        if (s === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      for (let s = segs; s >= 0; s--) {
        const t = s / segs;
        const x = t * w;
        const y = yB
          + Math.sin(t * Math.PI * freq * 0.9 + phase * 0.85 + 1.8) * (hh * 0.17)
          + Math.sin(t * Math.PI * freq * 1.5 + phase * 1.1 + 0.7) * (hh * 0.06);
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      // ── 1. Night sky ───────────────────────────────────────────
      const sky = ctx.createLinearGradient(0, 0, 0, h * 0.70);
      sky.addColorStop(0,   "#010b18");
      sky.addColorStop(0.25,"#021626");
      sky.addColorStop(0.65,"#041d2e");
      sky.addColorStop(1,   "#062030");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h * 0.70);

      // ── 2. Stars ───────────────────────────────────────────────
      for (let i = 0; i < 100; i++) {
        const sx = (Math.sin(i * 13.72 + 1.1)  * 0.5 + 0.5) * w;
        const sy = (Math.sin(i * 29.33 + 0.7)  * 0.5 + 0.5) * h * 0.50;
        const sr = Math.sin(i * 7.11) * 0.3 + 0.6;
        const twk = Math.sin(frame * 0.014 + i * 2.09) * 0.35 + 0.65;
        ctx.globalAlpha = twk * 0.55 * (Math.sin(i * 5.29) * 0.25 + 0.75);
        ctx.fillStyle = i % 9 === 0 ? "#b8deff" : i % 5 === 0 ? "#ffe8b8" : "#ffffff";
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // ── 3. Aurora (screen blend for realism) ──────────────────
      ctx.globalCompositeOperation = "screen";
      const t = frame * 0.0025;
      drawAurora(0.17, 0.46, "#00cc44", "#00ff88", t,            0.30, 3.2);
      drawAurora(0.11, 0.32, "#00ff88", "#00ddaa", t * 1.35 + 1, 0.24, 4.5);
      drawAurora(0.23, 0.28, "#00ffcc", "#11ff77", t * 0.75 + 2, 0.20, 2.6);
      drawAurora(0.07, 0.22, "#00aaff", "#00eeff", t * 1.7  + 3, 0.13, 5.3);
      drawAurora(0.30, 0.18, "#44ff88", "#00cc55", t * 0.55 + 4, 0.17, 6.1);
      drawAurora(0.14, 0.14, "#88ffcc", "#00ff99", t * 2.0  + 5, 0.10, 7.4);
      ctx.globalCompositeOperation = "source-over";

      // ── 4. Distant dark mountain range ───────────────────────
      const mtnBase = h * 0.64;
      ctx.fillStyle = "#081a10";
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, mtnBase + h * 0.03);
      ctx.bezierCurveTo(w * 0.06, mtnBase - h * 0.04, w * 0.13, mtnBase - h * 0.07, w * 0.19, mtnBase + h * 0.01);
      ctx.bezierCurveTo(w * 0.24, mtnBase + h * 0.03, w * 0.29, mtnBase - h * 0.03, w * 0.36, mtnBase - h * 0.06);
      ctx.bezierCurveTo(w * 0.43, mtnBase - h * 0.10, w * 0.49, mtnBase - h * 0.04, w * 0.56, mtnBase + h * 0.01);
      ctx.bezierCurveTo(w * 0.66, mtnBase + h * 0.02, w * 0.76, mtnBase - h * 0.04, w * 0.83, mtnBase - h * 0.05);
      ctx.bezierCurveTo(w * 0.90, mtnBase - h * 0.09, w * 0.95, mtnBase - h * 0.02, w, mtnBase + h * 0.02);
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // ── 5. Aurora ground reflection on mountain tops ─────────
      const mtnGlow = ctx.createLinearGradient(0, mtnBase - h * 0.10, 0, mtnBase + h * 0.02);
      mtnGlow.addColorStop(0, "rgba(0,200,80,0.12)");
      mtnGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = mtnGlow;
      ctx.fillRect(0, mtnBase - h * 0.10, w, h * 0.12);

      // ── 6. Main hill (XP Bliss silhouette) ───────────────────
      const hillPeak = h * 0.595;
      const hillGrad = ctx.createLinearGradient(0, hillPeak - h * 0.04, 0, h);
      hillGrad.addColorStop(0,    "#6ecf6e");
      hillGrad.addColorStop(0.12, "#4ab84a");
      hillGrad.addColorStop(0.35, "#309430");
      hillGrad.addColorStop(0.65, "#1e721e");
      hillGrad.addColorStop(1,    "#0e4a0e");
      ctx.fillStyle = hillGrad;
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(0, hillPeak + h * 0.055);
      ctx.bezierCurveTo(
        w * 0.10, hillPeak + h * 0.018,
        w * 0.26, hillPeak - h * 0.004,
        w * 0.50, hillPeak
      );
      ctx.bezierCurveTo(
        w * 0.74, hillPeak + h * 0.004,
        w * 0.90, hillPeak + h * 0.032,
        w,        hillPeak + h * 0.065
      );
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();

      // Hill rim highlight (aurora light on grass)
      const rimGrad = ctx.createRadialGradient(w * 0.5, hillPeak, 0, w * 0.5, hillPeak, w * 0.52);
      rimGrad.addColorStop(0,   "rgba(100, 230, 140, 0.22)");
      rimGrad.addColorStop(0.4, "rgba(60,  180, 100, 0.08)");
      rimGrad.addColorStop(1,   "rgba(0, 0, 0, 0)");
      ctx.fillStyle = rimGrad;
      ctx.fillRect(0, hillPeak - h * 0.07, w, h * 0.22);

      // ── 7. Horizon atmospheric glow ──────────────────────────
      const horizGrad = ctx.createLinearGradient(0, h * 0.52, 0, h * 0.66);
      horizGrad.addColorStop(0, "rgba(0, 80, 40, 0)");
      horizGrad.addColorStop(0.5, "rgba(0, 100, 50, 0.10)");
      horizGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = horizGrad;
      ctx.fillRect(0, h * 0.52, w, h * 0.14);

      // ── 8. Floating cyberpunk particles (subtle overlay) ─────
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0.02, Math.min(0.42, p.alpha + (Math.random() - 0.5) * 0.008));
        if (p.y < -4 || p.x < -4 || p.x > w + 4) {
          p.x = Math.random() * w;
          p.y = h + 4;
          p.vx = (Math.random() - 0.5) * 0.22;
          p.vy = -Math.random() * 0.32 - 0.05;
        }
        ctx.globalAlpha = p.alpha * 0.55;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(draw);
    };

    resize();
    animId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 45%, rgba(0,0,0,0.40) 100%)",
          }}
        />

        {/* Ultra-subtle scanlines */}
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.016,
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
          }}
        />

        {/* OS watermark */}
        <div
          className="absolute top-3 right-4 text-right select-none"
          style={{ color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}
        >
          <div style={{ fontSize: 10, fontWeight: "bold", letterSpacing: "0.1em" }}>HERO.X OS v1.337</div>
          <div style={{ fontSize: 9 }}>BUILD 2026.05.25</div>
        </div>
      </div>
    </div>
  );
}
