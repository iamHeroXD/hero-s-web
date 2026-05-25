"use client";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { WindowId } from "@/types";

interface IconDef {
  id: WindowId;
  label: string;
  icon: string;
}

const DESKTOP_ICONS: IconDef[] = [
  { id: "about", label: "About Me", icon: "👤" },
  { id: "projects", label: "Projects", icon: "💼" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "contact", label: "Contact", icon: "📧" },
  { id: "socials", label: "Socials", icon: "🌐" },
  { id: "terminal", label: "Terminal", icon: "💻" },
  { id: "ie", label: "Internet Explorer", icon: "🌐" },
  { id: "mycomputer", label: "My Computer", icon: "🖥️" },
  { id: "recycle", label: "Recycle Bin", icon: "🗑️" },
  { id: "secrets", label: "Hidden Secrets", icon: "🔒" },
  { id: "resume", label: "Resume.pdf", icon: "📄" },
  { id: "music", label: "Music Player", icon: "🎵" },
];

interface Props {
  onOpenWindow: (id: WindowId) => void;
}

interface ContextMenu {
  x: number;
  y: number;
  id: WindowId;
}

export default function DesktopIcons({ onOpenWindow }: Props) {
  const [selectedIcon, setSelectedIcon] = useState<WindowId | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenu | null>(null);

  const handleDoubleClick = useCallback(
    (id: WindowId) => {
      onOpenWindow(id);
    },
    [onOpenWindow]
  );

  const handleContextMenu = useCallback((e: React.MouseEvent, id: WindowId) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, id });
  }, []);

  const closeContextMenu = useCallback(() => setContextMenu(null), []);

  return (
    <>
      {/* Icons grid - positioned on left side, 2 columns so all fit on screen */}
      <div
        className="absolute top-4 left-4 grid gap-3"
        style={{ gridTemplateColumns: "80px 80px", gridAutoRows: "80px" }}
        onClick={() => setSelectedIcon(null)}
      >
        {DESKTOP_ICONS.map((icon, i) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 320, damping: 22 }}
            whileHover={{ scale: 1.12, y: -2 }}
            whileTap={{ scale: 0.93 }}
            onClick={(e) => { e.stopPropagation(); setSelectedIcon(icon.id); }}
            onDoubleClick={() => handleDoubleClick(icon.id)}
            onContextMenu={(e) => handleContextMenu(e, icon.id)}
            className="flex flex-col items-center gap-1.5 cursor-pointer rounded-lg p-1.5 select-none transition-all"
            style={{
              background: selectedIcon === icon.id
                ? "rgba(30, 90, 190, 0.45)"
                : "rgba(0,0,0,0.01)",
              border: selectedIcon === icon.id
                ? "1px solid rgba(120, 200, 255, 0.7)"
                : "1px solid transparent",
              backdropFilter: selectedIcon === icon.id ? "blur(6px)" : "none",
              boxShadow: selectedIcon === icon.id
                ? "0 0 16px rgba(0,180,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "none",
            }}
          >
            <motion.div
              animate={
                selectedIcon === icon.id
                  ? { filter: "drop-shadow(0 0 10px rgba(0, 212, 255, 0.9)) drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }
                  : { filter: "drop-shadow(2px 3px 5px rgba(0,0,0,0.7))" }
              }
              className="text-4xl leading-none"
            >
              {icon.icon}
            </motion.div>
            <span
              className="text-center leading-tight font-bold"
              style={{
                color: "white",
                textShadow: "1px 1px 4px rgba(0,0,0,1), -1px -1px 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8)",
                fontSize: "10px",
                maxWidth: "74px",
                wordBreak: "break-word",
                lineHeight: "1.3",
              }}
            >
              {icon.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Right-click context menu */}
      {contextMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeContextMenu} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="fixed z-50 rounded shadow-xl overflow-hidden"
            style={{
              left: contextMenu.x,
              top: contextMenu.y,
              background: "#ECE9D8",
              border: "1px solid #808080",
              minWidth: 160,
              boxShadow: "3px 3px 8px rgba(0,0,0,0.4)",
            }}
          >
            {[
              { label: "Open", action: () => { onOpenWindow(contextMenu.id); closeContextMenu(); } },
              { label: "Open New Window", action: () => { onOpenWindow(contextMenu.id); closeContextMenu(); } },
              { divider: true },
              { label: "Send To →", action: closeContextMenu },
              { label: "Cut", action: closeContextMenu },
              { label: "Copy", action: closeContextMenu },
              { divider: true },
              { label: "Create Shortcut", action: closeContextMenu },
              { label: "Delete", action: closeContextMenu },
              { label: "Rename", action: closeContextMenu },
              { divider: true },
              { label: "Properties", action: closeContextMenu },
            ].map((item, i) =>
              "divider" in item ? (
                <div key={i} className="border-t my-0.5" style={{ borderColor: "#a0a0a0" }} />
              ) : (
                <button
                  key={i}
                  onClick={item.action}
                  className="w-full text-left px-4 py-1 text-xs hover:bg-blue-600 hover:text-white transition-colors"
                  style={{ fontFamily: "Tahoma, sans-serif" }}
                >
                  {item.label}
                </button>
              )
            )}
          </motion.div>
        </>
      )}
    </>
  );
}
