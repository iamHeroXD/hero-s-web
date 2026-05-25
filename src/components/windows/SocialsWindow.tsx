"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const SOCIALS = [
  {
    id: "github",
    name: "GitHub",
    icon: "🐙",
    username: "iamHeroXD",
    url: "https://github.com/iamHeroXD",
    color: "#333",
    bg: "linear-gradient(135deg, #2b2b2b, #1a1a1a)",
    followers: "50+",
    status: "● Active",
    desc: "All my real projects — portfolios, tools, bots, and more. 40+ websites shipped.",
    stats: [{ label: "Repos", val: "30+" }, { label: "Sites", val: "40+" }, { label: "Commits", val: "1K+" }],
  },
  {
    id: "discord",
    name: "Discord",
    icon: "💬",
    username: "x.hero_dev",
    url: "#",
    color: "#5865F2",
    bg: "linear-gradient(135deg, #5865F2, #3b45c7)",
    followers: "5K+ srv",
    status: "● Online",
    desc: "DM me for collabs, projects, or just to say hi. Front-end dev for a 5000+ member server.",
    stats: [{ label: "Server", val: "5K+" }, { label: "Bots Made", val: "10+" }, { label: "Messages", val: "∞" }],
  },
  {
    id: "twitter",
    name: "Twitter / X",
    icon: "🐦",
    username: "@herox_dev",
    url: "https://x.com/herox_dev",
    color: "#1DA1F2",
    bg: "linear-gradient(135deg, #1DA1F2, #0c7abf)",
    followers: "200+",
    status: "● Active",
    desc: "Dev updates, UI drops, and random thoughts at 3am.",
    stats: [{ label: "Posts", val: "500+" }, { label: "Following", val: "300+" }, { label: "Likes", val: "2K+" }],
  },
  {
    id: "roblox",
    name: "Roblox",
    icon: "🎮",
    username: "Hero_H622",
    url: "https://roblox.com/users/5541405985/profile",
    color: "#FF4444",
    bg: "linear-gradient(135deg, #FF4444, #CC0000)",
    followers: "500+",
    status: "● Online",
    desc: "Game developer & UI designer. Custom HUDs, games, and Robux tools.",
    stats: [{ label: "Games", val: "8+" }, { label: "Visits", val: "50K+" }, { label: "Friends", val: "120+" }],
  },
];

export default function SocialsWindow() {
  const [activeTab, setActiveTab] = useState<string>(SOCIALS[0].id);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("https://github.com/iamHeroXD");

  const activeSocial = SOCIALS.find((s) => s.id === activeTab)!;

  const handleTabChange = (id: string) => {
    setLoading(true);
    setActiveTab(id);
    const s = SOCIALS.find((s) => s.id === id)!;
    setUrl(s.url);
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "Tahoma, Verdana, sans-serif", background: "#ECE9D8" }}
    >
      {/* IE Toolbar */}
      <div
        className="flex items-center gap-1 px-2 py-1 border-b flex-shrink-0"
        style={{ background: "#d4d0c8", borderColor: "#a0a0a0" }}
      >
        {/* Nav buttons */}
        <button className="xp-button text-xs px-2 py-1">◀</button>
        <button className="xp-button text-xs px-2 py-1">▶</button>
        <button onClick={() => handleTabChange(activeTab)} className="xp-button text-xs px-2 py-1">⟳</button>
        <button className="xp-button text-xs px-2 py-1">🏠</button>

        {/* Address bar */}
        <div
          className="flex-1 flex items-center gap-1 px-2 py-1 mx-2"
          style={{ background: "white", border: "1px solid #7f9db9", borderRadius: 2 }}
        >
          <span className="text-blue-600 text-xs">🌐</span>
          <span className="text-xs text-gray-600 flex-1 truncate font-mono">{url}</span>
          {loading && (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="text-xs text-blue-600"
            >
              ⟳
            </motion.span>
          )}
        </div>

        <button className="text-xs px-3 py-1 text-white rounded font-bold" style={{ background: "#3A6EA5" }}>
          Go
        </button>
      </div>

      {/* Browser tabs */}
      <div
        className="flex border-b flex-shrink-0"
        style={{ background: "#d4d0c8", borderColor: "#a0a0a0" }}
      >
        {SOCIALS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleTabChange(s.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs border-r transition-all ${
              activeTab === s.id
                ? "bg-white border-t-2 border-blue-700 -mb-px font-bold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            style={{ borderColor: activeTab === s.id ? "#0A246A" : "#a0a0a0" }}
          >
            <span>{s.icon}</span>
            <span>{s.name}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              ⟳
            </motion.div>
            <div className="text-gray-600 text-sm">Loading page...</div>
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Profile card */}
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: "2px solid #d4d0c8", boxShadow: "2px 2px 8px rgba(0,0,0,0.1)" }}
            >
              {/* Banner */}
              <div
                className="h-24 relative flex items-end px-4 pb-3"
                style={{ background: activeSocial.bg }}
              >
                <div
                  className="w-16 h-16 rounded-full overflow-hidden"
                  style={{
                    border: "3px solid white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                >
                  <Image
                    src="/pfpofhero.png"
                    alt="Hero.X"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-white">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-gray-800 text-base">{activeSocial.name}</div>
                    <div className="font-mono text-blue-700 text-sm">{activeSocial.username}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: activeSocial.color }}
                    >
                      {activeSocial.status}
                    </span>
                    <span className="text-xs text-gray-500">{activeSocial.followers} followers</span>
                  </div>
                </div>

                <p className="text-gray-600 text-xs mb-3">{activeSocial.desc}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {activeSocial.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded p-2 text-center"
                      style={{ background: "#f5f4ea", border: "1px solid #d4d0c8" }}
                    >
                      <div className="font-bold text-blue-900 text-sm">{stat.val}</div>
                      <div className="text-gray-500 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <a
                  href={activeSocial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2 rounded text-xs font-bold text-white hover:opacity-90 transition-opacity"
                  style={{ background: activeSocial.bg }}
                >
                  Visit {activeSocial.name} Profile →
                </a>
              </div>
            </div>

            {/* IE-style link bar */}
            <div
              className="p-3 rounded text-xs"
              style={{ background: "#fff9e0", border: "1px solid #e0d080" }}
            >
              <div className="font-bold text-yellow-800 mb-2">📌 Bookmarks</div>
              <div className="space-y-1">
                {SOCIALS.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span>{s.icon}</span>
                    <button
                      onClick={() => handleTabChange(s.id)}
                      className="text-blue-700 hover:underline text-xs"
                    >
                      {s.name} — {s.username}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="flex items-center px-3 py-1 text-xs border-t flex-shrink-0"
        style={{ background: "#d4d0c8", borderColor: "#a0a0a0" }}
      >
        <span className="text-gray-600">Done</span>
        <span className="ml-auto text-blue-700">Internet Explorer — Hero.X Edition</span>
      </div>
    </div>
  );
}
