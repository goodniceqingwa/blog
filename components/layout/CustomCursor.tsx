"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/useMediaQuery";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isMobile) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest(
        "a, button, [role='button'], input, textarea, select"
      );
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);

    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.body.style.cursor = "";
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent-purple rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "tween", duration: 0 }}
      />
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border border-accent-purple/50"
        animate={{
          x: position.x - (isHovering ? 24 : 16),
          y: position.y - (isHovering ? 24 : 16),
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering
            ? "rgba(160, 32, 240, 0.8)"
            : "rgba(160, 32, 240, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}
