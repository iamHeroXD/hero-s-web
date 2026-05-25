"use client";
import { useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WindowState, WindowId } from "@/types";

interface Props {
  window: WindowState;
  onClose: (id: WindowId) => void;
  onMinimize: (id: WindowId) => void;
  onMaximize: (id: WindowId) => void;
  onFocus: (id: WindowId) => void;
  onPositionChange: (id: WindowId, pos: { x: number; y: number }) => void;
  onSizeChange?: (id: WindowId, size: { width: number; height: number }) => void;
  children: React.ReactNode;
  isActive: boolean;
}

const TASKBAR_HEIGHT = 44;
const MIN_VISIBLE = 80;

function WinBtn({
  onClick,
  onMouseDown,
  title,
  label,
  color,
  textColor = "white",
}: {
  onClick: (e: React.MouseEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  title: string;
  label: React.ReactNode;
  color: string;
  textColor?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.88 }}
      title={title}
      aria-label={title}
      onMouseDown={onMouseDown}
      onClick={onClick}
      style={{
        width: 20, height: 20,
        borderRadius: 4,
        background: color,
        border: "1px solid rgba(0,0,0,0.28)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 3px rgba(0,0,0,0.4)",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10, fontWeight: "bold", color: textColor,
        textShadow: "0 1px 1px rgba(0,0,0,0.5)",
        flexShrink: 0,
        transition: "filter 0.1s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = "brightness(1.25)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = ""; }}
    >
      {label}
    </motion.button>
  );
}

