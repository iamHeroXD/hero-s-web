"use client";
import { motion } from "framer-motion";
import type { WindowId } from "@/types";

interface Props {
  x: number;
  y: number;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  onMatrixMode: () => void;
  onBSOD: () => void;
  onToggleCRT: () => void;
  crtEnabled: boolean;
}

export default function DesktopRightClick({
  x,
  y,
  onClose,
  onOpenWindow,
  onMatrixMode,
  onBSOD,
  onToggleCRT,
  crtEnabled,
}: Props) {
  const items = [
    { label: "Arrange Icons", icon: "📋", action: onClose },
    { label: "Refresh", icon: "🔄", action: () => { window.location.reload(); } },
    { divider: true },
    { label: "New Folder", icon: "📁", action: onClose },
    { label: "New Window", icon: "🪟", action: onClose },
    { divider: true },
    { label: "Open Terminal", icon: "💻", action: () => { onOpenWindow("terminal"); onClose(); } },
    { label: "Open My Computer", icon: "🖥️", action: () => { onOpenWindow("mycomputer"); onClose(); } },
    { divider: true },
    { label: "🟢 Matrix Mode", icon: "🌿", action: () => { onMatrixMode(); onClose(); } },
    { label: `${crtEnabled ? "🔴" : "🟢"} CRT Effect`, icon: "📺", action: () => { onToggleCRT(); onClose(); } },
    { label: "💥 BSOD Easter Egg", icon: "⚠️", action: () => { onBSOD(); onClose(); } },
    { divider: true },
    { label: "Properties", icon: "⚙️", action: onClose },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.12 }}
        className="fixed z-50 rounded overflow-hidden"
        style={{
          left: Math.min(x, window.innerWidth - 200),
          top: Math.min(y, window.innerHeight - 300),
          background: "#ECE9D8",
          border: "1px solid #808080",
          minWidth: 180,
          boxShadow: "3px 3px 8px rgba(0,0,0,0.4)",
          fontFamily: "Tahoma, Verdana, sans-serif",
        }}
      >
        {items.map((item, i) =>
          "divider" in item ? (
            <div key={i} className="border-t my-0.5" style={{ borderColor: "#a0a0a0" }} />
          ) : (
            <button
              key={i}
              onClick={item.action}
              className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-600 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        )}
      </motion.div>
    </>
  );
}
