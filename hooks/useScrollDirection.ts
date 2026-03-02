"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        ticking = false;
        return;
      }

      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrollDirection, scrollY };
}
