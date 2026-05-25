"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useNotifications } from "@/hooks/useNotifications";
import { useSound } from "@/hooks/useSound";
import { useAchievements } from "@/hooks/useAchievements";
import Window from "@/components/windows/Window";
import Wallpaper from "@/components/desktop/Wallpaper";
import DesktopIcons from "@/components/desktop/DesktopIcon";
import Taskbar from "@/components/desktop/Taskbar";
import Notifications from "@/components/effects/Notifications";
import DesktopRightClick from "@/components/effects/DesktopRightClick";
import type { WindowId } from "@/types";

// Lazy-load all window content — only downloaded when opened
const AboutWindow      = dynamic(() => import("@/components/windows/AboutWindow"),     { ssr: false });
const ProjectsWindow   = dynamic(() => import("@/components/windows/ProjectsWindow"),  { ssr: false });
const ContactWindow    = dynamic(() => import("@/components/windows/ContactWindow"),   { ssr: false });
const SocialsWindow    = dynamic(() => import("@/components/windows/SocialsWindow"),   { ssr: false });
const ReviewsWindow    = dynamic(() => import("@/components/windows/ReviewsWindow"),   { ssr: false });
const TerminalWindow   = dynamic(() => import("@/components/windows/TerminalWindow"),  { ssr: false });
const MusicWindow      = dynamic(() => import("@/components/windows/MusicWindow"),     { ssr: false });
const MyComputerWindow = dynamic(() => import("@/components/windows/MyComputerWindow"),{ ssr: false });
const SecretsWindow    = dynamic(() => import("@/components/windows/SecretsWindow"),   { ssr: false });
const ResumeWindow     = dynamic(() => import("@/components/windows/ResumeWindow"),    { ssr: false });
const RecycleBinWindow = dynamic(() => import("@/components/windows/RecycleBinWindow"),{ ssr: false });
const NotepadWindow    = dynamic(() => import("@/components/windows/NotepadWindow"),   { ssr: false });
const MatrixRain       = dynamic(() => import("@/components/effects/MatrixRain"),      { ssr: false });
const BSOD             = dynamic(() => import("@/components/effects/BSOD"),            { ssr: false });
const MobileOverlay    = dynamic(() => import("@/components/effects/MobileOverlay"),   { ssr: false });

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

// Windows opened so far — for the "open all windows" achievement
const ACHIEVEMENT_WINDOWS = new Set<string>();

interface Props {
  onShutdown: () => void;
}

