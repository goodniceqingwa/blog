"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface ParticleBackgroundProps {
  className?: string;
  variant?: "stars" | "minimal";
}

export function ParticleBackground({
  className = "",
  variant = "stars",
}: ParticleBackgroundProps) {
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (reducedMotion || !ready) return null;

  const particleCount = variant === "stars" ? 80 : 30;

  const options: ISourceOptions = {
    fullScreen: false,
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#A020F0" },
      links: {
        color: "#A020F0",
        distance: 150,
        enable: variant === "stars",
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        outModes: { default: "out" },
      },
      number: {
        density: { enable: true, width: 800, height: 800 },
        value: particleCount,
      },
      opacity: { value: { min: 0.1, max: 0.4 } },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return <Particles className={className} options={options} />;
}
