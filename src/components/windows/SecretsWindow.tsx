"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECRET_FILES = [
  {
    name: "secret_level_1.txt",
    icon: "📜",
    locked: false,
    content: `HERO.X SECRET FILE #1
═══════════════════════════════
The first portfolio was built in 24 hours on a dare.
It crashed. It broke. But it was epic.
Lesson: Ship it, then fix it.

"Done is better than perfect" — someone wise
═══════════════════════════════
[End of file]`,
  },
  {
    name: "origin_story.md",
    icon: "📖",
    locked: false,
    content: `# The Origin Story

It started with a Roblox game that had 0 players.

Then 1. Then 10. Then hundreds.

That feeling of building something from nothing —
of watching numbers tick up — was addictive.

So the building never stopped.
Web apps. Discord bots. UI designs. AI tools.

Each project is a new challenge.
Each challenge is a new story.

Hero.X is still writing theirs.`,
  },
  {
    name: "unreleased_projects.exe",
    icon: "💾",
    locked: true,
    password: "herox",
    content: `UNRELEASED PROJECTS — CLASSIFIED

> Project Phantom: A Roblox game so ambitious it broke the engine
> Project Aurora: A portfolio template that became this OS
> Project Ghost: An AI chatbot that knows too much
> Project Nexus: A multiplayer game with 50+ mechanics
> Project Zero: The project that started everything

Status: All in progress. All coming soon.
ETA: When they're ready.`,
  },
  {
    name: "hacker_manifesto.txt",
    icon: "💻",
    locked: false,
    content: `THE HERO.X HACKER MANIFESTO

1. Build things that shouldn't exist.
2. Break things to understand them.
3. Fix things better than before.
4. Share knowledge freely.
5. Code with creativity, not just logic.
6. The best UI is invisible.
7. The best code tells a story.
8. Every bug is a lesson in disguise.
9. Ship early, iterate often.
10. The keyboard is mightier than the sword.

— Hero.X, somewhere between 3am and dawn`,
  },
  {
    name: "easter_eggs_list.json",
    icon: "🥚",
    locked: false,
    content: `{
  "easter_eggs": [
    "Konami Code: ↑↑↓↓←→←→BA",
    "Click the taskbar clock 5 times",
    "Type 'matrix' in terminal",
    "Type 'hack' in terminal",
    "Right-click desktop → Matrix Mode",
    "Find the hidden wallpaper",
    "Open Recycle Bin",
    "Click the start button 10 times fast",
    "The notepad has secrets",
    "You found this file — that's one!",
    "There are 13 secrets total",
    "Some windows have hidden buttons",
    "The terminal has 3 hidden commands"
  ]
}`,
  },
];