export default function Desktop({ onShutdown }: Props) {
  const {
    windows,
    taskbarWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
  } = useWindowManager();

  const { notifications, addNotification, removeNotification } = useNotifications();
  const { play } = useSound();
  const { unlock } = useAchievements();

  const [matrixMode, setMatrixMode]     = useState(false);
  const [showBSOD, setShowBSOD]         = useState(false);
  const [crtEnabled, setCrtEnabled]     = useState(false);
  const [contextMenu, setContextMenu]   = useState<{ x: number; y: number } | null>(null);
  const konamiIndexRef                  = useRef(0);
  const windowOpenTimestamps            = useRef<number[]>([]);

  const sortedWindows = Object.values(windows).sort((a, b) => a.zIndex - b.zIndex);
  const activeWindowId = sortedWindows.filter((w) => w.isOpen && !w.isMinimized).at(-1)?.id;

  // First boot + Night Owl achievements
  useEffect(() => {
    unlock("first_boot");
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) {
      const ach = unlock("night_owl");
      if (ach) {
        setTimeout(() => {
          addNotification({
            title: "🦉 Achievement Unlocked!",
            message: `"${ach.title}" — Browsing portfolios at this hour? Respect. (+${ach.xp} XP)`,
            icon: ach.icon,
          });
        }, 3000);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Welcome notification
  useEffect(() => {
    const t = setTimeout(() => {
      addNotification({
        title: "Welcome to Hero.X OS!",
        message: "Double-click icons to open apps. Right-click desktop for options.",
        icon: "👋",
      });
    }, 2000);
    return () => clearTimeout(t);
  }, [addNotification]);

  // Konami code listener — uses ref to avoid closure/dependency issues
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === KONAMI[konamiIndexRef.current]) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current === KONAMI.length) {
          konamiIndexRef.current = 0;
          const ach = unlock("konami_code");
          addNotification({
            title: ach ? "🎮 KONAMI CODE! Achievement Unlocked!" : "🎮 KONAMI CODE!",
            message: ach
              ? `Achievement: "${ach.title}" (+${ach.xp} XP)`
              : "You already earned this one. Still cool though.",
            icon: "🏆",
          });
          setTimeout(() => setShowBSOD(true),  800);
          setTimeout(() => setShowBSOD(false), 5500);
        }
      } else {
        konamiIndexRef.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [unlock, addNotification]);

  // Keyboard shortcuts: Escape closes active window, Alt+F4 closes active
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === "Escape" || (e.key === "F4" && e.altKey)) && activeWindowId) {
        e.preventDefault();
        closeWindow(activeWindowId);
        play("close");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeWindowId, closeWindow, play]);

  // Shutdown custom event
  useEffect(() => {
    const handler = () => onShutdown();
    document.addEventListener("shutdown", handler);
    return () => document.removeEventListener("shutdown", handler);
  }, [onShutdown]);

  // Track achievement for CRT enable
  const handleToggleCRT = useCallback(() => {
    setCrtEnabled((v) => {
      if (!v) unlock("crt_enabled");
      return !v;
    });
  }, [unlock]);

  // Window open — with sound + achievement tracking
  const handleOpenWindow = useCallback((id: WindowId) => {
    openWindow(id);
    play("open");

    ACHIEVEMENT_WINDOWS.add(id);

    // Speed Runner: 5 windows opened within 10 seconds
    const now = Date.now();
    windowOpenTimestamps.current = [...windowOpenTimestamps.current, now].filter((t) => now - t <= 10000);
    if (windowOpenTimestamps.current.length >= 5) {
      const ach = unlock("speed_runner");
      if (ach) {
        setTimeout(() => {
          addNotification({
            title: "⚡ Achievement Unlocked!",
            message: `"${ach.title}" — 5 windows in 10 seconds. You move fast. (+${ach.xp} XP)`,
            icon: ach.icon,
          });
        }, 500);
      }
    }

    const appAchMap: Partial<Record<WindowId, string>> = {
      terminal:   "open_terminal",
      about:      "open_about",
      projects:   "open_projects",
      secrets:    "open_secrets",
      music:      "music_player",
    };
    const achId = appAchMap[id];
    if (achId) {
      const ach = unlock(achId);
      if (ach) {
        setTimeout(() => {
          addNotification({
            title: `🏆 Achievement Unlocked!`,
            message: `"${ach.title}" — ${ach.description} (+${ach.xp} XP)`,
            icon: ach.icon,
          });
        }, 500);
      }
    }

    // All windows achievement
    const ALL_WINDOW_IDS: WindowId[] = ["about","projects","contact","socials","reviews","terminal","music","mycomputer","resume","secrets","recycle","notepad"];
    if (ALL_WINDOW_IDS.every((wid) => ACHIEVEMENT_WINDOWS.has(wid))) {
      const ach = unlock("all_windows");
      if (ach) {
        setTimeout(() => {
          addNotification({
            title: "🏆 LEGENDARY Achievement!",
            message: `"${ach.title}" — You opened every app! (+${ach.xp} XP)`,
            icon: "🪟",
          });
        }, 800);
      }
    }
  }, [openWindow, play, unlock, addNotification]);

  const handleCloseWindow = useCallback((id: WindowId) => {
    closeWindow(id);
    play("close");
  }, [closeWindow, play]);

  const handleMinimizeWindow = useCallback((id: WindowId) => {
    minimizeWindow(id);
    play("minimize");
  }, [minimizeWindow, play]);

  const handleAchievementUnlock = useCallback((id: string) => {
    const ach = unlock(id);
    if (ach) {
      addNotification({
        title: "🏆 Achievement Unlocked!",
        message: `"${ach.title}" (+${ach.xp} XP)`,
        icon: ach.icon,
      });
    }
  }, [unlock, addNotification]);

  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMatrixMode = useCallback(() => {
    setMatrixMode(true);
    const ach = unlock("matrix_mode");
    if (ach) {
      addNotification({
        title: "🏆 Achievement Unlocked!",
        message: `"${ach.title}" — You took the red pill! (+${ach.xp} XP)`,
        icon: ach.icon,
      });
    }
  }, [unlock, addNotification]);

  const handleBSOD = useCallback(() => {
    setShowBSOD(true);
    const ach = unlock("bsod_triggered");
    if (ach) {
      addNotification({
        title: "🏆 Achievement Unlocked!",
        message: `"${ach.title}" — You triggered the BSOD! (+${ach.xp} XP)`,
        icon: ach.icon,
      });
    }
  }, [unlock, addNotification]);

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case "about":      return <AboutWindow />;
      case "projects":   return <ProjectsWindow />;
      case "contact":    return <ContactWindow />;
      case "socials":    return <SocialsWindow />;
      case "reviews":    return <ReviewsWindow />;
      case "terminal":   return <TerminalWindow onMatrixMode={() => setMatrixMode(true)} onAchievementUnlock={handleAchievementUnlock} />;
      case "music":      return <MusicWindow />;
      case "mycomputer": return <MyComputerWindow onOpenWindow={handleOpenWindow} />;
      case "secrets":    return <SecretsWindow />;
      case "resume":     return <ResumeWindow />;
      case "recycle":    return <RecycleBinWindow />;
      case "notepad":    return <NotepadWindow />;
      case "ie":         return <SocialsWindow />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
            {id} — Coming soon
          </div>
        );
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-hidden ${crtEnabled ? "crt-overlay" : ""}`}
      onContextMenu={handleRightClick}
      onClick={() => setContextMenu(null)}
    >
      <Wallpaper />
      <DesktopIcons onOpenWindow={handleOpenWindow} />

      {/* Windows */}
      {sortedWindows.map((win) => (
        <Window
          key={win.id}
          window={win}
          onClose={handleCloseWindow}
          onMinimize={handleMinimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onPositionChange={updatePosition}
          onSizeChange={updateSize}
          isActive={win.id === activeWindowId}
        >
          {renderWindowContent(win.id)}
        </Window>
      ))}

      <Taskbar
        taskbarWindows={taskbarWindows}
        onOpenWindow={handleOpenWindow}
        onFocusWindow={focusWindow}
        onMinimizeWindow={handleMinimizeWindow}
        activeWindowId={activeWindowId}
      />

      <Notifications notifications={notifications} onRemove={removeNotification} />

      <AnimatePresence>
        {matrixMode && <MatrixRain onClose={() => setMatrixMode(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {showBSOD && <BSOD onClose={() => setShowBSOD(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {contextMenu && (
          <DesktopRightClick
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onOpenWindow={handleOpenWindow}
            onMatrixMode={handleMatrixMode}
            onBSOD={handleBSOD}
            onToggleCRT={handleToggleCRT}
            crtEnabled={crtEnabled}
          />
        )}
      </AnimatePresence>

      <MobileOverlay />

      {crtEnabled && (
        <div className="scan-line pointer-events-none" style={{ zIndex: 9998 }} />
      )}

      {/* Keyboard shortcut hint — shows briefly */}
      <div
        className="fixed bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ zIndex: 35 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <motion.div
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: 6, delay: 3, times: [0, 0.8, 1] }}
            className="text-xs text-white/30 font-mono text-center"
          >
            [Esc] close window · [Tab] terminal autocomplete · Right-click for OS menu
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
