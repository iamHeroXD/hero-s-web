"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
}

export default function MatrixRain({ onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops: number[] = Array(cols).fill(1);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF><{}[]|/\\;:";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF41";
      ctx.font = "14px 'Courier New', monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.95 ? "#FFFFFF" : "#00FF41";
        ctx.fillText(char, i * 16, drops[i] * 16);

        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9990] flex items-center justify-center"
      onClick={onClose}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Center text */}
      <div className="relative z-10 text-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-green-400 font-mono text-4xl font-bold mb-4"
          style={{ textShadow: "0 0 20px #00FF41" }}
        >
          MATRIX MODE
        </motion.div>
        <div className="text-green-300 font-mono text-sm mb-2">
          You took the red pill...
        </div>
        <div className="text-green-500 font-mono text-xs">
          Click anywhere to exit
        </div>
      </div>
    </motion.div>
  );
}
