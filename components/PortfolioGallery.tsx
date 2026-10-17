'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Heart,
  Maximize2,
  LayoutGrid,
  Columns,
  List,
  RotateCcw,
  ArrowUpRight,
} from 'lucide-react';
import { GALLERY_WORKS, STUDIO_INFO } from '@/lib/portfolio-data';
import {
  filterAndSortGallery,
  formatExifSummary,
  type GalleryCategory,
  type GalleryViewMode,
  type SortMode,
  type GalleryWork,
} from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface PortfolioGalleryProps {
  savedIds: string[];
  onToggleSave: (workId: string) => void;
  onOpenLightbox: (work: GalleryWork, currentList: GalleryWork[]) => void;
  onSelectStory: (storyId: string) => void;
}

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'ceremony', label: 'Ceremony' },
  { id: 'editorial', label: 'Editorial Portraits' },
  { id: 'elopement', label: 'Elopements' },
  { id: 'details', label: 'Still Life & Details' },
  { id: 'analog', label: '35mm & Analog' },
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
  const [hoveredIndexWorkId, setHoveredIndexWorkId] = useState<string>(
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
    filteredWorks.find((w) => w.id === hoveredIndexWorkId) ??
    filteredWorks[0] ??
    GALLERY_WORKS[0];

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 w-full py-16 sm:py-24 bg-[#FAF8F5] text-[#141413] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mb-3">
              <span>01. Curated Visual Archive</span>
              <span aria-hidden="true">·</span>
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#141413] underline underline-offset-4 hover:text-[#78716C]"
              >
                <span>{STUDIO_INFO.instagramHandle}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">
                Showing {filteredWorks.length} of {GALLERY_WORKS.length} Plates
              </span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Selected Wedding Works &amp; Film Studies
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#44403C] max-w-md leading-relaxed">
            Explore our dynamic wedding portfolio curated from{' '}
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#141413] underline underline-offset-4"
            >
              @light_of_love__
            </a>
            . Switch between editorial Bento layouts, monograph masonry, or the full
            technical archive index.
          </p>
        </div>

        {/* Interactive Toolbar: Row 1 (Category Tabs + View Switcher), Row 2 (Search + Moodboard + Sort) */}
        <div className="flex flex-col gap-4 pb-8 mb-10 border-b border-[#E6E1DA]">
          {/* Row 1: Category Filter Tabs & View Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div
              role="tablist"
              aria-label="Gallery category filter"
              className="flex items-center gap-1.5 p-1.5 bg-[#EFECE6] rounded-xl overflow-x-auto no-scrollbar"
            >
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? GALLERY_WORKS.length
                    : GALLERY_WORKS.filter((w) => w.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#141413] text-[#FAF8F5] shadow-xs'
                        : 'text-[#57534E] hover:text-[#141413]'
                    }`}
                  >
                    {cat.label}{' '}
                    <span className="font-mono text-[11px] opacity-75 tabular-nums">
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Switcher */}
            <div
              role="group"
              aria-label="Gallery layout mode"
              className="inline-flex items-center self-start lg:self-auto p-1 bg-[#EFECE6] rounded-lg shrink-0"
            >
              <button
                type="button"
                onClick={() => setViewMode('bento')}
                aria-pressed={viewMode === 'bento'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'bento'
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Bento</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('masonry')}
                aria-pressed={viewMode === 'masonry'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'masonry'
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Monograph</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('index')}
                aria-pressed={viewMode === 'index'}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'index'
                    ? 'bg-white text-[#141413] shadow-xs'
                    : 'text-[#57534E] hover:text-[#141413]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Index</span>
              </button>
            </div>
          </div>

          {/* Row 2: Search Box, Saved Moodboard Filter, and Sort Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 min-w-[220px] max-w-md">
              <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, couple, Leica lens, or Kodak film..."
                aria-label="Search gallery works by location, couple, or film stock"
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#D6D0C6] rounded-lg text-[#141413] placeholder:text-[#78716C] focus:outline-none focus:border-[#141413]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Saved Moodboard Toggle */}
              <button
                type="button"
                onClick={() => setOnlySaved((prev) => !prev)}
                aria-pressed={onlySaved}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  onlySaved
                    ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                    : 'bg-white text-[#141413] border-[#D6D0C6] hover:bg-[#EFECE6]'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    onlySaved || savedIds.length > 0 ? 'fill-current' : ''
                  }`}
                />
                <span className="tabular-nums">Moodboard ({savedIds.length})</span>
              </button>

              {/* Sort Select */}
              <label className="inline-flex items-center gap-2 text-xs text-[#57534E]">
                <span className="sr-only">Sort works by</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortMode)}
                  aria-label="Sort gallery works"
                  className="px-3 py-2 text-xs font-medium bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413] cursor-pointer"
                >
                  <option value="featured">Curated Order</option>
                  <option value="latest">Latest Season</option>
                  <option value="film-sequence">Frame Number</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredWorks.length === 0 ? (
          <div className="py-20 px-6 text-center rounded-2xl border border-[#E6E1DA] bg-[#F5F2EC]">
            <p className="font-serif text-2xl text-[#141413] mb-2">
              No monograph plates match your current selection.
            </p>
            <p className="text-sm text-[#57534E] max-w-md mx-auto mb-6">
              {onlySaved && savedIds.length === 0
                ? 'Your personal moodboard is currently empty. Click the heart icon on any photograph to curate your favorite wedding frames.'
                : 'Try clearing your search query or switching back to All Works.'}
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#FAF8F5] bg-[#141413] rounded-lg hover:bg-[#2C2A28] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Gallery Filters</span>
            </button>
          </div>
        ) : viewMode === 'bento' ? (
          /* MODE 1: Dynamic Editorial Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {filteredWorks.map((work, index) => {
              const isSaved = savedIds.includes(work.id);
              // Asymmetric editorial Bento spans on desktop
              const patternIndex = index % 6;
              let colSpanClass = 'lg:col-span-4';
              let heightClass = 'h-[380px] sm:h-[420px]';

              if (patternIndex === 0) {
                colSpanClass = 'md:col-span-2 lg:col-span-7';
                heightClass = 'h-[420px] sm:h-[520px]';
              } else if (patternIndex === 1) {
                colSpanClass = 'lg:col-span-5';
                heightClass = 'h-[420px] sm:h-[520px]';
              } else if (patternIndex === 2 || patternIndex === 3 || patternIndex === 4) {
                colSpanClass = 'lg:col-span-4';
                heightClass = 'h-[380px] sm:h-[430px]';
              } else if (patternIndex === 5) {
                colSpanClass = 'md:col-span-2 lg:col-span-12';
                heightClass = 'h-[400px] sm:h-[480px]';
              }

              return (
                <article
                  key={work.id}
                  className={`${colSpanClass} group relative rounded-2xl overflow-hidden border border-[#E6E1DA] bg-[#EBE6DF] flex flex-col`}
                >
                  <div className={`relative w-full ${heightClass} overflow-hidden`}>
                    <EditorialImage
                      src={work.image}
                      alt={`${work.title} — ${work.couple} (${work.location})`}
                      containerClassName="w-full h-full relative overflow-hidden bg-[#E5DFD5]"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      frameLabel={work.frameNumber}
                      subtitle={work.location}
                    />

                    {/* Measured Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                    {/* Top Right Interactive Controls */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                      <button
                        type="button"
                        onClick={() => onToggleSave(work.id)}
                        aria-label={
                          isSaved
                            ? `Remove ${work.title} from moodboard`
                            : `Save ${work.title} to moodboard`
                        }
                        className={`w-9 h-9 inline-flex items-center justify-center rounded-lg backdrop-blur-sm transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-white text-[#141413]'
                            : 'bg-black/55 text-white hover:bg-black/80'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${isSaved ? 'fill-[#141413]' : ''}`}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenLightbox(work, filteredWorks)}
                        aria-label={`Open ${work.title} in fullscreen viewer`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black/55 hover:bg-black/80 text-white text-xs font-medium backdrop-blur-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Plate</span>
                      </button>
                    </div>

                    {/* Bottom Editorial Caption & Unboxed Metadata */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-stone-200 font-mono tabular-nums mb-1">
                        <span>Frame {work.frameNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span className="capitalize">{work.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{work.location}</span>
                      </div>

                      <div className="flex items-baseline justify-between gap-4">
                        <div>
                          <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-tight">
                            <button
                              type="button"
                              onClick={() => onOpenLightbox(work, filteredWorks)}
                              className="text-left hover:underline underline-offset-4 cursor-pointer"
                            >
                              {work.title}
                            </button>
                          </h3>
                          <p className="text-xs text-stone-200 mt-1 line-clamp-1">
                            {work.couple} — {work.caption}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-white/20 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-300 tabular-nums">
                        <span>
                          {work.camera} · {work.filmStock}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSelectStory(work.storyId)}
                          className="text-white hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          Read Monograph →
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : viewMode === 'masonry' ? (
          /* MODE 2: Editorial Monograph Masonry Grid (Unboxed Museum Captions Below Media) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredWorks.map((work) => {
              const isSaved = savedIds.includes(work.id);
              const aspectClass =
                work.aspectRatio === 'portrait'
                  ? 'aspect-[3/4]'
                  : work.aspectRatio === 'square'
                  ? 'aspect-square'
                  : 'aspect-[4/3]';

              return (
                <article key={work.id} className="flex flex-col group">
                  <div
                    className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden border border-[#E6E1DA] bg-[#EBE6DF] mb-4`}
                  >
                    <EditorialImage
                      src={work.image}
                      alt={`${work.title} — ${work.couple}`}
                      containerClassName="w-full h-full relative overflow-hidden"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      frameLabel={work.frameNumber}
                      subtitle={work.location}
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onToggleSave(work.id)}
                        aria-label={
                          isSaved
                            ? `Remove ${work.title} from moodboard`
                            : `Save ${work.title} to moodboard`
                        }
                        className={`w-8 h-8 inline-flex items-center justify-center rounded-lg backdrop-blur-sm transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-[#141413] text-white'
                            : 'bg-black/55 text-white hover:bg-black/80'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(work, filteredWorks)}
                        aria-label={`Inspect ${work.title}`}
                        className="px-2.5 py-1.5 rounded-lg bg-black/55 hover:bg-black/80 text-white text-xs font-medium backdrop-blur-sm transition-colors cursor-pointer"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>

                  {/* Clean Unboxed Monograph Caption */}
                  <div className="flex items-center gap-2 text-xs text-[#57534E] font-mono tabular-nums mb-1">
                    <span>Plate {work.frameNumber}</span>
                    <span aria-hidden="true">·</span>
                    <span>{work.couple}</span>
                    <span aria-hidden="true">·</span>
                    <span>{work.location}</span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#141413] tracking-tight mb-1.5">
                    <button
                      type="button"
                      onClick={() => onOpenLightbox(work, filteredWorks)}
                      className="text-left hover:underline underline-offset-4 cursor-pointer"
                    >
                      {work.title}
                    </button>
                  </h3>

                  <p className="text-sm text-[#44403C] leading-relaxed mb-3">
                    {work.caption}
                  </p>

                  <div className="mt-auto pt-3 border-t border-[#E6E1DA] flex items-center justify-between gap-2 text-xs font-mono text-[#78716C] tabular-nums">
                    <span className="truncate">{formatExifSummary(work)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* MODE 3: Andy Hardy Inspired Overview / Technical Archive Index */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Tabular Archive List */}
            <div className="lg:col-span-7 border-t border-[#D6D0C6]">
              {filteredWorks.map((work) => {
                const isSelected = activeIndexPreviewWork.id === work.id;
                const isSaved = savedIds.includes(work.id);
                return (
                  <div
                    key={work.id}
                    onMouseEnter={() => setHoveredIndexWorkId(work.id)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 px-3 border-b border-[#E6E1DA] transition-colors ${
                      isSelected ? 'bg-[#EFECE6]' : 'hover:bg-[#F5F2EC]'
                    }`}
                  >
                    <div className="flex items-baseline gap-4 min-w-0">
                      <span className="font-mono text-xs text-[#78716C] tabular-nums shrink-0">
                        {work.frameNumber}
                      </span>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() => onOpenLightbox(work, filteredWorks)}
                          className="font-serif text-xl text-[#141413] hover:underline underline-offset-4 text-left truncate block cursor-pointer"
                        >
                          {work.title}
                        </button>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E] mt-0.5">
                          <span>{work.couple}</span>
                          <span aria-hidden="true">·</span>
                          <span>{work.location}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">{work.filmStock}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleSave(work.id)}
                        aria-label={
                          isSaved
                            ? `Remove ${work.title} from moodboard`
                            : `Save ${work.title} to moodboard`
                        }
                        className="px-2.5 py-1.5 text-xs border border-[#D6D0C6] rounded-md hover:bg-white transition-colors cursor-pointer"
                      >
                        {isSaved ? 'Saved ♥' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenLightbox(work, filteredWorks)}
                        aria-label={`Open Plate ${work.frameNumber}: ${work.title}`}
                        className="px-3 py-1.5 text-xs font-medium bg-[#141413] text-[#FAF8F5] rounded-md hover:bg-[#2C2A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Open Plate
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky Live Preview Plate on Desktop */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl border border-[#E6E1DA] bg-[#F3EFEA] p-5">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                <EditorialImage
                  src={activeIndexPreviewWork.image}
                  alt={activeIndexPreviewWork.title}
                  containerClassName="w-full h-full relative overflow-hidden"
                  className="w-full h-full object-cover"
                  frameLabel={activeIndexPreviewWork.frameNumber}
                  subtitle={activeIndexPreviewWork.location}
                />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#57534E] tabular-nums mb-1">
                <span>Plate {activeIndexPreviewWork.frameNumber}</span>
                <span aria-hidden="true">·</span>
                <span>{activeIndexPreviewWork.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeIndexPreviewWork.instagramCode}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#141413] mb-2">
                {activeIndexPreviewWork.title}
              </h3>
              <p className="text-xs text-[#44403C] leading-relaxed mb-4">
                {activeIndexPreviewWork.caption}
              </p>
              <div className="pt-3 border-t border-[#E6E1DA] text-[11px] font-mono text-[#57534E] tabular-nums">
                {formatExifSummary(activeIndexPreviewWork)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
