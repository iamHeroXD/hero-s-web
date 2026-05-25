"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SKILLS } from "@/config/data";

const TYPED_TEXT = "Front-end Developer | Discord Bot Dev | UI Designer | 40+ Websites Built";

export default function AboutWindow() {
  const [typedIndex, setTypedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"profile" | "skills" | "journey" | "sysinfo">("profile");
  const [skillsLoaded, setSkillsLoaded] = useState(false);

  useEffect(() => {
    if (typedIndex < TYPED_TEXT.length) {
      const t = setTimeout(() => setTypedIndex((i) => i + 1), 40);
      return () => clearTimeout(t);
    }
  }, [typedIndex]);

  useEffect(() => {
    if (activeTab === "skills") {
      const t = setTimeout(() => setSkillsLoaded(true), 300);
      return () => clearTimeout(t);
    } else {
      setSkillsLoaded(false);
    }
  }, [activeTab]);

  const tabs = ["profile", "skills", "journey", "sysinfo"] as const;

  return (
    <div className="flex flex-col h-full font-sans" style={{ fontFamily: "Tahoma, Verdana, sans-serif" }}>
      {/* XP Menu Bar */}
      <div
        className="flex items-center gap-4 px-3 py-1 text-xs border-b"
        style={{ background: "#ECE9D8", borderColor: "#a0a0a0" }}
      >
        {["File", "Edit", "View", "Favorites", "Help"].map((item) => (
          <button key={item} className="hover:bg-blue-600 hover:text-white px-2 py-0.5 rounded text-xs">
            {item}
          </button>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex border-b" style={{ borderColor: "#a0a0a0", background: "#ECE9D8" }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold capitalize transition-all ${
              activeTab === tab
                ? "bg-white border-t-2 border-blue-800 text-blue-900 -mb-px"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            style={{ fontFamily: "Tahoma, sans-serif" }}
          >
            {tab === "sysinfo" ? "System Info" : tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-6"
          >
            {/* Avatar section */}
            <div className="flex flex-col items-center gap-3 flex-shrink-0">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-32 h-32 rounded-full overflow-hidden"
                style={{
                  boxShadow: "0 0 30px rgba(0, 212, 255, 0.4), 0 0 0 4px #ECE9D8, 0 0 0 6px #3A6EA5",
                }}
              >
                <Image
                  src="/pfpofhero.png"
                  alt="Hero.X"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Online indicator */}
                <div
                  className="absolute bottom-2 right-2 w-4 h-4 rounded-full border-2 border-white"
                  style={{ background: "#00A82C" }}
                />
              </motion.div>

              <div className="text-center">
                <div className="font-bold text-lg text-blue-900">Hero.X</div>
                <div
                  className="text-xs px-3 py-1 rounded-full text-white font-bold"
                  style={{ background: "#00A82C" }}
                >
                  ● ONLINE
                </div>
              </div>

              {/* Quick stats */}
              <div
                className="w-32 rounded p-2 text-xs space-y-1"
                style={{ background: "#d4d0c8", border: "1px solid #a0a0a0" }}
              >
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-bold text-blue-800">Elite</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Years</span>
                  <span className="font-bold text-green-700">3+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-bold text-purple-700">40+</span>
                </div>
              </div>
            </div>

            {/* Info section */}
            <div className="flex-1 space-y-4">
              {/* Typed headline */}
              <div
                className="p-3 rounded font-mono text-xs"
                style={{
                  background: "#1a1a2e",
                  border: "1px solid #3A6EA5",
                  color: "#00FF41",
                }}
              >
                &gt; {TYPED_TEXT.slice(0, typedIndex)}
                <span className="animate-pulse">█</span>
              </div>

              {/* Bio */}
              <div
                className="p-3 rounded text-sm space-y-2"
                style={{ background: "white", border: "1px solid #a0a0a0" }}
              >
                <p className="font-bold text-blue-900 text-base">Hey, I&apos;m Hero.X 👋</p>
                <p className="text-gray-700 leading-relaxed text-xs">
                  Front-end developer and Discord bot dev with 3+ years of experience and 40+ websites
                  shipped. I design and build clean, high-performing web interfaces and scalable Discord
                  systems that people actually enjoy using.
                </p>
                <p className="text-gray-700 leading-relaxed text-xs">
                  Available remotely, globally. Whether it&apos;s a portfolio site, a business platform,
                  or a fully-featured Discord bot — I build it right, first time.
                </p>
              </div>

              {/* Interests */}
              <div>
                <div className="text-xs font-bold text-gray-600 mb-2 uppercase tracking-wide">Interests</div>
                <div className="flex flex-wrap gap-2">
                  {["Web Dev", "UI/UX Design", "Discord Bots", "Node.js", "JavaScript", "Animation", "Creative Coding", "Roblox", "Open Source", "Remote Work"].map((tag) => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="px-2 py-1 rounded text-xs font-bold cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #0A246A, #3A6EA5)",
                        color: "white",
                        border: "1px solid #00D4FF",
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Floating tech icons */}
              <div className="flex gap-3 flex-wrap">
                {["⚛️", "🟨", "🔵", "🟩", "🎮", "🤖", "🎨", "⚡"].map((icon, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className="text-2xl"
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div
              className="p-2 font-mono text-xs mb-3"
              style={{ background: "#1a1a2e", color: "#00FF41", border: "1px solid #3A6EA5" }}
            >
              C:\Hero\System&gt; loading skill_tree.sys...
            </div>

            {["Frontend", "Game Dev", "Backend", "Design", "Bot Dev", "Animation", "Tools", "AI/ML"].map((category) => {
              const catSkills = SKILLS.filter((s) => s.category === category);
              if (catSkills.length === 0) return null;
              return (
                <div key={category}>
                  <div className="text-xs font-bold text-blue-800 mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                    [{category}]
                  </div>
                  <div className="space-y-2">
                    {catSkills.map((skill) => (
                      <div key={skill.name} className="flex items-center gap-3">
                        <span className="text-xs font-mono w-28 text-gray-700 flex-shrink-0">
                          {skill.name}
                        </span>
                        <div
                          className="flex-1 h-4 rounded overflow-hidden"
                          style={{ background: "#d4d0c8", border: "1px inset #808080" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: skillsLoaded ? `${skill.level}%` : 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                            className="h-full relative"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                              boxShadow: `0 0 6px ${skill.color}66`,
                            }}
                          >
                            <div
                              className="absolute inset-0 opacity-30"
                              style={{
                                background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                              }}
                            />
                          </motion.div>
                        </div>
                        <span className="text-xs font-bold text-gray-600 w-10 text-right">
                          {skill.level}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {activeTab === "journey" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {[
              { year: "2022", title: "First Line of Code", desc: "Started with HTML/CSS. Made the ugliest website ever. Thought I was a genius.", icon: "🌱", color: "#00A82C" },
              { year: "2023", title: "Roblox + Discord Era", desc: "Discovered Lua, Roblox Studio, and Discord.js. Built first bots — 5 servers became 50 fast.", icon: "🎮", color: "#FF4444" },
              { year: "2024", title: "JavaScript Mastered", desc: "Leveled up JS skills. Built real client portfolios and web tools. Shipped 40+ sites.", icon: "⚡", color: "#F7DF1E" },
              { year: "2025", title: "React + Next.js", desc: "Leveled up to modern web development. Built full-stack projects. Added React and Next.js to the stack.", icon: "⚛️", color: "#61DAFB" },
              { year: "2026", title: "Elite Mode", desc: "Front-end developer. UI designer. Bot developer. Building the impossible — like this OS.", icon: "🚀", color: "#7B2FFF" },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      background: item.color,
                      boxShadow: `0 0 10px ${item.color}66`,
                    }}
                  >
                    {item.icon}
                  </div>
                  {i < 4 && <div className="w-0.5 h-8 bg-gray-300 mt-1" />}
                </div>
                <div
                  className="flex-1 p-3 rounded text-xs"
                  style={{ background: "white", border: "1px solid #d4d0c8" }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-bold px-2 py-0.5 rounded text-white text-xs"
                      style={{ background: item.color }}
                    >
                      {item.year}
                    </span>
                    <span className="font-bold text-gray-800">{item.title}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "sysinfo" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono"
          >
            <div
              className="p-4 rounded text-xs space-y-2"
              style={{
                background: "#1a1a2e",
                border: "1px solid #3A6EA5",
                color: "#e0e0e0",
              }}
            >
              <div className="text-cyan-400 font-bold mb-3">HERO.X SYSTEM INFORMATION</div>
              {[
                ["Operator", "Hero.X"],
                ["Role", "Front-end Dev + Discord Bot Dev"],
                ["Location", "Remote / Global"],
                ["Status", "● ONLINE — Building things"],
                ["Experience", "3+ years"],
                ["Projects", "40+ shipped"],
                ["Languages", "HTML, CSS, JS, Node.js"],
                ["Frameworks", "Discord.js, React, Next.js"],
                ["Database", "SQLite"],
                ["Current Build", "Hero.X Portfolio OS v1.337"],
                ["Availability", "Open for work & collabs"],
                ["Discord", "x.hero_dev"],
                ["Email", "heeroh622@gmail.com"],
              ].map(([key, val]) => (
                <div key={key} className="flex gap-2">
                  <span className="text-green-400 w-28 flex-shrink-0">{key}:</span>
                  <span className={val.includes("ONLINE") ? "text-green-300" : "text-gray-300"}>
                    {val}
                  </span>
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-700 text-green-400">
                C:\Hero\System&gt; <span className="animate-pulse">█</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
