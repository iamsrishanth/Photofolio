'use client';

import React, { useState } from 'react';
import { Check, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import {
  EVENT_COVERAGE_OPTIONS,
  GALLERY_WORKS,
  STUDIO_INFO,
} from '@/lib/portfolio-data';
import {
  summarizeSelectedCelebrations,
  validateInquiryForm,
  type InquiryFormInput,
} from '@/lib/portfolio-logic';

interface CommissionSectionProps {
  savedIds: string[];
}

interface SubmittedInquiry extends InquiryFormInput {
  submittedAt: string;
  selectedCelebrationNames: string[];
  moodboardFrames: string[];
}

export function CommissionSection({ savedIds }: CommissionSectionProps) {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    'christian-wedding',
    'couple-portraits',
  ]);

  const [coupleNames, setCoupleNames] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<
    Partial<Record<keyof InquiryFormInput, string>>
  >({});
  const [submittedInquiry, setSubmittedInquiry] =
    useState<SubmittedInquiry | null>(null);

  const summary = summarizeSelectedCelebrations({
    selectedEventIds: selectedEvents,
    availableEvents: EVENT_COVERAGE_OPTIONS,
    savedWorkIds: savedIds,
    allWorks: GALLERY_WORKS,
  });

  const handleToggleCelebration = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formPayload: InquiryFormInput = {
      coupleNames,
      contactInfo,
      eventDate,
      venueLocation,
      selectedEvents,
      notes,
    };

    const validation = validateInquiryForm(formPayload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});

    setSubmittedInquiry({
      ...formPayload,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      selectedCelebrationNames: summary.selectedNames,
      moodboardFrames: summary.savedFramesSummary,
    });
  };

  return (
    <section
      id="collections"
      className="scroll-mt-20 w-full py-16 sm:py-24 bg-[#F3EFEA] text-[#141413] border-b border-[#E6E1DA]"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#57534E] font-mono mb-3">
              <span>04. #WEDDING &amp; EVENTS</span>
              <span aria-hidden="true">·</span>
              <span>{STUDIO_INFO.filmsHandle}</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Celebrations Documented on {STUDIO_INFO.instagramHandle}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#44403C] max-w-md leading-relaxed">
            {STUDIO_INFO.ctaNotice} Select the celebration categories featured on{' '}
            {STUDIO_INFO.instagramHandle} and attach your saved frames to inquire.
          </p>
        </div>

        {/* 5 Authentic Celebration Coverage Cards from @light_of_love__ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {EVENT_COVERAGE_OPTIONS.map((option) => {
            const isSelected = selectedEvents.includes(option.id);
            return (
              <div
                key={option.id}
                className={`p-6 sm:p-7 rounded-2xl border flex flex-col justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#141413] text-[#FAF8F5] border-[#141413]'
                    : 'bg-[#FAF8F5] text-[#141413] border-[#D6D0C6]'
                }`}
              >
                <div>
                  <div
                    className={`flex items-center justify-between text-xs font-mono tabular-nums mb-3 ${
                      isSelected ? 'text-stone-400' : 'text-[#78716C]'
                    }`}
                  >
                    <span>Series {option.number}</span>
                    <span>Post /p/{option.postShortcode}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-2">
                    {option.name}
                  </h3>

                  <div
                    className={`text-xs font-mono mb-4 ${
                      isSelected ? 'text-stone-300' : 'text-[#57534E]'
                    }`}
                  >
                    {option.featuredCouple} · {option.featuredLocation}
                  </div>

                  <div className="pb-5 mb-5 border-b border-current/15 flex items-center justify-between text-xs font-mono tabular-nums">
                    <span>Captured on {option.capturedOn}</span>
                    <span>{option.instagramTag}</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-xs sm:text-sm">
                    {option.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isSelected ? 'text-stone-300' : 'text-[#141413]'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleCelebration(option.id)}
                  aria-pressed={isSelected}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF8F5] text-[#141413]'
                      : 'bg-[#141413] text-[#FAF8F5] hover:bg-[#2C2A28]'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>
                    {isSelected
                      ? `Included: ${option.name}`
                      : `Include ${option.name}`}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Celebration Selector Summary + Inquiry Form Split */}
        <div
          id="commission"
          className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-8 border-t border-[#D6D0C6]"
        >
          {/* Left Column: Selected Instagram Series & Camera Summary */}
          <div className="lg:col-span-5 space-y-6 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#D6D0C6]">
            <div>
              <div className="text-xs text-[#57534E] font-mono mb-1">
                {STUDIO_INFO.instagramHandle} · {STUDIO_INFO.badgeText}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#141413]">
                Selected Celebration Brief
              </h3>
            </div>

            {errors.selectedEvents && (
              <p
                role="alert"
                className="text-xs text-red-700 flex items-center gap-1.5 bg-red-50 p-3 rounded-lg border border-red-200"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.selectedEvents}</span>
              </p>
            )}

            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-[#141413]">
                Toggle Celebrations from @light_of_love__
              </div>
              {EVENT_COVERAGE_OPTIONS.map((opt) => {
                const checked = selectedEvents.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`flex items-start justify-between gap-3 p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      checked
                        ? 'bg-[#EFECE6] border-[#141413]'
                        : 'bg-white border-[#E6E1DA] hover:border-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggleCelebration(opt.id)}
                        className="mt-1 accent-[#141413]"
                      />
                      <div>
                        <div className="text-xs font-medium text-[#141413]">
                          {opt.name}
                        </div>
                        <div className="text-[11px] text-[#57534E] font-mono mt-0.5">
                          {opt.featuredCouple} · {opt.featuredLocation}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] font-medium text-[#141413] tabular-nums shrink-0">
                      /p/{opt.postShortcode}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Tabular Summary Breakdown of Selected Instagram Series */}
            <div className="pt-4 border-t border-[#D6D0C6] space-y-2.5 text-xs">
              <div className="flex justify-between text-[#57534E]">
                <span>Selected Celebrations</span>
                <span
                  data-testid="selected-celebration-count"
                  className="font-mono font-semibold text-[#141413] tabular-nums"
                >
                  {summary.selectedCount} Series
                </span>
              </div>
              <div className="flex justify-between gap-4 text-[#57534E]">
                <span>Credited Camera Systems</span>
                <span className="font-mono text-right text-[#141413]">
                  {summary.camerasUsed.length > 0
                    ? summary.camerasUsed.join(' · ')
                    : 'None selected'}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E6E1DA] flex items-center justify-between">
                <span className="text-[#57534E]">Saved Moodboard Frames</span>
                <span className="font-mono font-semibold text-[#141413] tabular-nums">
                  {savedIds.length} Saved
                </span>
              </div>
            </div>

            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg border border-[#D6D0C6] text-xs font-medium text-[#141413] hover:bg-[#EFECE6] inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Visit {STUDIO_INFO.instagramHandle} on Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Right Column: Booking Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#D6D0C6]">
            {submittedInquiry ? (
              <div
                data-testid="inquiry-confirmation"
                className="py-6 space-y-6"
              >
                <div className="flex items-center gap-3 text-[#141413]">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-[#57534E]">
                      {STUDIO_INFO.name} ({STUDIO_INFO.instagramHandle}) ·{' '}
                      {submittedInquiry.submittedAt}
                    </div>
                    <h3 className="font-serif text-3xl text-[#141413]">
                      Thank You, {submittedInquiry.coupleNames}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#44403C] leading-relaxed">
                  Your wedding &amp; events inquiry for{' '}
                  <strong className="text-[#141413]">
                    {submittedInquiry.venueLocation}
                  </strong>{' '}
                  on{' '}
                  <strong className="text-[#141413]">
                    {submittedInquiry.eventDate}
                  </strong>{' '}
                  has been logged for{' '}
                  <strong className="text-[#141413]">
                    {STUDIO_INFO.name} ({STUDIO_INFO.instagramHandle})
                  </strong>
                  . Confirmation details have been prepared for{' '}
                  <span className="underline">{submittedInquiry.contactInfo}</span>.
                </p>

                <div className="p-5 rounded-xl bg-[#F3EFEA] border border-[#E6E1DA] space-y-2 text-xs font-mono tabular-nums">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#57534E]">Selected Celebrations:</span>
                    <span className="text-[#141413] font-medium text-right">
                      {submittedInquiry.selectedCelebrationNames.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#57534E]">Saved @light_of_love__ Frames:</span>
                    <span className="text-[#141413] text-right">
                      {submittedInquiry.moodboardFrames.length > 0
                        ? submittedInquiry.moodboardFrames.join(', ')
                        : 'None selected'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedInquiry(null)}
                  className="px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#FAF8F5] rounded-lg hover:bg-[#2C2A28] transition-colors cursor-pointer"
                >
                  Edit or Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E6E1DA]">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#141413]">
                      Inquire with {STUDIO_INFO.name}
                    </h3>
                    <p className="text-xs text-[#57534E] font-mono mt-0.5">
                      {STUDIO_INFO.badgeText} · {STUDIO_INFO.filmsHandle} ·{' '}
                      {STUDIO_INFO.instagramHandle}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#57534E] tabular-nums">
                    Moodboard Attached: {savedIds.length} Frame
                    {savedIds.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="couple-names"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      Couple or Client Names *
                    </label>
                    <input
                      id="couple-names"
                      type="text"
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      placeholder="e.g., Abhishikth & Deepthi"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                    {errors.coupleNames && (
                      <p
                        role="alert"
                        className="mt-1.5 text-xs text-red-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.coupleNames}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="couple-contact"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      Email, Phone, or Instagram Handle *
                    </label>
                    <input
                      id="couple-contact"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="e.g., @mende_deepthi or email@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                    {errors.contactInfo && (
                      <p
                        role="alert"
                        className="mt-1.5 text-xs text-red-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.contactInfo}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="event-date"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      Celebration Date *
                    </label>
                    <input
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                    {errors.eventDate && (
                      <p
                        role="alert"
                        className="mt-1.5 text-xs text-red-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.eventDate}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="venue-location"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      Event Location *
                    </label>
                    <input
                      id="venue-location"
                      type="text"
                      value={venueLocation}
                      onChange={(e) => setVenueLocation(e.target.value)}
                      placeholder="e.g., Hyderabad, Mallika Gardens Shamshabad, Gandipet, or Nellore City"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                    {errors.venueLocation && (
                      <p
                        role="alert"
                        className="mt-1.5 text-xs text-red-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.venueLocation}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="vision-notes"
                    className="block text-xs font-medium text-[#141413] mb-1.5"
                  >
                    Event Details &amp; Favourite @light_of_love__ Series *
                  </label>
                  <textarea
                    id="vision-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share details about your Christian wedding, couple shoot, Haldi celebration, bridal portraits, or saree ceremony..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                  {errors.notes && (
                    <p
                      role="alert"
                      className="mt-1.5 text-xs text-red-700 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.notes}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-[#57534E] font-mono">
                    Selected:{' '}
                    <strong className="text-[#141413]">
                      {summary.selectedCount} Celebration Series
                    </strong>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3.5 text-sm font-medium bg-[#141413] text-[#FAF8F5] rounded-lg hover:bg-[#2C2A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Submit Inquiry to {STUDIO_INFO.name}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
