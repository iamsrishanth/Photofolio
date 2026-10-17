'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/portfolio-data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-[#FAF8F5] text-[#141413] py-12 sm:py-16">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#E6E1DA]">
          <div>
            <div className="font-serif text-3xl text-[#141413] tracking-tight mb-2">
              {STUDIO_INFO.name}
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-md">
              {STUDIO_INFO.tagline} · {STUDIO_INFO.locations}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-[#44403C]">
            <button
              type="button"
              onClick={() => onNavigate('portfolio')}
              className="hover:text-[#141413] hover:underline underline-offset-4 cursor-pointer"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => onNavigate('monographs')}
              className="hover:text-[#141413] hover:underline underline-offset-4 cursor-pointer"
            >
              Monographs
            </button>
            <button
              type="button"
              onClick={() => onNavigate('collections')}
              className="hover:text-[#141413] hover:underline underline-offset-4 cursor-pointer"
            >
              Collections
            </button>
            <button
              type="button"
              onClick={() => onNavigate('commission')}
              className="hover:text-[#141413] hover:underline underline-offset-4 cursor-pointer"
            >
              Inquire
            </button>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#141413] hover:underline underline-offset-4"
            >
              <span>Instagram ({STUDIO_INFO.instagramHandle})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#78716C]">
          <div>
            © {new Date().getFullYear()} {STUDIO_INFO.name} Studio. All rights
            reserved.
          </div>
          <div>
            Editorial Wedding Photography · 35mm &amp; Medium Format Analog Archive
          </div>
        </div>
      </div>
    </footer>
  );
}
