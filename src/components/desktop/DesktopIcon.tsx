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
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setSelectedIcon(icon.id); }}
            onDoubleClick={() => handleDoubleClick(icon.id)}
            onContextMenu={(e) => handleContextMenu(e, icon.id)}
            className="flex flex-col items-center gap-1 cursor-pointer rounded p-1 select-none"
            style={{
              background:
                selectedIcon === icon.id
                  ? "rgba(58, 110, 165, 0.3)"
                  : "transparent",
              border:
                selectedIcon === icon.id
                  ? "1px dashed rgba(255, 255, 255, 0.6)"
                  : "1px solid transparent",
            }}
          >
            <motion.div
              animate={
                selectedIcon === icon.id
                  ? { filter: "drop-shadow(0 0 8px rgba(0, 212, 255, 0.8))" }
                  : { filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))" }
              }
              className="text-3xl leading-none"
            >
              {icon.icon}
            </motion.div>
            <span
              className="text-white text-xs text-center leading-tight font-bold"
              style={{
                textShadow: "1px 1px 3px rgba(0,0,0,0.9), -1px -1px 3px rgba(0,0,0,0.9)",
                fontSize: "10px",
                maxWidth: "72px",
                wordBreak: "break-word",
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