export default function SecretsWindow() {
  const [selectedFile, setSelectedFile] = useState<(typeof SECRET_FILES)[0] | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [passwordError, setPasswordError] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [masterUnlocked, setMasterUnlocked] = useState(false);

  const handleMasterUnlock = () => {
    if (masterPassword.toLowerCase() === "herox" || masterPassword === "1337") {
      setMasterUnlocked(true);
      setAccessGranted(true);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  const handleFileOpen = (file: (typeof SECRET_FILES)[0]) => {
    if (!file.locked || unlocked.includes(file.name)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(file);
    }
  };

  const handleUnlock = () => {
    if (selectedFile && passwordInput.toLowerCase() === selectedFile.password?.toLowerCase()) {
      setUnlocked((prev) => [...prev, selectedFile.name]);
      setPasswordInput("");
    } else {
      setPasswordError(true);
      setPasswordInput("");
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  if (!masterUnlocked) {
    return (
      <div
        className="flex flex-col items-center justify-center h-full gap-4 p-8"
        style={{ background: "#1a1a2e", fontFamily: "Courier New, monospace" }}
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-6xl"
        >
          🔒
        </motion.div>
        <div className="text-cyan-400 font-bold text-lg text-center">ACCESS RESTRICTED</div>
        <div className="text-gray-400 text-xs text-center max-w-xs">
          This directory contains sensitive files. Authentication required to proceed.
        </div>
        <div className="w-full max-w-xs space-y-2">
          <input
            type="password"
            value={masterPassword}
            onChange={(e) => setMasterPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleMasterUnlock()}
            placeholder="Enter access code..."
            className="w-full px-3 py-2 rounded text-sm text-white"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: passwordError ? "1px solid #FF006E" : "1px solid rgba(0, 212, 255, 0.3)",
              fontFamily: "Courier New, monospace",
            }}
            autoFocus
          />
          {passwordError && (
            <div className="text-red-400 text-xs">⚠ Access denied. Invalid code.</div>
          )}
          <button
            onClick={handleMasterUnlock}
            className="w-full py-2 rounded text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #7B2FFF, #00D4FF)" }}
          >
            AUTHENTICATE
          </button>
        </div>
        <div className="text-gray-600 text-xs text-center">Hint: Type the site name (lowercase)</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "Courier New, monospace", background: "#0d0d0d" }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b flex-shrink-0"
        style={{ background: "#111", borderColor: "#333" }}
      >
        <span className="text-green-400 text-xs font-bold">
          ✓ ACCESS GRANTED — Hidden Files Directory
        </span>
        <span className="ml-auto text-gray-600 text-xs">{SECRET_FILES.length} files found</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* File list */}
        <div
          className="w-48 flex-shrink-0 border-r overflow-auto"
          style={{ background: "#111", borderColor: "#333" }}
        >
          <div className="p-2 text-xs text-green-400 border-b" style={{ borderColor: "#333" }}>
            C:\Secret_Files\
          </div>
          {SECRET_FILES.map((file) => (
            <button
              key={file.name}
              onClick={() => handleFileOpen(file)}
              className={`w-full flex items-center gap-2 px-2 py-2 text-xs text-left transition-all hover:bg-green-900/20 ${
                selectedFile?.name === file.name ? "bg-green-900/30 border-l-2 border-green-400" : ""
              }`}
            >
              <span>{file.icon}</span>
              <span
                className="truncate"
                style={{
                  color:
                    file.locked && !unlocked.includes(file.name)
                      ? "#FF8C00"
                      : selectedFile?.name === file.name
                      ? "#00FF41"
                      : "#e0e0e0",
                }}
              >
                {file.name}
              </span>
              {file.locked && !unlocked.includes(file.name) && (
                <span className="ml-auto text-orange-400">🔒</span>
              )}
            </button>
          ))}
        </div>

        {/* Content viewer */}
        <div className="flex-1 overflow-auto">
          {selectedFile ? (
            <div className="h-full flex flex-col">
              <div
                className="flex items-center gap-2 px-3 py-2 border-b flex-shrink-0"
                style={{ background: "#111", borderColor: "#333" }}
              >
                <span>{selectedFile.icon}</span>
                <span className="text-green-400 text-xs">{selectedFile.name}</span>
              </div>

              {selectedFile.locked && !unlocked.includes(selectedFile.name) ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-4 p-6">
                  <span className="text-4xl">🔒</span>
                  <div className="text-orange-400 text-sm font-bold">File is encrypted</div>
                  <div className="w-full max-w-xs space-y-2">
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                      placeholder="File password..."
                      className="w-full px-3 py-2 text-xs rounded text-white"
                      style={{
                        background: "rgba(0,0,0,0.5)",
                        border: passwordError ? "1px solid #FF4444" : "1px solid #333",
                        fontFamily: "Courier New, monospace",
                      }}
                      autoFocus
                    />
                    {passwordError && (
                      <div className="text-red-400 text-xs">Wrong password</div>
                    )}
                    <button
                      onClick={handleUnlock}
                      className="w-full py-1.5 text-xs font-bold text-white rounded"
                      style={{ background: "#FF8C00" }}
                    >
                      Decrypt
                    </button>
                  </div>
                  <div className="text-gray-600 text-xs">Hint: same as master password</div>
                </div>
              ) : (
                <AnimatePresence>
                  {accessGranted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 flex-1 overflow-auto"
                    >
                      <pre
                        className="text-green-400 text-xs leading-relaxed whitespace-pre-wrap"
                        style={{ fontFamily: "Courier New, monospace" }}
                      >
                        {selectedFile.content}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-600">
              <span className="text-4xl">📁</span>
              <span className="text-xs">Select a file to view</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
