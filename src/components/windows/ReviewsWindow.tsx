"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { REVIEWS } from "@/config/data";

const ONLINE_USERS = [
  { name: "Alex_Dev", status: "online", avatar: "🦁" },
  { name: "TechLord99", status: "online", avatar: "🎮" },
  { name: "Sarah.codes", status: "away", avatar: "💻" },
  { name: "VentureX_CEO", status: "online", avatar: "🚀" },
  { name: "DiscordMod", status: "online", avatar: "🤖" },
];

export default function ReviewsWindow() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [showSubmitted, setShowSubmitted] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < REVIEWS.length) {
        setVisibleCount((v) => v + 1);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // Random typing indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!newReview.trim()) return;
    setShowSubmitted(true);
    setNewReview("");
    setRating(0);
    setTimeout(() => setShowSubmitted(false), 3000);
  };

  return (
    <div
      className="flex h-full"
      style={{ fontFamily: "Tahoma, Verdana, sans-serif", background: "#ECE9D8" }}
    >
      {/* Online users sidebar */}
      <div
        className="w-40 flex-shrink-0 flex flex-col border-r"
        style={{ background: "#d4d0c8", borderColor: "#a0a0a0" }}
      >
        <div className="p-2 border-b text-xs font-bold text-gray-700" style={{ borderColor: "#a0a0a0" }}>
          Online ({ONLINE_USERS.filter((u) => u.status === "online").length})
        </div>
        <div className="overflow-auto flex-1">
          {ONLINE_USERS.map((user) => (
            <div key={user.name} className="flex items-center gap-2 px-2 py-1.5 hover:bg-blue-100 cursor-pointer">
              <div className="relative">
                <span className="text-lg">{user.avatar}</span>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white"
                  style={{
                    background: user.status === "online" ? "#00A82C" : "#FF8C00",
                  }}
                />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-800 truncate w-24">{user.name}</div>
                <div
                  className="text-xs"
                  style={{ color: user.status === "online" ? "#00A82C" : "#FF8C00" }}
                >
                  {user.status}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="p-2 text-center text-xs font-bold"
          style={{ background: "#0A246A", color: "#FFE500" }}
        >
          ⭐ 5.0 / 5.0
        </div>
      </div>

      {/* Chat/reviews area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div
          className="flex items-center gap-3 px-3 py-2 border-b flex-shrink-0"
          style={{ background: "white", borderColor: "#a0a0a0" }}
        >
          <span className="text-xl">💬</span>
          <div>
            <div className="font-bold text-gray-800 text-xs">Client Reviews — Chat Room</div>
            <div className="text-xs text-gray-500">Real reviews from real clients</div>
          </div>
          <div className="ml-auto flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-sm">★</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-3 space-y-3">
          {REVIEWS.slice(0, visibleCount).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0, type: "spring", stiffness: 200, damping: 20 }}
              className="flex gap-3"
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 mt-1"
                style={{
                  background: "linear-gradient(135deg, #0A246A, #3A6EA5)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                {review.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-xs text-blue-900">{review.name}</span>
                  <span className="text-xs text-gray-500">({review.role})</span>
                  <span className="text-xs text-gray-400 ml-auto">{review.timestamp}</span>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded text-white"
                    style={{
                      background: review.platform === "Discord" ? "#5865F2" :
                                  review.platform === "Roblox" ? "#FF4444" :
                                  review.platform === "Twitter/X" ? "#1DA1F2" : "#3A6EA5",
                      fontSize: "9px",
                    }}
                  >
                    {review.platform}
                  </span>
                </div>

                <div
                  className="p-3 rounded-lg text-xs leading-relaxed"
                  style={{
                    background: i % 2 === 0 ? "white" : "#f0f4ff",
                    border: "1px solid #d4d0c8",
                  }}
                >
                  {review.message}
                </div>

                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className="text-sm"
                      style={{ color: star <= review.rating ? "#FFD700" : "#d4d0c8" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-gray-500"
              >
                <span>👤</span>
                <span>Someone is typing</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400"
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success message */}
          <AnimatePresence>
            {showSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-3 rounded text-xs font-bold text-green-700"
                style={{ background: "#e0f7e0", border: "1px solid #90ee90" }}
              >
                ✅ Review submitted! Thank you for your feedback.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Leave a review input */}
        <div
          className="p-3 border-t flex-shrink-0"
          style={{ background: "#f5f4ea", borderColor: "#a0a0a0" }}
        >
          <div className="text-xs font-bold text-gray-700 mb-2">Leave a Review:</div>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="text-xl transition-transform hover:scale-125"
                style={{ color: star <= rating ? "#FFD700" : "#d4d0c8" }}
              >
                ★
              </button>
            ))}
            <span className="text-xs text-gray-500 ml-2">{rating > 0 ? `${rating}/5` : "Rate us!"}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
              className="xp-input flex-1 text-xs"
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              onClick={handleSubmit}
              className="px-3 py-1 rounded text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #0A246A, #3A6EA5)" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
