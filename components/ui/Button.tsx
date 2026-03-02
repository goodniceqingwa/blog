"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary:
      "bg-accent-purple text-white hover:bg-accent-purple/80 glow-purple",
    ghost: "bg-transparent text-text-secondary hover:bg-white/5",
    outline:
      "border border-accent-purple/50 text-accent-purple hover:bg-accent-purple/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-lg",
    lg: "px-8 py-4 text-lg rounded-xl",
  };

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={classes}
      >
        {children}
      </button>
    </motion.div>
  );
}
