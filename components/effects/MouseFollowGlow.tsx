"use client";

import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";

interface MouseFollowGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function MouseFollowGlow({
  children,
  className = "",
  glowColor = "rgba(160, 32, 240, 0.15)",
}: MouseFollowGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {isHovered && !isMobile && (
        <div
          className="absolute pointer-events-none z-0 transition-opacity duration-300"
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glowColor}, transparent 70%)`,
            left: position.x - 100,
            top: position.y - 100,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
