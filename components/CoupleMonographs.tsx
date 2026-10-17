'use client';

import React from 'react';
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
        {/* Section Header & Monograph Selector Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#57534E] mb-3">
              <span>02. Editorial Couple Stories</span>
              <span aria-hidden="true">·</span>
              <span>Complete Wedding Monographs</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Intimate Chapters in Natural Light
            </h2>
          </div>

          {/* Interactive Monograph Switcher */}
          <div
            role="tablist"
            aria-label="Select couple wedding monograph"
            className="flex flex-wrap items-center gap-2 p-1.5 bg-[#E6E1DA] rounded-xl"
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
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#141413] text-[#FAF8F5] shadow-xs'
                      : 'text-[#44403C] hover:text-[#141413]'
                  }`}
                >
                  {story.number.replace('Monograph ', '')} · {story.couple}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Monograph Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Narrative, Solar Timeline & Attributable Proof */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] font-mono tabular-nums mb-3">
                <span>{activeStory.number}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStory.location}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStory.season}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#141413] tracking-tight mb-2">
                {activeStory.couple} — {activeStory.title}
              </h3>

              <p className="text-sm font-medium text-[#57534E] mb-4">
                {activeStory.subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                {activeStory.editorialNotes}
              </p>
            </div>

            {/* Quantitative Monograph Specifications */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-[#D6D0C6]">
              <div>
                <div className="font-mono text-xs text-[#57534E]">Venue</div>
                <div className="text-xs sm:text-sm font-medium text-[#141413] mt-0.5">
                  {activeStory.venue}
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-[#57534E]">Analog Film</div>
                <div className="font-mono text-sm font-semibold text-[#141413] tabular-nums mt-0.5">
                  {activeStory.filmRollsUsed} Rolls (120/35mm)
                </div>
              </div>
              <div>
                <div className="font-mono text-xs text-[#57534E]">Archive Delivered</div>
                <div className="font-mono text-sm font-semibold text-[#141413] tabular-nums mt-0.5">
                  {activeStory.framesDelivered} Plates
                </div>
              </div>
            </div>

            {/* Solar & Lighting Timeline Table */}
            <div>
              <h4 className="text-xs font-semibold text-[#141413] mb-3">
                Solar Progression &amp; Lighting Study
              </h4>
              <div className="border-t border-[#D6D0C6]">
                {activeStory.timeline.map((step) => (
                  <div
                    key={step.time}
                    className="py-2.5 border-b border-[#E2DDD5] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#57534E] tabular-nums">
                        {step.time}
                      </span>
                      <span className="font-medium text-[#141413]">{step.moment}</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#78716C]">
                      {step.lightNote}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attributable Couple Testimonial (All-Around Hairline Border, No Left Stripe) */}
            <blockquote className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#D6D0C6]">
              <p className="font-serif text-lg sm:text-xl text-[#141413] leading-relaxed mb-3">
                “{activeStory.quote}”
              </p>
              <footer className="text-xs text-[#57534E] font-medium">
                — {activeStory.quoteAttribution}
              </footer>
            </blockquote>
          </div>

          {/* Right Column: 3-Plate Editorial Triptych */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5">
            {/* Primary Vertical Plate */}
            <div className="sm:col-span-7">
              <button
                type="button"
                onClick={() => handleImageInspect(activeStory.coverImage)}
                aria-label={`Inspect cover plate for ${activeStory.couple}`}
                className="w-full text-left group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#D6D0C6] mb-2.5">
                  <EditorialImage
                    src={activeStory.coverImage}
                    alt={`${activeStory.couple} — Primary Monograph Plate`}
                    containerClassName="w-full h-full relative overflow-hidden"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-[#57534E] font-mono tabular-nums">
                  <span>Plate I · Primary Study</span>
                  <span className="underline underline-offset-4 text-[#141413]">
                    Inspect Plate →
                  </span>
                </div>
              </button>
            </div>

            {/* Secondary Stacked Plates */}
            <div className="sm:col-span-5 flex flex-col justify-between gap-5">
              <button
                type="button"
                onClick={() => handleImageInspect(activeStory.secondaryImage)}
                aria-label={`Inspect ceremony plate for ${activeStory.couple}`}
                className="w-full text-left group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#D6D0C6] mb-2">
                  <EditorialImage
                    src={activeStory.secondaryImage}
                    alt={`${activeStory.couple} — Environmental Study`}
                    containerClassName="w-full h-full relative overflow-hidden"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="text-xs text-[#57534E] font-mono tabular-nums">
                  Plate II · Environmental Scale
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleImageInspect(activeStory.detailImage)}
                aria-label={`Inspect detail plate for ${activeStory.couple}`}
                className="w-full text-left group cursor-pointer"
              >
                <div className="aspect-[4/4] rounded-2xl overflow-hidden border border-[#D6D0C6] mb-2">
                  <EditorialImage
                    src={activeStory.detailImage}
                    alt={`${activeStory.couple} — Tactile Detail Study`}
                    containerClassName="w-full h-full relative overflow-hidden"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="text-xs text-[#57534E] font-mono tabular-nums">
                  Plate III · Still Life &amp; Candlelight
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
