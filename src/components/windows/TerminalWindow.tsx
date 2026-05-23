"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TERMINAL_COMMANDS } from "@/config/data";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

interface Props {
  onMatrixMode?: () => void;
}

export default function TerminalWindow({ onMatrixMode }: Props) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "system", content: "Hero.X Terminal v1.337 — Type 'help' to get started" },
    { type: "system", content: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
    { type: "system", content: "Welcome, user. Access granted." },
    { type: "output", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isHacking, setIsHacking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const printLine = useCallback((content: string, type: TerminalLine["type"] = "output") => {
    setLines((prev) => [...prev, { type, content }]);
  }, []);

  const printLines = useCallback(
    (text: string, type: TerminalLine["type"] = "output") => {
      const lineArr = text.split("\n");
      setLines((prev) => [...prev, ...lineArr.map((l) => ({ type, content: l }))]);
    },
    []
  );

  const handleHack = useCallback(() => {
    setIsHacking(true);
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
      "> Access denied: ADMIN_SHIELD_v2 detected",
      "> Counter-hack initiated...",
      "> TRACEBACK DETECTED — run!",
      "> Connection lost.",
      "> [Your IP has been logged... just kidding 😏]",
      "> Better luck next time, hacker.",
    ];

    hackLines.forEach((line, i) => {
      setTimeout(
        () => {
          printLine(line, line.includes("FAILED") || line.includes("denied") ? "error" : "output");
          if (i === hackLines.length - 1) setIsHacking(false);
        },
        i * 250
      );
    });
  }, [printLine]);

  const handleMatrix = useCallback(() => {
    printLine("MATRIX MODE ACTIVATED — entering the rabbit hole...", "system");
    printLine("You took the red pill. Welcome to reality.", "output");
    setTimeout(() => onMatrixMode?.(), 1000);
  }, [printLine, onMatrixMode]);

  const handleCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      printLine(`C:\\Hero.X\\Desktop> ${cmd}`, "input");

      if (!trimmed) return;

      setHistory((prev) => [cmd, ...prev]);
      setHistoryIndex(-1);

      if (trimmed === "clear") {
        setLines([
          { type: "system", content: "Hero.X Terminal v1.337 — cleared" },
          { type: "system", content: "Type 'help' to get started" },
        ]);
        return;
      }

      if (trimmed === "hack") {
        handleHack();
        return;
      }

      if (trimmed === "matrix") {
        handleMatrix();
        return;
      }

      if (trimmed.startsWith("echo ")) {
        printLine(trimmed.slice(5), "output");
        return;
      }

      const response = TERMINAL_COMMANDS[trimmed];
      if (response) {
        const text = typeof response === "function" ? response() : response;
        printLines(text, "output");
      } else {
        printLine(
          `'${cmd}' is not recognized as a command. Type 'help' for available commands.`,
          "error"
        );
      }
    },
    [printLine, printLines, handleHack, handleMatrix]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleCommand(input);
        setInput("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        if (history[newIndex]) setInput(history[newIndex]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const newIndex = Math.max(historyIndex - 1, -1);
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? "" : history[newIndex]);
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        handleCommand("clear");
      }
    },
    [input, history, historyIndex, handleCommand]
  );

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#0d0d0d", fontFamily: "'Courier New', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-1 flex-shrink-0 border-b border-gray-800"
        style={{ background: "#1a1a1a" }}
      >
        <span className="text-green-400 text-xs font-bold">Hero.X Terminal</span>
        <span className="text-gray-600 text-xs ml-auto">Build 1337 • {isHacking && "⚠ HACKING..."}</span>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-auto p-3 space-y-0.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="text-xs leading-5"
            style={{
              color:
                line.type === "input"
                  ? "#00D4FF"
                  : line.type === "error"
                  ? "#FF4444"
                  : line.type === "system"
                  ? "#FFE500"
                  : "#00FF41",
              whiteSpace: "pre-wrap",
            }}
          >
            {line.content}
          </motion.div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-t border-gray-800 flex-shrink-0"
        style={{ background: "#111" }}
      >
        <span className="text-cyan-400 text-xs flex-shrink-0">C:\Hero.X\Desktop&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-green-400 text-xs outline-none"
          placeholder={isHacking ? "Hacking in progress..." : "type a command..."}
          disabled={isHacking}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span
          className="text-green-400 text-xs"
          style={{ animation: "cursorBlink 1s step-end infinite" }}
        >
          █
        </span>
      </div>
    </div>
  );
}
