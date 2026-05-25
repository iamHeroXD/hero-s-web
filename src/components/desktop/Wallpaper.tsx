"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
}

const BUILDINGS = [
  [0,    0.70, 0.08, 0.35], [0.07, 0.72, 0.06, 0.30], [0.12, 0.65, 0.04, 0.40],
  [0.15, 0.70, 0.07, 0.32], [0.21, 0.60, 0.05, 0.45], [0.25, 0.68, 0.08, 0.35],
  [0.32, 0.55, 0.04, 0.50], [0.35, 0.62, 0.09, 0.42], [0.43, 0.58, 0.06, 0.47],
  [0.48, 0.65, 0.07, 0.38], [0.54, 0.52, 0.05, 0.53], [0.58, 0.60, 0.08, 0.43],
  [0.65, 0.56, 0.06, 0.48], [0.70, 0.62, 0.09, 0.40], [0.78, 0.58, 0.05, 0.47],
  [0.82, 0.65, 0.08, 0.37], [0.89, 0.70, 0.06, 0.32], [0.94, 0.72, 0.06, 0.30],
];

const EDGE_COLORS = ["#00D4FF", "#7B2FFF", "#FF006E", "#00FF41"];

export default function Wallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Offscreen canvas for static background (sky + buildings + grid)
    const bg = document.createElement("canvas");
    let particles: Particle[] = [];
    let animId: number;
    let frame = 0;

    const drawBackground = () => {
      const w = bg.width;
      const h = bg.height;
      const bgCtx = bg.getContext("2d")!;

      const skyGrad = bgCtx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0,    "#0a0a2e");
      skyGrad.addColorStop(0.3,  "#0d1b4e");
      skyGrad.addColorStop(0.6,  "#1a4a8a");
      skyGrad.addColorStop(0.85, "#2680c0");
      skyGrad.addColorStop(1,    "#1a3a6e");
      bgCtx.fillStyle = skyGrad;
      bgCtx.fillRect(0, 0, w, h);

      // Buildings
      bgCtx.fillStyle = "#050520";
      BUILDINGS.forEach(([bx, by, bw, bh]) => {
        bgCtx.fillRect(bx * w, by * h, bw * w, bh * h);
      });

      // Neon outlines on top edges
      bgCtx.globalAlpha = 0.45;
      BUILDINGS.forEach(([bx, by, bw], i) => {
        bgCtx.strokeStyle = EDGE_COLORS[i % EDGE_COLORS.length];
        bgCtx.lineWidth = 1;
        bgCtx.beginPath();
        bgCtx.moveTo(bx * w, by * h);
        bgCtx.lineTo((bx + bw) * w, by * h);
        bgCtx.stroke();
      });
      bgCtx.globalAlpha = 1;

      // Ground glow
      const groundGlow = bgCtx.createLinearGradient(0, h * 0.75, 0, h);
      groundGlow.addColorStop(0,   "rgba(0, 212, 255, 0.2)");
      groundGlow.addColorStop(0.5, "rgba(0, 100, 200, 0.15)");
      groundGlow.addColorStop(1,   "rgba(0, 0, 50, 0.8)");
      bgCtx.fillStyle = groundGlow;
      bgCtx.fillRect(0, h * 0.75, w, h * 0.25);

      // Cyber grid
      bgCtx.globalAlpha = 0.15;
      bgCtx.strokeStyle = "#00D4FF";
      bgCtx.lineWidth = 0.5;
      for (let i = 0; i < 10; i++) {
        const y = h * (0.8 + i * 0.025);
        bgCtx.beginPath(); bgCtx.moveTo(0, y); bgCtx.lineTo(w, y); bgCtx.stroke();
      }
      for (let i = 0; i <= 20; i++) {
        const x = (i / 20) * w;
        bgCtx.beginPath(); bgCtx.moveTo(x, h * 0.78); bgCtx.lineTo(w / 2, h * 0.95); bgCtx.stroke();
      }
      bgCtx.globalAlpha = 1;
    };

    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      particles = Array.from({ length: 55 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.72,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.35 - 0.05,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5 ? "#00D4FF" : "#7B2FFF",
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      bg.width = canvas.width;
      bg.height = canvas.height;
      drawBackground();
      initParticles();
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      frame++;

      // Static scene
      ctx.drawImage(bg, 0, 0);

      // Twinkling stars (deterministic positions via sin seeding)
      for (let i = 0; i < 180; i++) {
        const sx = (Math.sin(i * 17.3) * 0.5 + 0.5) * w;
        const sy = (Math.sin(i * 31.7) * 0.5 + 0.5) * h * 0.58;
        const sr = (Math.sin(i * 11.1) * 0.5 + 0.5) * 1.4 + 0.2;
        const twinkle = Math.sin(frame * 0.025 + i * 1.73) * 0.35 + 0.65;
        ctx.globalAlpha = twinkle * ((Math.sin(i * 7.3) * 0.4) + 0.6);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(sx, sy, sr * (0.7 + twinkle * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Animate particles (floating upward)
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0.05, Math.min(0.75, p.alpha + (Math.random() - 0.5) * 0.015));

        if (p.y < -4 || p.x < -4 || p.x > w + 4) {
          p.x = Math.random() * w;
          p.y = h * 0.65 + Math.random() * h * 0.12;
          p.vx = (Math.random() - 0.5) * 0.25;
          p.vy = -Math.random() * 0.35 - 0.05;
        }

        ctx.globalAlpha = p.alpha;
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
        {/* Subtle scanlines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)",
          }}
        />

        {/* OS version watermark */}
        <div className="absolute top-3 right-3 text-cyan-400/35 font-mono text-xs text-right select-none">
          <div>HERO.X OS v1.337</div>
          <div>BUILD: 2025.05.25</div>
        </div>

        {/* Floating ambient orbs */}
        {[
          { x: "15%", y: "20%", color: "#7B2FFF", size: 220 },
          { x: "75%", y: "15%", color: "#00D4FF", size: 160 },
          { x: "45%", y: "58%", color: "#FF006E", size: 110 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}18 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
