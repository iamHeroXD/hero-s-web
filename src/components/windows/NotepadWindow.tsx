"use client";
import { useState } from "react";

const DEFAULT_CONTENT = `README.txt — Hero.X Portfolio OS
════════════════════════════════════════

This isn't your average portfolio.
It's an experience. An OS. A world.

Built with:
  - Next.js 15 + React 19
  - TypeScript
  - Framer Motion
  - Tailwind CSS
  - Web Audio API
  - Canvas 2D
  - Unhealthy amounts of caffeine ☕

════════════════════════════════════════
HIDDEN SECRETS (13 total):

  ★  Konami Code: ↑↑↓↓←→←→BA
  ★  Try 'matrix' in the terminal
  ★  Try 'hack' in the terminal
  ★  Try 'easteregg' in the terminal
  ★  Right-click desktop → Easter eggs
  ★  Open the Recycle Bin
  ★  ... and 7 more to discover

════════════════════════════════════════
TERMINAL COMMANDS:
  help, about, projects, skills,
  hack, matrix, scan, decode,
  neofetch, achievements, fortune,
  sudo, whoami, ls, cat, history

════════════════════════════════════════
— Hero.X, 2025
  github.com/iamHeroXD
  discord: herox.dev`;

export default function NotepadWindow() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [saved, setSaved] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    try {
      localStorage.setItem("herox-notepad", content);
      setSaved(true);
    } catch {}
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "white" }}>
      {/* Menubar */}
      <div
        className="flex items-center gap-4 px-3 py-1 text-xs border-b flex-shrink-0"
        style={{ background: "#ECE9D8", borderColor: "#a0a0a0", fontFamily: "Tahoma, sans-serif" }}
      >
        {["File", "Edit", "Format", "View", "Help"].map((m) => (
          <button
            key={m}
            className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded"
            onClick={m === "File" ? handleSave : undefined}
          >
            {m}
          </button>
        ))}
        {!saved && (
          <span className="ml-auto text-orange-600 text-xs">● Unsaved</span>
        )}
        {saved && (
          <span className="ml-auto text-green-600 text-xs">✓ Saved</span>
        )}
      </div>

      <textarea
        value={content}
        onChange={handleChange}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            handleSave();
          }
        }}
        className="flex-1 p-3 text-xs resize-none outline-none"
        style={{
          fontFamily: "'Courier New', monospace",
          background: "white",
          color: "#1a1a1a",
          lineHeight: 1.6,
        }}
        spellCheck={false}
      />
    </div>
  );
}
