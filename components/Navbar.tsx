'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_INFO } from '@/lib/portfolio-data';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  inert?: boolean;
}

const NAV_ITEMS = [
  { label: 'Work', id: 'portfolio' },
  { label: 'Stories', id: 'monographs' },
  { label: 'Our Approach', id: 'atelier' },
] as const;

export function Navbar({ onNavigate, inert = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      inert={inert || undefined}
      aria-hidden={inert || undefined}
      className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E2DDD5]"
    >
      <div className="editorial-container flex items-center justify-between gap-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          className="font-serif text-2xl sm:text-[26px] font-normal tracking-tight text-[#141413] whitespace-nowrap shrink-0 py-2 editorial-focus"
        >
          {STUDIO_INFO.name}
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 text-sm font-normal text-[#57534E]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="min-h-[44px] inline-flex items-center hover:text-[#141413] hover:underline underline-offset-8 decoration-[#53614A] transition-colors whitespace-nowrap shrink-0 editorial-focus"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu toggle on narrow viewports) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#commission"
            onClick={(e) => handleLinkClick(e, 'commission')}
            className="min-h-[44px] px-5 py-2.5 inline-flex items-center justify-center text-xs sm:text-sm font-medium text-[#FAF8F5] bg-[#141413] hover:bg-[#53614A] transition-colors whitespace-nowrap shrink-0 cursor-pointer editorial-focus"
          >
            Inquire
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-primary-nav"
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="md:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-[#CFC8BC] text-[#141413] hover:bg-[#DDE3D7]/50 transition-colors cursor-pointer editorial-focus"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-primary-nav"
          aria-label="Mobile"
          className="md:hidden border-b border-[#E2DDD5] bg-[#FAF8F5] px-5 py-3"
        >
          <ul className="divide-y divide-[#E2DDD5]">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="min-h-[48px] flex items-center justify-between text-base font-normal text-[#141413] hover:text-[#53614A] editorial-focus"
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#commission"
                onClick={(e) => handleLinkClick(e, 'commission')}
                className="min-h-[48px] flex items-center justify-between text-base font-medium text-[#53614A] editorial-focus"
              >
                <span>Inquire</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
