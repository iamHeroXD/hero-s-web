"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
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

    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      particles = Array.from({ length: 50 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.45 - 0.08,
        r: Math.random() * 2 + 0.4,
        alpha: Math.random() * 0.45 + 0.08,
        color: Math.random() > 0.5 ? "#00D4FF" : "#7B2FFF",
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      frame++;
      ctx.clearRect(0, 0, w, h);

      // Subtle twinkling stars (deterministic positions)
      for (let i = 0; i < 60; i++) {
        const sx = (Math.sin(i * 17.3) * 0.5 + 0.5) * w;
        const sy = (Math.sin(i * 31.7) * 0.5 + 0.5) * h * 0.55;
        const sr = (Math.sin(i * 11.1) * 0.5 + 0.5) * 1.2 + 0.2;
        const twinkle = Math.sin(frame * 0.02 + i * 1.73) * 0.3 + 0.7;
        ctx.globalAlpha = twinkle * 0.35 * ((Math.sin(i * 7.3) * 0.4) + 0.6);
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(sx, sy, sr * (0.7 + twinkle * 0.3), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Floating cyberpunk particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha = Math.max(0.04, Math.min(0.5, p.alpha + (Math.random() - 0.5) * 0.01));

        if (p.y < -4 || p.x < -4 || p.x > w + 4) {
          p.x = Math.random() * w;
          p.y = h + 4;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = -Math.random() * 0.45 - 0.08;
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
      {/* XP Bliss wallpaper */}
      <Image
        src="/wallpaper.jpg"
        alt="Desktop wallpaper"
        fill
        className="object-cover"
        priority
        quality={95}
        draggable={false}
      />

      {/* Subtle cyberpunk tint overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(5,5,25,0.18) 0%, rgba(0,0,0,0.08) 60%, rgba(5,5,25,0.22) 100%)",
        }}
      />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* UI overlays (non-interactive) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle scanlines */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.4) 3px, rgba(0,0,0,0.4) 4px)",
          }}
        />

        {/* OS version watermark */}
        <div className="absolute top-3 right-3 text-white/50 font-mono text-xs text-right select-none drop-shadow">
          <div>HERO.X OS v1.337</div>
          <div>BUILD: 2026.05.25</div>
        </div>

        {/* Floating ambient orbs */}
        {[
          { x: "12%", y: "18%", color: "#7B2FFF", size: 180 },
          { x: "78%", y: "12%", color: "#00D4FF", size: 130 },
          { x: "50%", y: "65%", color: "#FF006E", size: 90 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}12 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5 + i * 2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
