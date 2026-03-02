"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/works", label: "作品集" },
  { href: "/blog", label: "博客" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联系" },
];

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-bg-deep">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-bold text-text-primary mb-2">
              QingWaaa
            </h3>
            <p className="text-text-muted text-sm">
              Digital Artist | Fanart Creator
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-medium mb-3">导航</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-muted text-sm hover:text-accent-purple transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-text-primary font-medium mb-3">社交</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/goodniceqingwa"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-text-muted hover:text-accent-purple hover:glow-purple transition-all"
                aria-label="GitHub"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-glass-border text-center text-text-muted text-sm">
          <p>Made with ❤️ & lots of coffee</p>
          <p className="mt-1">
            &copy; {new Date().getFullYear()} QingWaaa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
