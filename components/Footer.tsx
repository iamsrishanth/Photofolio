'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/portfolio-data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  inert?: boolean;
}

export function Footer({ onNavigate, inert = false }: FooterProps) {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <footer
      inert={inert || undefined}
      className="w-full bg-[#FAF8F5] text-[#141413] py-12 sm:py-16"
    >
      <div className="editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#E2DDD5]">
          <div>
            <div className="font-serif text-3xl text-[#141413] tracking-tight mb-2">
              {STUDIO_INFO.name}
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] max-w-md">
              Wedding and celebration photography across {STUDIO_INFO.locations}.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium text-[#57534E]"
          >
            <a
              href="#portfolio"
              onClick={(e) => handleNavClick(e, 'portfolio')}
              className="min-h-[44px] inline-flex items-center hover:text-[#141413] hover:underline underline-offset-4 editorial-focus"
            >
              Work
            </a>
            <a
              href="#monographs"
              onClick={(e) => handleNavClick(e, 'monographs')}
              className="min-h-[44px] inline-flex items-center hover:text-[#141413] hover:underline underline-offset-4 editorial-focus"
            >
              Stories
            </a>
            <a
              href="#atelier"
              onClick={(e) => handleNavClick(e, 'atelier')}
              className="min-h-[44px] inline-flex items-center hover:text-[#141413] hover:underline underline-offset-4 editorial-focus"
            >
              Our Approach
            </a>
            <a
              href="#commission"
              onClick={(e) => handleNavClick(e, 'commission')}
              className="min-h-[44px] inline-flex items-center hover:text-[#141413] hover:underline underline-offset-4 editorial-focus"
            >
              Inquire
            </a>
            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] inline-flex items-center gap-1 text-[#141413] hover:text-[#53614A] hover:underline underline-offset-4 editorial-focus"
            >
              <span>Instagram ({STUDIO_INFO.instagramHandle})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#57534E]">
          <div>
            © {new Date().getFullYear()} {STUDIO_INFO.name} (
            {STUDIO_INFO.instagramHandle}).
          </div>
          <div>{STUDIO_INFO.filmsHandle}</div>
        </div>
      </div>
    </footer>
  );
}
