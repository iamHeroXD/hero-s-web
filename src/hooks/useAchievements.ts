"use client";
import { useState, useCallback, useEffect } from "react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
}

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: "first_boot",        title: "First Boot",         description: "Launched Hero.X OS for the first time",         icon: "🚀", xp: 10  },
  { id: "open_terminal",     title: "Shell Access",        description: "Opened the terminal",                           icon: "💻", xp: 25  },
  { id: "open_about",        title: "Who Am I?",           description: "Viewed the About window",                       icon: "👤", xp: 15  },
  { id: "open_projects",     title: "Portfolio Viewer",    description: "Explored the Projects window",                  icon: "💼", xp: 20  },
  { id: "open_secrets",      title: "Curious Mind",        description: "Opened the Hidden Secrets folder",             icon: "🔒", xp: 40  },
  { id: "secrets_unlocked",  title: "Access Granted",      description: "Unlocked the secrets vault",                   icon: "🔓", xp: 75  },
  { id: "konami_code",       title: "Konami Master",       description: "Entered the legendary Konami Code",            icon: "🎮", xp: 100 },
  { id: "matrix_mode",       title: "Red Pill",            description: "Activated Matrix Mode",                        icon: "💊", xp: 50  },
  { id: "bsod_triggered",    title: "Crash Course",        description: "Triggered the Blue Screen of Death",           icon: "💥", xp: 75  },
  { id: "hack_cmd",          title: "Wannabe Hacker",      description: "Ran the 'hack' command in terminal",           icon: "👾", xp: 30  },
  { id: "crt_enabled",       title: "Retro Vision",        description: "Enabled the CRT effect",                       icon: "📺", xp: 20  },
  { id: "all_windows",       title: "Window Manager",      description: "Opened every single app at least once",         icon: "🪟", xp: 200 },
  { id: "music_player",      title: "Lo-Fi Grind",         description: "Opened the Music Player",                      icon: "🎵", xp: 15  },
  { id: "speed_runner",      title: "Speed Runner",        description: "Opened 5 windows within 10 seconds",          icon: "⚡", xp: 60  },
  { id: "night_owl",         title: "Night Owl",           description: "Visited between midnight and 5am",             icon: "🦉", xp: 30  },
  { id: "easter_cmd",        title: "Egg Hunter",          description: "Found the easter egg command",                 icon: "🥚", xp: 35  },
];

const STORAGE_KEY = "herox-achievements";
const XP_KEY = "herox-xp";

function loadUnlocked(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

function loadXP(): number {
  try {
    return parseInt(localStorage.getItem(XP_KEY) ?? "0", 10) || 0;
  } catch { return 0; }
}

export function useAchievements() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [xp, setXP] = useState(0);
  const [pendingUnlock, setPendingUnlock] = useState<Achievement | null>(null);

  useEffect(() => {
    setUnlockedIds(loadUnlocked());
    setXP(loadXP());
  }, []);

  const unlock = useCallback((id: string): Achievement | null => {
    const achievement = ALL_ACHIEVEMENTS.find((a) => a.id === id);
    if (!achievement) return null;

    setUnlockedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });

    setXP((prev) => {
      const next = prev + achievement.xp;
      try { localStorage.setItem(XP_KEY, String(next)); } catch {}
      return next;
    });

    const fresh = !unlockedIds.includes(id);
    if (fresh) {
      setPendingUnlock(achievement);
      setTimeout(() => setPendingUnlock(null), 50);
    }

    return fresh ? achievement : null;
  }, [unlockedIds]);

  const isUnlocked = useCallback((id: string) => unlockedIds.includes(id), [unlockedIds]);

  const getStats = useCallback(() => ({
    total: ALL_ACHIEVEMENTS.length,
    unlocked: unlockedIds.length,
    xp,
    percent: Math.round((unlockedIds.length / ALL_ACHIEVEMENTS.length) * 100),
  }), [unlockedIds, xp]);

  const getAll = useCallback(() =>
    ALL_ACHIEVEMENTS.map((a) => ({ ...a, unlocked: unlockedIds.includes(a.id) })),
  [unlockedIds]);

  return { unlock, isUnlocked, getStats, getAll, xp, pendingUnlock };
}

export { ALL_ACHIEVEMENTS };
