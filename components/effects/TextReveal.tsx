"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = "h1",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const chars = text.split("");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
