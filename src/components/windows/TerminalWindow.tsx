"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TERMINAL_COMMANDS } from "@/config/data";
import { useAchievements } from "@/hooks/useAchievements";

interface TerminalLine {
  type: "input" | "output" | "error" | "system" | "success";
  content: string;
  id: number;
}

interface Props {
  onMatrixMode?: () => void;
  onAchievementUnlock?: (id: string) => void;
}

let lineIdCounter = 0;
const mkLine = (content: string, type: TerminalLine["type"] = "output"): TerminalLine => ({
  type, content, id: ++lineIdCounter,
});

// All known commands for tab completion
const ALL_COMMANDS = Object.keys(TERMINAL_COMMANDS).filter((k) => !k.startsWith("cat "));
const TAB_COMPLETIONS = [
  ...ALL_COMMANDS,
  "echo", "cat readme.md", "cat easter_egg.txt", "cat about.txt",
];

export default function TerminalWindow({ onMatrixMode, onAchievementUnlock }: Props) {
  const [lines, setLines] = useState<TerminalLine[]>([
    mkLine("Hero.X Terminal v1.337 — Type 'help' to get started", "system"),
    mkLine("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "system"),
    mkLine("Welcome, operator. Access level: GUEST", "system"),
    mkLine(""),
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHacking, setIsHacking] = useState(false);
  const [tabIndex, setTabIndex] = useState(-1);
  const [tabMatches, setTabMatches] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { unlock, getStats, getAll } = useAchievements();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const addLine = useCallback((content: string, type: TerminalLine["type"] = "output") => {
    setLines((prev) => [...prev, mkLine(content, type)]);
  }, []);

  const addLines = useCallback((text: string, type: TerminalLine["type"] = "output") => {
    const arr = text.split("\n").map((l) => mkLine(l, type));
    setLines((prev) => [...prev, ...arr]);
  }, []);

  const handleAchievement = useCallback((id: string) => {
    const result = unlock(id);
    if (result) {
      onAchievementUnlock?.(id);
    }
  }, [unlock, onAchievementUnlock]);

  const handleHack = useCallback(() => {
    setIsHacking(true);
    handleAchievement("hack_cmd");
    const hackLines = [
      "INITIATING HACK SEQUENCE v3.0...",
      "> Connecting to target: 192.168.1.1...",
      "> Bypassing firewall... [████████░░] 80%",
      "> Bypassing firewall... [██████████] 100% ✓",
      "> Scanning open ports...",
      "> Port 22 (SSH): OPEN",
      "> Port 80 (HTTP): OPEN",
      "> Port 443 (HTTPS): OPEN",
      "> Injecting exploit payload...",
      "> Privilege escalation... [FAILED]",
      "> Access denied: HERO_SHIELD_v2 detected",
      "> Counter-hack initiated...",
      "> TRACEBACK DETECTED — abort!",
      "> Connection terminated.",
      "> [Your IP has been logged... just kidding 😏]",
      "> Better luck next time, hacker.",
    ];
    hackLines.forEach((line, i) => {
      setTimeout(() => {
        addLine(line, line.includes("FAILED") || line.includes("denied") || line.includes("abort") ? "error" : "output");
        if (i === hackLines.length - 1) setIsHacking(false);
      }, i * 220);
    });
  }, [addLine, handleAchievement]);

  const handleMatrix = useCallback(() => {
    addLine("MATRIX MODE ACTIVATED — entering the rabbit hole...", "system");
    addLine("You took the red pill. Welcome to reality.", "output");
    handleAchievement("matrix_mode");
    setTimeout(() => onMatrixMode?.(), 1000);
  }, [addLine, onMatrixMode, handleAchievement]);

  const showAchievements = useCallback(() => {
    const all = getAll();
    const stats = getStats();
    addLine(`ACHIEVEMENT SYSTEM :: ${stats.unlocked}/${stats.total} unlocked (${stats.percent}%)`, "system");
    addLine(`Total XP: ${stats.xp} ★`, "system");
    addLine("──────────────────────────────────────────", "system");
    all.forEach((a) => {
      const status = a.unlocked ? "✓" : "○";
      const color = a.unlocked ? "success" : "output";
      addLine(`${status} ${a.icon} ${a.title.padEnd(20)} [+${a.xp} XP]`, color as TerminalLine["type"]);
      if (a.unlocked) {
        addLine(`  └─ ${a.description}`, "output");
      }
    });
  }, [addLine, getAll, getStats]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      addLine(`C:\\Hero.X\\Desktop> ${cmd}`, "input");
      if (!trimmed) return;

      setCmdHistory((prev) => {
        if (prev[0] === cmd) return prev;
        return [cmd, ...prev].slice(0, 50);
      });
      setHistoryIndex(-1);
      setTabMatches([]);
      setTabIndex(-1);

      if (trimmed === "clear") {
        setLines([
          mkLine("Hero.X Terminal v1.337 — cleared", "system"),
          mkLine("Type 'help' to get started", "system"),
        ]);
        return;
      }

      if (trimmed === "hack") { handleHack(); return; }
      if (trimmed === "matrix") { handleMatrix(); return; }
      if (trimmed === "achievements") { showAchievements(); return; }

      if (trimmed === "history") {
        addLine(`Command history (${cmdHistory.length} entries):`, "system");
        if (cmdHistory.length === 0) {
          addLine("  (no history yet)", "output");
        } else {
          cmdHistory.slice(0, 20).forEach((h, i) => {
            addLine(`  ${String(i + 1).padStart(3)}  ${h}`, "output");
          });
          if (cmdHistory.length > 20) addLine(`  ... and ${cmdHistory.length - 20} more`, "output");
        }
        return;
      }

      if (trimmed.startsWith("echo ")) {
        addLine(cmd.slice(5), "output");
        return;
      }

      // Track achievement for terminal use
      handleAchievement("open_terminal");

      if (trimmed === "easteregg") handleAchievement("easter_cmd");

      const response = TERMINAL_COMMANDS[trimmed];
      if (response !== undefined) {
        if (response === "CLEAR") {
          setLines([
            mkLine("Hero.X Terminal v1.337 — cleared", "system"),
            mkLine("Type 'help' to get started", "system"),
          ]);
          return;
        }
        if (response === "ACHIEVEMENTS_OPEN") {
          showAchievements();
          return;
        }
        const text = typeof response === "function" ? response() : response;
        addLines(text, "output");
      } else {
        addLine(
          `'${cmd}' is not recognized. Type 'help' for commands.`,
          "error"
        );
      }
    },
    [addLine, addLines, handleHack, handleMatrix, showAchievements, cmdHistory, handleAchievement]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCommand(input);
        setInput("");
        setTabMatches([]);
        setTabIndex(-1);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(newIndex);
        if (cmdHistory[newIndex] !== undefined) setInput(cmdHistory[newIndex]);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const newIndex = Math.max(historyIndex - 1, -1);
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? "" : cmdHistory[newIndex]);
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        if (input.trim() === "") return;

        if (tabMatches.length === 0) {
          const matches = TAB_COMPLETIONS.filter((c) =>
            c.startsWith(input.trim().toLowerCase())
          );
          if (matches.length === 1) {
            setInput(matches[0]);
            setTabMatches([]);
            setTabIndex(-1);
          } else if (matches.length > 1) {
            setTabMatches(matches);
            setTabIndex(0);
            setInput(matches[0]);
            addLine(`Completions: ${matches.join("  ")}`, "system");
          }
        } else {
          const nextIdx = (tabIndex + 1) % tabMatches.length;
          setTabIndex(nextIdx);
          setInput(tabMatches[nextIdx]);
        }
        return;
      }

      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        handleCommand("clear");
        return;
      }

      // Any typing resets tab completion
      setTabMatches([]);
      setTabIndex(-1);
    },
    [input, cmdHistory, historyIndex, tabMatches, tabIndex, handleCommand, addLine]
  );

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":   return "#00D4FF";
      case "error":   return "#FF4444";
      case "system":  return "#FFE500";
      case "success": return "#00FF41";
      default:        return "#c8ffc8";
    }
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#0d0d0d", fontFamily: "'Courier New', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-1 flex-shrink-0 border-b border-gray-800"
        style={{ background: "#111" }}
      >
        <span className="text-green-400 text-xs font-bold">Hero.X Terminal</span>
        <div className="flex gap-1.5 ml-2">
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="text-gray-600 text-xs ml-auto">
          Build 1337{isHacking && " · ⚠ HACKING IN PROGRESS"}
        </span>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-auto p-3 space-y-0.5">
        <AnimatePresence initial={false}>
          {lines.map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.08 }}
              className="text-xs leading-5"
              style={{
                color: lineColor(line.type),
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {line.content || " "}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-t border-gray-800 flex-shrink-0"
        style={{ background: "#0a0a0a" }}
      >
        <span className="text-cyan-400 text-xs flex-shrink-0 select-none">
          C:\Hero.X\Desktop&gt;
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-green-400 text-xs outline-none"
          placeholder={isHacking ? "hacking in progress..." : ""}
          disabled={isHacking}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          aria-label="Terminal input"
        />
        <span
          className="text-green-400 text-xs select-none"
          style={{ animation: "cursorBlink 1s step-end infinite" }}
          aria-hidden="true"
        >
          █
        </span>
      </div>
    </div>
  );
}
