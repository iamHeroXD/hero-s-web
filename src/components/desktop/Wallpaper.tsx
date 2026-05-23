"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Wallpaper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Sky gradient (XP + cyber)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#0a0a2e");
      skyGrad.addColorStop(0.3, "#0d1b4e");
      skyGrad.addColorStop(0.6, "#1a4a8a");
      skyGrad.addColorStop(0.85, "#2680c0");
      skyGrad.addColorStop(1, "#1a3a6e");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Stars
      ctx.save();
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h * 0.6;
        const r = Math.random() * 1.5;
        const alpha = Math.random() * 0.8 + 0.2;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Cyber city silhouette
      ctx.save();
      ctx.fillStyle = "#050520";
      const buildings = [
        [0, 0.7, 0.08, 0.35],
        [0.07, 0.72, 0.06, 0.3],
        [0.12, 0.65, 0.04, 0.4],
        [0.15, 0.7, 0.07, 0.32],
        [0.21, 0.6, 0.05, 0.45],
        [0.25, 0.68, 0.08, 0.35],
        [0.32, 0.55, 0.04, 0.5],
        [0.35, 0.62, 0.09, 0.42],
        [0.43, 0.58, 0.06, 0.47],
        [0.48, 0.65, 0.07, 0.38],
        [0.54, 0.52, 0.05, 0.53],
        [0.58, 0.6, 0.08, 0.43],
        [0.65, 0.56, 0.06, 0.48],
        [0.70, 0.62, 0.09, 0.4],
        [0.78, 0.58, 0.05, 0.47],
        [0.82, 0.65, 0.08, 0.37],
        [0.89, 0.7, 0.06, 0.32],
        [0.94, 0.72, 0.06, 0.3],
      ];

      buildings.forEach(([bx, by, bw, bh]) => {
        ctx.fillRect(bx * w, by * h, bw * w, bh * h);
      });
      ctx.restore();

      // Neon glow on buildings
      ctx.save();
      ctx.globalAlpha = 0.4;
      buildings.forEach(([bx, by, bw]) => {
        const colors = ["#00D4FF", "#7B2FFF", "#FF006E", "#00FF41"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const grd = ctx.createLinearGradient(bx * w, by * h, (bx + bw) * w, by * h);
        grd.addColorStop(0, color);
        grd.addColorStop(1, "transparent");
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx * w, by * h, bw * w, 0.3 * h);
      });
      ctx.restore();

      // Ground glow
      ctx.save();
      const groundGlow = ctx.createLinearGradient(0, h * 0.75, 0, h);
      groundGlow.addColorStop(0, "rgba(0, 212, 255, 0.2)");
      groundGlow.addColorStop(0.5, "rgba(0, 100, 200, 0.15)");
      groundGlow.addColorStop(1, "rgba(0, 0, 50, 0.8)");
      ctx.fillStyle = groundGlow;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);
      ctx.restore();

      // Cyber grid on ground
      ctx.save();
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = "#00D4FF";
      ctx.lineWidth = 0.5;
      // Horizontal lines
      for (let i = 0; i < 10; i++) {
        const y = h * (0.8 + i * 0.025);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // Perspective grid lines
      for (let i = 0; i <= 20; i++) {
        const x = (i / 20) * w;
        ctx.beginPath();
        ctx.moveTo(x, h * 0.78);
        ctx.lineTo(w / 2, h * 0.95);
        ctx.stroke();
      }
      ctx.restore();

      // Floating particles
      ctx.save();
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h * 0.7;
        const r = Math.random() * 2;
        ctx.globalAlpha = Math.random() * 0.6 + 0.1;
        ctx.fillStyle = Math.random() > 0.5 ? "#00D4FF" : "#7B2FFF";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Canvas wallpaper */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Animated overlay elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scanlines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)",
          }}
        />

        {/* Corner decorations */}
        <div className="absolute top-3 right-3 text-cyan-400/40 font-mono text-xs text-right">
          <div>HERO.X OS v1.337</div>
          <div>BUILD: 2024.12.01</div>
        </div>

        {/* Floating orbs */}
        {[
          { x: "15%", y: "20%", color: "#7B2FFF", size: 200 },
          { x: "75%", y: "15%", color: "#00D4FF", size: 150 },
          { x: "45%", y: "60%", color: "#FF006E", size: 100 },
        ].map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color}20 0%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
