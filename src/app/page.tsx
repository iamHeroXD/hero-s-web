"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import BootSequence from "@/components/boot/BootSequence";

const Desktop = dynamic(() => import("@/components/desktop/Desktop"), { ssr: false });

type AppState = "boot" | "desktop" | "shutdown";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("boot");

  const handleBootComplete = () => {
    setAppState("desktop");
  };

  const handleShutdown = () => {
    setAppState("shutdown");
    setTimeout(() => {
      setAppState("boot");
    }, 4000);
  };

  return (
    <main className="fixed inset-0 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {appState === "boot" && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}

        {appState === "desktop" && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0"
          >
            <Desktop onShutdown={handleShutdown} />
          </motion.div>
        )}

        {appState === "shutdown" && (
          <motion.div
            key="shutdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black flex flex-col items-center justify-center gap-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">💤</div>
              <div
                className="text-white font-bold text-2xl mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "1.5rem" }}
              >
                Hero.X OS
              </div>
              <div className="text-gray-400 font-mono text-sm">
                It is now safe to turn off your computer.
              </div>
              <div className="text-gray-600 font-mono text-xs mt-2">
                Restarting in a few seconds...
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-2"
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-blue-500"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
