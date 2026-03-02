"use client";

import Link from "next/link";
import Image from "next/image";
import { getFeaturedWorks } from "@/data/works";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { TiltCard } from "@/components/effects/TiltCard";
import { MouseFollowGlow } from "@/components/effects/MouseFollowGlow";
import { Button } from "@/components/ui/Button";

export function FeaturedWorks() {
  const featured = getFeaturedWorks();

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-primary text-center mb-4">
            精选作品
          </h2>
          <p className="text-text-muted text-center mb-16 max-w-2xl mx-auto">
            探索我最喜爱的同人艺术创作
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((work, i) => (
            <ScrollReveal key={work.slug} delay={i * 0.15}>
              <Link href={`/works/${work.slug}`}>
                <TiltCard className="group">
                  <MouseFollowGlow className="glass rounded-xl overflow-hidden">
                    {/* Image */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="text-xs text-accent-purple font-medium uppercase tracking-wider">
                          {work.categoryLabel}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-white mt-1">
                          {work.title}
                        </h3>
                        <p className="text-text-muted text-sm mt-1 line-clamp-2">
                          {work.description}
                        </p>
                      </div>
                    </div>
                  </MouseFollowGlow>
                </TiltCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/works" variant="outline" size="lg">
            查看全部作品 →
          </Button>
        </div>
      </div>
    </section>
  );
}
