'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COUPLE_STORIES, GALLERY_WORKS } from '@/lib/portfolio-data';
import type { GalleryWork } from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface CoupleMonographsProps {
  activeStoryId: string;
  onSelectStory: (storyId: string) => void;
  onOpenLightbox: (work: GalleryWork, list: GalleryWork[]) => void;
}

export function CoupleMonographs({
  activeStoryId,
  onSelectStory,
  onOpenLightbox,
}: CoupleMonographsProps) {
  const activeStory =
    COUPLE_STORIES.find((s) => s.id === activeStoryId) ?? COUPLE_STORIES[0];

  const storyWorks = GALLERY_WORKS.filter((w) => w.storyId === activeStory.id);

  const handleImageInspect = (imagePath: string) => {
    const matchedWork =
      GALLERY_WORKS.find((w) => w.image === imagePath) ??
      storyWorks[0] ??
      GALLERY_WORKS[0];
    onOpenLightbox(matchedWork, storyWorks.length > 0 ? storyWorks : GALLERY_WORKS);
  };

  return (
    <section
      id="monographs"
      className="scroll-mt-20 w-full py-16 sm:py-24 bg-[#F3EFEA] text-[#141413] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header & Series Selector Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#57534E] mb-3">
              <span>02. @light_of_love__ Carousel Series</span>
              <span aria-hidden="true">·</span>
              <span>5 Featured Instagram Posts</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Featured Wedding &amp; Event Carousels
            </h2>
          </div>

          {/* Interactive Series Switcher */}
          <div
            role="tablist"
            aria-label="Select Instagram carousel series"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E6E1DA] rounded-xl"
          >
            {COUPLE_STORIES.map((story) => {
              const isSelected = story.id === activeStory.id;
              return (
                <button
                  key={story.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectStory(story.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#141413] text-[#FAF8F5] shadow-xs'
                      : 'text-[#44403C] hover:text-[#141413]'
                  }`}
                >
                  {story.couple}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Carousel Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Authentic Instagram Caption, Metadata, Slides Table & Hashtags */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] font-mono tabular-nums mb-3">
                <span>{activeStory.seriesNumber}</span>
                <span aria-hidden="true">·</span>
                <a
                  href={activeStory.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-[#141413]"
                >
                  {activeStory.location}
                </a>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#141413] tracking-tight mb-2">
                {activeStory.couple}
              </h3>

              <p className="text-sm font-medium text-[#57534E] mb-4">
                {activeStory.eventType}
              </p>

              {/* Verbatim Instagram Caption */}
              <blockquote className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D6D0C6]">
                <p className="font-serif text-lg sm:text-xl text-[#141413] leading-relaxed mb-3">
                  “{activeStory.exactCaption}”
                </p>
                <footer className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E] font-mono">
                  <span>
                    @light_of_love__ &amp; {activeStory.collaboratorHandle}
                  </span>
                  <a
                    href={activeStory.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#141413] underline underline-offset-4"
                  >
                    <span>instagram.com/p/{activeStory.postShortcode}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </footer>
              </blockquote>
            </div>

            {/* Authentic Post Specifications */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#D6D0C6]">
              <div>
                <div className="font-mono text-xs text-[#57534E]">Location Tag</div>
                <div className="text-xs sm:text-sm font-medium text-[#141413] mt-0.5">
                  {activeStory.location}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-[#57534E]">Captured On</div>
                <div className="font-mono text-xs sm:text-sm font-semibold text-[#141413] mt-0.5">
                  {activeStory.capturedOn}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-[#57534E]">Carousel Slides</div>
                <div className="font-mono text-sm font-semibold text-[#141413] tabular-nums mt-0.5">
                  {activeStory.slidesCount} Slides
                </div>
              </div>
            </div>

            {/* Carousel Slides Breakdown */}
            <div>
              <h4 className="text-xs font-semibold text-[#141413] mb-3">
                Carousel Slides in /p/{activeStory.postShortcode}
              </h4>
              <div className="border-t border-[#D6D0C6]">
                {activeStory.slidesSummary.map((item, idx) => {
                  const matchingWork = storyWorks[idx];
                  return (
                    <button
                      key={item.slide}
                      type="button"
                      onClick={() =>
                        matchingWork && onOpenLightbox(matchingWork, storyWorks)
                      }
                      className="w-full py-2.5 px-2 border-b border-[#E2DDD5] flex items-center justify-between gap-2 text-xs hover:bg-[#FAF8F5] transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-[#57534E] tabular-nums shrink-0">
                          {item.slide}
                        </span>
                        <span className="font-medium text-[#141413] truncate">
                          {item.frameTitle}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[#78716C] shrink-0">
                        {item.dimensions} →
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Original Post Hashtags */}
            <div>
              <div className="text-xs font-mono text-[#57534E] mb-2">
                Post Tags on @light_of_love__
              </div>
              <p className="text-xs text-[#57534E] font-mono leading-relaxed">
                {activeStory.hashtags.join(' · ')}
              </p>
            </div>
          </div>

          {/* Right Column: 3-Plate Editorial Triptych + Full Carousel Strip */}
          <div className="lg:col-span-7 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
              {/* Primary Vertical Plate */}
              <div className="sm:col-span-7">
                <button
                  type="button"
                  onClick={() => handleImageInspect(activeStory.coverImage)}
                  aria-label={`Inspect Slide 1 for ${activeStory.couple}`}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#D6D0C6] mb-2.5">
                    <EditorialImage
                      src={activeStory.coverImage}
                      alt={`${activeStory.couple} — Slide 1`}
                      containerClassName="w-full h-full relative overflow-hidden"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#57534E] font-mono tabular-nums">
                    <span>Slide 01 · /p/{activeStory.postShortcode}</span>
                    <span className="underline underline-offset-4 text-[#141413]">
                      Inspect Frame →
                    </span>
                  </div>
                </button>
              </div>

              {/* Secondary Stacked Plates */}
              <div className="sm:col-span-5 flex flex-col justify-between gap-5">
                <button
                  type="button"
                  onClick={() => handleImageInspect(activeStory.secondaryImage)}
                  aria-label={`Inspect Slide 2 for ${activeStory.couple}`}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#D6D0C6] mb-2">
                    <EditorialImage
                      src={activeStory.secondaryImage}
                      alt={`${activeStory.couple} — Slide 2`}
                      containerClassName="w-full h-full relative overflow-hidden"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="text-xs text-[#57534E] font-mono tabular-nums">
                    Slide 02 · /p/{activeStory.postShortcode}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleImageInspect(activeStory.thirdImage)}
                  aria-label={`Inspect Slide 3 for ${activeStory.couple}`}
                  className="w-full text-left group cursor-pointer"
                >
                  <div className="aspect-[4/4] rounded-2xl overflow-hidden border border-[#D6D0C6] mb-2">
                    <EditorialImage
                      src={activeStory.thirdImage}
                      alt={`${activeStory.couple} — Slide 3`}
                      containerClassName="w-full h-full relative overflow-hidden"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="text-xs text-[#57534E] font-mono tabular-nums">
                    Slide 03 · /p/{activeStory.postShortcode}
                  </div>
                </button>
              </div>
            </div>

            {/* All Slides Thumbnail Strip for Active Post */}
            <div className="pt-4 border-t border-[#D6D0C6]">
              <div className="text-xs font-mono text-[#57534E] mb-3">
                All {storyWorks.length} Slides from /p/{activeStory.postShortcode} (Click any frame to open fullscreen)
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {storyWorks.map((work) => (
                  <button
                    key={work.id}
                    type="button"
                    onClick={() => onOpenLightbox(work, storyWorks)}
                    aria-label={`Open ${work.title}`}
                    className="group text-left cursor-pointer"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden border border-[#D6D0C6] mb-1">
                      <EditorialImage
                        src={work.image}
                        alt={work.title}
                        containerClassName="w-full h-full relative overflow-hidden"
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-[11px] font-mono text-[#57534E] tabular-nums">
                      Slide 0{work.slideNumber}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
