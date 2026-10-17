'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO, GALLERY_WORKS } from '@/lib/portfolio-data';
import type { GalleryWork } from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface AtelierEthosSectionProps {
  onOpenLightbox: (work: GalleryWork, list: GalleryWork[]) => void;
}

export function AtelierEthosSection({ onOpenLightbox }: AtelierEthosSectionProps) {
  const instagramStrip = GALLERY_WORKS.slice(0, 6);

  return (
    <section
      id="atelier"
      className="scroll-mt-20 w-full py-16 sm:py-24 bg-[#FAF8F5] text-[#141413] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs text-[#57534E] mb-3">
              <span>03. Studio Philosophy &amp; Craft</span>
              <span aria-hidden="true">·</span>
              <span>Analog &amp; Digital Hybrid</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              The Quiet Art of Observational Light
            </h2>
            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed mb-6">
              At Light of Love, we approach every wedding not as a production to be
              directed, but as an intimate architectural and emotional landscape waiting
              to be observed. By pairing silent digital Leica bodies with medium-format
              120 and 35mm film, we preserve both the grand scale of your setting and the
              fleeting, unguarded stillness between vows.
            </p>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-[#141413] border border-[#141413] rounded-lg hover:bg-[#141413] hover:text-[#FAF8F5] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Follow Journal on Instagram ({STUDIO_INFO.instagramHandle})</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E6E1DA]">
              <div className="font-mono text-xs text-[#78716C] tabular-nums mb-2">
                01. Medium Format &amp; 35mm
              </div>
              <h3 className="font-serif text-2xl text-[#141413] mb-2">
                Tactile Film Grain
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                Every commission includes hand-metered Kodak Portra and Ilford silver
                gelatin film, developed and scanned for organic highlight roll-off that
                digital sensors cannot replicate.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E6E1DA]">
              <div className="font-mono text-xs text-[#78716C] tabular-nums mb-2">
                02. Unscripted Presence
              </div>
              <h3 className="font-serif text-2xl text-[#141413] mb-2">
                Zero Forced Posing
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                We never interrupt a toast or stage repetitive prompts. Instead, we guide
                you into flattering architectural light and let genuine conversation
                unfold naturally.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E6E1DA]">
              <div className="font-mono text-xs text-[#78716C] tabular-nums mb-2">
                03. Archival Editions
              </div>
              <h3 className="font-serif text-2xl text-[#141413] mb-2">
                Museum Print Craft
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                Beyond your digital monograph, we design linen-bound layflat books printed
                on archival cotton rag paper meant to be held fifty years from today.
              </p>
            </div>
          </div>
        </div>

        {/* Curated Instagram @light_of_love__ Contact Sheet Strip */}
        <div className="pt-10 border-t border-[#E6E1DA]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <span className="font-medium text-[#141413]">
                Live Contact Sheet · {STUDIO_INFO.instagramHandle}
              </span>
              <span aria-hidden="true">·</span>
              <span>Click any frame to open darkroom inspection</span>
            </div>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[#141413] underline underline-offset-4 hover:text-[#57534E]"
            >
              instagram.com/light_of_love__ →
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {instagramStrip.map((work) => (
              <button
                key={work.id}
                type="button"
                onClick={() => onOpenLightbox(work, GALLERY_WORKS)}
                className="group text-left cursor-pointer"
              >
                <div className="aspect-square rounded-xl overflow-hidden border border-[#E6E1DA] mb-2">
                  <EditorialImage
                    src={work.image}
                    alt={`${work.title} on Instagram @light_of_love__`}
                    containerClassName="w-full h-full relative overflow-hidden"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#57534E] tabular-nums">
                  <span>{work.instagramCode}</span>
                  <span>♥ {work.instagramLikes}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
