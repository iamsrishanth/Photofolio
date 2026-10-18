'use client';

import React, { useState, useCallback } from 'react';
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
    (work: GalleryWork, currentList: GalleryWork[] = GALLERY_WORKS) => {
      setLightboxList(currentList.length > 0 ? currentList : GALLERY_WORKS);
      setLightboxWork(work);
    },
    []
  );

  const handleSelectStory = useCallback((storyId: string) => {
    setActiveStoryId(storyId);
    const el = document.getElementById('monographs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#141413]">
      <Navbar onNavigate={scrollToSection} />

      <main className="flex-1">
        <HeroSection
          onExplorePortfolio={() => scrollToSection('portfolio')}
          onExploreStories={() => scrollToSection('monographs')}
          onOpenLightbox={(work) => handleOpenLightbox(work, GALLERY_WORKS)}
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

      <Footer onNavigate={scrollToSection} />

      <LightboxModal
        work={lightboxWork}
        worksList={lightboxList}
        savedIds={savedIds}
        onClose={() => setLightboxWork(null)}
        onSelectWork={setLightboxWork}
        onToggleSave={handleToggleSave}
        onOpenStory={handleSelectStory}
      />
    </div>
  );
}
