'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { GALLERY_WORKS } from '@/lib/portfolio-data';
import type { GalleryWork } from '@/lib/portfolio-logic';
import { EditorialImage } from './EditorialImage';

interface HeroSectionProps {
  onExplorePortfolio: () => void;
  onExploreStories: () => void;
  onInquire?: () => void;
  onOpenLightbox: (work: GalleryWork, triggerEl?: HTMLElement | null) => void;
}

const HERO_FEATURED_IDS = [
  'ig-DR8zWcOCBSn-1',
  'ig-DFAfTWaMW2c-1',
  'ig-DFSQ_qds4JO-1',
  'ig-DEmsPw9scgm-1',
  'ig-DLbs7Buvlp0-1',
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? '100%' : '-100%',
    opacity: 0.85,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction >= 0 ? '-100%' : '100%',
    opacity: 0.85,
  }),
};

export function HeroSection({
  onExplorePortfolio,
  onInquire,
  onOpenLightbox,
}: HeroSectionProps) {
  const featuredWorks = HERO_FEATURED_IDS.map(
    (id) => GALLERY_WORKS.find((w) => w.id === id) ?? GALLERY_WORKS[0]
  );

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [isTouchOrCoarse, setIsTouchOrCoarse] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mql = window.matchMedia('(pointer: coarse), (max-width: 1023px)');
      setIsTouchOrCoarse(mql.matches);
      const handler = (e: MediaQueryListEvent) => setIsTouchOrCoarse(e.matches);
      mql.addEventListener('change', handler);
      return () => mql.removeEventListener('change', handler);
    }
  }, []);

  const handleNextSlide = useCallback(() => {
    setSlideDirection(1);
    setActiveSlideIndex((prev) => (prev + 1) % featuredWorks.length);
  }, [featuredWorks.length]);

  const handlePrevSlide = useCallback(() => {
    setSlideDirection(-1);
    setActiveSlideIndex(
      (prev) => (prev - 1 + featuredWorks.length) % featuredWorks.length
    );
  }, [featuredWorks.length]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideDirection(1);
      setActiveSlideIndex((prev) => (prev + 1) % featuredWorks.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [activeSlideIndex, featuredWorks.length]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const disableParallax = Boolean(prefersReducedMotion || isTouchOrCoarse);
  const secondaryParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, -20]
  );
  const tertiaryParallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [0, 18]
  );

  const primaryWork = featuredWorks[activeSlideIndex] ?? GALLERY_WORKS[0];
  const supportingWorkOne =
    featuredWorks[(activeSlideIndex + 1) % featuredWorks.length] ??
    GALLERY_WORKS[1];
  const supportingWorkTwo =
    featuredWorks[(activeSlideIndex + 2) % featuredWorks.length] ??
    GALLERY_WORKS[2];

  const slideTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const };

  const handleInquireClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onInquire) {
      e.preventDefault();
      onInquire();
    }
  };

  return (
    <section
      id="top"
      ref={heroRef}
      aria-label="Cover"
      className="w-full bg-[#FAF8F5] text-[#141413] border-b border-[#E2DDD5] py-12 sm:py-16 lg:py-24"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Editorial Cover Typography, Primary Action & Lower Supporting Frame on Desktop */}
          <div className="lg:col-span-5 flex flex-col justify-between lg:min-h-[660px]">
            <div className="pt-2 lg:pt-6">
              <p className="text-xs sm:text-sm tracking-wide text-[#53614A] font-medium mb-4">
                Hyderabad and Beyond
              </p>

              <h1
                className="font-serif text-[2.75rem] sm:text-[3.75rem] lg:text-[4.35rem] leading-[1.03] tracking-tight text-[#141413] mb-5"
                style={{ textWrap: 'balance' }}
              >
                Your story, held in light.
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#57534E] max-w-[44ch] mb-8">
                Wedding and celebration photography by Light of Love.
              </p>

              {/* Main Hero Action & Quieter Inquire Link */}
              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={onExplorePortfolio}
                  className="min-h-[48px] px-7 py-3 bg-[#141413] text-[#FAF8F5] hover:bg-[#53614A] text-sm font-medium transition-colors inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer editorial-focus"
                >
                  <span>View Our Work</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#commission"
                  onClick={handleInquireClick}
                  className="min-h-[48px] px-2 inline-flex items-center text-sm font-medium text-[#141413] underline underline-offset-8 decoration-[#53614A] hover:text-[#53614A] transition-colors whitespace-nowrap shrink-0 editorial-focus"
                >
                  Inquire
                </a>
              </div>
            </div>

            {/* Desktop Lower-Left Supporting Photograph (Kept in clear area away from text) */}
            <motion.div
              style={{ y: tertiaryParallaxY }}
              className="hidden lg:block mt-14 pt-8 border-t border-[#E2DDD5] max-w-[300px]"
            >
              <button
                type="button"
                onClick={(e) => onOpenLightbox(supportingWorkTwo, e.currentTarget)}
                aria-label={`${supportingWorkTwo.couple}, ${supportingWorkTwo.shortLocation ?? supportingWorkTwo.location} — Open photograph`}
                className="w-full text-left group block cursor-pointer editorial-focus"
              >
                <div className="p-2.5 bg-[#FAF8F5] border border-[#E2DDD5] shadow-[0_10px_28px_-14px_rgba(20,20,19,0.16)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE6DF]">
                    <AnimatePresence initial={false} custom={slideDirection}>
                      <motion.div
                        key={supportingWorkTwo.id}
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={slideTransition}
                        className="absolute inset-0 w-full h-full"
                      >
                        <EditorialImage
                          src={supportingWorkTwo.image}
                          alt={`${supportingWorkTwo.couple} — ${supportingWorkTwo.shortLocation ?? supportingWorkTwo.location}`}
                          focalPosition={
                            supportingWorkTwo.focalPosition ?? '50% 24%'
                          }
                          sizes="300px"
                          containerClassName="w-full h-full relative overflow-hidden"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="mt-2.5 flex items-baseline justify-between gap-2 text-xs text-[#57534E]">
                  <span className="font-serif text-sm text-[#141413]">
                    {supportingWorkTwo.couple}
                  </span>
                  <span>
                    {supportingWorkTwo.shortLocation ?? supportingWorkTwo.location}
                  </span>
                </div>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Dominant Portrait + Offset Supporting Frame + Manual Controls */}
          <div className="lg:col-span-7">
            <div className="relative">
              {/* Subtle Muted Sage Editorial Backing Plane on Desktop */}
              <div
                aria-hidden="true"
                className="hidden lg:block absolute -top-5 right-6 w-[76%] h-[84%] bg-[#DDE3D7]/65 border border-[#CFC8BC]/50 pointer-events-none"
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
                {/* Dominant Portrait Frame */}
                <div className="lg:col-span-8">
                  <button
                    type="button"
                    onClick={(e) => onOpenLightbox(primaryWork, e.currentTarget)}
                    aria-label={`Open featured photograph: ${primaryWork.couple}, ${primaryWork.shortLocation ?? primaryWork.location}`}
                    className="w-full text-left group block cursor-pointer editorial-focus"
                  >
                    <div className="p-3 sm:p-4 bg-[#FAF8F5] border border-[#E2DDD5] shadow-[0_18px_40px_-18px_rgba(20,20,19,0.18)]">
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EBE6DF]">
                        {hasMounted && !prefersReducedMotion ? (
                          <AnimatePresence initial={false} custom={slideDirection}>
                            <motion.div
                              key={primaryWork.id}
                              custom={slideDirection}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={slideTransition}
                              className="absolute inset-0 w-full h-full"
                            >
                              <EditorialImage
                                src={primaryWork.image}
                                alt={`${primaryWork.couple} — ${primaryWork.categoryLabel} in ${primaryWork.shortLocation ?? primaryWork.location}`}
                                focalPosition={
                                  primaryWork.focalPosition ?? '50% 24%'
                                }
                                sizes="(max-width: 1024px) 100vw, 560px"
                                priority
                                containerClassName="w-full h-full relative overflow-hidden"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <div className="absolute inset-0 w-full h-full">
                            <EditorialImage
                              src={primaryWork.image}
                              alt={`${primaryWork.couple} — ${primaryWork.categoryLabel} in ${primaryWork.shortLocation ?? primaryWork.location}`}
                              focalPosition={
                                primaryWork.focalPosition ?? '50% 24%'
                              }
                              sizes="(max-width: 1024px) 100vw, 560px"
                              priority
                              containerClassName="w-full h-full relative overflow-hidden"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Desktop Right Supporting Portrait (Adjacent column — zero face overlap) */}
                <motion.div
                  style={{ y: secondaryParallaxY }}
                  className="hidden lg:block lg:col-span-4 pb-6"
                >
                  <button
                    type="button"
                    onClick={(e) =>
                      onOpenLightbox(supportingWorkOne, e.currentTarget)
                    }
                    aria-label={`${supportingWorkOne.couple}, ${supportingWorkOne.shortLocation ?? supportingWorkOne.location} — Open photograph`}
                    className="w-full text-left group block cursor-pointer editorial-focus"
                  >
                    <div className="p-2.5 bg-[#FAF8F5] border border-[#E2DDD5] shadow-[0_12px_30px_-14px_rgba(20,20,19,0.16)]">
                      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EBE6DF]">
                        <AnimatePresence initial={false} custom={slideDirection}>
                          <motion.div
                            key={supportingWorkOne.id}
                            custom={slideDirection}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={slideTransition}
                            className="absolute inset-0 w-full h-full"
                          >
                            <EditorialImage
                              src={supportingWorkOne.image}
                              alt={`${supportingWorkOne.couple} — ${supportingWorkOne.shortLocation ?? supportingWorkOne.location}`}
                              focalPosition={
                                supportingWorkOne.focalPosition ?? '50% 22%'
                              }
                              sizes="260px"
                              containerClassName="w-full h-full relative overflow-hidden"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                    <div className="mt-2.5 text-xs text-[#57534E]">
                      <div className="font-serif text-base text-[#141413]">
                        {supportingWorkOne.couple}
                      </div>
                      <div>
                        {supportingWorkOne.shortLocation ??
                          supportingWorkOne.location}
                      </div>
                    </div>
                  </button>
                </motion.div>
              </div>

              {/* Manual Previous / Next Controls & Position Indicator */}
              <div className="mt-5 pt-4 border-t border-[#E2DDD5] flex flex-wrap items-center justify-between gap-4">
                <div
                  aria-live="polite"
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className="font-mono text-xs text-[#57534E] tabular-nums">
                    0{activeSlideIndex + 1} / 0{featuredWorks.length}
                  </span>
                  <span className="font-serif text-xl sm:text-2xl text-[#141413]">
                    {primaryWork.couple}
                  </span>
                  <span className="text-xs sm:text-sm text-[#57534E]">
                    · {primaryWork.categoryLabel} ·{' '}
                    {primaryWork.shortLocation ?? primaryWork.location}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    aria-label="Previous featured photograph"
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-[#CFC8BC] bg-[#FAF8F5] text-[#141413] hover:bg-[#DDE3D7]/60 transition-colors cursor-pointer editorial-focus"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    aria-label="Next featured photograph"
                    className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-[#CFC8BC] bg-[#FAF8F5] text-[#141413] hover:bg-[#DDE3D7]/60 transition-colors cursor-pointer editorial-focus"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Supporting Imagery Sequence (Straightforward sequence below without overlap) */}
              <div className="mt-8 grid grid-cols-2 gap-4 lg:hidden">
                {[supportingWorkOne, supportingWorkTwo].map((work, idx) => (
                  <button
                    key={`mobile-slot-${idx}`}
                    type="button"
                    onClick={(e) => onOpenLightbox(work, e.currentTarget)}
                    aria-label={`${work.couple}, ${work.shortLocation ?? work.location} — Open photograph`}
                    className="text-left group block cursor-pointer editorial-focus"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden border border-[#E2DDD5] bg-[#EBE6DF] mb-2">
                      <AnimatePresence initial={false} custom={slideDirection}>
                        <motion.div
                          key={work.id}
                          custom={slideDirection}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={slideTransition}
                          className="absolute inset-0 w-full h-full"
                        >
                          <EditorialImage
                            src={work.image}
                            alt={`${work.couple} — ${work.shortLocation ?? work.location}`}
                            focalPosition={work.focalPosition ?? '50% 24%'}
                            sizes="48vw"
                            containerClassName="w-full h-full relative overflow-hidden"
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <div className="font-serif text-base text-[#141413] truncate">
                      {work.couple}
                    </div>
                    <div className="text-xs text-[#57534E] truncate">
                      {work.shortLocation ?? work.location}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
