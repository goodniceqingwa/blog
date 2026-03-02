"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface MobileMenuProps {
  links: { href: string; label: string }[];
  onClose: () => void;
}

export function MobileMenu({ links, onClose }: MobileMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-bg-deepest/95 backdrop-blur-lg flex items-center justify-center"
    >
      <nav className="flex flex-col items-center gap-8">
        {links.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="text-3xl font-heading text-text-primary hover:text-accent-purple transition-colors"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.div>
  );
}
