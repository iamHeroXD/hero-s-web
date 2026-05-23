"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileOverlay() {
  const [isMobile, setIsMobile] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isMobile || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-0 left-0 right-0 z-[9997] p-4"
        style={{ background: "rgba(10, 36, 106, 0.95)", backdropFilter: "blur(10px)" }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">📱</span>
          <div className="flex-1">
            <div className="text-white font-bold text-sm mb-1" style={{ fontFamily: "Tahoma, sans-serif" }}>
              Best on Desktop!
            </div>
            <div className="text-blue-200 text-xs leading-relaxed">
              This portfolio is built as a fake OS — designed for desktop.
              On mobile, scroll and tap to explore. Double-tap icons to open apps.
            </div>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-white text-xs flex-shrink-0 bg-white/20 px-2 py-1 rounded hover:bg-white/30"
          >
            OK ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
