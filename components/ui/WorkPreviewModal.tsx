"use client";

import { useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Work } from "@/data/works";

interface WorkPreviewModalProps {
  work: Work | null;
  allWorks: Work[];
  onClose: () => void;
  onNavigate: (work: Work) => void;
}

export function WorkPreviewModal({
  work,
  allWorks,
  onClose,
  onNavigate,
}: WorkPreviewModalProps) {
  const currentIndex = work
    ? allWorks.findIndex((w) => w.slug === work.slug)
    : -1;

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(allWorks[currentIndex - 1]);
  }, [currentIndex, allWorks, onNavigate]);

  const goNext = useCallback(() => {
    if (currentIndex < allWorks.length - 1)
      onNavigate(allWorks[currentIndex + 1]);
  }, [currentIndex, allWorks, onNavigate]);

  useEffect(() => {
    if (!work) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [work, onClose, goPrev, goNext]);

  return (
    <AnimatePresence>
      {work && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row gap-6"
          >
            {/* Image */}
            <div className="flex-1 relative min-h-[300px] md:min-h-[500px]">
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-contain rounded-xl"
                sizes="80vw"
                priority
              />
            </div>

            {/* Info panel */}
            <div className="w-full md:w-80 flex flex-col justify-between shrink-0">
              <div>
                <span className="text-xs text-accent-purple font-medium uppercase tracking-wider">
                  {work.categoryLabel}
                </span>
                <h2 className="text-2xl font-heading font-bold text-text-primary mt-2">
                  {work.title}
                </h2>
                <p className="text-text-muted mt-3">{work.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {work.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs glass text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-text-muted text-sm mt-4">{work.date}</p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={goPrev}
                  disabled={currentIndex <= 0}
                  className="px-4 py-2 glass rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 transition-all"
                >
                  ← 上一个
                </button>
                <button
                  onClick={goNext}
                  disabled={currentIndex >= allWorks.length - 1}
                  className="px-4 py-2 glass rounded-lg text-text-muted hover:text-text-primary disabled:opacity-30 transition-all"
                >
                  下一个 →
                </button>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full glass flex items-center justify-center text-text-primary hover:text-accent-purple transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
