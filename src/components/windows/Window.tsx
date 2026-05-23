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
  children: React.ReactNode;
  isActive: boolean;
}

export default function Window({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  children,
  isActive,
}: Props) {
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
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
        const newX = Math.max(0, dragRef.current.winX + dx);
        const newY = Math.max(0, dragRef.current.winY + dy);
        onPositionChange(win.id, { x: newX, y: newY });
      };

      const handleMouseUp = () => {
        dragRef.current = null;
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [win.id, win.position.x, win.position.y, onFocus, onPositionChange]
  );

  const handleDoubleClick = useCallback(() => {
    onMaximize(win.id);
  }, [win.id, onMaximize]);

  useEffect(() => {
    const el = windowRef.current;
    if (el && isActive) {
      el.focus();
    }
  }, [isActive]);

  const style = win.isMaximized
    ? {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100vw",
        height: "calc(100vh - 40px)",
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
          {/* Window border */}
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
              className={`xp-window-titlebar ${!isActive ? "xp-window-titlebar-inactive" : ""} flex items-center justify-between px-2 py-1 cursor-move flex-shrink-0`}
              onMouseDown={handleMouseDown}
              onDoubleClick={handleDoubleClick}
              style={{
                background: isActive
                  ? "linear-gradient(to bottom, #0A246A 0%, #3A6EA5 100%)"
                  : "linear-gradient(to bottom, #7a96df 0%, #5a82c0 100%)",
                padding: "4px 6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: "30px",
              }}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-base">{win.icon}</span>
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
                  className="xp-btn-minimize hover:scale-110 transition-transform"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onMinimize(win.id); }}
                  title="Minimize"
                  style={{
                    background: "linear-gradient(to bottom, #f9f9a9, #c8c800)",
                    border: "1px solid #8b8b00",
                    width: 21,
                    height: 21,
                    borderRadius: 3,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "#333",
                  }}
                >
                  _
                </button>
                {/* Maximize */}
                <button
                  className="xp-btn-maximize hover:scale-110 transition-transform"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => { e.stopPropagation(); onMaximize(win.id); }}
                  title={win.isMaximized ? "Restore" : "Maximize"}
                  style={{
                    background: win.isMaximized
                      ? "linear-gradient(to bottom, #a9f9a9, #00b800)"
                      : "linear-gradient(to bottom, #a9f9a9, #00b800)",
                    border: "1px solid #008b00",
                    width: 21,
                    height: 21,
                    borderRadius: 3,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: "bold",
                    color: "white",
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
                  style={{
                    background: "linear-gradient(to bottom, #f9a9a9, #e00000)",
                    border: "1px solid #8b0000",
                    width: 21,
                    height: 21,
                    borderRadius: 3,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: "bold",
                    color: "white",
                    textShadow: "0 1px 1px rgba(0,0,0,0.5)",
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Window content */}
            <div className="flex-1 overflow-auto" style={{ background: "#ECE9D8" }}>
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
