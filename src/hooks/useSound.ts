"use client";
import { useCallback, useRef } from "react";

type SoundType = "click" | "open" | "close" | "minimize" | "error" | "startup" | "notify";

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef(true);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (freq: number, duration: number, type: OscillatorType = "sine", volume = 0.1) => {
      if (!enabledRef.current) return;
      try {
        const ctx = getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.type = type;
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Ignore audio errors
      }
    },
    [getAudioContext]
  );

  const play = useCallback(
    (type: SoundType) => {
      if (!enabledRef.current) return;
      switch (type) {
        case "click":
          playTone(800, 0.05, "square", 0.05);
          break;
        case "open":
          playTone(600, 0.1, "sine", 0.08);
          setTimeout(() => playTone(900, 0.1, "sine", 0.06), 80);
          break;
        case "close":
          playTone(500, 0.1, "sine", 0.08);
          setTimeout(() => playTone(300, 0.1, "sine", 0.06), 80);
          break;
        case "minimize":
          playTone(700, 0.08, "sine", 0.06);
          break;
        case "error":
          playTone(200, 0.15, "sawtooth", 0.08);
          setTimeout(() => playTone(150, 0.15, "sawtooth", 0.08), 150);
          break;
        case "notify":
          playTone(880, 0.08, "sine", 0.05);
          setTimeout(() => playTone(1100, 0.1, "sine", 0.05), 100);
          break;
        case "startup":
          [440, 550, 660, 880].forEach((f, i) => {
            setTimeout(() => playTone(f, 0.3, "sine", 0.08), i * 200);
          });
          break;
      }
    },
    [playTone]
  );

  const toggle = useCallback(() => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  return { play, toggle };
}
