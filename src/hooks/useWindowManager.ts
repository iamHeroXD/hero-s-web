"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import type { WindowState, WindowId } from "@/types";

const DEFAULT_WINDOWS: Record<WindowId, Omit<WindowState, "isOpen" | "isMinimized" | "isMaximized" | "zIndex">> = {
  about:      { id: "about",      title: "Hero.X — Developer Profile",        position: { x: 80,  y: 60  }, size: { width: 680, height: 520 }, icon: "👤" },
  projects:   { id: "projects",   title: "Projects Explorer",                  position: { x: 140, y: 80  }, size: { width: 760, height: 560 }, icon: "💼" },
  contact:    { id: "contact",    title: "Contact — Hero.X Mail",              position: { x: 200, y: 100 }, size: { width: 580, height: 480 }, icon: "📧" },
  socials:    { id: "socials",    title: "Internet Explorer — Hero.X Socials", position: { x: 120, y: 70  }, size: { width: 720, height: 540 }, icon: "🌐" },
  reviews:    { id: "reviews",    title: "Messenger — Client Reviews",         position: { x: 160, y: 90  }, size: { width: 620, height: 500 }, icon: "⭐" },
  terminal:   { id: "terminal",   title: "Hero.X Terminal",                    position: { x: 100, y: 120 }, size: { width: 700, height: 480 }, icon: "💻" },
  music:      { id: "music",      title: "Hero.X Media Player",                position: { x: 300, y: 200 }, size: { width: 360, height: 420 }, icon: "🎵" },
  mycomputer: { id: "mycomputer", title: "My Computer",                        position: { x: 60,  y: 50  }, size: { width: 680, height: 500 }, icon: "🖥️" },
  ie:         { id: "ie",         title: "Internet Explorer",                  position: { x: 100, y: 60  }, size: { width: 720, height: 540 }, icon: "🌐" },
  resume:     { id: "resume",     title: "Resume — Hero.X CV",                 position: { x: 180, y: 80  }, size: { width: 620, height: 520 }, icon: "📄" },
  secrets:    { id: "secrets",    title: "Hidden_Secrets [LOCKED]",            position: { x: 220, y: 110 }, size: { width: 580, height: 460 }, icon: "🔒" },
  recycle:    { id: "recycle",    title: "Recycle Bin",                        position: { x: 150, y: 100 }, size: { width: 500, height: 400 }, icon: "🗑️" },
  notepad:    { id: "notepad",    title: "Notepad — README.txt",               position: { x: 180, y: 90  }, size: { width: 520, height: 400 }, icon: "📝" },
};

const STORAGE_KEY = "herox-window-positions";

function loadSavedPositions(): Partial<Record<WindowId, { x: number; y: number }>> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function savePositions(windows: Record<WindowId, WindowState>) {
  try {
    const positions: Partial<Record<WindowId, { x: number; y: number }>> = {};
    (Object.values(windows) as WindowState[]).forEach((w) => {
      positions[w.id] = w.position;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // ignore
  }
}

export function useWindowManager() {
  // Use a ref for the z-index counter to avoid stale closure bugs
  const highestZRef = useRef(100);

  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => {
    const savedPositions = typeof window !== "undefined" ? loadSavedPositions() : {};
    const initial: Partial<Record<WindowId, WindowState>> = {};
    (Object.keys(DEFAULT_WINDOWS) as WindowId[]).forEach((id, i) => {
      initial[id] = {
        ...DEFAULT_WINDOWS[id],
        position: savedPositions[id] ?? DEFAULT_WINDOWS[id].position,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10 + i,
      };
    });
    return initial as Record<WindowId, WindowState>;
  });

  // Persist positions whenever they change
  useEffect(() => {
    const timer = setTimeout(() => savePositions(windows), 500);
    return () => clearTimeout(timer);
  }, [windows]);

  const openWindow = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const newZ = highestZRef.current;
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: true, isMinimized: false, zIndex: newZ },
    }));
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isMinimized: false, isMaximized: false },
    }));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
  }, []);

  const maximizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized },
    }));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const newZ = highestZRef.current;
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], zIndex: newZ, isMinimized: false },
    }));
  }, []);

  const updatePosition = useCallback((id: WindowId, position: { x: number; y: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], position },
    }));
  }, []);

  const updateSize = useCallback((id: WindowId, size: { width: number; height: number }) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], size },
    }));
  }, []);

  const taskbarWindows = Object.values(windows).filter((w) => w.isOpen);

  return {
    windows,
    taskbarWindows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
    updateSize,
  };
}
