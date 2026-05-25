"use client";
import { motion } from "framer-motion";

export default function ResumeWindow() {
  return (
    <div
      className="flex flex-col h-full overflow-auto"
      style={{ fontFamily: "Tahoma, Verdana, sans-serif", background: "#f5f4ea" }}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-1 border-b flex-shrink-0"
        style={{ background: "#ECE9D8", borderColor: "#a0a0a0" }}
      >
        <button className="xp-button text-xs">🖨️ Print</button>
        <button className="xp-button text-xs">💾 Save</button>
        <button className="xp-button text-xs">📤 Share</button>
        <span className="ml-auto text-xs text-gray-500">Resume.pdf — Hero.X</span>
      </div>

      <div className="p-8 max-w-2xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Hero.X</h1>
          <div className="text-blue-700 font-bold text-sm mb-2">
            Front-end Developer | Discord Bot Dev | UI Designer
          </div>
          <div className="flex justify-center gap-4 text-xs text-gray-600 flex-wrap">
            <span>💬 x.hero_dev</span>
            <span>🐙 github.com/iamHeroXD</span>
            <span>✉️ heeroh622@gmail.com</span>
            <span>🐦 @herox_dev</span>
          </div>
        </motion.div>

        <hr style={{ borderColor: "#0A246A", borderWidth: 2, marginBottom: 16 }} />

        {/* Sections */}
        {[
          {
            title: "Summary",
            content: (
              <p className="text-xs text-gray-700 leading-relaxed">
                Front-end developer and Discord bot developer with 3+ years of experience and 40+ websites
                shipped. I design and build clean, high-performing web interfaces and scalable Discord systems.
                Proficient in HTML, CSS, JavaScript, Node.js, Discord.js, and SQLite. Available remotely,
                globally — I build it right, first time.
              </p>
            ),
          },
          {
            title: "Experience",
            content: (
              <div className="space-y-3">
                {[
                  {
                    role: "Freelance Front-end Developer",
                    company: "Self-employed",
                    period: "2022 – Present",
                    items: [
                      "Built 40+ custom portfolio and business websites for clients worldwide",
                      "Shipped projects including HustleHub, MrQuaxkers Portfolio, NotScriptedPro, Paco",
                      "Served as front-end developer for a 5000+ member Discord server community",
                    ],
                  },
                  {
                    role: "Discord Bot Developer",
                    company: "Freelance",
                    period: "2022 – Present",
                    items: [
                      "Built Marketplace Bot and 10+ other Discord bots for client servers",
                      "Implemented economy, moderation, listing and transaction systems",
                      "Developed with Discord.js, Node.js, and SQLite for data persistence",
                    ],
                  },
                  {
                    role: "Roblox Developer",
                    company: "Independent Creator",
                    period: "2021 – Present",
                    items: [
                      "Created Robux Calculator tool — widely used by the Roblox community",
                      "Designed custom UIs and HUD systems for Roblox games",
                      "Built interactive experiences using Roblox Studio",
                    ],
                  },
                ].map((exp) => (
                  <div key={exp.role} className="border-l-2 border-blue-700 pl-3">
                    <div className="font-bold text-xs text-gray-800">{exp.role}</div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{exp.company}</span>
                      <span>{exp.period}</span>
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {exp.items.map((item) => (
                        <li key={item} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-blue-700 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ),
          },
          {
            title: "Skills",
            content: (
              <div className="flex flex-wrap gap-2">
                {[
                  "HTML", "CSS", "JavaScript", "Node.js", "Discord.js", "SQLite",
                  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
                  "UI/UX Design", "Git/GitHub", "Roblox Studio",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{
                      background: "linear-gradient(135deg, #0A246A, #3A6EA5)",
                      color: "white",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ),
          },
          {
            title: "Education",
            content: (
              <div className="space-y-2">
                <div className="border-l-2 border-blue-700 pl-3">
                  <div className="font-bold text-xs text-gray-800">Self-Taught Developer</div>
                  <div className="text-xs text-gray-500">2020 – Present</div>
                  <div className="text-xs text-gray-600">
                    Learned through projects, documentation, YouTube, and building real things that break.
                  </div>
                </div>
                <div className="border-l-2 border-green-600 pl-3">
                  <div className="font-bold text-xs text-gray-800">Certifications & Courses</div>
                  <div className="text-xs text-gray-600">
                    Various online courses in React, Next.js, UI/UX, and AI/ML
                  </div>
                </div>
              </div>
            ),
          },
          {
            title: "Projects",
            content: (
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "HustleHub", desc: "Productivity platform — HTML/CSS/JS" },
                  { name: "Marketplace Bot", desc: "Discord.js + Node.js + SQLite" },
                  { name: "MrQuaxkers Portfolio", desc: "Client portfolio site" },
                  { name: "Robux Calculator", desc: "Roblox community tool" },
                ].map((p) => (
                  <div key={p.name} className="rounded p-2" style={{ background: "white", border: "1px solid #d4d0c8" }}>
                    <div className="font-bold text-xs text-blue-800">{p.name}</div>
                    <div className="text-xs text-gray-600">{p.desc}</div>
                  </div>
                ))}
              </div>
            ),
          },
        ].map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="mb-5"
          >
            <div
              className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b"
              style={{ color: "#0A246A", borderColor: "#0A246A" }}
            >
              {section.title}
            </div>
            {section.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
