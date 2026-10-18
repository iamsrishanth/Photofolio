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
  return (
    <section
      id="atelier"
      className="scroll-mt-20 w-full py-16 sm:py-24 bg-[#FAF8F5] text-[#141413] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 text-xs text-[#57534E] mb-4">
              <img
                src={STUDIO_INFO.avatarImage}
                alt={STUDIO_INFO.instagramHandle}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full border border-[#D6D0C6] object-cover"
              />
              <span>03. {STUDIO_INFO.instagramHandle}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{STUDIO_INFO.badgeText}</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              {STUDIO_INFO.name} · {STUDIO_INFO.filmsHandle}
            </h2>
            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed mb-6">
              With <strong className="text-[#141413]">{STUDIO_INFO.postsCount} posts</strong> and{' '}
              <strong className="text-[#141413]">{STUDIO_INFO.followersCount} followers</strong> on
              Instagram, <strong className="text-[#141413]">{STUDIO_INFO.instagramHandle}</strong>{' '}
              documents Christian weddings, bridal &amp; groom portraits, Haldi celebrations,
              and saree ceremonies across{' '}
              <span className="text-[#141413] font-medium">
                Hyderabad, Telangana, Mallika Gardens (Shamshabad), Gandipet, and Nellore City
              </span>
              .
            </p>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-medium text-[#141413] border border-[#141413] rounded-lg hover:bg-[#141413] hover:text-[#FAF8F5] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Visit {STUDIO_INFO.instagramHandle} on Instagram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E6E1DA]">
              <div className="font-mono text-xs text-[#78716C] tabular-nums mb-2">
                01. @nikonindiaofficial Z 7 ii
              </div>
              <h3 className="font-serif text-2xl text-[#141413] mb-2">
                Nikon Z 7 II Craft
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                Captured on @nikonindiaofficial Z 7 ii &amp; @nikonindiaofficial by
                @light_of_love__ Films — featured in Amulya &amp; Yash, Haldi celebrations of
                Meghana, Abhishikth &amp; Deepthi, and Aaniya’s saree ceremony.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E6E1DA]">
              <div className="font-mono text-xs text-[#78716C] tabular-nums mb-2">
                02. @sonyalphain
              </div>
              <h3 className="font-serif text-2xl text-[#141413] mb-2">
                Sony Alpha Cinema
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                Captured on @sonyalphain by @light_of_love__ Films — featured in Anjali &amp;
                Ashok’s bridal &amp; wedding story in Nellore City (“Her smile tells a story of
                love, grace, and a brand-new beginning 💚”).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3EFEA] border border-[#E6E1DA]">
              <div className="font-mono text-xs text-[#78716C] tabular-nums mb-2">
                03. Collaborations &amp; Venues
              </div>
              <h3 className="font-serif text-2xl text-[#141413] mb-2">
                Hyderabad &amp; Beyond
              </h3>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed">
                Documenting celebrations across Hyderabad, Telangana, Mallika Gardens
                (Shamshabad), Gandipet, and Nellore City alongside collaborators
                @anlabel_by_anjana, @mende_deepthi, and @geetuu_0612.
              </p>
            </div>
          </div>
        </div>

        {/* Complete 23-Frame Contact Sheet Strip from @light_of_love__ */}
        <div className="pt-10 border-t border-[#E6E1DA]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <span className="font-medium text-[#141413]">
                Complete 23-Frame Instagram Contact Sheet · {STUDIO_INFO.instagramHandle}
              </span>
              <span aria-hidden="true">·</span>
              <span>Click any photograph to inspect full resolution (1440px)</span>
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

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {GALLERY_WORKS.map((work) => (
              <button
                key={work.id}
                type="button"
                onClick={() => onOpenLightbox(work, GALLERY_WORKS)}
                aria-label={`Inspect Frame ${work.frameNumber}: ${work.title}`}
                className="group text-left cursor-pointer"
              >
                <div className="aspect-square rounded-xl overflow-hidden border border-[#E6E1DA] mb-1.5">
                  <EditorialImage
                    src={work.image}
                    alt={`${work.title} on Instagram @light_of_love__`}
                    containerClassName="w-full h-full relative overflow-hidden"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-[#57534E] tabular-nums">
                  <span>#{work.frameNumber}</span>
                  <span className="truncate">/p/{work.postShortcode}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
