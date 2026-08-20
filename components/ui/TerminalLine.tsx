"use client";

// Ligne de terminal qui se tape à l'écran.
//
// Les classes étaient restées sur les tokens d'une charte précédente
// (`text-accent`, `text-text-dim`, `animate-blink`), qui n'existent plus dans
// app/theme.css : le composant sortait sans couleur. Corrigé vers blue/ink-dim.
import { useEffect, useState } from "react";

interface TerminalLineProps {
  text: string;
  prefix?: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export default function TerminalLine({
  text,
  prefix = ">",
  delay = 0,
  speed = 40,
  className = "",
}: TerminalLineProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      return;
    }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed]);

  return (
    <div className={`font-mono text-sm text-blue flex items-center gap-2 ${className}`}>
      <span className="text-ink-dim">{prefix}</span>
      <span className="break-all">{displayed}</span>
      {!done && (
        <span className="inline-block w-2 h-4 bg-blue animate-pulse" />
      )}
    </div>
  );
}
