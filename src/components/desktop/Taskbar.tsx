"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { WindowState, WindowId } from "@/types";

const START_ITEMS = [
  { label: "About Me",       id: "about"      as WindowId, icon: "👤" },
  { label: "Projects",       id: "projects"   as WindowId, icon: "💼" },
  { label: "Terminal",       id: "terminal"   as WindowId, icon: "💻" },
  { label: "Music Player",   id: "music"      as WindowId, icon: "🎵" },
  { label: "Contact",        id: "contact"    as WindowId, icon: "📧" },
  { label: "Socials",        id: "socials"    as WindowId, icon: "🌐" },
  { label: "Reviews",        id: "reviews"    as WindowId, icon: "⭐" },
  { label: "Resume",         id: "resume"     as WindowId, icon: "📄" },
  { label: "My Computer",    id: "mycomputer" as WindowId, icon: "🖥️" },
  { label: "Hidden Secrets", id: "secrets"    as WindowId, icon: "🔒" },
];

const QUICK_LAUNCH: { icon: string; id: WindowId; title: string }[] = [
  { icon: "💻", id: "terminal",  title: "Terminal" },
  { icon: "👤", id: "about",     title: "About Me" },
  { icon: "💼", id: "projects",  title: "Projects" },
];

interface Props {
  taskbarWindows: WindowState[];
  onOpenWindow: (id: WindowId) => void;
  onFocusWindow: (id: WindowId) => void;
  onMinimizeWindow: (id: WindowId) => void;
  activeWindowId?: WindowId;
}

