"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/effects/TextReveal";
import { Button } from "@/components/ui/Button";

const ParticleBackground = dynamic(
  () =>
    import("@/components/effects/ParticleBackground").then(
      (m) => m.ParticleBackground
    ),
  { ssr: false }
);

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-16">
      {/* Particle background */}
      <ParticleBackground className="absolute inset-0 z-0" variant="stars" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deepest/50 to-bg-deepest z-[1]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <TextReveal
          text="QingWaaa"
          as="h1"
          className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-text-primary mb-6"
          staggerDelay={0.05}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-xl md:text-2xl text-text-muted font-body mb-10"
        >
          Digital Artist | Fanart Creator
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.4, type: "spring" }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Button href="/works" variant="primary" size="lg">
            探索作品
          </Button>
          <Button href="/about" variant="outline" size="lg">
            了解更多
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-text-muted"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 13l5 5 5-5" />
              <path d="M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
