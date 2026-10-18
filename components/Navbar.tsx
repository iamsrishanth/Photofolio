'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/portfolio-data';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E1DA]">
      <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-5 sm:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          className="font-serif text-2xl font-normal tracking-tight text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413]"
        >
          {STUDIO_INFO.name}
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57534E]"
        >
          <a
            href="#portfolio"
            onClick={(e) => handleLinkClick(e, 'portfolio')}
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Gallery (23)
          </a>
          <a
            href="#monographs"
            onClick={(e) => handleLinkClick(e, 'monographs')}
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Carousels (5)
          </a>
          <a
            href="#atelier"
            onClick={(e) => handleLinkClick(e, 'atelier')}
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            @light_of_love__
          </a>
          <a
            href="#collections"
            onClick={(e) => handleLinkClick(e, 'collections')}
            className="hover:text-[#141413] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            #WEDDING &amp; EVENTS
          </a>
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu button on narrow screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={(e) => handleLinkClick(e, 'commission')}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-[#FAF8F5] bg-[#141413] rounded-lg hover:bg-[#2C2A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#141413]"
          >
            Inquire Now
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#DCD6CD] text-[#141413] hover:bg-[#EFECE6] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-b border-[#E6E1DA] bg-[#FAF8F5] px-5 py-4 space-y-2"
        >
          <a
            href="#portfolio"
            onClick={(e) => handleLinkClick(e, 'portfolio')}
            className="block py-2.5 text-base font-medium text-[#141413] border-b border-[#EFECE6]"
          >
            Gallery Archive (23 Frames)
          </a>
          <a
            href="#monographs"
            onClick={(e) => handleLinkClick(e, 'monographs')}
            className="block py-2.5 text-base font-medium text-[#141413] border-b border-[#EFECE6]"
          >
            Instagram Carousels (5 Series)
          </a>
          <a
            href="#atelier"
            onClick={(e) => handleLinkClick(e, 'atelier')}
            className="block py-2.5 text-base font-medium text-[#141413] border-b border-[#EFECE6]"
          >
            Profile &amp; @light_of_love__
          </a>
          <a
            href="#collections"
            onClick={(e) => handleLinkClick(e, 'collections')}
            className="block py-2.5 text-base font-medium text-[#141413]"
          >
            #WEDDING &amp; EVENTS Inquiry
          </a>
        </nav>
      )}
    </header>
  );
}
