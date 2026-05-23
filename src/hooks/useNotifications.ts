"use client";
import { useState, useCallback, useEffect } from "react";
import { FAKE_NOTIFICATIONS } from "@/config/data";

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notif: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setNotifications((prev) => [...prev, { ...notif, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  useEffect(() => {
    const delays = [8000, 18000, 32000, 48000, 65000];
    const timers = delays.map((delay, i) =>
      setTimeout(() => {
        const notif = FAKE_NOTIFICATIONS[i % FAKE_NOTIFICATIONS.length];
        addNotification(notif);
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [addNotification]);

  return { notifications, addNotification, removeNotification };
}
