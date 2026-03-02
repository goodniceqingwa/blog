"use client";

import { useRef, useEffect } from "react";
import { useIsMobile, useReducedMotion } from "@/hooks/useMediaQuery";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMaxAngle?: number;
  glareEnable?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltMaxAngle = 8,
  glareEnable = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isMobile || reducedMotion || !ref.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let tiltInstance: any = null;

    import("vanilla-tilt").then((VanillaTilt) => {
      if (ref.current) {
        VanillaTilt.default.init(ref.current, {
          max: tiltMaxAngle,
          speed: 400,
          glare: glareEnable,
          "max-glare": 0.15,
          perspective: 1000,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        tiltInstance = (ref.current as any).vanillaTilt;
      }
    });

    return () => {
      tiltInstance?.destroy();
    };
  }, [isMobile, reducedMotion, tiltMaxAngle, glareEnable]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
