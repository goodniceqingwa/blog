"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import {
  works,
  categories,
  searchWorks,
  getWorksByCategory,
  type Work,
} from "@/data/works";
import { TiltCard } from "@/components/effects/TiltCard";
import { MouseFollowGlow } from "@/components/effects/MouseFollowGlow";
import { WorkPreviewModal } from "@/components/ui/WorkPreviewModal";

export function WorksGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  const filteredWorks = useMemo(() => {
    let result = getWorksByCategory(activeCategory);
    if (searchQuery.trim()) {
      const searched = searchWorks(searchQuery);
      result = result.filter((w) => searched.some((s) => s.slug === w.slug));
    }
    return result;
  }, [activeCategory, searchQuery]);

  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <>
      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-accent-purple text-white glow-purple"
                  : "glass glass-hover text-text-muted"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="搜索作品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg glass bg-transparent text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-purple/50 border border-glass-border transition-colors"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        <AnimatePresence mode="popLayout">
          {filteredWorks.map((work) => (
            <motion.div
              key={work.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <TiltCard className="group cursor-pointer" tiltMaxAngle={6}>
                <MouseFollowGlow
                  className="glass rounded-xl overflow-hidden"
                  glowColor="rgba(160, 32, 240, 0.12)"
                >
                  <div
                    onClick={() => setSelectedWork(work)}
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: `${work.width}/${work.height}`,
                    }}
                  >
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-xs text-accent-purple font-medium uppercase tracking-wider">
                        {work.categoryLabel}
                      </span>
                      <h3 className="text-lg font-heading font-bold text-white mt-1">
                        {work.title}
                      </h3>
                    </div>
                  </div>
                </MouseFollowGlow>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </Masonry>

      {filteredWorks.length === 0 && (
        <div className="text-center py-20 text-text-muted">
          <p className="text-lg">没有找到匹配的作品</p>
          <p className="text-sm mt-2">试试其他关键词或分类</p>
        </div>
      )}

      {/* Preview Modal */}
      <WorkPreviewModal
        work={selectedWork}
        allWorks={filteredWorks}
        onClose={() => setSelectedWork(null)}
        onNavigate={setSelectedWork}
      />
    </>
  );
}