export default function Taskbar({
  taskbarWindows,
  onOpenWindow,
  onFocusWindow,
  onMinimizeWindow,
  activeWindowId,
}: Props) {
  const [showStart, setShowStart] = useState(false);
  const [time, setTime]           = useState("");
  const [date, setDate]           = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(now.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }));
    };
    update();
    const iv = setInterval(update, 1000);
    return () => clearInterval(iv);
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
      {showStart && (
        <div className="fixed inset-0 z-40" onClick={() => setShowStart(false)} />
      )}

      {/* ── Start Menu ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showStart && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={  { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 460, damping: 32 }}
            className="fixed bottom-12 left-0 z-50 overflow-hidden"
            style={{
              width: 310,
              borderRadius: "8px 8px 0 0",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "4px 0 32px rgba(0,0,0,0.65), 0 -2px 16px rgba(0,0,50,0.4)",
              transformOrigin: "bottom left",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0c1e6e 0%, #1a4a9e 55%, #0a306e 100%)",
                minHeight: 64,
              }}
            >
              {/* Gloss */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)" }}
              />
              <div
                className="relative flex-shrink-0"
                style={{
                  width: 46, height: 46,
                  borderRadius: "50%",
                  overflow: "hidden",
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.3), 0 0 16px rgba(0,200,255,0.45)",
                }}
              >
                <Image src="/pfpofhero.png" alt="Hero.X" width={46} height={46} className="w-full h-full object-cover" draggable={false} />
              </div>
              <div className="relative">
                <div className="text-white font-bold text-sm leading-tight" style={{ fontFamily: "Tahoma, sans-serif", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                  Hero.X
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#00e676", boxShadow: "0 0 6px #00e676" }} />
                  <span className="text-cyan-300 text-xs" style={{ fontFamily: "Tahoma, sans-serif" }}>Elite Developer</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex" style={{ background: "#ECE9D8" }}>
              {/* Apps column */}
              <div className="flex-1 py-1" style={{ borderRight: "1px solid #c8c4bc" }}>
                <div
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: "#666", fontFamily: "Tahoma, sans-serif" }}
                >
                  Applications
                </div>
                {START_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onOpenWindow(item.id); setShowStart(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 text-left group transition-all"
                    style={{ fontFamily: "Tahoma, sans-serif" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#316AC5";
                      (e.currentTarget as HTMLButtonElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "inherit";
                    }}
                  >
                    <span className="text-lg leading-none w-6 text-center flex-shrink-0">{item.icon}</span>
                    <span className="text-xs font-medium truncate">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Places column */}
              <div className="py-1" style={{ width: 110, background: "#dde8f0" }}>
                <div
                  className="px-2 py-1 text-xs font-bold uppercase tracking-wider mb-0.5"
                  style={{ color: "#446", fontFamily: "Tahoma, sans-serif" }}
                >
                  Places
                </div>
                {[
                  { label: "My Docs",  icon: "📁" },
                  { label: "Desktop",  icon: "🖥️" },
                  { label: "Control",  icon: "⚙️" },
                  { label: "My Music", icon: "🎵" },
                  { label: "Help",     icon: "❓" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-1.5 px-2 py-1.5 text-left text-xs transition-all"
                    style={{ fontFamily: "Tahoma, sans-serif" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#316AC5";
                      (e.currentTarget as HTMLButtonElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "inherit";
                    }}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-3 py-2"
              style={{
                background: "linear-gradient(to bottom, #c8c4bc, #b8b4ac)",
                borderTop: "1px solid #a0a0a0",
              }}
            >
              <button
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all font-medium"
                style={{ fontFamily: "Tahoma, sans-serif" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#c0392b"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "inherit"; }}
                onClick={() => {
                  setShowStart(false);
                  if (typeof window !== "undefined") document.dispatchEvent(new CustomEvent("shutdown"));
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1zM6 3h2v5H6V3zm1 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                Shut Down
              </button>
              <button
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded transition-all font-medium"
                style={{ fontFamily: "Tahoma, sans-serif" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#2563eb"; (e.currentTarget as HTMLButtonElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "inherit"; }}
                onClick={() => { setShowStart(false); window.location.reload(); }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 7A5 5 0 1 1 9.5 2.5" strokeLinecap="round"/>
                  <polyline points="10,1 10,4 13,4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Restart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Taskbar ─────────────────────────────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-30 flex items-center gap-1 px-1.5"
        style={{
          height: 44,
          background: "linear-gradient(180deg, #1c52c8 0%, #0e38a0 45%, #0a2880 100%)",
          borderTop: "1px solid rgba(80,140,255,0.45)",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        {/* Glass shimmer */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "40%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.10), rgba(255,255,255,0))",
          }}
        />

        {/* ── Start button ── */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowStart((v) => !v)}
          className="relative flex items-center gap-1.5 font-bold text-white select-none overflow-hidden flex-shrink-0"
          style={{
            height: 32,
            paddingInline: "12px 14px",
            borderRadius: 5,
            fontFamily: "Tahoma, Verdana, sans-serif",
            fontSize: 13,
            letterSpacing: "0.02em",
            background: showStart
              ? "linear-gradient(to bottom, #1c6918, #3da832)"
              : "linear-gradient(to bottom, #58c240 0%, #2b9620 55%, #1d7a14 100%)",
            border: "1px solid rgba(255,255,255,0.28)",
            boxShadow: showStart
              ? "inset 0 2px 5px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.2)"
              : "0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.35)",
            textShadow: "0 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          {/* Gloss */}
          <div
            className="absolute inset-x-0 top-0 pointer-events-none"
            style={{ height: "48%", background: "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0))", borderRadius: "4px 4px 0 0" }}
          />
          <span className="text-base leading-none relative z-10">⊞</span>
          <span className="relative z-10">start</span>
        </motion.button>

        {/* ── Divider ── */}
        <div
          className="flex-shrink-0 mx-0.5"
          style={{
            width: 1,
            height: 28,
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.25) 70%, transparent)",
          }}
        />

        {/* ── Quick launch ── */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {QUICK_LAUNCH.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.18, y: -1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onOpenWindow(item.id)}
              title={item.title}
              className="flex items-center justify-center text-lg"
              style={{
                width: 28, height: 28,
                borderRadius: 4,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid transparent",
                cursor: "pointer",
                filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))",
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "transparent";
              }}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>

        {/* ── Divider ── */}
        <div
          className="flex-shrink-0 mx-0.5"
          style={{
            width: 1,
            height: 28,
            background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.22) 30%, rgba(255,255,255,0.22) 70%, transparent)",
          }}
        />

        {/* ── Open windows ── */}
        <div className="flex-1 flex items-center gap-1 overflow-hidden min-w-0">
          <AnimatePresence>
            {taskbarWindows.map((win) => {
              const isActive = win.id === activeWindowId && !win.isMinimized;
              return (
                <motion.button
                  key={win.id}
                  initial={{ scale: 0.75, opacity: 0, width: 0 }}
                  animate={{ scale: 1,    opacity: 1, width: "auto" }}
                  exit={  { scale: 0.75, opacity: 0, width: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  whileHover={{ y: -1 }}
                  onClick={() => handleTaskbarClick(win)}
                  title={win.title}
                  className="flex items-center gap-1.5 flex-shrink-0 relative overflow-hidden"
                  style={{
                    height: 32,
                    minWidth: 88,
                    maxWidth: 148,
                    paddingInline: "7px 8px",
                    borderRadius: 4,
                    fontSize: 11,
                    fontFamily: "Tahoma, sans-serif",
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    color: "white",
                    textShadow: "0 1px 2px rgba(0,0,0,0.6)",
                    opacity: win.isMinimized ? 0.65 : 1,
                    background: isActive
                      ? "linear-gradient(to bottom, #163e82, #2458b0)"
                      : "linear-gradient(to bottom, #2c68c0 0%, #1c4ea0 100%)",
                    border: isActive
                      ? "1px solid rgba(100,160,255,0.5)"
                      : "1px solid rgba(255,255,255,0.15)",
                    boxShadow: isActive
                      ? "inset 0 2px 5px rgba(0,0,0,0.45), 0 0 10px rgba(60,130,255,0.2)"
                      : "inset 0 1px 0 rgba(255,255,255,0.12), 0 1px 3px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Gloss */}
                  {!isActive && (
                    <div
                      className="absolute inset-x-0 top-0 pointer-events-none"
                      style={{ height: "45%", background: "linear-gradient(to bottom, rgba(255,255,255,0.14), rgba(255,255,255,0))", borderRadius: "3px 3px 0 0" }}
                    />
                  )}
                  {/* Active bottom indicator */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-2 right-2 pointer-events-none"
                      style={{ height: 2, borderRadius: "2px 2px 0 0", background: "rgba(140,200,255,0.7)", boxShadow: "0 0 6px rgba(100,180,255,0.6)" }}
                    />
                  )}
                  <span className="text-xs flex-shrink-0 relative z-10">{win.icon}</span>
                  <span className="truncate flex-1 relative z-10">{win.title}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── System tray ── */}
        <div
          className="flex items-center gap-2 flex-shrink-0 px-3"
          style={{
            height: 32,
            borderRadius: 4,
            background: "rgba(0,0,0,0.30)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)",
          }}
        >
          <span className="text-sm" style={{ opacity: 0.75, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}>🔊</span>
          <span className="text-sm" style={{ opacity: 0.75, filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.4))" }}>🌐</span>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.14)", borderRadius: 1 }} />
          <div className="text-right" style={{ lineHeight: 1 }}>
            <div
              className="text-white font-bold"
              style={{ fontSize: 12, fontFamily: "Tahoma, sans-serif", textShadow: "0 0 10px rgba(140,200,255,0.45)", letterSpacing: "0.03em" }}
            >
              {time}
            </div>
            <div style={{ fontSize: 9, color: "#93c5fd", fontFamily: "Tahoma, sans-serif", marginTop: 1 }}>
              {date}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
