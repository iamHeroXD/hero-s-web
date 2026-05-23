"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOT_MESSAGES } from "@/config/data";

type BootPhase = "bios" | "loading" | "login" | "done";

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [phase, setPhase] = useState<BootPhase>("bios");
  const [biosLines, setBiosLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [loginInput, setLoginInput] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [pressEnter, setPressEnter] = useState(false);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  // BIOS phase - print lines one by one
  useEffect(() => {
    if (phase !== "bios") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_MESSAGES.length) {
        const msg = BOOT_MESSAGES[i];
        i++;
        setBiosLines((prev) => [...prev, msg]);
      } else {
        clearInterval(interval);
        setTimeout(() => setPressEnter(true), 500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  const handleEnter = useCallback(() => {
    if (!pressEnter) return;
    setPhase("loading");
    setProgress(0);
  }, [pressEnter]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && phase === "bios" && pressEnter) {
        handleEnter();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, pressEnter, handleEnter]);

  // Loading progress
  useEffect(() => {
    if (phase !== "loading") return;
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 8 + 2;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setPhase("login"), 500);
      }
      setProgress(Math.min(p, 100));
    }, 120);
    return () => clearInterval(interval);
  }, [phase]);

  // Login handler
  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (loginInput === "" || loginInput.toLowerCase() === "herox" || loginInput === "1234" || loginInput.toLowerCase() === "guest") {
        setPhase("done");
        setTimeout(() => onComplete(), 600);
      } else {
        setLoginError(true);
        setLoginInput("");
        setTimeout(() => setLoginError(false), 1500);
      }
    },
    [loginInput, onComplete]
  );

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <AnimatePresence mode="wait">
        {phase === "bios" && (
          <motion.div
            key="bios"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full p-8 overflow-hidden font-mono text-sm"
          >
            <div className="text-green-400 mb-4 text-lg">
              HERO.X BIOS v1.337 — Copyright © 2024 Hero.X Systems Inc.
            </div>
            <div className="space-y-1">
              {biosLines.filter((l): l is string => typeof l === "string").map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={
                    line?.includes("OK") || line?.includes("DONE")
                      ? "text-green-400"
                      : line?.includes("Error") || line?.includes("DENIED")
                      ? "text-red-400"
                      : line?.includes("HERO.X BIOS")
                      ? "text-cyan-300 font-bold"
                      : "text-gray-300"
                  }
                >
                  {line?.includes("OK") ? (
                    <span>
                      {line.split("OK")[0]}
                      <span className="text-green-400 font-bold">OK</span>
                    </span>
                  ) : (
                    line
                  )}
                </motion.div>
              ))}
            </div>

            {pressEnter && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-center"
              >
                <div
                  className="text-yellow-300 font-bold text-base cursor-pointer hover:text-yellow-100 transition-colors"
                  onClick={handleEnter}
                >
                  [ Press ENTER or click to boot Hero.X OS ]
                  <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>█</span>
                </div>
              </motion.div>
            )}

            {/* Scanlines */}
            <div
              className="pointer-events-none fixed inset-0"
              style={{
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
              }}
            />
          </motion.div>
        )}

        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="w-full h-full flex flex-col items-center justify-center bg-black"
          >
            {/* XP-style loading screen */}
            <div className="flex flex-col items-center gap-8">
              {/* Logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center"
              >
                <div
                  className="text-6xl font-bold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #00D4FF, #7B2FFF, #FF006E)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "3rem",
                  }}
                >
                  Hero.X
                </div>
                <div className="text-gray-400 font-mono text-sm tracking-widest">
                  PERSONAL OS v1.337
                </div>
              </motion.div>

              {/* Windows XP style loading bar */}
              <div className="w-80">
                <div
                  className="h-8 rounded-full overflow-hidden"
                  style={{
                    background: "#1a1a2e",
                    border: "2px solid #3A6EA5",
                    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5), 0 0 15px rgba(58, 110, 165, 0.3)",
                  }}
                >
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #0A246A, #3A6EA5, #00D4FF)",
                      boxShadow: "0 0 10px rgba(0, 212, 255, 0.5)",
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {/* Shimmer effect */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
                        animation: "shimmer 1.5s infinite",
                      }}
                    />
                  </motion.div>
                </div>
                <div className="text-center text-gray-400 font-mono text-xs mt-2">
                  {Math.round(progress)}% — Loading system files...
                </div>
              </div>

              <div className="text-gray-600 font-mono text-xs animate-pulse">
                Starting Hero.X Operating System...
              </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 text-green-400 font-mono text-xs opacity-50">
              SYS.BOOT [ACTIVE]
            </div>
            <div className="absolute top-4 right-4 text-cyan-400 font-mono text-xs opacity-50">
              {new Date().toLocaleTimeString()}
            </div>
            <div className="absolute bottom-4 left-4 text-gray-600 font-mono text-xs">
              Hero.X OS — Build 1337
            </div>
          </motion.div>
        )}

        {phase === "login" && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #0a0a1a 0%, #0d1b3e 50%, #0a0a1a 100%)",
            }}
          >
            {/* Animated background grid */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
              }}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="relative z-10 flex flex-col items-center gap-6"
              style={{
                background: "rgba(10, 36, 106, 0.85)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(58, 110, 165, 0.6)",
                borderRadius: "12px",
                padding: "48px",
                boxShadow: "0 0 60px rgba(0, 212, 255, 0.2), 0 20px 60px rgba(0,0,0,0.5)",
                minWidth: "380px",
              }}
            >
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                style={{
                  background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                  boxShadow: "0 0 30px rgba(123, 47, 255, 0.5)",
                }}
              >
                👾
              </div>

              <div className="text-center">
                <div className="text-white font-bold text-2xl mb-1" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1.2rem" }}>
                  Hero.X
                </div>
                <div className="text-cyan-300 text-sm font-mono">Developer • Creator • Builder</div>
              </div>

              <form onSubmit={handleLogin} className="w-full flex flex-col gap-3">
                <div className="text-gray-300 text-sm font-mono text-center">
                  Enter password to access desktop
                  <span className="block text-xs text-gray-500 mt-1">(hint: press Enter or try &apos;guest&apos;)</span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="Password"
                    autoFocus
                    className="w-full px-4 py-3 rounded-lg font-mono text-sm text-white placeholder-gray-500 outline-none focus:ring-2"
                    style={{
                      background: "rgba(0,0,0,0.5)",
                      border: loginError ? "1px solid #FF006E" : "1px solid rgba(0, 212, 255, 0.3)",
                      boxShadow: loginError ? "0 0 10px rgba(255, 0, 110, 0.3)" : "none",
                    }}
                  />
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 text-red-400 text-xs font-mono"
                    >
                      ⚠ Invalid password. Try again.
                    </motion.div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-bold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
                    color: "white",
                    fontFamily: "Tahoma, sans-serif",
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
                  }}
                >
                  ▶ ENTER DESKTOP
                </button>
              </form>

              <div className="text-gray-600 text-xs font-mono text-center">
                Hero.X OS — Secure Login Portal v1.0
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
