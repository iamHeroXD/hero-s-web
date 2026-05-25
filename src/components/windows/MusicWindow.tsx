"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const PLAYLIST = [
  { id: 1, title: "Cyber City Nights",   artist: "Lo-Fi Hero",       duration: "3:42", genre: "Lo-Fi"      },
  { id: 2, title: "Matrix Rain",          artist: "HackerBeats",      duration: "4:15", genre: "Ambient"    },
  { id: 3, title: "XP Nostalgia",         artist: "RetroWave X",      duration: "3:28", genre: "Synthwave"  },
  { id: 4, title: "Code & Chill",         artist: "DevBeats",         duration: "5:01", genre: "Lo-Fi"      },
  { id: 5, title: "Neon Dreams",          artist: "CyberPunk Studio", duration: "3:55", genre: "Cyberpunk"  },
  { id: 6, title: "Late Night Deploy",    artist: "Hero.X",           duration: "4:33", genre: "Electronic" },
  { id: 7, title: "Pixel Paradise",       artist: "RetroGame OST",    duration: "2:58", genre: "Chiptune"   },
];

// Pre-compute equalizer bar animation targets — no random values at render time
const EQ_BARS = [
  { min: "15%", max: "85%", dur: 0.7 },
  { min: "40%", max: "100%", dur: 0.5 },
  { min: "20%", max: "70%", dur: 0.9 },
  { min: "55%", max: "95%", dur: 0.6 },
  { min: "10%", max: "75%", dur: 0.8 },
  { min: "35%", max: "90%", dur: 0.65 },
  { min: "25%", max: "80%", dur: 0.75 },
  { min: "50%", max: "100%", dur: 0.55 },
];

export default function MusicWindow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(75);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const track = PLAYLIST[currentTrack];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (repeat) return 0;
          setCurrentTrack((t) => (t + 1) % PLAYLIST.length);
          return 0;
        }
        return p + 0.4;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying, repeat]);

  const handleTrackSelect = (i: number) => {
    setCurrentTrack(i);
    setProgress(0);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrack((t) => (t - 1 + PLAYLIST.length) % PLAYLIST.length);
    setProgress(0);
  };

  const handleNext = () => {
    if (shuffle) setCurrentTrack(Math.floor(Math.random() * PLAYLIST.length));
    else setCurrentTrack((t) => (t + 1) % PLAYLIST.length);
    setProgress(0);
  };

  const elapsed = useMemo(() => {
    const [mins, secs] = track.duration.split(":").map(Number);
    const totalSecs = (mins * 60 + secs) * (progress / 100);
    const m = Math.floor(totalSecs / 60);
    const s = Math.floor(totalSecs % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }, [progress, track.duration]);

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "Tahoma, Verdana, sans-serif", background: "#1a1a2e" }}
    >
      {/* Now playing */}
      <div
        className="p-4 flex flex-col items-center gap-3 flex-shrink-0"
        style={{ background: "linear-gradient(to bottom, #0d0d1a, #1a1a2e)", borderBottom: "1px solid #333" }}
      >
        {/* Album art */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
          style={{
            background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
            boxShadow: isPlaying
              ? "0 0 30px rgba(0,212,255,0.5), 0 0 60px rgba(123,47,255,0.3)"
              : "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          🎵
        </motion.div>

        <div className="text-center">
          <div className="text-white font-bold text-sm">{track.title}</div>
          <div className="text-gray-400 text-xs">{track.artist}</div>
          <div
            className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
            style={{ background: "#7B2FFF", color: "white", fontSize: "10px" }}
          >
            {track.genre}
          </div>
        </div>

        {/* Equalizer bars — pre-computed values, no random in animate */}
        <div className="flex items-end gap-1 h-8">
          {EQ_BARS.map((bar, i) => (
            <motion.div
              key={i}
              className="w-1.5 rounded-sm"
              style={{
                background: "linear-gradient(to top, #7B2FFF, #00D4FF)",
                boxShadow: "0 0 4px rgba(0,212,255,0.5)",
                height: "15%",
              }}
              animate={isPlaying ? { height: [bar.min, bar.max, bar.min] } : { height: "15%" }}
              transition={{
                duration: bar.dur,
                repeat: isPlaying ? Infinity : 0,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full">
          <div
            className="h-1.5 rounded-full overflow-hidden cursor-pointer"
            style={{ background: "#333" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              setProgress(Math.max(0, Math.min(100, pct)));
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #7B2FFF, #00D4FF)",
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-0.5">
            <span>{elapsed}</span>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShuffle(!shuffle)}
            className="text-lg transition-all"
            style={{ color: shuffle ? "#00D4FF" : "#666" }}
            title="Shuffle"
            aria-label="Toggle shuffle"
          >🔀</button>

          <button onClick={handlePrev} className="text-2xl text-white hover:text-cyan-300 transition-colors" aria-label="Previous track">⏮</button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            aria-label={isPlaying ? "Pause" : "Play"}
            style={{
              background: "linear-gradient(135deg, #7B2FFF, #00D4FF)",
              boxShadow: "0 0 20px rgba(0,212,255,0.4)",
            }}
          >
            {isPlaying ? "⏸" : "▶"}
          </motion.button>

          <button onClick={handleNext} className="text-2xl text-white hover:text-cyan-300 transition-colors" aria-label="Next track">⏭</button>

          <button
            onClick={() => setRepeat(!repeat)}
            className="text-lg transition-all"
            style={{ color: repeat ? "#00D4FF" : "#666" }}
            title="Repeat"
            aria-label="Toggle repeat"
          >🔁</button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-gray-400 text-sm" aria-hidden="true">🔈</span>
          <input
            type="range" min="0" max="100" value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1"
            style={{ accentColor: "#00D4FF" }}
            aria-label="Volume"
          />
          <span className="text-gray-400 text-sm" aria-hidden="true">🔊</span>
          <span className="text-gray-500 text-xs w-6">{volume}</span>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-auto p-2">
        <div className="text-xs font-bold text-gray-500 mb-2 px-2 uppercase tracking-wide">
          Playlist ({PLAYLIST.length} tracks)
        </div>
        {PLAYLIST.map((t, i) => (
          <motion.button
            key={t.id}
            onClick={() => handleTrackSelect(i)}
            whileHover={{ x: 4 }}
            className={`w-full flex items-center gap-3 px-2 py-2 rounded text-left transition-all ${
              i === currentTrack ? "bg-purple-900/50" : "hover:bg-white/5"
            }`}
            aria-label={`Play ${t.title} by ${t.artist}`}
          >
            <div
              className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-sm"
              style={{
                background: i === currentTrack ? "linear-gradient(135deg, #7B2FFF, #00D4FF)" : "#333",
                color: "white",
              }}
            >
              {i === currentTrack && isPlaying ? (
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ♪
                </motion.span>
              ) : (
                i + 1
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-xs font-bold truncate"
                style={{ color: i === currentTrack ? "#00D4FF" : "white" }}
              >
                {t.title}
              </div>
              <div className="text-xs text-gray-500 truncate">{t.artist}</div>
            </div>
            <div className="text-xs text-gray-500 flex-shrink-0">{t.duration}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
