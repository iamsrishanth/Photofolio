'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Heart,
  RotateCcw,
  ArrowUpRight,
  SlidersHorizontal,
} from 'lucide-react';
import { GALLERY_WORKS } from '@/lib/portfolio-data';
import {
  filterAndSortGallery,
  formatCaptureCredit,
  type GalleryCategory,
  type GalleryViewMode,
  type SortMode,
  type GalleryWork,
} from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface PortfolioGalleryProps {
  savedIds: string[];
  onToggleSave: (workId: string) => void;
  onOpenLightbox: (
    work: GalleryWork,
    currentList: GalleryWork[],
    triggerEl?: HTMLElement | null
  ) => void;
  onSelectStory: (storyId: string) => void;
}

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'christian-wedding', label: 'Christian Wedding' },
  { id: 'couple-portraits', label: 'Couple Portraits' },
  { id: 'haldi', label: 'Haldi Celebrations' },
  { id: 'bridal', label: 'Bridal Portraits' },
  { id: 'saree-ceremony', label: 'Saree Ceremony' },
];

const VIEW_MODES: { id: GalleryViewMode; label: string }[] = [
  { id: 'bento', label: 'Editorial' },
  { id: 'masonry', label: 'Masonry' },
  { id: 'index', label: 'Index' },
];

