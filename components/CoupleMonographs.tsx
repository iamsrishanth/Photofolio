'use client';

import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { COUPLE_STORIES, GALLERY_WORKS } from '@/lib/portfolio-data';
import type { GalleryWork } from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface CoupleMonographsProps {
  activeStoryId: string;
  onSelectStory: (storyId: string) => void;
  onOpenLightbox: (
    work: GalleryWork,
    list: GalleryWork[],
    triggerEl?: HTMLElement | null
  ) => void;
}

export function CoupleMonographs({
  activeStoryId,
  onSelectStory,
  onOpenLightbox,
}: CoupleMonographsProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = Math.max(
    0,
    COUPLE_STORIES.findIndex((s) => s.id === activeStoryId)
  );
  const activeStory = COUPLE_STORIES[activeIndex] ?? COUPLE_STORIES[0];
  const storyWorks = GALLERY_WORKS.filter((w) => w.storyId === activeStory.id);

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    let nextIdx = idx;
    if (e.key === 'ArrowRight') {
      nextIdx = (idx + 1) % COUPLE_STORIES.length;
    } else if (e.key === 'ArrowLeft') {
      nextIdx = (idx - 1 + COUPLE_STORIES.length) % COUPLE_STORIES.length;
    } else if (e.key === 'Home') {
      nextIdx = 0;
    } else if (e.key === 'End') {
      nextIdx = COUPLE_STORIES.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const targetStory = COUPLE_STORIES[nextIdx];
    if (targetStory) {
      onSelectStory(targetStory.id);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  const handleImageInspect = (
    imagePath: string,
    triggerEl?: HTMLElement | null
  ) => {
    const matchedWork =
      GALLERY_WORKS.find((w) => w.image === imagePath) ??
      storyWorks[0] ??
      GALLERY_WORKS[0];
    onOpenLightbox(
      matchedWork,
      storyWorks.length > 0 ? storyWorks : GALLERY_WORKS,
      triggerEl
    );
  };

  const isHorizontalStory = activeStory.id === 'post-DEmsPw9scgm';

  return (
    <section
      id="monographs"
      aria-labelledby="stories-heading"
      className="scroll-mt-20 w-full py-16 sm:py-24 lg:py-28 bg-[#F3EFEA] text-[#141413] border-b border-[#E2DDD5]"
    >
      <div className="editorial-container">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs text-[#53614A] mb-2">02 / Stories</p>
            <h2
              id="stories-heading"
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Featured Celebrations
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#57534E] max-w-md leading-relaxed">
            Five wedding and celebration stories documented across Hyderabad and
            Beyond.
          </p>
        </div>

        {/* Accessible Story Tabs with Full Keyboard Navigation */}
        <div
          role="tablist"
          aria-label="Celebration stories"
          className="flex flex-wrap items-center gap-2 pb-8 mb-12 border-b border-[#CFC8BC]"
        >
          {COUPLE_STORIES.map((story, idx) => {
            const isSelected = story.id === activeStory.id;
            return (
              <button
                key={story.id}
                ref={(el) => {
                  tabRefs.current[idx] = el;
                }}
                id={`story-tab-${story.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`story-panel-${story.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onSelectStory(story.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer editorial-focus ${
                  isSelected
                    ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                    : 'bg-[#FAF8F5] text-[#57534E] border-[#CFC8BC] hover:border-[#141413] hover:text-[#141413]'
                }`}
              >
                <span className="font-mono text-[11px] opacity-75 mr-2 tabular-nums">
                  {story.seriesNumber}
                </span>
                <span>{story.couple}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Story Tabpanel */}
        <div
          id={`story-panel-${activeStory.id}`}
          role="tabpanel"
          aria-labelledby={`story-tab-${activeStory.id}`}
          tabIndex={0}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start editorial-focus"
        >
          {/* Left Column: Story Narrative & Expandable Archive Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#53614A] font-medium mb-3">
                <span>Story {activeStory.seriesNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStory.eventType}</span>
                <span aria-hidden="true">·</span>
                <span>{activeStory.shortLocation ?? activeStory.location}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight mb-4">
                {activeStory.couple}
              </h3>

              <p className="text-base sm:text-[17px] text-[#141413] leading-relaxed mb-6">
                {activeStory.factualIntro}
              </p>

              <div className="py-4 border-y border-[#CFC8BC] grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[#57534E]">Celebration</div>
                  <div className="font-medium text-[#141413] mt-0.5">
                    {activeStory.eventType}
                  </div>
                </div>
                <div>
                  <div className="text-[#57534E]">Location</div>
                  <div className="font-medium text-[#141413] mt-0.5">
                    <a
                      href={activeStory.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-[#53614A] editorial-focus"
                    >
                      {activeStory.shortLocation ?? activeStory.location}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* All Story Photographs Strip */}
            <div>
              <div className="text-xs font-medium text-[#141413] mb-3">
                Story Sequence ({storyWorks.length} Photographs)
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {storyWorks.map((work) => (
                  <button
                    key={work.id}
                    type="button"
                    onClick={(e) =>
                      onOpenLightbox(work, storyWorks, e.currentTarget)
                    }
                    aria-label={`Open ${work.couple} photograph ${work.slideNumber} of ${work.totalSlidesInPost}`}
                    className="group text-left cursor-pointer editorial-focus"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden border border-[#CFC8BC] bg-[#EBE6DF] mb-1">
                      <EditorialImage
                        src={work.image}
                        alt={work.title}
                        focalPosition={work.focalPosition ?? '50% 24%'}
                        sizes="120px"
                        containerClassName="w-full h-full relative overflow-hidden"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-[11px] font-mono text-[#57534E] tabular-nums">
                      0{work.slideNumber}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Expandable Original Caption, Collaborators, Camera Credits, Slide Relationships & Source Link */}
            <details className="border border-[#CFC8BC] bg-[#FAF8F5] p-4 sm:p-5 text-xs text-[#57534E]">
              <summary className="min-h-[36px] flex items-center justify-between font-medium text-[#141413] cursor-pointer select-none editorial-focus">
                <span>Original caption, credits &amp; slide sequence</span>
                <span className="font-mono text-[11px] text-[#57534E]">
                  /p/{activeStory.postShortcode}
                </span>
              </summary>

              <div className="pt-4 mt-3 border-t border-[#E2DDD5] space-y-4">
                <blockquote className="font-serif italic text-base text-[#141413] leading-relaxed">
                  “{activeStory.exactCaption}”
                </blockquote>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#57534E] block">Collaborator</span>
                    <a
                      href={activeStory.collaboratorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[#141413] underline underline-offset-4"
                    >
                      {activeStory.collaboratorHandle}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#57534E] block">Camera &amp; Team</span>
                    <span className="font-mono text-[#141413]">
                      {activeStory.capturedOn} · {activeStory.creditedBy}
                    </span>
                  </div>
                </div>

                {/* Slide Relationships */}
                <div className="border-t border-[#E2DDD5] pt-3">
                  <div className="font-medium text-[#141413] mb-2">
                    Slide Breakdown
                  </div>
                  <div className="divide-y divide-[#E2DDD5]">
                    {activeStory.slidesSummary.map((item, idx) => {
                      const matchingWork = storyWorks[idx];
                      return (
                        <button
                          key={item.slide}
                          type="button"
                          onClick={(e) =>
                            matchingWork &&
                            onOpenLightbox(
                              matchingWork,
                              storyWorks,
                              e.currentTarget
                            )
                          }
                          className="w-full py-2 flex items-center justify-between gap-2 text-left hover:text-[#141413] cursor-pointer editorial-focus"
                        >
                          <span className="truncate">
                            <span className="font-mono mr-2 tabular-nums">
                              {item.slide}
                            </span>
                            <span className="text-[#141413]">
                              {item.frameTitle}
                            </span>
                          </span>
                          <span className="font-mono text-[11px] shrink-0">
                            {item.dimensions}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#E2DDD5]">
                  <span className="font-mono text-[11px] text-[#57534E] truncate max-w-xs">
                    {activeStory.hashtags.slice(0, 5).join(' · ')}
                  </span>
                  <a
                    href={activeStory.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-[#141413] underline underline-offset-4 hover:text-[#53614A] editorial-focus"
                  >
                    <span>View source on Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </details>
          </div>

          {/* Right Column: Dominant Image + 2 Supporting Photographs Spread */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
              {/* Dominant Story Photograph */}
              <div className={isHorizontalStory ? 'sm:col-span-12' : 'sm:col-span-7'}>
                <button
                  type="button"
                  onClick={(e) =>
                    handleImageInspect(activeStory.coverImage, e.currentTarget)
                  }
                  aria-label={`Open primary photograph for ${activeStory.couple}`}
                  className="w-full text-left group block cursor-pointer editorial-focus"
                >
                  <div className="p-2.5 bg-[#FAF8F5] border border-[#CFC8BC]">
                    <div
                      className={`relative w-full ${
                        isHorizontalStory ? 'aspect-[3/2]' : 'aspect-[4/5]'
                      } overflow-hidden bg-[#EBE6DF]`}
                    >
                      <EditorialImage
                        src={activeStory.coverImage}
                        alt={`${activeStory.couple} — Primary story photograph`}
                        focalPosition={
                          activeStory.coverFocalPosition ?? '50% 24%'
                        }
                        sizes="(max-width: 1024px) 100vw, 520px"
                        containerClassName="w-full h-full relative overflow-hidden"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </button>
              </div>

              {/* Two Supporting Photographs */}
              <div
                className={
                  isHorizontalStory
                    ? 'sm:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-6'
                    : 'sm:col-span-5 flex flex-col gap-6'
                }
              >
                <button
                  type="button"
                  onClick={(e) =>
                    handleImageInspect(
                      activeStory.secondaryImage,
                      e.currentTarget
                    )
                  }
                  aria-label={`Open supporting photograph 2 for ${activeStory.couple}`}
                  className="w-full text-left group block cursor-pointer editorial-focus"
                >
                  <div className="p-2 bg-[#FAF8F5] border border-[#CFC8BC]">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EBE6DF]">
                      <EditorialImage
                        src={activeStory.secondaryImage}
                        alt={`${activeStory.couple} — Supporting photograph 2`}
                        focalPosition={
                          activeStory.secondaryFocalPosition ?? '50% 24%'
                        }
                        sizes="(max-width: 1024px) 50vw, 320px"
                        containerClassName="w-full h-full relative overflow-hidden"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={(e) =>
                    handleImageInspect(activeStory.thirdImage, e.currentTarget)
                  }
                  aria-label={`Open supporting photograph 3 for ${activeStory.couple}`}
                  className="w-full text-left group block cursor-pointer editorial-focus"
                >
                  <div className="p-2 bg-[#FAF8F5] border border-[#CFC8BC]">
                    <div
                      className={`relative ${
                        isHorizontalStory ? 'aspect-[4/3]' : 'aspect-[4/5]'
                      } w-full overflow-hidden bg-[#EBE6DF]`}
                    >
                      <EditorialImage
                        src={activeStory.thirdImage}
                        alt={`${activeStory.couple} — Supporting photograph 3`}
                        focalPosition={
                          activeStory.thirdFocalPosition ?? '50% 24%'
                        }
                        sizes="(max-width: 1024px) 50vw, 320px"
                        containerClassName="w-full h-full relative overflow-hidden"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
