"use client";
import { motion } from "framer-motion";

export default function RecycleBinWindow() {
  return (
    <div className="p-6 text-center space-y-4 h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="text-7xl"
      >
        🗑️
      </motion.div>

      <div className="font-bold text-gray-700 text-lg" style={{ fontFamily: "Tahoma, sans-serif" }}>
        Recycle Bin
      </div>

      <div className="text-gray-500 text-sm max-w-xs text-center">
        This folder is empty.
        <br />
        <span className="text-xs text-gray-400 italic">
          Hero.X deleted all bugs. Permanently.
        </span>
      </div>

      <div
        className="p-4 rounded font-mono text-xs text-left w-full max-w-sm"
        style={{
          background: "#1a1a2e",
          color: "#00FF41",
          border: "1px solid #3A6EA5",
          lineHeight: 1.6,
        }}
      >
        <span className="text-cyan-400">C:\Hero.X\Desktop&gt;</span> rm -rf ./bugs{"\n"}
        <span className="text-gray-500">Removing: syntax_error.js</span>{"\n"}
        <span className="text-gray-500">Removing: logic_flaw.ts</span>{"\n"}
        <span className="text-gray-500">Removing: off_by_one.lua</span>{"\n"}
        <span className="text-gray-500">Removing: spaghetti_code/</span>{"\n"}
        <span className="text-green-400">Done. 0 bugs remaining. 🎉</span>
      </div>

      <div className="text-xs text-gray-400 font-mono">
        Items in Recycle Bin: <span className="font-bold text-green-600">0</span>
      </div>
    </div>
  );
}
