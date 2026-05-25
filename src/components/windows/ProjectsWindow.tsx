"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/config/data";
import type { Project } from "@/types";

const CATEGORIES = ["All", "Web App", "Portfolio", "Tool", "Bot", "Game Dev"];

const STATUS_COLORS: Record<string, string> = {
  live: "#00A82C",
  wip: "#FF8C00",
  completed: "#3A6EA5",
  archived: "#808080",
};

const STATUS_LABELS: Record<string, string> = {
  live: "● LIVE",
  wip: "◐ WIP",
  completed: "✓ DONE",
  archived: "◻ ARCHIVED",
};

export default function ProjectsWindow() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "year" | "status">("year");

  const filtered = PROJECTS.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (sortBy === "name") return a.title.localeCompare(b.title);
    if (sortBy === "year") return b.year.localeCompare(a.year);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="flex h-full" style={{ fontFamily: "Tahoma, Verdana, sans-serif" }}>
      {/* Sidebar */}
      <div
        className="w-48 flex-shrink-0 flex flex-col border-r overflow-auto"
        style={{ background: "#d4d0c8", borderColor: "#a0a0a0" }}
      >
        {/* Drive section */}
        <div className="p-2 border-b" style={{ borderColor: "#a0a0a0" }}>
          <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
            <span>🖥️</span> Drives
          </div>
          {[
            { label: "Local Disk (C:)", used: 72, icon: "💾" },
            { label: "Projects (D:)", used: 55, icon: "📁" },
            { label: "Ideas (E:)", used: 88, icon: "💡" },
          ].map((drive) => (
            <div
              key={drive.label}
              className="mb-2 p-1.5 rounded cursor-pointer hover:bg-blue-600 hover:text-white group"
            >
              <div className="flex items-center gap-1 text-xs mb-1">
                <span>{drive.icon}</span>
                <span className="truncate">{drive.label}</span>
              </div>
              <div className="h-1.5 rounded overflow-hidden" style={{ background: "#a0a0a0" }}>
                <div
                  className="h-full rounded"
                  style={{
                    width: `${drive.used}%`,
                    background: drive.used > 80 ? "#e00000" : "#3A6EA5",
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 group-hover:text-gray-200 mt-0.5">
                {drive.used}% used
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="p-2">
          <div className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
            <span>📂</span> Categories
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left text-xs px-2 py-1.5 rounded mb-0.5 flex items-center gap-1.5 transition-all ${
                selectedCategory === cat
                  ? "text-white font-bold"
                  : "text-gray-700 hover:bg-blue-500 hover:text-white"
              }`}
              style={{
                background: selectedCategory === cat ? "#0A246A" : "transparent",
              }}
            >
              📄 {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-2 border-b flex-shrink-0"
          style={{ background: "#ECE9D8", borderColor: "#a0a0a0" }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="🔍 Search projects..."
            className="xp-input flex-1 text-xs"
            style={{ maxWidth: 200 }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "name" | "year" | "status")}
            className="xp-input text-xs"
            style={{ width: 120 }}
          >
            <option value="year">Sort: Year</option>
            <option value="name">Sort: Name</option>
            <option value="status">Sort: Status</option>
          </select>
          <span className="text-xs text-gray-500 ml-auto">{filtered.length} items</span>
        </div>

        <div className="flex-1 overflow-auto p-3">
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer rounded overflow-hidden"
                style={{
                  background: "white",
                  border: "2px solid #d4d0c8",
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                {/* Project header */}
                <div
                  className="h-20 flex items-center justify-center text-4xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #0A246A 0%, #3A6EA5 50%, #00D4FF 100%)",
                  }}
                >
                  <div className="text-4xl">
                    {project.category === "Web App" ? "🌐" :
                     project.category === "Portfolio" ? "🎨" :
                     project.category === "Tool" ? "🔧" :
                     project.category === "Bot" ? "🤖" :
                     project.category === "Game Dev" ? "🎮" : "📁"}
                  </div>
                  <div
                    className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: STATUS_COLORS[project.status],
                      color: "white",
                      fontSize: "9px",
                    }}
                  >
                    {STATUS_LABELS[project.status]}
                  </div>
                </div>

                {/* Project info */}
                <div className="p-2">
                  <div className="font-bold text-xs text-gray-800 mb-1">{project.title}</div>
                  <div className="text-gray-600 text-xs mb-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: "#d4d0c8", color: "#333", fontSize: "10px" }}
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{project.tags.length - 3}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>📅 {project.year}</span>
                    <span>💾 {project.size}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            onClick={(e) => e.target === e.currentTarget && setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="rounded-lg overflow-hidden w-[480px] max-h-[85vh] flex flex-col"
              style={{
                background: "#ECE9D8",
                border: "2px solid #0A246A",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* Modal title bar */}
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{ background: "linear-gradient(to bottom, #0A246A, #3A6EA5)" }}
              >
                <span className="text-white font-bold text-xs" style={{ fontFamily: "Tahoma, sans-serif" }}>
                  📁 {selectedProject.title}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white hover:bg-red-600 w-5 h-5 rounded flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 overflow-auto flex-1">
                {/* Header */}
                <div
                  className="h-32 rounded-lg mb-4 flex items-center justify-center text-6xl relative overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #0A246A, #3A6EA5, #00D4FF)",
                  }}
                >
                  {selectedProject.category === "Web App" ? "🌐" :
                   selectedProject.category === "Portfolio" ? "🎨" :
                   selectedProject.category === "Tool" ? "🔧" :
                   selectedProject.category === "Bot" ? "🤖" :
                   selectedProject.category === "Game Dev" ? "🎮" : "📁"}
                  <div
                    className="absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: STATUS_COLORS[selectedProject.status] }}
                  >
                    {STATUS_LABELS[selectedProject.status]}
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-800 mb-2">{selectedProject.title}</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{selectedProject.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                  {[
                    ["Category", selectedProject.category],
                    ["Year", selectedProject.year],
                    ["Status", STATUS_LABELS[selectedProject.status]],
                    ["File Size", selectedProject.size],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded p-2" style={{ background: "white", border: "1px solid #d4d0c8" }}>
                      <div className="text-gray-500 text-xs">{k}</div>
                      <div className="font-bold text-gray-800">{v}</div>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <div className="text-xs font-bold text-gray-600 mb-2">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #0A246A, #3A6EA5)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedProject.link ? (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded text-xs font-bold text-white transition-all hover:scale-105 text-center"
                      style={{ background: "linear-gradient(135deg, #0A246A, #3A6EA5)" }}
                    >
                      🐙 View on GitHub
                    </a>
                  ) : (
                    <button
                      className="flex-1 py-2 rounded text-xs font-bold text-white transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #0A246A, #3A6EA5)", opacity: 0.6, cursor: "not-allowed" }}
                      disabled
                    >
                      🔒 Private Repo
                    </button>
                  )}
                  <button
                    className="flex-1 py-2 rounded text-xs font-bold transition-all hover:scale-105"
                    style={{ background: "#d4d0c8", border: "1px solid #a0a0a0", color: "#333" }}
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕ Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
