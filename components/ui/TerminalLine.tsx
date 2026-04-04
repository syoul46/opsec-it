"use client";

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
    <div className={`font-mono text-sm text-accent flex items-center gap-2 ${className}`}>
      <span className="text-text-dim">{prefix}</span>
      <span>{displayed}</span>
      {!done && (
        <span className="inline-block w-2 h-4 bg-accent animate-blink" />
      )}
    </div>
  );
}
