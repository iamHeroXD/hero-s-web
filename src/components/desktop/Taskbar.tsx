"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { WindowState, WindowId } from "@/types";

const START_ITEMS = [
  { label: "About Me", id: "about" as WindowId, icon: "👤" },
  { label: "Projects", id: "projects" as WindowId, icon: "💼" },
  { label: "Terminal", id: "terminal" as WindowId, icon: "💻" },
  { label: "Music Player", id: "music" as WindowId, icon: "🎵" },
  { label: "Contact", id: "contact" as WindowId, icon: "📧" },
  { label: "Socials", id: "socials" as WindowId, icon: "🌐" },
  { label: "Reviews", id: "reviews" as WindowId, icon: "⭐" },
  { label: "Resume", id: "resume" as WindowId, icon: "📄" },
  { label: "My Computer", id: "mycomputer" as WindowId, icon: "🖥️" },
  { label: "Hidden Secrets", id: "secrets" as WindowId, icon: "🔒" },
];

interface Props {
  taskbarWindows: WindowState[];
  onOpenWindow: (id: WindowId) => void;
  onFocusWindow: (id: WindowId) => void;
  onMinimizeWindow: (id: WindowId) => void;
  activeWindowId?: WindowId;
}

export default function Taskbar({ taskbarWindows, onOpenWindow, onFocusWindow, onMinimizeWindow, activeWindowId }: Props) {
  const [showStart, setShowStart] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskbarClick = useCallback(
    (win: WindowState) => {
      if (win.isMinimized || win.id !== activeWindowId) {
        onFocusWindow(win.id);
      } else {
        onMinimizeWindow(win.id);
      }
    },
    [activeWindowId, onFocusWindow, onMinimizeWindow]
  );

  return (
    <>
      {/* Click outside to close start menu */}
      {showStart && (
        <div className="fixed inset-0 z-40" onClick={() => setShowStart(false)} />
      )}

      {/* Start Menu */}
      <AnimatePresence>
        {showStart && (
          <motion.div
            initial={{ y: 20, opacity: 0, scaleY: 0.9 }}
            animate={{ y: 0, opacity: 1, scaleY: 1 }}
            exit={{ y: 20, opacity: 0, scaleY: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-10 left-0 z-50 overflow-hidden rounded-tr-lg"
            style={{
              width: 280,
              background: "#ECE9D8",
              border: "2px solid #0A246A",
              boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
              transformOrigin: "bottom left",
            }}
          >
            {/* Start menu header */}
            <div
              className="flex items-center gap-3 p-3"
              style={{
                background: "linear-gradient(135deg, #0A246A, #3A6EA5)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                style={{ boxShadow: "0 0 8px rgba(0,212,255,0.5)" }}
              >
                <Image
                  src="/pfpofhero.png"
                  alt="Hero.X"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Hero.X</div>
                <div className="text-cyan-300 text-xs">Elite Developer</div>
              </div>
            </div>

            {/* Start menu items */}
            <div className="flex">
              {/* Left column - apps */}
              <div className="flex-1 border-r p-1" style={{ borderColor: "#a0a0a0" }}>
                <div className="text-xs font-bold text-gray-500 px-2 py-1 uppercase tracking-wide">
                  Apps
                </div>
                {START_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onOpenWindow(item.id); setShowStart(false); }}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs hover:bg-blue-600 hover:text-white transition-all text-left"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Right column - places */}
              <div className="w-28 p-1" style={{ background: "#d4f0d4" }}>
                <div className="text-xs font-bold text-gray-600 px-1 py-1 uppercase tracking-wide">
                  Places
                </div>
                {["My Docs", "My Music", "Desktop", "Control", "Help"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-1 py-1 text-xs rounded hover:bg-green-600 hover:text-white transition-all"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Start menu footer */}
            <div
              className="flex justify-between p-2 border-t"
              style={{
                background: "#d4d0c8",
                borderColor: "#a0a0a0",
              }}
            >
              <button
                className="flex items-center gap-1 text-xs hover:bg-red-600 hover:text-white px-2 py-1 rounded"
                onClick={() => {
                  setShowStart(false);
                  if (typeof window !== "undefined") {
                    document.dispatchEvent(new CustomEvent("shutdown"));
                  }
                }}
              >
                ⏻ Shut Down
              </button>
              <button
                className="flex items-center gap-1 text-xs hover:bg-blue-600 hover:text-white px-2 py-1 rounded"
                onClick={() => {
                  setShowStart(false);
                  window.location.reload();
                }}
              >
                🔄 Restart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center h-10 px-1 gap-1"
        style={{
          background: "linear-gradient(to bottom, #245EDC 0%, #0A246A 100%)",
          borderTop: "1px solid #4A90D9",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.4)",
        }}
      >
        {/* Start button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowStart(!showStart)}
          className="flex items-center gap-1.5 px-3 py-1 rounded font-bold text-xs text-white h-8"
          style={{
            background: showStart
              ? "linear-gradient(to bottom, #1e7a1e, #4fc748)"
              : "linear-gradient(to bottom, #4fc748, #1e7a1e)",
            border: "1px solid rgba(255,255,255,0.3)",
            fontFamily: "Tahoma, Verdana, sans-serif",
            boxShadow: showStart
              ? "inset 0 1px 3px rgba(0,0,0,0.4)"
              : "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          <span className="text-sm">⊞</span>
          <span>start</span>
        </motion.button>

        {/* Separator */}
        <div className="h-6 w-px bg-blue-700 mx-0.5" />

        {/* Open windows */}
        <div className="flex-1 flex items-center gap-1 overflow-hidden">
          {taskbarWindows.map((win) => (
            <motion.button
              key={win.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleTaskbarClick(win)}
              className={`taskbar-btn h-7 flex items-center gap-1.5 px-2 truncate text-xs ${
                win.id === activeWindowId && !win.isMinimized ? "active" : ""
              }`}
              title={win.title}
              style={{
                background:
                  win.id === activeWindowId && !win.isMinimized
                    ? "linear-gradient(to bottom, #2a65a8, #4183c4)"
                    : "linear-gradient(to bottom, #4183c4, #2a65a8)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 3,
                padding: "2px 8px",
                color: "white",
                fontSize: "11px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                minWidth: 80,
                maxWidth: 150,
                height: 28,
                boxShadow:
                  win.id === activeWindowId && !win.isMinimized
                    ? "inset 0 1px 3px rgba(0,0,0,0.4)"
                    : "none",
                opacity: win.isMinimized ? 0.7 : 1,
              }}
            >
              <span className="text-xs flex-shrink-0">{win.icon}</span>
              <span className="truncate flex-1">{win.title}</span>
            </motion.button>
          ))}
        </div>

        {/* System tray */}
        <div
          className="flex items-center gap-2 px-2 h-8 rounded"
          style={{
            background: "rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          <span className="text-sm">🔊</span>
          <span className="text-sm">🌐</span>
          <div className="text-right">
            <div className="text-white text-xs font-bold leading-none">{time}</div>
            <div className="text-blue-300 text-xs leading-none">{date}</div>
          </div>
        </div>
      </div>
    </>
  );
}
