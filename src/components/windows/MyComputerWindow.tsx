"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { WindowId } from "@/types";

interface Props {
  onOpenWindow: (id: WindowId) => void;
}

const DRIVES = [
  { name: "Local Disk (C:)", icon: "💾", total: "420 GB", used: "72", color: "#3A6EA5" },
  { name: "Projects (D:)", icon: "📁", total: "200 GB", used: "55", color: "#00A82C" },
  { name: "Ideas Drive (E:)", icon: "💡", total: "∞ GB", used: "88", color: "#FF8C00" },
  { name: "Backup (F:)", icon: "🗄️", total: "1 TB", used: "30", color: "#7B2FFF" },
];

const FOLDERS = [
  { name: "Projects", icon: "💼", id: "projects" as WindowId, desc: "All projects" },
  { name: "About Me", icon: "👤", id: "about" as WindowId, desc: "Profile" },
  { name: "Socials", icon: "🌐", id: "socials" as WindowId, desc: "Social links" },
  { name: "Resume", icon: "📄", id: "resume" as WindowId, desc: "CV / Resume" },
  { name: "Terminal", icon: "💻", id: "terminal" as WindowId, desc: "Command line" },
  { name: "Music", icon: "🎵", id: "music" as WindowId, desc: "Media player" },
  { name: "Contact", icon: "📧", id: "contact" as WindowId, desc: "Get in touch" },
  { name: "Secret Files", icon: "🔒", id: "secrets" as WindowId, desc: "???" },
];

export default function MyComputerWindow({ onOpenWindow }: Props) {
  const [selectedDrive, setSelectedDrive] = useState<string | null>(null);

  return (
    <div className="flex h-full" style={{ fontFamily: "Tahoma, Verdana, sans-serif" }}>
      {/* Sidebar */}
      <div
        className="w-44 flex-shrink-0 flex flex-col border-r p-2 gap-4"
        style={{ background: "#d4d0c8", borderColor: "#a0a0a0" }}
      >
        <div>
          <div className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1">
            <span>🗂️</span> System Tasks
          </div>
          {["View system info", "Add/Remove programs", "Properties"].map((item) => (
            <button key={item} className="block text-xs text-blue-700 hover:underline mb-1 text-left">
              {item}
            </button>
          ))}
        </div>
        <div>
          <div className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1">
            <span>📌</span> Other Places
          </div>
          {[
            { label: "My Documents", id: "about" as WindowId },
            { label: "My Network", id: "socials" as WindowId },
            { label: "Control Panel", id: "mycomputer" as WindowId },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onOpenWindow(item.id)}
              className="block text-xs text-blue-700 hover:underline mb-1 text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Menu bar */}
        <div
          className="flex items-center gap-3 px-3 py-1 border-b text-xs flex-shrink-0"
          style={{ background: "#ECE9D8", borderColor: "#a0a0a0" }}
        >
          {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
            <button key={item} className="hover:bg-blue-600 hover:text-white px-2 py-0.5 rounded">
              {item}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-3 space-y-4">
          {/* Drives section */}
          <div>
            <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1 border-b pb-1" style={{ borderColor: "#a0a0a0" }}>
              💾 Hard Disk Drives
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DRIVES.map((drive) => (
                <motion.div
                  key={drive.name}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedDrive(drive.name)}
                  className={`p-2 rounded cursor-pointer transition-all ${
                    selectedDrive === drive.name ? "ring-2 ring-blue-500" : ""
                  }`}
                  style={{
                    background: "white",
                    border: "1px solid #d4d0c8",
                    boxShadow: "1px 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{drive.icon}</span>
                    <span className="text-xs font-bold text-gray-700 truncate">{drive.name}</span>
                  </div>
                  <div className="h-2 rounded overflow-hidden" style={{ background: "#d4d0c8" }}>
                    <div
                      className="h-full rounded"
                      style={{
                        width: `${drive.used}%`,
                        background: parseInt(drive.used) > 80 ? "#e00000" : drive.color,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{drive.used}% used</span>
                    <span>{drive.total}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Apps / Folders */}
          <div>
            <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1 border-b pb-1" style={{ borderColor: "#a0a0a0" }}>
              📂 Files & Applications
            </div>
            <div className="grid grid-cols-4 gap-2">
              {FOLDERS.map((folder, i) => (
                <motion.button
                  key={folder.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onOpenWindow(folder.id)}
                  className="flex flex-col items-center gap-1 p-2 rounded cursor-pointer hover:bg-blue-50 transition-all"
                  style={{ border: "1px solid transparent" }}
                  onFocus={(e) => (e.currentTarget.style.border = "1px dashed #3A6EA5")}
                  onBlur={(e) => (e.currentTarget.style.border = "1px solid transparent")}
                >
                  <span className="text-2xl">{folder.icon}</span>
                  <span className="text-xs text-center text-gray-700 font-bold leading-tight">{folder.name}</span>
                  <span className="text-xs text-gray-400">{folder.desc}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* System info */}
          <div>
            <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1 border-b pb-1" style={{ borderColor: "#a0a0a0" }}>
              ℹ️ System Information
            </div>
            <div
              className="p-3 rounded text-xs font-mono"
              style={{ background: "#1a1a2e", color: "#00FF41", border: "1px solid #3A6EA5" }}
            >
              {[
                ["OS", "Hero.X OS v1.337"],
                ["CPU", "Creative Chaos™ @ MAX GHz"],
                ["RAM", "16 GB (Caffeine Powered)"],
                ["Uptime", "Building since day 1"],
                ["User", "Hero.X [Administrator]"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-2 mb-1">
                  <span className="text-cyan-400 w-16">{k}:</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
