"use client";
import { motion, AnimatePresence } from "framer-motion";
import type { Notification } from "@/hooks/useNotifications";

interface Props {
  notifications: Notification[];
  onRemove: (id: string) => void;
}

export default function Notifications({ notifications, onRemove }: Props) {
  return (
    <div className="fixed bottom-12 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto cursor-pointer"
            onClick={() => onRemove(notif.id)}
          >
            <div
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{
                background: "#ECE9D8",
                border: "2px solid #0A246A",
                boxShadow: "3px 3px 10px rgba(0,0,0,0.4)",
                width: 280,
                fontFamily: "Tahoma, Verdana, sans-serif",
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded flex items-center justify-center text-xl flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, #0A246A, #3A6EA5)",
                }}
              >
                {notif.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xs text-blue-900 truncate">{notif.title}</div>
                <div className="text-xs text-gray-600 mt-0.5 leading-relaxed">{notif.message}</div>
              </div>

              {/* Close */}
              <button
                className="text-gray-400 hover:text-red-600 text-xs flex-shrink-0"
                onClick={(e) => { e.stopPropagation(); onRemove(notif.id); }}
              >
                ✕
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
