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

const TASKBAR_HEIGHT = 40;
const MIN_VISIBLE = 80; // min px that must stay on-screen

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
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleTitlebarMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (win.isMaximized) return;
      e.preventDefault();
      onFocus(win.id);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        winX: win.position.x,
        winY: win.position.y,
      };

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = ev.clientX - dragRef.current.startX;
        const dy = ev.clientY - dragRef.current.startY;
        const maxX = globalThis.window.innerWidth - MIN_VISIBLE;
        const maxY = globalThis.window.innerHeight - TASKBAR_HEIGHT - 10;
        const newX = Math.max(-win.size.width + MIN_VISIBLE, Math.min(maxX, dragRef.current.winX + dx));
        const newY = Math.max(0, Math.min(maxY, dragRef.current.winY + dy));
        onPositionChange(win.id, { x: newX, y: newY });
      };

      const handleMouseUp = () => {
        dragRef.current = null;
        globalThis.window.removeEventListener("mousemove", handleMouseMove);
        globalThis.window.removeEventListener("mouseup", handleMouseUp);
      };

      globalThis.window.addEventListener("mousemove", handleMouseMove);
      globalThis.window.addEventListener("mouseup", handleMouseUp);
    },
    [win.id, win.position.x, win.position.y, win.size.width, win.isMaximized, onFocus, onPositionChange]
  );

  const handleDoubleClick = useCallback(() => {
    onMaximize(win.id);
  }, [win.id, onMaximize]);

  const handleResizeMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onFocus(win.id);
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startW: win.size.width,
        startH: win.size.height,
      };

      const handleMouseMove = (ev: MouseEvent) => {
        if (!resizeRef.current) return;
        const dw = ev.clientX - resizeRef.current.startX;
        const dh = ev.clientY - resizeRef.current.startY;
        const newW = Math.max(320, resizeRef.current.startW + dw);
        const newH = Math.max(200, resizeRef.current.startH + dh);
        onSizeChange?.(win.id, { width: newW, height: newH });
      };

      const handleMouseUp = () => {
        resizeRef.current = null;
        globalThis.window.removeEventListener("mousemove", handleMouseMove);
        globalThis.window.removeEventListener("mouseup", handleMouseUp);
      };

      globalThis.window.addEventListener("mousemove", handleMouseMove);
      globalThis.window.addEventListener("mouseup", handleMouseUp);
    },
    [win.id, win.size.width, win.size.height, onFocus, onSizeChange]
  );

  useEffect(() => {
    const el = windowRef.current;
    if (el && isActive) el.focus();
  }, [isActive]);

  const style = win.isMaximized
    ? {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100vw",
        height: `calc(100vh - ${TASKBAR_HEIGHT}px)`,
        zIndex: win.zIndex,
        borderRadius: 0,
      }
    : {
        position: "fixed" as const,
        top: win.position.y,
        left: win.position.x,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
        borderRadius: 8,
      };

  return (
    <AnimatePresence>
      {win.isOpen && !win.isMinimized && (
        <motion.div
          ref={windowRef}
          key={win.id}
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={style}
          className="select-none overflow-hidden flex flex-col"
          onClick={() => onFocus(win.id)}
          tabIndex={-1}
        >
          <div
            className="flex flex-col h-full overflow-hidden"
            style={{
              border: isActive ? "2px solid #0A246A" : "2px solid #5a82c0",
              borderRadius: win.isMaximized ? 0 : 8,
              boxShadow: isActive
                ? "0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1)"
                : "0 4px 16px rgba(0,0,0,0.4)",
              background: "#ECE9D8",
            }}
          >
            {/* Title bar */}
            <div
              className={`flex items-center justify-between px-2 py-1 cursor-move flex-shrink-0`}
              onMouseDown={handleTitlebarMouseDown}
              onDoubleClick={handleDoubleClick}
              style={{
                background: isActive
                  ? "linear-gradient(to bottom, #0A246A 0%, #3A6EA5 100%)"
                  : "linear-gradient(to bottom, #7a96df 0%, #5a82c0 100%)",
                minHeight: "30px",
              }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-base leading-none">{win.icon}</span>
                <span
                  className="text-white font-bold text-xs truncate"
                  style={{ fontFamily: "Tahoma, Verdana, sans-serif", textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}
                >
                  {win.title}
                </span>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Minimize */}
                <button
                  className="hover:scale-110 transition-transform"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
                  title="Minimize"
                  aria-label="Minimize window"
                  style={{
                    background: "linear-gradient(to bottom, #f9f9a9, #c8c800)",
                    border: "1px solid #8b8b00",
                    width: 21, height: 21, borderRadius: 3,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 11, fontWeight: "bold", color: "#333",
                  }}
                >
                  _
                </button>
                {/* Maximize */}
                <button
                  className="hover:scale-110 transition-transform"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
                  title={win.isMaximized ? "Restore" : "Maximize"}
                  aria-label={win.isMaximized ? "Restore window" : "Maximize window"}
                  style={{
                    background: "linear-gradient(to bottom, #a9f9a9, #00b800)",
                    border: "1px solid #008b00",
                    width: 21, height: 21, borderRadius: 3,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 10, fontWeight: "bold", color: "white",
                  }}
                >
                  {win.isMaximized ? "❐" : "□"}
                </button>
                {/* Close */}
                <button
                  className="hover:scale-110 transition-transform"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
                  title="Close"
                  aria-label="Close window"
                  style={{
                    background: "linear-gradient(to bottom, #f9a9a9, #e00000)",
                    border: "1px solid #8b0000",
                    width: 21, height: 21, borderRadius: 3,
                    cursor: "pointer", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 11, fontWeight: "bold",
                    color: "white", textShadow: "0 1px 1px rgba(0,0,0,0.5)",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Window content */}
            <div className="flex-1 overflow-hidden" style={{ background: "#ECE9D8" }}>
              {children}
            </div>

            {/* Resize handle — bottom-right corner */}
            {!win.isMaximized && onSizeChange && (
              <div
                onMouseDown={handleResizeMouseDown}
                title="Resize window"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 16,
                  height: 16,
                  cursor: "nwse-resize",
                  zIndex: 1,
                  background: "transparent",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  style={{ position: "absolute", bottom: 2, right: 2 }}
                >
                  <path d="M2 10 L10 2 M6 10 L10 6 M10 10 L10 10" stroke="#888" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
