'use client';

import React, { useState, useCallback, useRef } from 'react';
import { GALLERY_WORKS, COUPLE_STORIES } from '@/lib/portfolio-data';
import type { GalleryWork } from '@/lib/portfolio-logic';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { CoupleMonographs } from '@/components/CoupleMonographs';
import { AtelierEthosSection } from '@/components/AtelierEthosSection';
import { CommissionSection } from '@/components/CommissionSection';
import { Footer } from '@/components/Footer';
import { LightboxModal } from '@/components/LightboxModal';

export default function HomePage() {
  const [savedIds, setSavedIds] = useState<string[]>([
    'ig-DEmsPw9scgm-1',
    'ig-DR8zWcOCBSn-1',
  ]);
  const [activeStoryId, setActiveStoryId] = useState<string>(
    COUPLE_STORIES[0].id
  );
  const [lightboxWork, setLightboxWork] = useState<GalleryWork | null>(null);
  const [lightboxList, setLightboxList] =
    useState<GalleryWork[]>(GALLERY_WORKS);

  const lightboxTriggerRef = useRef<HTMLElement | null>(null);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleToggleSave = useCallback((workId: string) => {
    setSavedIds((prev) =>
      prev.includes(workId)
        ? prev.filter((id) => id !== workId)
        : [...prev, workId]
    );
  }, []);

  const handleOpenLightbox = useCallback(
    (
      work: GalleryWork,
      currentList: GalleryWork[] = GALLERY_WORKS,
      triggerEl?: HTMLElement | null
    ) => {
      lightboxTriggerRef.current =
        triggerEl ?? (document.activeElement as HTMLElement | null);
      setLightboxList(currentList.length > 0 ? currentList : GALLERY_WORKS);
      setLightboxWork(work);
    },
    []
  );

  const handleCloseLightbox = useCallback(() => {
    setLightboxWork(null);
    const triggerEl = lightboxTriggerRef.current;
    if (triggerEl && typeof triggerEl.focus === 'function') {
      window.setTimeout(() => {
        triggerEl.focus();
      }, 10);
    }
  }, []);

  const handleSelectStory = useCallback((storyId: string) => {
    setActiveStoryId(storyId);
    const el = document.getElementById('monographs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const isModalOpen = Boolean(lightboxWork);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141413]">
      <Navbar onNavigate={scrollToSection} inert={isModalOpen} />

      <main inert={isModalOpen || undefined} className="flex-1">
        <HeroSection
          onExplorePortfolio={() => scrollToSection('portfolio')}
          onExploreStories={() => scrollToSection('monographs')}
          onInquire={() => scrollToSection('commission')}
          onOpenLightbox={(work, triggerEl) =>
            handleOpenLightbox(work, GALLERY_WORKS, triggerEl)
          }
        />

        <PortfolioGallery
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
          onOpenLightbox={handleOpenLightbox}
          onSelectStory={handleSelectStory}
        />

        <CoupleMonographs
          activeStoryId={activeStoryId}
          onSelectStory={setActiveStoryId}
          onOpenLightbox={handleOpenLightbox}
        />

        <AtelierEthosSection onOpenLightbox={handleOpenLightbox} />

        <CommissionSection savedIds={savedIds} />
      </main>

      <Footer onNavigate={scrollToSection} inert={isModalOpen} />

      <LightboxModal
        work={lightboxWork}
        worksList={lightboxList}
        savedIds={savedIds}
        onClose={handleCloseLightbox}
        onSelectWork={setLightboxWork}
        onToggleSave={handleToggleSave}
        onOpenStory={handleSelectStory}
      />
    </div>
  );
}