export function PortfolioGallery({
  savedIds,
  onToggleSave,
  onOpenLightbox,
  onSelectStory,
}: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [viewMode, setViewMode] = useState<GalleryViewMode>('bento');
  const [sortBy, setSortBy] = useState<SortMode>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySaved, setOnlySaved] = useState(false);
  const [activeIndexWorkId, setActiveIndexWorkId] = useState<string>(
    GALLERY_WORKS[0].id
  );

  const filteredWorks = useMemo(() => {
    return filterAndSortGallery(GALLERY_WORKS, {
      category: activeCategory,
      searchQuery,
      sortBy,
      onlySaved,
      savedIds,
    });
  }, [activeCategory, searchQuery, sortBy, onlySaved, savedIds]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setOnlySaved(false);
  };

  const activeIndexPreviewWork =
    filteredWorks.find((w) => w.id === activeIndexWorkId) ??
    filteredWorks[0] ??
    GALLERY_WORKS[0];

  const editorialLayoutMap = useMemo(() => {
    const map = new Map<
      string,
      { colSpan: string; aspect: string; sizes: string }
    >();
    let i = 0;
    let rowIndex = 0;

    while (i < filteredWorks.length) {
      const remaining = filteredWorks.length - i;
      const first = filteredWorks[i];
      const second = filteredWorks[i + 1];
      const third = filteredWorks[i + 2];

      const hasLandscapeInNextTwo =
        first?.aspectRatio === 'landscape' ||
        second?.aspectRatio === 'landscape';
      const hasHeroInNextTwo =
        first?.bentoSpan === 'hero' || second?.bentoSpan === 'hero';

      const useTwoCardSpread =
        remaining === 2 ||
        hasLandscapeInNextTwo ||
        hasHeroInNextTwo ||
        rowIndex % 2 === 0 ||
        third?.aspectRatio === 'landscape';

      if (remaining === 1) {
        map.set(first.id, {
          colSpan:
            first.aspectRatio === 'landscape'
              ? 'md:col-span-2 lg:col-span-8'
              : 'md:col-span-1 lg:col-span-6',
          aspect:
            first.aspectRatio === 'landscape' ? 'aspect-[3/2]' : 'aspect-[4/5]',
          sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 60vw, 720px',
        });
        i += 1;
      } else if (useTwoCardSpread) {
        let firstSpan = 'md:col-span-1 lg:col-span-6';
        let secondSpan = 'md:col-span-1 lg:col-span-6';

        if (
          first.aspectRatio === 'landscape' &&
          second.aspectRatio === 'portrait'
        ) {
          firstSpan = 'md:col-span-1 lg:col-span-7';
          secondSpan = 'md:col-span-1 lg:col-span-5';
        } else if (
          first.aspectRatio === 'portrait' &&
          second.aspectRatio === 'landscape'
        ) {
          firstSpan = 'md:col-span-1 lg:col-span-5';
          secondSpan = 'md:col-span-1 lg:col-span-7';
        }

        map.set(first.id, {
          colSpan: firstSpan,
          aspect:
            first.aspectRatio === 'landscape' ? 'aspect-[3/2]' : 'aspect-[4/5]',
          sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 55vw, 680px',
        });
        map.set(second.id, {
          colSpan: secondSpan,
          aspect:
            second.aspectRatio === 'landscape'
              ? 'aspect-[3/2]'
              : 'aspect-[4/5]',
          sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 580px',
        });
        i += 2;
      } else {
        [first, second, third].forEach((w) => {
          map.set(w.id, {
            colSpan: 'md:col-span-1 lg:col-span-4',
            aspect:
              w.aspectRatio === 'landscape' ? 'aspect-[3/2]' : 'aspect-[4/5]',
            sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 33vw, 420px',
          });
        });
        i += 3;
      }
      rowIndex += 1;
    }

    return map;
  }, [filteredWorks]);

  const getEditorialGridClasses = (work: GalleryWork) => {
    return (
      editorialLayoutMap.get(work.id) ?? {
        colSpan: 'md:col-span-1 lg:col-span-4',
        aspect:
          work.aspectRatio === 'landscape' ? 'aspect-[3/2]' : 'aspect-[4/5]',
        sizes: '(max-width: 640px) 92vw, (max-width: 1024px) 34vw, 420px',
      }
    );
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-20 w-full py-12 sm:py-16 lg:py-20 bg-[#FAF8F5] text-[#141413] border-b border-[#E2DDD5]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <p className="font-mono text-xs text-[#53614A] mb-2">01 / Selected Work</p>
            <h2
              id="portfolio-heading"
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Photographs &amp; Archive
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#57534E] max-w-md leading-relaxed">
            Twenty-three photographs from weddings and family celebrations across
            Hyderabad and Beyond.
          </p>
        </div>

        {/* Visible Category Filter Buttons (Ordinary buttons with aria-pressed) */}
        <div
          role="group"
          aria-label="Filter work by celebration category"
          className="flex flex-wrap items-center gap-2 pb-4 sm:pb-5 border-b border-[#E2DDD5]"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer editorial-focus ${
                  isActive
                    ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                    : 'bg-transparent text-[#57534E] border-[#E2DDD5] hover:border-[#141413] hover:text-[#141413]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Compact, Clearly Labeled "Refine" Panel */}
        <div
          role="region"
          aria-label="Refine"
          className="py-3.5 px-4 my-4 sm:my-5 bg-[#F3EFEA] border border-[#E2DDD5] flex flex-col lg:flex-row lg:items-center justify-between gap-3.5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-[#141413] shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#53614A]" />
              <span>Refine</span>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-[#57534E] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search couple, location, or celebration..."
                aria-label="Search photographs by couple, location, or celebration"
                className="w-full min-h-[44px] pl-9 pr-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#CFC8BC] text-[#141413] placeholder:text-[#57534E] editorial-focus"
              />
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="gallery-sort-select"
                className="text-xs text-[#57534E] whitespace-nowrap"
              >
                Sort
              </label>
              <select
                id="gallery-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortMode)}
                className="min-h-[44px] px-3 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#CFC8BC] text-[#141413] cursor-pointer editorial-focus"
              >
                <option value="featured">Editorial Sequence</option>
                <option value="post-group">By Story</option>
                <option value="frame-sequence">Archive Order (01–23)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Saved-Only Filter Button */}
            <button
              type="button"
              onClick={() => setOnlySaved((prev) => !prev)}
              aria-pressed={onlySaved}
              className={`min-h-[44px] px-3.5 py-2 text-xs sm:text-sm font-medium border inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer editorial-focus ${
                onlySaved
                  ? 'bg-[#53614A] text-[#FAF8F5] border-[#53614A]'
                  : 'bg-[#FAF8F5] text-[#141413] border-[#CFC8BC] hover:bg-[#DDE3D7]/50'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  onlySaved || savedIds.length > 0 ? 'fill-current' : ''
                }`}
              />
              <span className="tabular-nums">Saved ({savedIds.length})</span>
            </button>

            {/* Layout Mode Selector: Editorial, Masonry, Index */}
            <div
              role="group"
              aria-label="Gallery layout view"
              className="inline-flex items-center border border-[#CFC8BC] bg-[#FAF8F5]"
            >
              {VIEW_MODES.map((mode) => {
                const active = viewMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setViewMode(mode.id)}
                    className={`min-h-[44px] px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer editorial-focus ${
                      active
                        ? 'bg-[#141413] text-[#FAF8F5]'
                        : 'text-[#57534E] hover:text-[#141413]'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Count */}
        <div
          aria-live="polite"
          className="mb-6 flex items-center justify-between text-xs text-[#57534E]"
        >
          <span>
            Showing {filteredWorks.length} of {GALLERY_WORKS.length} photographs
          </span>
          {(activeCategory !== 'all' ||
            searchQuery.trim() !== '' ||
            onlySaved) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="min-h-[44px] px-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#141413] underline underline-offset-4 hover:text-[#53614A] cursor-pointer editorial-focus"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 ? (
          <div className="py-16 px-6 text-center border border-[#E2DDD5] bg-[#F3EFEA]">
            <p className="font-serif text-2xl sm:text-3xl text-[#141413] mb-2">
              No photographs match your current selection.
            </p>
            <p className="text-sm text-[#57534E] max-w-md mx-auto mb-6">
              {onlySaved && savedIds.length === 0
                ? 'You have not saved any photographs yet. Select the heart button on any photograph to add it to your inquiry selection.'
                : 'Try clearing your search terms or returning to All Work.'}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-medium text-[#FAF8F5] bg-[#141413] hover:bg-[#53614A] transition-colors cursor-pointer editorial-focus"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : viewMode === 'bento' ? (
          /* MODE 1: Editorial Sequence (Curated 12-column publication spreads with consistent white space) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-8 sm:gap-x-7 sm:gap-y-9 items-start">
            {filteredWorks.map((work) => {
              const isSaved = savedIds.includes(work.id);
              const { colSpan, aspect, sizes } = getEditorialGridClasses(work);

              return (
                <article
                  key={work.id}
                  className={`${colSpan} flex flex-col group`}
                >
                  {/* Photograph Frame */}
                  <div className="relative w-full border border-[#E2DDD5] bg-[#EBE6DF]">
                    <button
                      type="button"
                      onClick={(e) =>
                        onOpenLightbox(work, filteredWorks, e.currentTarget)
                      }
                      aria-label={`Open photograph: ${work.couple} in ${work.shortLocation ?? work.location}`}
                      className={`relative block w-full ${aspect} overflow-hidden text-left cursor-pointer editorial-focus`}
                    >
                      <EditorialImage
                        src={work.image}
                        alt={`${work.couple} — ${work.categoryLabel} in ${work.shortLocation ?? work.location}`}
                        focalPosition={work.focalPosition ?? '50% 24%'}
                        sizes={sizes}
                        containerClassName="w-full h-full relative overflow-hidden"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        frameLabel={work.frameNumber}
                        subtitle={work.shortLocation ?? work.location}
                      />
                    </button>

                    {/* Discoverable 44x44px Save Button */}
                    <button
                      type="button"
                      onClick={() => onToggleSave(work.id)}
                      aria-pressed={isSaved}
                      aria-label={
                        isSaved
                          ? `Remove ${work.couple} (${work.frameNumber}) from saved photographs`
                          : `Save ${work.couple} (${work.frameNumber}) to inquiry selection`
                      }
                      className={`absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] inline-flex items-center justify-center border transition-colors cursor-pointer editorial-focus ${
                        isSaved
                          ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                          : 'bg-[#FAF8F5]/90 text-[#141413] border-[#CFC8BC] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Concise Caption Below Photograph */}
                  <div className="pt-3.5 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#141413] tracking-tight">
                        <button
                          type="button"
                          onClick={(e) =>
                            onOpenLightbox(work, filteredWorks, e.currentTarget)
                          }
                          className="text-left hover:underline underline-offset-4 decoration-[#53614A] cursor-pointer editorial-focus"
                        >
                          {work.couple}
                        </button>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#57534E] mt-0.5">
                        {work.categoryLabel} · {work.shortLocation ?? work.location}
                      </p>
                    </div>

                    <span className="font-mono text-xs text-[#57534E] tabular-nums shrink-0">
                      {work.frameNumber}
                    </span>
                  </div>

                  {/* Optional Expandable Technical Credits & Source Information */}
                  <details className="mt-2 text-xs text-[#57534E] border-t border-[#E2DDD5] pt-2">
                    <summary className="min-h-[36px] inline-flex items-center gap-1.5 cursor-pointer select-none text-[#57534E] hover:text-[#141413] editorial-focus">
                      <span>Photograph details</span>
                    </summary>
                    <div className="pt-2 pb-1 space-y-1.5 text-xs text-[#57534E]">
                      <p className="font-mono text-[11px]">
                        {formatCaptureCredit(work)}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <button
                          type="button"
                          onClick={() => onSelectStory(work.storyId)}
                          className="text-[#141413] underline underline-offset-4 hover:text-[#53614A] cursor-pointer editorial-focus"
                        >
                          Read {work.couple} story
                        </button>
                        <a
                          href={work.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#141413] underline underline-offset-4 hover:text-[#53614A] editorial-focus"
                        >
                          <span>Source post</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        ) : viewMode === 'masonry' ? (
          /* MODE 2: Masonry Grid Preserving Natural Portrait & Landscape Ratios */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-7 sm:gap-y-9 items-start">
            {filteredWorks.map((work) => {
              const isSaved = savedIds.includes(work.id);
              const aspectClass =
                work.aspectRatio === 'landscape'
                  ? 'aspect-[3/2]'
                  : 'aspect-[4/5]';

              return (
                <article key={work.id} className="flex flex-col group">
                  <div className="relative w-full border border-[#E2DDD5] bg-[#EBE6DF]">
                    <button
                      type="button"
                      onClick={(e) =>
                        onOpenLightbox(work, filteredWorks, e.currentTarget)
                      }
                      aria-label={`Open photograph: ${work.couple} in ${work.shortLocation ?? work.location}`}
                      className={`relative block w-full ${aspectClass} overflow-hidden text-left cursor-pointer editorial-focus`}
                    >
                      <EditorialImage
                        src={work.image}
                        alt={`${work.couple} — ${work.categoryLabel} in ${work.shortLocation ?? work.location}`}
                        focalPosition={work.focalPosition ?? '50% 24%'}
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 420px"
                        containerClassName="w-full h-full relative overflow-hidden"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        frameLabel={work.frameNumber}
                        subtitle={work.shortLocation ?? work.location}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onToggleSave(work.id)}
                      aria-pressed={isSaved}
                      aria-label={
                        isSaved
                          ? `Remove ${work.couple} (${work.frameNumber}) from saved photographs`
                          : `Save ${work.couple} (${work.frameNumber}) to inquiry selection`
                      }
                      className={`absolute top-3 right-3 z-10 min-w-[44px] min-h-[44px] inline-flex items-center justify-center border transition-colors cursor-pointer editorial-focus ${
                        isSaved
                          ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                          : 'bg-[#FAF8F5]/90 text-[#141413] border-[#CFC8BC] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                      />
                    </button>
                  </div>

                  <div className="pt-3 flex items-baseline justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl text-[#141413]">
                        <button
                          type="button"
                          onClick={(e) =>
                            onOpenLightbox(work, filteredWorks, e.currentTarget)
                          }
                          className="text-left hover:underline underline-offset-4 cursor-pointer editorial-focus"
                        >
                          {work.couple}
                        </button>
                      </h3>
                      <p className="text-xs text-[#57534E] mt-0.5">
                        {work.categoryLabel} · {work.shortLocation ?? work.location}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#57534E] tabular-nums">
                      {work.frameNumber}
                    </span>
                  </div>

                  <details className="mt-2 text-xs text-[#57534E] border-t border-[#E2DDD5] pt-2">
                    <summary className="min-h-[36px] inline-flex items-center cursor-pointer select-none hover:text-[#141413] editorial-focus">
                      Photograph details
                    </summary>
                    <div className="pt-1.5 space-y-1">
                      <p className="font-mono text-[11px]">
                        {formatCaptureCredit(work)}
                      </p>
                      <a
                        href={work.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#141413] underline underline-offset-4"
                      >
                        <span>Source post</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </details>
                </article>
              );
            })}
          </div>
        ) : (
          /* MODE 3: Archive Index (Works on keyboard focus, click selection, and hover) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 border-t border-[#CFC8BC]">
              {filteredWorks.map((work) => {
                const isSelected = activeIndexPreviewWork.id === work.id;
                const isSaved = savedIds.includes(work.id);
                return (
                  <div
                    key={work.id}
                    onMouseEnter={() => setActiveIndexWorkId(work.id)}
                    onFocusCapture={() => setActiveIndexWorkId(work.id)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 px-3 border-b border-[#E2DDD5] transition-colors ${
                      isSelected ? 'bg-[#DDE3D7]/45' : 'hover:bg-[#F3EFEA]'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="font-mono text-xs text-[#57534E] tabular-nums shrink-0">
                        {work.frameNumber}
                      </span>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            setActiveIndexWorkId(work.id);
                            onOpenLightbox(work, filteredWorks, e.currentTarget);
                          }}
                          className="font-serif text-xl text-[#141413] hover:underline underline-offset-4 text-left truncate block cursor-pointer editorial-focus"
                        >
                          {work.couple} — {work.categoryLabel}
                        </button>
                        <div className="text-xs text-[#57534E] mt-0.5">
                          {work.shortLocation ?? work.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setActiveIndexWorkId(work.id)}
                        aria-pressed={isSelected}
                        className="min-h-[44px] px-3 py-2 text-xs border border-[#CFC8BC] bg-[#FAF8F5] text-[#141413] hover:bg-[#DDE3D7]/40 transition-colors cursor-pointer editorial-focus"
                      >
                        Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleSave(work.id)}
                        aria-pressed={isSaved}
                        aria-label={
                          isSaved
                            ? `Remove ${work.couple} (${work.frameNumber}) from saved photographs`
                            : `Save ${work.couple} (${work.frameNumber}) to inquiry selection`
                        }
                        className={`min-w-[44px] min-h-[44px] px-3 py-2 text-xs border transition-colors cursor-pointer editorial-focus ${
                          isSaved
                            ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                            : 'bg-[#FAF8F5] text-[#141413] border-[#CFC8BC] hover:bg-[#DDE3D7]/40'
                        }`}
                      >
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) =>
                          onOpenLightbox(work, filteredWorks, e.currentTarget)
                        }
                        aria-label={`Open Frame ${work.frameNumber}: ${work.couple}`}
                        className="min-h-[44px] px-3.5 py-2 text-xs font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#53614A] transition-colors whitespace-nowrap shrink-0 cursor-pointer editorial-focus"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Preview Pane */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 border border-[#E2DDD5] bg-[#F3EFEA] p-5">
              <button
                type="button"
                onClick={(e) =>
                  onOpenLightbox(
                    activeIndexPreviewWork,
                    filteredWorks,
                    e.currentTarget
                  )
                }
                aria-label={`Open previewed photograph: ${activeIndexPreviewWork.couple}`}
                className="w-full text-left block cursor-pointer editorial-focus"
              >
                <div
                  className={`relative w-full ${
                    activeIndexPreviewWork.aspectRatio === 'landscape'
                      ? 'aspect-[3/2]'
                      : 'aspect-[4/5]'
                  } overflow-hidden border border-[#E2DDD5] bg-[#EBE6DF] mb-4`}
                >
                  <EditorialImage
                    src={activeIndexPreviewWork.image}
                    alt={`${activeIndexPreviewWork.couple} — ${activeIndexPreviewWork.shortLocation ?? activeIndexPreviewWork.location}`}
                    focalPosition={
                      activeIndexPreviewWork.focalPosition ?? '50% 24%'
                    }
                    sizes="(max-width: 1024px) 100vw, 460px"
                    containerClassName="w-full h-full relative overflow-hidden"
                    className="w-full h-full object-cover"
                    frameLabel={activeIndexPreviewWork.frameNumber}
                    subtitle={
                      activeIndexPreviewWork.shortLocation ??
                      activeIndexPreviewWork.location
                    }
                  />
                </div>
              </button>

              <div className="flex items-baseline justify-between gap-2 mb-1">
                <h3 className="font-serif text-2xl text-[#141413]">
                  {activeIndexPreviewWork.couple}
                </h3>
                <span className="font-mono text-xs text-[#57534E] tabular-nums">
                  Frame {activeIndexPreviewWork.frameNumber}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#57534E] mb-3">
                {activeIndexPreviewWork.categoryLabel} ·{' '}
                {activeIndexPreviewWork.shortLocation ??
                  activeIndexPreviewWork.location}
              </p>

              <details className="text-xs text-[#57534E] border-t border-[#E2DDD5] pt-2.5">
                <summary className="min-h-[36px] inline-flex items-center cursor-pointer select-none hover:text-[#141413] editorial-focus">
                  Technical credit &amp; source
                </summary>
                <div className="pt-2 space-y-1.5">
                  <p className="italic font-serif text-sm text-[#141413]">
                    “{activeIndexPreviewWork.caption}”
                  </p>
                  <p className="font-mono text-[11px]">
                    {formatCaptureCredit(activeIndexPreviewWork)}
                  </p>
                </div>
              </details>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
