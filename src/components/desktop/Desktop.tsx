"use client";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useNotifications } from "@/hooks/useNotifications";
import Window from "@/components/windows/Window";
import AboutWindow from "@/components/windows/AboutWindow";
import ProjectsWindow from "@/components/windows/ProjectsWindow";
import ContactWindow from "@/components/windows/ContactWindow";
import SocialsWindow from "@/components/windows/SocialsWindow";
import ReviewsWindow from "@/components/windows/ReviewsWindow";
import TerminalWindow from "@/components/windows/TerminalWindow";
import MusicWindow from "@/components/windows/MusicWindow";
import MyComputerWindow from "@/components/windows/MyComputerWindow";
import SecretsWindow from "@/components/windows/SecretsWindow";
import ResumeWindow from "@/components/windows/ResumeWindow";
import Wallpaper from "@/components/desktop/Wallpaper";
import DesktopIcons from "@/components/desktop/DesktopIcon";
import Taskbar from "@/components/desktop/Taskbar";
import Notifications from "@/components/effects/Notifications";
import MatrixRain from "@/components/effects/MatrixRain";
import BSOD from "@/components/effects/BSOD";
import DesktopRightClick from "@/components/effects/DesktopRightClick";
import MobileOverlay from "@/components/effects/MobileOverlay";
import type { WindowId } from "@/types";

const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

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
  } = useWindowManager();

  const { notifications, addNotification, removeNotification } = useNotifications();

  const [matrixMode, setMatrixMode] = useState(false);
  const [showBSOD, setShowBSOD] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Sorted by z-index for rendering
  const sortedWindows = Object.values(windows).sort((a, b) => a.zIndex - b.zIndex);
  const activeWindowId = sortedWindows.filter((w) => w.isOpen && !w.isMinimized).at(-1)?.id;

  // Konami code listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[konamiIndex]) {
        const next = konamiIndex + 1;
        if (next === KONAMI_CODE.length) {
          setKonamiIndex(0);
          addNotification({
            title: "🥚 KONAMI CODE!",
            message: "Achievement unlocked: Secret Agent! +9999 XP added.",
            icon: "🎮",
          });
          setTimeout(() => setShowBSOD(true), 1000);
          setTimeout(() => setShowBSOD(false), 5000);
        } else {
          setKonamiIndex(next);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [konamiIndex, addNotification]);

  // Shutdown event
  useEffect(() => {
    const handler = () => onShutdown();
    document.addEventListener("shutdown", handler);
    return () => document.removeEventListener("shutdown", handler);
  }, [onShutdown]);

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

  const handleRightClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const renderWindowContent = (id: WindowId) => {
    switch (id) {
      case "about":
        return <AboutWindow />;
      case "projects":
        return <ProjectsWindow />;
      case "contact":
        return <ContactWindow />;
      case "socials":
        return <SocialsWindow />;
      case "reviews":
        return <ReviewsWindow />;
      case "terminal":
        return <TerminalWindow onMatrixMode={() => setMatrixMode(true)} />;
      case "music":
        return <MusicWindow />;
      case "mycomputer":
        return <MyComputerWindow onOpenWindow={openWindow} />;
      case "secrets":
        return <SecretsWindow />;
      case "resume":
        return <ResumeWindow />;
      case "recycle":
        return (
          <div className="p-6 text-center space-y-3">
            <div className="text-6xl">🗑️</div>
            <div className="font-bold text-gray-700">Recycle Bin</div>
            <div className="text-gray-500 text-sm">
              This folder is empty.
              <br />
              <span className="text-xs text-gray-400">
                Hero.X deleted all bugs. Permanently.
              </span>
            </div>
            <div
              className="p-3 rounded font-mono text-xs text-left"
              style={{ background: "#1a1a2e", color: "#00FF41", border: "1px solid #3A6EA5" }}
            >
              {"> rm -rf ./bugs"}<br />
              {"> rm -rf ./errors"}<br />
              {"> rm -rf ./problems"}<br />
              {"Done. 0 items remaining."}
            </div>
          </div>
        );
      case "ie":
        return <SocialsWindow />;
      case "notepad":
        return (
          <div className="flex flex-col h-full">
            <div
              className="flex gap-4 px-3 py-1 text-xs border-b"
              style={{ background: "#ECE9D8", borderColor: "#a0a0a0" }}
            >
              {["File", "Edit", "Format", "View", "Help"].map((m) => (
                <button key={m} className="hover:bg-blue-600 hover:text-white px-1.5 py-0.5 rounded">
                  {m}
                </button>
              ))}
            </div>
            <textarea
              className="flex-1 p-3 text-xs resize-none outline-none"
              style={{ fontFamily: "Courier New, monospace", background: "white" }}
              defaultValue={`README.txt — Hero.X Portfolio OS

This isn't your average portfolio.
It's an experience. An OS. A world.

Built with:
- Next.js 15
- Framer Motion
- TypeScript
- Tailwind CSS
- Unhealthy amounts of coffee

Hidden secrets: 13 total
Easter eggs: Check the terminal

Secret command: type 'matrix' in terminal
Another secret: Konami Code works here

— Hero.X, 2024`}
            />
          </div>
        );
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
      {/* Wallpaper */}
      <Wallpaper />

      {/* Desktop Icons */}
      <DesktopIcons onOpenWindow={openWindow} />

      {/* Windows */}
      {sortedWindows.map((win) => (
        <Window
          key={win.id}
          window={win}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onPositionChange={updatePosition}
          isActive={win.id === activeWindowId}
        >
          {renderWindowContent(win.id)}
        </Window>
      ))}

      {/* Taskbar */}
      <Taskbar
        taskbarWindows={taskbarWindows}
        onOpenWindow={openWindow}
        onFocusWindow={focusWindow}
        onMinimizeWindow={minimizeWindow}
        activeWindowId={activeWindowId}
      />

      {/* Notifications */}
      <Notifications notifications={notifications} onRemove={removeNotification} />

      {/* Matrix Rain Overlay */}
      <AnimatePresence>
        {matrixMode && <MatrixRain onClose={() => setMatrixMode(false)} />}
      </AnimatePresence>

      {/* BSOD */}
      <AnimatePresence>
        {showBSOD && <BSOD onClose={() => setShowBSOD(false)} />}
      </AnimatePresence>

      {/* Right-click menu */}
      <AnimatePresence>
        {contextMenu && (
          <DesktopRightClick
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
            onOpenWindow={openWindow}
            onMatrixMode={() => setMatrixMode(true)}
            onBSOD={() => setShowBSOD(true)}
            onToggleCRT={() => setCrtEnabled(!crtEnabled)}
            crtEnabled={crtEnabled}
          />
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <MobileOverlay />

      {/* CRT scan line */}
      {crtEnabled && (
        <div className="scan-line pointer-events-none z-[9998]" style={{ zIndex: 9998 }} />
      )}
    </div>
  );
}
