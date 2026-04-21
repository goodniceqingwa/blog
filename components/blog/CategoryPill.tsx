"use client";

import { cn } from "@/lib/utils";

interface CategoryPillProps {
  name: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function CategoryPill({
  name,
  count,
  active,
  onClick,
}: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-mono text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer",
        active
          ? "border-accent-purple text-accent-purple bg-accent-purple/10"
          : "border-glass-border text-text-muted hover:border-accent-purple hover:text-accent-purple"
      )}
    >
      {active && <span className="mr-1">[</span>}
      {name}
      <span className="ml-1 opacity-60">({count})</span>
      {active && <span className="ml-0.5">]</span>}
    </button>
  );
}
