"use client";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
}

export default function BSOD({ onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9991] flex items-center justify-center bsod cursor-pointer"
      style={{ background: "#0000AA", color: "white", fontFamily: "Courier New, monospace" }}
      onClick={onClose}
    >
      <div className="max-w-2xl px-8 text-sm leading-relaxed">
        <div className="text-center mb-6">
          <div
            className="inline-block px-4 py-2 mb-4 text-base font-bold"
            style={{ background: "#AAAAAA", color: "#0000AA" }}
          >
            Hero.X OS
          </div>
        </div>

        <p className="mb-4">
          A fatal exception 0E has occurred at 0028:C000000D. The current
          application will be terminated.
        </p>

        <p className="mb-4">
          * Press any key to terminate the current application.
        </p>

        <p className="mb-4">
          * Press CTRL+ALT+DEL to restart your computer. You will lose any
          unsaved information in all applications.
        </p>

        <p className="mb-6">Press any key to continue _</p>

        <div className="border border-gray-400 p-4">
          <div className="font-bold mb-2">Error details:</div>
          <div className="text-xs space-y-1">
            <div>Exception: TOO_MUCH_CREATIVITY</div>
            <div>Address: 0x00HERO337</div>
            <div>Process: portfolio.exe</div>
            <div>Module: creativity.dll</div>
            <div className="mt-2 text-yellow-300">
              {">>>"} This is a fake BSOD easter egg! You found it! 🎉
            </div>
            <div className="text-yellow-300">
              {">>>"} Click anywhere to return to Hero.X OS
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
