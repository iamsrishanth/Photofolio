'use client';

import React, { useState, useRef } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  FileText,
} from 'lucide-react';
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

interface PreparedInquiryBrief extends InquiryFormInput {
  preparedAt: string;
  moodboardFrames: string[];
}

export function CommissionSection({ savedIds }: CommissionSectionProps) {
  const [selectedEvents] = useState<string[]>([
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
  const [preparedBrief, setPreparedBrief] =
    useState<PreparedInquiryBrief | null>(null);

  const coupleNamesRef = useRef<HTMLInputElement | null>(null);
  const contactInfoRef = useRef<HTMLInputElement | null>(null);
  const eventDateRef = useRef<HTMLInputElement | null>(null);
  const venueLocationRef = useRef<HTMLInputElement | null>(null);
  const notesRef = useRef<HTMLTextAreaElement | null>(null);

  const summary = summarizeSelectedCelebrations({
    selectedEventIds: selectedEvents,
    availableEvents: EVENT_COVERAGE_OPTIONS,
    savedWorkIds: savedIds,
    allWorks: GALLERY_WORKS,
  });

  const focusFirstInvalidField = (
    validationErrors: Partial<Record<keyof InquiryFormInput, string>>
  ) => {
    if (validationErrors.coupleNames) {
      coupleNamesRef.current?.focus();
    } else if (validationErrors.contactInfo) {
      contactInfoRef.current?.focus();
    } else if (validationErrors.eventDate) {
      eventDateRef.current?.focus();
    } else if (validationErrors.venueLocation) {
      venueLocationRef.current?.focus();
    } else if (validationErrors.notes) {
      notesRef.current?.focus();
    }
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
      focusFirstInvalidField(validation.errors);
      return;
    }

    setErrors({});

    setPreparedBrief({
      ...formPayload,
      preparedAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      moodboardFrames: summary.savedFramesSummary,
    });
  };

  return (
    <section
      id="collections"
      aria-labelledby="inquiry-heading"
      className="scroll-mt-20 w-full py-16 sm:py-24 lg:py-28 bg-[#FAF8F5] text-[#141413] border-b border-[#E2DDD5]"
    >
      <div id="commission" className="scroll-mt-20 editorial-container">
        <div className="max-w-3xl mx-auto">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono text-xs text-[#53614A] mb-2">
                04 / Inquire
              </p>
              <h2
                id="inquiry-heading"
                className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Prepare an Inquiry
              </h2>
            </div>

            <a
              href={STUDIO_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2.5 border border-[#141413] text-xs sm:text-sm font-medium text-[#141413] hover:bg-[#DDE3D7]/60 inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 editorial-focus"
            >
              <span>Contact {STUDIO_INFO.instagramHandle} on Instagram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Local Inquiry Form & Honest Prepared-Brief View */}
          <div className="bg-[#FAF8F5] p-6 sm:p-8 border border-[#CFC8BC]">
            {preparedBrief ? (
              <div
                data-testid="inquiry-confirmation"
                className="py-4 space-y-6"
              >
                <div className="flex items-start gap-3 text-[#141413]">
                  <FileText className="w-6 h-6 text-[#53614A] shrink-0 mt-1" />
                  <div>
                    <div className="text-xs font-mono text-[#53614A]">
                      Inquiry Brief Prepared on This Page ·{' '}
                      {preparedBrief.preparedAt}
                    </div>
                    <h3 className="font-serif text-3xl text-[#141413] mt-1">
                      Your Inquiry Brief for {preparedBrief.coupleNames}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#57534E] leading-relaxed">
                  Your inquiry brief for{' '}
                  <strong className="text-[#141413]">
                    {preparedBrief.venueLocation}
                  </strong>{' '}
                  on{' '}
                  <strong className="text-[#141413]">
                    {preparedBrief.eventDate}
                  </strong>{' '}
                  has been prepared on this page. Because this form prepares
                  your summary locally and does not send a message automatically,
                  please share the details below directly with{' '}
                  <strong className="text-[#141413]">
                    {STUDIO_INFO.name} ({STUDIO_INFO.instagramHandle})
                  </strong>{' '}
                  on Instagram.
                </p>

                <div className="p-5 bg-[#F3EFEA] border border-[#CFC8BC] space-y-2.5 text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#57534E]">Names:</span>
                    <span className="text-[#141413] font-medium text-right">
                      {preparedBrief.coupleNames}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#57534E]">Contact:</span>
                    <span className="text-[#141413] text-right">
                      {preparedBrief.contactInfo}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#57534E]">Date &amp; Location:</span>
                    <span className="text-[#141413] text-right">
                      {preparedBrief.eventDate} · {preparedBrief.venueLocation}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-[#57534E]">Saved Photographs:</span>
                    <span className="text-[#141413] text-right">
                      {preparedBrief.moodboardFrames.length > 0
                        ? preparedBrief.moodboardFrames.join(', ')
                        : 'None selected'}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#E2DDD5]">
                    <span className="text-[#57534E] block mb-1">Notes:</span>
                    <p className="text-[#141413] leading-relaxed">
                      {preparedBrief.notes}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={STUDIO_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] px-6 py-3 text-xs sm:text-sm font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#53614A] inline-flex items-center gap-2 transition-colors cursor-pointer editorial-focus"
                  >
                    <span>
                      Continue to {STUDIO_INFO.instagramHandle} on Instagram
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setPreparedBrief(null)}
                    className="min-h-[48px] px-5 py-2.5 text-xs sm:text-sm font-medium border border-[#CFC8BC] text-[#141413] hover:bg-[#F3EFEA] transition-colors cursor-pointer editorial-focus"
                  >
                    Edit Inquiry Brief
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="pb-4 border-b border-[#E2DDD5]">
                  <p className="text-xs sm:text-sm text-[#57534E]">
                    Complete the details below to organize your celebration
                    brief for {STUDIO_INFO.name}.
                  </p>
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
                      ref={coupleNamesRef}
                      id="couple-names"
                      type="text"
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      placeholder="e.g., Abhishikth & Deepthi"
                      aria-invalid={Boolean(errors.coupleNames)}
                      aria-describedby={
                        errors.coupleNames ? 'couple-names-error' : undefined
                      }
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#CFC8BC] text-[#141413] editorial-focus"
                    />
                    {errors.coupleNames && (
                      <p
                        id="couple-names-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-800 flex items-center gap-1.5"
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
                      ref={contactInfoRef}
                      id="couple-contact"
                      type="text"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="e.g., @yourhandle or email@example.com"
                      aria-invalid={Boolean(errors.contactInfo)}
                      aria-describedby={
                        errors.contactInfo ? 'couple-contact-error' : undefined
                      }
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#CFC8BC] text-[#141413] editorial-focus"
                    />
                    {errors.contactInfo && (
                      <p
                        id="couple-contact-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-800 flex items-center gap-1.5"
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
                      ref={eventDateRef}
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      aria-invalid={Boolean(errors.eventDate)}
                      aria-describedby={
                        errors.eventDate ? 'event-date-error' : undefined
                      }
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#CFC8BC] text-[#141413] editorial-focus"
                    />
                    {errors.eventDate && (
                      <p
                        id="event-date-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-800 flex items-center gap-1.5"
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
                      ref={venueLocationRef}
                      id="venue-location"
                      type="text"
                      value={venueLocation}
                      onChange={(e) => setVenueLocation(e.target.value)}
                      placeholder="e.g., Hyderabad and Beyond"
                      aria-invalid={Boolean(errors.venueLocation)}
                      aria-describedby={
                        errors.venueLocation
                          ? 'venue-location-error'
                          : undefined
                      }
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#CFC8BC] text-[#141413] editorial-focus"
                    />
                    {errors.venueLocation && (
                      <p
                        id="venue-location-error"
                        role="alert"
                        className="mt-1.5 text-xs text-red-800 flex items-center gap-1.5"
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
                    Celebration Details &amp; Notes *
                  </label>
                  <textarea
                    ref={notesRef}
                    id="vision-notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Share details about your wedding, couple shoot, Haldi celebration, bridal portraits, or saree ceremony..."
                    aria-invalid={Boolean(errors.notes)}
                    aria-describedby={
                      errors.notes ? 'vision-notes-error' : undefined
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#CFC8BC] text-[#141413] editorial-focus"
                  />
                  {errors.notes && (
                    <p
                      id="vision-notes-error"
                      role="alert"
                      className="mt-1.5 text-xs text-red-800 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.notes}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-[#57534E]">
                    Includes{' '}
                    <strong className="text-[#141413]">
                      {savedIds.length} saved{' '}
                      {savedIds.length === 1 ? 'photograph' : 'photographs'}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    className="min-h-[48px] px-7 py-3 text-sm font-medium bg-[#141413] text-[#FAF8F5] hover:bg-[#53614A] inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer editorial-focus"
                  >
                    <span>Prepare Inquiry</span>
                    <ArrowRight className="w-4 h-4" />
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
