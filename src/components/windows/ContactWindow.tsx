"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactWindow() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg("Please fill in all required fields (Name, Email, Message).");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
      return;
    }

    setFormState("sending");
    setProgress(0);

    // Animate progress bar while waiting
    let p = 0;
    const ticker = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 88) { p = 88; clearInterval(ticker); }
      setProgress(Math.min(p, 88));
    }, 120);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "e84b7147-4208-47fd-8ecc-ff8a59168b4b",
          name: form.name,
          email: form.email,
          subject: form.subject || `New message from ${form.name} via Hero.X Portfolio`,
          message: form.message,
        }),
      });

      clearInterval(ticker);
      const data = await res.json();

      if (data.success) {
        setProgress(100);
        setTimeout(() => setFormState("success"), 300);
      } else {
        setErrorMsg("Server error. Please try Discord instead: x.hero_dev");
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch {
      clearInterval(ticker);
      setErrorMsg("Connection failed. Please try Discord: x.hero_dev");
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", subject: "", message: "" });
    setFormState("idle");
    setProgress(0);
    setErrorMsg("");
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "Tahoma, Verdana, sans-serif" }}
    >
      {/* Outlook toolbar */}
      <div
        className="flex items-center gap-2 px-3 py-1 border-b text-xs flex-shrink-0"
        style={{ background: "#ECE9D8", borderColor: "#a0a0a0" }}
      >
        {["File", "Edit", "View", "Insert", "Format", "Tools", "Actions", "Help"].map((item) => (
          <button key={item} className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded">
            {item}
          </button>
        ))}
      </div>

      {/* Email header area */}
      <div
        className="px-4 py-3 border-b flex-shrink-0"
        style={{ background: "#ECE9D8", borderColor: "#a0a0a0" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">📧</span>
          <div>
            <div className="font-bold text-gray-800 text-sm">New Message — Hero.X Mail Client</div>
            <div className="text-xs text-green-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Available for work &amp; collaborations
            </div>
          </div>
        </div>

        {/* Contact info row */}
        <div className="flex gap-4 text-xs flex-wrap">
          <div className="flex items-center gap-1.5 p-2 rounded" style={{ background: "white", border: "1px solid #d4d0c8" }}>
            <span>💬</span>
            <span className="font-mono text-blue-800 font-bold">x.hero_dev</span>
            <button
              className="ml-1 text-xs px-1.5 py-0.5 rounded hover:bg-blue-600 hover:text-white transition-all"
              style={{ background: "#d4d0c8", border: "1px solid #a0a0a0" }}
              onClick={() => navigator.clipboard?.writeText("x.hero_dev")}
            >
              Copy
            </button>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded" style={{ background: "white", border: "1px solid #d4d0c8" }}>
            <span>✉️</span>
            <span className="font-mono text-blue-700 text-xs">heeroh622@gmail.com</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 rounded" style={{ background: "white", border: "1px solid #d4d0c8" }}>
            <span>🌍</span>
            <span className="text-gray-600">Remote / Global</span>
          </div>
        </div>
      </div>

      {/* Form or status */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {formState === "idle" && (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="p-4 space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    From: (Your Name) *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="xp-input text-xs"
                    placeholder="Your name..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Reply-To: (Email) *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="xp-input text-xs"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subject:</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="xp-input text-xs"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Message: *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="xp-input text-xs resize-none"
                  rows={5}
                  placeholder="Write your message here... (tell me about your project, collab idea, or just say hi 👋)"
                  required
                  style={{ fontFamily: "Tahoma, sans-serif" }}
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="xp-button font-bold text-xs flex items-center gap-2"
                  style={{
                    background: "linear-gradient(to bottom, #4fc748, #1e7a1e)",
                    color: "white",
                    border: "1px solid #1a6a1a",
                    padding: "6px 16px",
                    borderRadius: 3,
                  }}
                >
                  📤 Send Message
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="xp-button text-xs"
                >
                  🗑️ Clear
                </button>
              </div>

              {/* Quick contact options */}
              <div
                className="p-3 rounded mt-2"
                style={{ background: "#fff9e0", border: "1px solid #e0d080" }}
              >
                <div className="text-xs font-bold text-yellow-800 mb-2">⚡ Quick Contact</div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: "Discord", icon: "💬", value: "x.hero_dev" },
                    { label: "GitHub", icon: "🐙", value: "iamHeroXD" },
                    { label: "Twitter/X", icon: "🐦", value: "@herox_dev" },
                    { label: "Email", icon: "✉️", value: "heeroh622@gmail.com" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer hover:bg-yellow-100 transition-all"
                      style={{ border: "1px solid #e0d080" }}
                    >
                      <span>{s.icon}</span>
                      <span className="font-bold text-gray-700">{s.label}:</span>
                      <span className="text-blue-700 font-mono">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.form>
          )}

          {formState === "error" && (
            <motion.div
              key="error"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center gap-4"
            >
              <div className="text-6xl">⚠️</div>
              <div className="font-bold text-red-700 text-lg">Error</div>
              <div className="text-gray-600 text-sm text-center max-w-xs">{errorMsg}</div>
              <button
                onClick={handleReset}
                className="xp-button"
                style={{ background: "linear-gradient(to bottom, #f5f4ea, #d4d0c8)" }}
              >
                OK
              </button>
            </motion.div>
          )}

          {formState === "sending" && (
            <motion.div
              key="sending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center gap-4"
            >
              <div className="text-5xl animate-bounce">📤</div>
              <div className="font-bold text-blue-900 text-base">Sending your message...</div>
              <div className="w-64">
                <div
                  className="h-5 rounded overflow-hidden"
                  style={{ background: "#d4d0c8", border: "1px solid #a0a0a0" }}
                >
                  <motion.div
                    className="h-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(90deg, #0A246A, #3A6EA5, #00D4FF)",
                    }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
                <div className="text-center text-xs text-gray-600 mt-1">{Math.round(progress)}%</div>
              </div>
              <div className="text-xs text-gray-500 animate-pulse">Connecting to server...</div>
            </motion.div>
          )}

          {formState === "success" && (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-8 flex flex-col items-center justify-center gap-4"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.6 }}
                className="text-6xl"
              >
                ✅
              </motion.div>
              <div className="font-bold text-green-700 text-xl">Message Sent!</div>
              <div className="text-gray-600 text-sm text-center max-w-xs">
                Your message has been received. Hero.X will get back to you ASAP — usually within 24 hours.
              </div>
              <div
                className="p-3 rounded text-xs font-mono w-full max-w-xs"
                style={{ background: "#1a1a2e", color: "#00FF41", border: "1px solid #3A6EA5" }}
              >
                STATUS: 200 OK<br />
                DELIVERED: {new Date().toLocaleString()}<br />
                FROM: {form.name || "Anonymous"}<br />
                RESPONSE: Pending...
              </div>
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #0A246A, #3A6EA5)" }}
              >
                Send Another Message
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
