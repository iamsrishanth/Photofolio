'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDIO_INFO, GALLERY_WORKS } from '@/lib/portfolio-data';
import { formatExifSummary, type GalleryWork } from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface HeroSectionProps {
  onExplorePortfolio: () => void;
  onExploreStories: () => void;
  onOpenLightbox: (work: GalleryWork) => void;
}

const HERO_FEATURED_IDS = ['lol-01', 'lol-03', 'lol-04'];

export function HeroSection({
  onExplorePortfolio,
  onExploreStories,
  onOpenLightbox,
}: HeroSectionProps) {
  const featuredWorks = GALLERY_WORKS.filter((w) => HERO_FEATURED_IDS.includes(w.id));
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentWork = featuredWorks[activeSlideIndex] ?? GALLERY_WORKS[0];

  const handleNextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % featuredWorks.length);
  };

  const handlePrevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + featuredWorks.length) % featuredWorks.length);
  };

  return (
    <section id="top" className="w-full bg-[#FAF8F5] text-[#141413]">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-12">
        {/* Split-Screen Editorial Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy & Controls */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-6">
            <div>
              {/* Quiet Unboxed Kicker (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mb-5">
                <span>Editorial Wedding Studio</span>
                <span aria-hidden="true">·</span>
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#141413] underline underline-offset-4 hover:text-[#78716C] transition-colors"
                >
                  {STUDIO_INFO.instagramHandle}
                </a>
                <span aria-hidden="true">·</span>
                <span>Paris, Amalfi &amp; Worldwide</span>
              </div>

              {/* Refined Display Headline */}
              <h1
                className="font-serif text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.06] tracking-tight text-[#141413] mb-6"
                style={{ textWrap: 'balance' }}
              >
                Where fleeting light becomes an enduring visual heirloom.
              </h1>

              {/* Body Prose */}
              <p className="text-base sm:text-[17px] leading-[1.68] text-[#44403C] max-w-[60ch] mb-8">
                Light of Love is an editorial wedding photography atelier dedicated to
                unscripted intimacy, architectural stillness, and hand-developed 35mm and
                medium-format analog film. Curated directly from our monograph archive at{' '}
                <span className="font-medium text-[#141413]">@light_of_love__</span>.
              </p>

              {/* Primary & Secondary Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={onExplorePortfolio}
                  className="px-6 py-3.5 text-sm font-medium text-[#FAF8F5] bg-[#141413] rounded-lg hover:bg-[#2C2A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explore Selected Works
                </button>
                <button
                  type="button"
                  onClick={onExploreStories}
                  className="px-5 py-3.5 text-sm font-medium text-[#141413] border border-[#D6D0C6] rounded-lg hover:bg-[#EFECE6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Read Couple Monographs
                </button>
              </div>
            </div>

            {/* Featured Plate Selector Strip */}
            <div className="pt-6 border-t border-[#E6E1DA]">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs text-[#57534E]">
                  Featured Exhibition Plates · Plate 0{activeSlideIndex + 1} of 0
                  {featuredWorks.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous featured wedding plate"
                    className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-[#D6D0C6] text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next featured wedding plate"
                    className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-[#D6D0C6] text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {featuredWorks.map((item, idx) => {
                  const isActive = idx === activeSlideIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`text-left p-2.5 rounded-lg border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#EFECE6] border-[#141413]'
                          : 'bg-transparent border-[#E6E1DA] hover:border-[#A8A29E]'
                      }`}
                    >
                      <div className="font-mono text-[11px] text-[#78716C] tabular-nums">
                        Frame {item.frameNumber}
                      </div>
                      <div className="text-xs font-medium text-[#141413] truncate mt-0.5">
                        {item.couple}
                      </div>
                      <div className="text-[11px] text-[#57534E] truncate">
                        {item.location}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Matching Height Featured Visual Container */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[440px] sm:min-h-[540px] lg:h-full rounded-2xl overflow-hidden border border-[#E6E1DA] group">
              <EditorialImage
                src={currentWork.image}
                alt={`${currentWork.title} — ${currentWork.couple} in ${currentWork.location}`}
                containerClassName="w-full h-full min-h-[440px] sm:min-h-[540px] lg:h-full relative overflow-hidden bg-[#E5DFD5]"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                frameLabel={currentWork.frameNumber}
                subtitle={currentWork.location}
                priority
              />

              {/* Measured Contrast Scrim for Media Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              {/* Top Overlay Action */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(currentWork)}
                  aria-label={`Inspect ${currentWork.title} in fullscreen lightbox`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/65 hover:bg-black/80 text-white text-xs font-medium backdrop-blur-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Plate</span>
                </button>
              </div>

              {/* Bottom Caption & EXIF Telemetry */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-200 mb-1.5 font-mono tabular-nums">
                  <span>Frame {currentWork.frameNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentWork.couple}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentWork.location}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-tight mb-2">
                  {currentWork.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 max-w-xl mb-3">
                  {currentWork.caption}
                </p>
                <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-300 tabular-nums">
                  <span>{formatExifSummary(currentWork)}</span>
                  <a
                    href={STUDIO_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>{currentWork.instagramHandle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Studio Proof Strip Below Split Hero */}
        <div className="mt-12 pt-8 border-t border-[#E6E1DA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STUDIO_INFO.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col justify-between">
              <div className="font-serif text-3xl sm:text-4xl text-[#141413] tracking-tight tabular-nums mb-1">
                {metric.value}
              </div>
              <div className="text-sm font-medium text-[#141413]">{metric.label}</div>
              <div className="text-xs text-[#57534E] mt-0.5">{metric.context}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Editorial Monograph Ribbon Divider */}
      <div className="w-full border-y border-[#E6E1DA] bg-[#F3EFEA] py-3 overflow-x-auto no-scrollbar">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-6 text-xs text-[#57534E] whitespace-nowrap">
          <span>Selected Wedding Monographs</span>
          <span aria-hidden="true">·</span>
          <span>35mm Kodak Portra &amp; Medium Format 120</span>
          <span aria-hidden="true">·</span>
          <span>Intimate Ceremonies &amp; Coastal Elopements</span>
          <span aria-hidden="true">·</span>
          <span>Curated from @light_of_love__</span>
          <span aria-hidden="true">·</span>
          <span>Available Worldwide 2026–2027</span>
        </div>
      </div>
    </section>
  );
}
