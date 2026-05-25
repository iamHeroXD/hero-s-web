export type WindowId =
  | "about"
  | "projects"
  | "contact"
  | "socials"
  | "reviews"
  | "terminal"
  | "music"
  | "mycomputer"
  | "ie"
  | "resume"
  | "secrets"
  | "recycle"
  | "notepad";

export interface WindowState {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  icon: string;
}

export interface DesktopIcon {
  id: WindowId;
  label: string;
  icon: string;
  position: { x: number; y: number };
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "completed" | "archived";
  category: string;
  year: string;
  size: string;
  preview?: string;
  link?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  avatar: string;
  timestamp: string;
  platform: string;
}

export interface BootPhase {
  id: string;
  label: string;
  duration: number;
}

export interface ContextMenuItem {
  label: string;
  icon?: string;
  action: () => void;
  divider?: boolean;
}

export interface NotificationState {
  id: string;
  title: string;
  message: string;
  icon: string;
  duration: number;
}