export default function Window({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  onSizeChange,
  children,
  isActive,
}: Props) {
  const dragRef   = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleTitlebarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win.isMaximized) return;
      e.preventDefault();
      onFocus(win.id);
      dragRef.current = { startX: e.clientX, startY: e.clientY, winX: win.position.x, winY: win.position.y };

      const onMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        const maxX = globalThis.window.innerWidth - MIN_VISIBLE;
        const maxY = globalThis.window.innerHeight - TASKBAR_HEIGHT - 10;
        const nx = Math.max(-win.size.width + MIN_VISIBLE, Math.min(maxX, dragRef.current.winX + dx));
        const ny = Math.max(0, Math.min(maxY, dragRef.current.winY + dy));
        onPositionChange(win.id, { x: nx, y: ny });
      };
      const onUp = () => {
        dragRef.current = null;
        globalThis.window.removeEventListener("mousemove", onMove);
        globalThis.window.removeEventListener("mouseup", onUp);
      };
      globalThis.window.addEventListener("mousemove", onMove);
      globalThis.window.addEventListener("mouseup", onUp);
    },
    [win.id, win.position.x, win.position.y, win.size.width, win.isMaximized, onFocus, onPositionChange]
  );

  const handleDoubleClick = useCallback(() => onMaximize(win.id), [win.id, onMaximize]);

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onFocus(win.id);
      resizeRef.current = { startX: e.clientX, startY: e.clientY, startW: win.size.width, startH: win.size.height };

      const onMove = (ev: MouseEvent) => {
        if (!resizeRef.current) return;
        onSizeChange?.(win.id, {
          width:  Math.max(320, resizeRef.current.startW + ev.clientX - resizeRef.current.startX),
          height: Math.max(220, resizeRef.current.startH + ev.clientY - resizeRef.current.startY),
        });
      };
      const onUp = () => {
        resizeRef.current = null;
        globalThis.window.removeEventListener("mousemove", onMove);
        globalThis.window.removeEventListener("mouseup", onUp);
      };
      globalThis.window.addEventListener("mousemove", onMove);
      globalThis.window.addEventListener("mouseup", onUp);
    },
    [win.id, win.size.width, win.size.height, onFocus, onSizeChange]
  );

  useEffect(() => {
    if (windowRef.current && isActive) windowRef.current.focus();
  }, [isActive]);

  const posStyle = win.isMaximized
    ? { position: "fixed" as const, top: 0, left: 0, width: "100vw", height: `calc(100vh - ${TASKBAR_HEIGHT}px)`, zIndex: win.zIndex, borderRadius: 0 }
    : { position: "fixed" as const, top: win.position.y, left: win.position.x, width: win.size.width, height: win.size.height, zIndex: win.zIndex, borderRadius: 8 };

  return (
    <AnimatePresence>
      {win.isOpen && !win.isMinimized && (
        <motion.div
          ref={windowRef}
          key={win.id}
          initial={{ scale: 0.88, opacity: 0, y: 24 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={  { scale: 0.88, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 340, damping: 26 }}
          style={posStyle}
          className="select-none overflow-hidden flex flex-col"
          onClick={() => onFocus(win.id)}
          tabIndex={-1}
        >
          {/* Outer shell — border + shadow */}
          <div
            className="flex flex-col h-full overflow-hidden relative"
            style={{
              borderRadius: win.isMaximized ? 0 : 8,
              border: isActive
                ? "1px solid rgba(80,140,255,0.7)"
                : "1px solid rgba(80,110,160,0.45)",
              boxShadow: isActive
                ? "0 20px 56px rgba(0,0,0,0.80), 0 0 0 1px rgba(255,255,255,0.16), 0 0 36px rgba(40,100,220,0.28)"
                : "0 10px 32px rgba(0,0,0,0.60), 0 0 0 1px rgba(255,255,255,0.07)",
              background: "#ECE9D8",
            }}
          >
            {/* ── Title bar ─────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-2.5 flex-shrink-0 relative overflow-hidden cursor-move"
              onMouseDown={handleTitlebarMouseDown}
              onDoubleClick={handleDoubleClick}
              style={{
                minHeight: 34,
                background: isActive
                  ? "linear-gradient(175deg, #1e4aaa 0%, #0e2e80 35%, #1850a8 70%, #2460b8 100%)"
                  : "linear-gradient(to bottom, #6070b8 0%, #4a5a96 100%)",
              }}
            >
              {/* Top gloss line */}
              <div
                className="absolute top-0 inset-x-0 pointer-events-none"
                style={{
                  height: "52%",
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0) 100%)",
                  borderRadius: win.isMaximized ? 0 : "7px 7px 0 0",
                }}
              />
              {/* Bottom edge accent */}
              <div
                className="absolute bottom-0 inset-x-0 pointer-events-none"
                style={{ height: 1, background: isActive ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.2)" }}
              />

              {/* Icon + Title */}
              <div className="flex items-center gap-2 min-w-0 flex-1 relative z-10">
                <span className="text-[15px] leading-none">{win.icon}</span>
                <span
                  className="text-white text-xs font-bold truncate"
                  style={{
                    fontFamily: "Tahoma, Verdana, sans-serif",
                    fontSize: 12,
                    textShadow: isActive
                      ? "0 1px 3px rgba(0,0,0,0.7), 0 0 12px rgba(100,180,255,0.4)"
                      : "0 1px 2px rgba(0,0,0,0.5)",
                    letterSpacing: "0.01em",
                  }}
                >
                  {win.title}
                </span>
              </div>

              {/* Window controls */}
              <div className="flex items-center gap-1.5 flex-shrink-0 relative z-10">
                <WinBtn
                  title="Minimize"
                  label={<span style={{ fontSize: 11, lineHeight: 1, marginTop: 2 }}>─</span>}
                  color="linear-gradient(to bottom, #fde047, #ca8a04)"
                  textColor="#78350f"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
                />
                <WinBtn
                  title={win.isMaximized ? "Restore" : "Maximize"}
                  label={<span style={{ fontSize: 9, lineHeight: 1 }}>{win.isMaximized ? "❐" : "□"}</span>}
                  color="linear-gradient(to bottom, #4ade80, #16a34a)"
                  textColor="white"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
                />
                <WinBtn
                  title="Close"
                  label={<span style={{ fontSize: 10, lineHeight: 1 }}>✕</span>}
                  color="linear-gradient(to bottom, #f87171, #dc2626)"
                  textColor="white"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
                />
              </div>
            </div>

            {/* ── Content ──────────────────────────────────────── */}
            <div className="flex-1 overflow-hidden" style={{ background: "#ECE9D8" }}>
              {children}
            </div>

            {/* ── Resize handle ─────────────────────────────────── */}
            {!win.isMaximized && onSizeChange && (
              <div
                onMouseDown={handleResizeMouseDown}
                style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 18, height: 18,
                  cursor: "nwse-resize", zIndex: 10,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: "absolute", bottom: 2, right: 2 }}>
                  <line x1="4"  y1="12" x2="12"  y2="4"  stroke={isActive ? "#8090b8" : "#a0a8b8"} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8"  y1="12" x2="12"  y2="8"  stroke={isActive ? "#8090b8" : "#a0a8b8"} strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="12" y1="12" x2="12" y2="12" stroke={isActive ? "#8090b8" : "#a0a8b8"} strokeWidth="2"   strokeLinecap="round"/>
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
