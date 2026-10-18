'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO, GALLERY_WORKS } from '@/lib/portfolio-data';
import { formatCaptureCredit, type GalleryWork } from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface AtelierEthosSectionProps {
  onOpenLightbox: (
    work: GalleryWork,
    list: GalleryWork[],
    triggerEl?: HTMLElement | null
  ) => void;
}

export function AtelierEthosSection({
  onOpenLightbox,
}: AtelierEthosSectionProps) {
  const approachWork =
    GALLERY_WORKS.find((w) => w.id === 'ig-DR8zWcOCBSn-3') ?? GALLERY_WORKS[0];

  return (
    <section
      id="atelier"
      aria-labelledby="approach-heading"
      className="scroll-mt-20 w-full py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] text-[#141413] border-b border-[#E2DDD5]"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Substantial Photographic Composition */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -bottom-4 -left-4 w-full h-full bg-[#DDE3D7]/60 border border-[#CFC8BC]/50 pointer-events-none"
              />
              <div className="relative z-10 bg-[#FAF8F5] p-3 sm:p-4 border border-[#E2DDD5]">
                <button
                  type="button"
                  onClick={(e) =>
                    onOpenLightbox(approachWork, GALLERY_WORKS, e.currentTarget)
                  }
                  aria-label={`Open photograph: ${approachWork.couple} in ${approachWork.shortLocation ?? approachWork.location}`}
                  className="w-full text-left group block cursor-pointer editorial-focus"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EBE6DF]">
                    <EditorialImage
                      src={approachWork.image}
                      alt={`${approachWork.couple} — ${approachWork.categoryLabel} in ${approachWork.shortLocation ?? approachWork.location}`}
                      focalPosition={approachWork.focalPosition ?? '50% 22%'}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      containerClassName="w-full h-full relative overflow-hidden"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      frameLabel={approachWork.frameNumber}
                      subtitle={
                        approachWork.shortLocation ?? approachWork.location
                      }
                    />
                  </div>
                </button>

                <div className="pt-3 flex items-baseline justify-between gap-4 text-xs text-[#57534E]">
                  <span>
                    {approachWork.couple} ·{' '}
                    {approachWork.shortLocation ?? approachWork.location}
                  </span>
                  <span className="font-mono tabular-nums">
                    Frame {approachWork.frameNumber}
                  </span>
                </div>

                <details className="mt-2 pt-2 border-t border-[#E2DDD5] text-xs text-[#57534E]">
                  <summary className="min-h-[36px] inline-flex items-center cursor-pointer select-none hover:text-[#141413] editorial-focus">
                    Photograph details
                  </summary>
                  <div className="pt-1.5 font-mono text-[11px]">
                    {formatCaptureCredit(approachWork)}
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Right Column: Concise Editorial Introduction & Genuine Instagram Link */}
          <div className="lg:col-span-6 space-y-6">
            <p className="font-mono text-xs text-[#53614A]">03 / Our Approach</p>

            <h2
              id="approach-heading"
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight leading-[1.08]"
              style={{ textWrap: 'balance' }}
            >
              Quiet observation for weddings and family celebrations.
            </h2>

            <div className="space-y-4 text-base sm:text-[17px] text-[#57534E] leading-relaxed max-w-[56ch]">
              <p>
                <strong className="font-medium text-[#141413]">
                  {STUDIO_INFO.name}
                </strong>{' '}
                documents weddings and milestone celebrations with attention to
                natural light, ceremonial detail, and unhurried family moments.
              </p>
              <p>
                Our work spans Christian weddings, couple portraits, Haldi
                celebrations, bridal portraiture, and saree ceremonies across{' '}
                <span className="text-[#141413]">Hyderabad and Beyond</span>.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E2DDD5] flex flex-wrap items-center gap-6">
              <a
                href={STUDIO_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-6 py-3 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#FAF8F5] bg-[#141413] hover:bg-[#53614A] transition-colors whitespace-nowrap shrink-0 editorial-focus"
              >
                <span>Follow {STUDIO_INFO.instagramHandle} on Instagram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="text-xs text-[#57534E]">
                {STUDIO_INFO.filmsHandle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
