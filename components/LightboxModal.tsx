'use client';

import React, { useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import { STUDIO_INFO } from '@/lib/portfolio-data';
import {
  getAdjacentWorkIndex,
  formatExifSummary,
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
  const currentIndex = work ? worksList.findIndex((w) => w.id === work.id) : -1;

  useEffect(() => {
    if (!work) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && worksList.length > 0) {
        const nextIdx = getAdjacentWorkIndex(
          currentIndex >= 0 ? currentIndex : 0,
          worksList.length,
          'next'
        );
        if (nextIdx >= 0) onSelectWork(worksList[nextIdx]);
      } else if (e.key === 'ArrowLeft' && worksList.length > 0) {
        const prevIdx = getAdjacentWorkIndex(
          currentIndex >= 0 ? currentIndex : 0,
          worksList.length,
          'prev'
        );
        if (prevIdx >= 0) onSelectWork(worksList[prevIdx]);
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
      role="dialog"
      aria-modal="true"
      aria-label={`Fullscreen plate inspection: ${work.title}`}
      className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md text-[#FAF8F5] flex flex-col justify-between overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-stone-300 tabular-nums">
          <span>
            Plate {work.frameNumber} ({currentIndex + 1} of {worksList.length})
          </span>
          <span aria-hidden="true">·</span>
          <span>{work.couple}</span>
          <span aria-hidden="true">·</span>
          <span className="hidden sm:inline">{work.location}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToggleSave(work.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isSaved
                ? 'bg-white text-[#0A0A0A] border-white'
                : 'bg-transparent text-white border-white/25 hover:border-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#0A0A0A]' : ''}`} />
            <span>{isSaved ? 'Saved in Moodboard' : 'Save to Moodboard'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close fullscreen lightbox"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="max-w-[1360px] w-full mx-auto px-5 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
        {/* Image Container with Prev/Next Controls */}
        <div className="lg:col-span-8 relative flex items-center justify-center">
          <div className="w-full max-h-[68vh] aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#141413] border border-white/10">
            <EditorialImage
              src={work.image}
              alt={`${work.title} — ${work.couple}`}
              containerClassName="w-full h-full flex items-center justify-center bg-[#141413]"
              className="w-full h-full object-contain"
              frameLabel={work.frameNumber}
              subtitle={work.location}
              priority
            />
          </div>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous plate"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next plate"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 inline-flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Monograph Plate Metadata & Narrative */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-400 font-mono tabular-nums mb-2">
              <span>{work.date}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{work.category}</span>
              <span aria-hidden="true">·</span>
              <span>{work.country}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight mb-3">
              {work.title}
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed mb-6">
              {work.caption}
            </p>

            {/* Technical Darkroom Notes */}
            <div className="border-t border-b border-white/15 py-4 space-y-2.5 text-xs">
              <div className="flex justify-between gap-4">
                <span className="text-stone-400">Couple</span>
                <span className="text-white font-medium">{work.couple}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-stone-400">Location</span>
                <span className="text-white">{work.location}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-stone-400">Camera &amp; Lens</span>
                <span className="text-white font-mono">
                  {work.camera} · {work.lens}
                </span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-stone-400">Film / Emulsion</span>
                <span className="text-white font-mono">{work.filmStock}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-stone-400">Exposure</span>
                <span className="text-white font-mono tabular-nums">
                  {work.aperture} · {work.shutter} · ISO {work.iso}
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
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium bg-white text-[#0A0A0A] rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Open Full {work.couple} Monograph</span>
            </button>

            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-300 border border-white/20 rounded-lg hover:text-white hover:border-white/40 transition-colors"
            >
              <span>
                View on Instagram ({work.instagramHandle} · {work.instagramCode})
              </span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Contact Sheet Filmstrip */}
      <div className="border-t border-white/10 px-5 sm:px-8 py-3 bg-[#050505]">
        <div className="max-w-[1360px] mx-auto flex items-center gap-2.5 overflow-x-auto no-scrollbar">
          {worksList.map((item) => {
            const active = item.id === work.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectWork(item)}
                aria-label={`Select plate ${item.frameNumber}: ${item.title}`}
                className={`relative w-16 h-12 rounded-md overflow-hidden shrink-0 border transition-opacity cursor-pointer ${
                  active
                    ? 'border-white opacity-100'
                    : 'border-transparent opacity-45 hover:opacity-80'
                }`}
              >
                <EditorialImage
                  src={item.image}
                  alt={item.title}
                  containerClassName="w-full h-full"
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
