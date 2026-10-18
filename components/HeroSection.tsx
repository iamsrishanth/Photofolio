'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { STUDIO_INFO, GALLERY_WORKS } from '@/lib/portfolio-data';
import { formatCaptureCredit, type GalleryWork } from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface HeroSectionProps {
  onExplorePortfolio: () => void;
  onExploreStories: () => void;
  onOpenLightbox: (work: GalleryWork) => void;
}

const HERO_FEATURED_IDS = [
  'ig-DR8zWcOCBSn-1',
  'ig-DFAfTWaMW2c-1',
  'ig-DFSQ_qds4JO-1',
  'ig-DEmsPw9scgm-1',
  'ig-DLbs7Buvlp0-1',
];

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
              {/* Quiet Unboxed Kicker with Official Instagram Profile Identity */}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#57534E] mb-6">
                <img
                  src={STUDIO_INFO.avatarImage}
                  alt={STUDIO_INFO.instagramHandle}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full border border-[#D6D0C6] object-cover"
                />
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#141413] underline underline-offset-4 hover:text-[#78716C] transition-colors"
                >
                  {STUDIO_INFO.instagramHandle}
                </a>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{STUDIO_INFO.badgeText}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  {STUDIO_INFO.postsCount} posts · {STUDIO_INFO.followersCount} followers
                </span>
              </div>

              {/* Refined Display Headline */}
              <h1
                className="font-serif text-[2.4rem] sm:text-[3.2rem] lg:text-[3.65rem] leading-[1.06] tracking-tight text-[#141413] mb-6"
                style={{ textWrap: 'balance' }}
              >
                From the aisle to the altar, every moment documented in love &amp; light.
              </h1>

              {/* Authentic Instagram Bio & Caption Narrative */}
              <p className="text-base sm:text-[17px] leading-[1.68] text-[#44403C] max-w-[60ch] mb-6">
                Official wedding &amp; event photography portfolio for{' '}
                <strong className="font-medium text-[#141413]">{STUDIO_INFO.name}</strong> (
                <a
                  href={STUDIO_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 text-[#141413]"
                >
                  {STUDIO_INFO.instagramHandle}
                </a>
                ). Featuring Christian weddings, couple portraits, Haldi celebrations, bridal
                studies, and saree ceremonies across{' '}
                <span className="text-[#141413] font-medium">
                  Hyderabad, Shamshabad, Gandipet &amp; Nellore City
                </span>{' '}
                — captured on{' '}
                <span className="font-mono text-xs text-[#141413]">
                  @nikonindiaofficial Z 7 ii
                </span>{' '}
                and{' '}
                <span className="font-mono text-xs text-[#141413]">@sonyalphain</span> by{' '}
                <span className="font-medium text-[#141413]">{STUDIO_INFO.filmsHandle}</span>.
              </p>

              {/* Primary & Secondary Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={onExplorePortfolio}
                  className="px-6 py-3.5 text-sm font-medium text-[#FAF8F5] bg-[#141413] rounded-lg hover:bg-[#2C2A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Explore 23 Instagram Frames
                </button>
                <button
                  type="button"
                  onClick={onExploreStories}
                  className="px-5 py-3.5 text-sm font-medium text-[#141413] border border-[#D6D0C6] rounded-lg hover:bg-[#EFECE6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  View 5 Featured Carousels
                </button>
              </div>
            </div>

            {/* Featured Carousel Selector Strip (All 5 Featured @light_of_love__ Posts) */}
            <div className="pt-6 border-t border-[#E6E1DA]">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-xs text-[#57534E] font-mono tabular-nums">
                  Featured @light_of_love__ Posts · 0{activeSlideIndex + 1} of 0
                  {featuredWorks.length} (/p/{currentWork.postShortcode})
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous featured Instagram post"
                    className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-[#D6D0C6] text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next featured Instagram post"
                    className="w-8 h-8 inline-flex items-center justify-center rounded-md border border-[#D6D0C6] text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
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
                      <div className="font-mono text-[10px] text-[#78716C] tabular-nums truncate">
                        /p/{item.postShortcode}
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
            <div className="relative flex-1 min-h-[460px] sm:min-h-[560px] lg:h-full rounded-2xl overflow-hidden border border-[#E6E1DA] group">
              <EditorialImage
                src={currentWork.image}
                alt={`${currentWork.couple} — ${currentWork.location} (@light_of_love__)`}
                containerClassName="w-full h-full min-h-[460px] sm:min-h-[560px] lg:h-full relative overflow-hidden bg-[#E5DFD5]"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                frameLabel={currentWork.frameNumber}
                subtitle={currentWork.location}
                priority
              />

              {/* Measured Contrast Scrim for Media Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              {/* Top Overlay Action */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(currentWork)}
                  aria-label={`Inspect ${currentWork.title} in fullscreen lightbox`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/65 hover:bg-black/80 text-white text-xs font-medium backdrop-blur-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Frame</span>
                </button>
              </div>

              {/* Bottom Caption & Authentic Instagram Post Metadata */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-200 mb-1.5 font-mono tabular-nums">
                  <span>Frame {currentWork.frameNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentWork.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentWork.location}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-white tracking-tight mb-2">
                  {currentWork.couple}
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 max-w-xl mb-3">
                  {currentWork.caption}
                </p>
                <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-300 tabular-nums">
                  <span>{formatCaptureCredit(currentWork)}</span>
                  <a
                    href={currentWork.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white hover:underline whitespace-nowrap shrink-0"
                  >
                    <span>View Post /p/{currentWork.postShortcode}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Authentic @light_of_love__ Metrics Strip */}
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

      {/* Subtle Editorial Ribbon Divider Using Only @light_of_love__ Data */}
      <div className="w-full border-y border-[#E6E1DA] bg-[#F3EFEA] py-3 overflow-x-auto no-scrollbar">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-6 text-xs text-[#57534E] whitespace-nowrap">
          <span>@light_of_love__ · #WEDDING &amp; EVENTS</span>
          <span aria-hidden="true">·</span>
          <span>Hyderabad, Telangana, India</span>
          <span aria-hidden="true">·</span>
          <span>Mallika Gardens, Shamshabad · Gandipet · Nellore City</span>
          <span aria-hidden="true">·</span>
          <span>Captured on @nikonindiaofficial Z 7 ii &amp; @sonyalphain</span>
          <span aria-hidden="true">·</span>
          <span>@light_of_love__ Films</span>
        </div>
      </div>
    </section>
  );
}
