'use client';

import React, { useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import {
  getAdjacentWorkIndex,
  formatCaptureCredit,
  type GalleryWork,
} from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface LightboxModalProps {
  work: GalleryWork | null;
  worksList: GalleryWork[];
  savedIds: string[];
  onClose: () => void;
  onSelectWork: (work: GalleryWork) => void;
  onToggleSave: (workId: string) => void;
  onOpenStory: (storyId: string) => void;
}

export function LightboxModal({
  work,
  worksList,
  savedIds,
  onClose,
  onSelectWork,
  onToggleSave,
  onOpenStory,
}: LightboxModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const currentIndex = work ? worksList.findIndex((w) => w.id === work.id) : -1;

  // Move initial focus into the modal when opened & lock body scroll
  useEffect(() => {
    if (!work) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 10);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [Boolean(work)]);

  // Keyboard navigation + focus trap inside modal
  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowRight' && worksList.length > 0) {
        e.preventDefault();
        const nextIdx = getAdjacentWorkIndex(
          currentIndex >= 0 ? currentIndex : 0,
          worksList.length,
          'next'
        );
        if (nextIdx >= 0) onSelectWork(worksList[nextIdx]);
        return;
      }

      if (e.key === 'ArrowLeft' && worksList.length > 0) {
        e.preventDefault();
        const prevIdx = getAdjacentWorkIndex(
          currentIndex >= 0 ? currentIndex : 0,
          worksList.length,
          'prev'
        );
        if (prevIdx >= 0) onSelectWork(worksList[prevIdx]);
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (
            document.activeElement === lastElement ||
            !dialogRef.current.contains(document.activeElement)
          ) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [work, currentIndex, worksList, onClose, onSelectWork]);

  if (!work) return null;

  const isSaved = savedIds.includes(work.id);

  const handlePrev = () => {
    const prevIdx = getAdjacentWorkIndex(
      currentIndex >= 0 ? currentIndex : 0,
      worksList.length,
      'prev'
    );
    if (prevIdx >= 0) onSelectWork(worksList[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = getAdjacentWorkIndex(
      currentIndex >= 0 ? currentIndex : 0,
      worksList.length,
      'next'
    );
    if (nextIdx >= 0) onSelectWork(worksList[nextIdx]);
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-dialog-title"
      className="fixed inset-0 z-50 bg-[#141413]/96 text-[#FAF8F5] flex flex-col justify-between overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-[#FAF8F5]/15">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#E2DDD5] tabular-nums">
          <span>
            Photograph {work.frameNumber} ({currentIndex + 1} of{' '}
            {worksList.length})
          </span>
          <span aria-hidden="true">·</span>
          <span>{work.couple}</span>
          <span aria-hidden="true">·</span>
          <span className="hidden sm:inline">
            {work.shortLocation ?? work.location}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onToggleSave(work.id)}
            aria-pressed={isSaved}
            className={`min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5] ${
              isSaved
                ? 'bg-[#FAF8F5] text-[#141413] border-[#FAF8F5]'
                : 'bg-transparent text-[#FAF8F5] border-[#FAF8F5]/30 hover:border-[#FAF8F5]'
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#141413]' : ''}`}
            />
            <span>{isSaved ? 'Saved' : 'Save Photograph'}</span>
          </button>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close photograph viewer"
            className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 text-xs font-medium bg-[#FAF8F5]/10 hover:bg-[#FAF8F5]/20 text-[#FAF8F5] border border-[#FAF8F5]/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5]"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="editorial-container py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Full-Resolution Image Container with Prev/Next Controls */}
        <div className="lg:col-span-8 relative flex items-center justify-center">
          <div className="w-full h-[54vh] sm:h-[66vh] relative overflow-hidden bg-[#0D0D0C] border border-[#FAF8F5]/15">
            <EditorialImage
              src={work.image}
              alt={`${work.couple} — ${work.categoryLabel} in ${work.shortLocation ?? work.location}`}
              sizes="(max-width: 1024px) 100vw, 900px"
              containerClassName="w-full h-full relative"
              className="w-full h-full object-contain"
              frameLabel={work.frameNumber}
              subtitle={work.shortLocation ?? work.location}
              priority
            />
          </div>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photograph"
            className="absolute left-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] bg-[#141413]/85 hover:bg-[#141413] text-[#FAF8F5] border border-[#FAF8F5]/30 inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photograph"
            className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] bg-[#141413]/85 hover:bg-[#141413] text-[#FAF8F5] border border-[#FAF8F5]/30 inline-flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Editorial Details & Optional Archival Metadata */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <p className="text-xs font-mono text-[#DDE3D7] mb-2">
              {work.categoryLabel} · {work.shortLocation ?? work.location}
            </p>

            <h2
              id="lightbox-dialog-title"
              className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-tight mb-2"
            >
              {work.couple}
            </h2>

            <p className="text-sm text-[#E2DDD5] mb-5">{work.title}</p>

            <blockquote className="text-sm text-[#E2DDD5] leading-relaxed mb-6 font-serif italic border-l-2 border-[#DDE3D7]/40 pl-4">
              “{work.caption}”
            </blockquote>

            <div className="border-t border-b border-[#FAF8F5]/15 py-4 space-y-2 text-xs">
              <div className="flex justify-between gap-4">
                <span className="text-[#CFC8BC]">Celebration</span>
                <span className="text-[#FAF8F5] font-medium text-right">
                  {work.categoryLabel}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#CFC8BC]">Location</span>
                <span className="text-[#FAF8F5] text-right">
                  {work.location}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#CFC8BC]">Camera &amp; Team</span>
                <span className="text-[#FAF8F5] font-mono text-right">
                  {formatCaptureCredit(work)}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-[#CFC8BC]">Collaborator</span>
                <span className="text-[#FAF8F5] font-mono text-right">
                  {work.collaboratorHandle}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenStory(work.storyId);
              }}
              className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium bg-[#FAF8F5] text-[#141413] hover:bg-[#DDE3D7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read {work.couple} Story</span>
            </button>

            <a
              href={work.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#E2DDD5] border border-[#FAF8F5]/25 hover:text-[#FAF8F5] hover:border-[#FAF8F5]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5]"
            >
              <span>View Source Post on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="border-t border-[#FAF8F5]/15 px-5 sm:px-8 py-3 bg-[#0D0D0C]">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          {worksList.map((item) => {
            const active = item.id === work.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectWork(item)}
                aria-label={`View photograph ${item.frameNumber}: ${item.couple}`}
                aria-current={active ? 'true' : undefined}
                className={`relative w-16 h-12 overflow-hidden shrink-0 border transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FAF8F5] ${
                  active
                    ? 'border-[#FAF8F5] opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-85'
                }`}
              >
                <EditorialImage
                  src={item.image}
                  alt={item.title}
                  focalPosition={item.focalPosition ?? '50% 24%'}
                  sizes="64px"
                  containerClassName="w-full h-full relative"
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
