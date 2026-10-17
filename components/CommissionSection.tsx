'use client';

import React, { useState } from 'react';
import { Check, Plus, Minus, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  COLLECTION_TIERS,
  ADD_ON_OPTIONS,
  GALLERY_WORKS,
  STUDIO_INFO,
} from '@/lib/portfolio-data';
import {
  calculateCommissionEstimate,
  validateInquiryForm,
  type InquiryFormInput,
} from '@/lib/portfolio-logic';

interface CommissionSectionProps {
  savedIds: string[];
}

interface SubmittedDossier extends InquiryFormInput {
  submittedAt: string;
  totalInvestment: number;
  retainerDue: number;
  collectionName: string;
  moodboardFrames: string[];
}

export function CommissionSection({ savedIds }: CommissionSectionProps) {
  const [selectedCollectionId, setSelectedCollectionId] = useState<
    'elopement' | 'signature' | 'destination'
  >('signature');
  const [extraHours, setExtraHours] = useState<number>(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['analog-vault']);

  const [coupleNames, setCoupleNames] = useState('');
  const [email, setEmail] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [visionNotes, setVisionNotes] = useState('');

  const [errors, setErrors] = useState<
    Partial<Record<keyof InquiryFormInput, string>>
  >({});
  const [submittedDossier, setSubmittedDossier] =
    useState<SubmittedDossier | null>(null);

  const activeCollection =
    COLLECTION_TIERS.find((t) => t.id === selectedCollectionId) ??
    COLLECTION_TIERS[1];

  const selectedAddOnPrices = ADD_ON_OPTIONS.filter((a) =>
    selectedAddOns.includes(a.id)
  ).map((a) => a.price);

  const estimate = calculateCommissionEstimate({
    basePrice: activeCollection.basePrice,
    extraHours,
    hourlyRate: 450,
    selectedAddOnPrices,
  });

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formPayload: InquiryFormInput = {
      coupleNames,
      email,
      eventDate,
      venueLocation,
      collectionId: selectedCollectionId,
      extraHours,
      selectedAddOns,
      visionNotes,
    };

    const validation = validateInquiryForm(formPayload);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const savedTitles = GALLERY_WORKS.filter((w) => savedIds.includes(w.id)).map(
      (w) => `Plate ${w.frameNumber} (${w.title})`
    );

    setSubmittedDossier({
      ...formPayload,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      totalInvestment: estimate.totalInvestment,
      retainerDue: estimate.retainerDue,
      collectionName: activeCollection.name,
      moodboardFrames: savedTitles,
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
            <div className="flex items-center gap-2 text-xs text-[#57534E] mb-3">
              <span>04. Collections &amp; Bespoke Commissions</span>
              <span aria-hidden="true">·</span>
              <span>2026 &amp; 2027 Wedding Calendar</span>
            </div>
            <h2
              className="font-serif text-3xl sm:text-5xl text-[#141413] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Transparent Investment &amp; Availability
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#44403C] max-w-md leading-relaxed">
            We accept only eighteen wedding commissions per year to ensure every film roll
            and monograph receives our undivided darkroom and editorial attention.
          </p>
        </div>

        {/* 3 Collection Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {COLLECTION_TIERS.map((tier) => {
            const isSelected = tier.id === selectedCollectionId;
            return (
              <div
                key={tier.id}
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between transition-colors ${
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
                    <span>Collection {tier.number}</span>
                    <span>{tier.idealFor}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl tracking-tight mb-2">
                    {tier.name}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isSelected ? 'text-stone-300' : 'text-[#44403C]'
                    }`}
                  >
                    {tier.tagline}
                  </p>

                  <div className="pb-6 mb-6 border-b border-current/15 flex items-baseline gap-2">
                    <span className="font-serif text-3xl sm:text-4xl tabular-nums">
                      ${tier.basePrice.toLocaleString()}
                    </span>
                    <span
                      className={`text-xs font-mono tabular-nums ${
                        isSelected ? 'text-stone-400' : 'text-[#57534E]'
                      }`}
                    >
                      · {tier.includedHours} hrs included
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-8 text-xs sm:text-sm">
                    {tier.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
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
                  onClick={() => setSelectedCollectionId(tier.id)}
                  aria-pressed={isSelected}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF8F5] text-[#141413]'
                      : 'bg-[#141413] text-[#FAF8F5] hover:bg-[#2C2A28]'
                  }`}
                >
                  {isSelected
                    ? `Selected: ${tier.name}`
                    : `Select ${tier.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Commission Estimator + Inquiry Form Split */}
        <div
          id="commission"
          className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-8 border-t border-[#D6D0C6]"
        >
          {/* Left Column: Interactive Investment Configurator */}
          <div className="lg:col-span-5 space-y-6 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#D6D0C6]">
            <div>
              <div className="text-xs text-[#57534E] font-mono mb-1">
                Live Monograph Estimator
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#141413]">
                Tailor Your Coverage
              </h3>
            </div>

            {/* Extra Coverage Hours Counter */}
            <div className="py-4 border-y border-[#E6E1DA] flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-[#141413]">
                  Additional Coverage Hours
                </div>
                <div className="text-xs text-[#57534E] font-mono tabular-nums">
                  +$450 / hour beyond {activeCollection.includedHours} included hours
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExtraHours((h) => Math.max(0, h - 1))}
                  aria-label="Decrease additional coverage hours"
                  className="w-8 h-8 rounded-md border border-[#D6D0C6] inline-flex items-center justify-center hover:bg-[#EFECE6] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span
                  data-testid="extra-hours-count"
                  className="w-8 text-center font-mono text-sm font-semibold tabular-nums"
                >
                  +{extraHours}h
                </span>
                <button
                  type="button"
                  onClick={() => setExtraHours((h) => Math.min(6, h + 1))}
                  aria-label="Increase additional coverage hours"
                  className="w-8 h-8 rounded-md border border-[#D6D0C6] inline-flex items-center justify-center hover:bg-[#EFECE6] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Bespoke Add-On Checkboxes */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#141413]">
                Atelier Additions &amp; Film Upgrades
              </div>
              {ADD_ON_OPTIONS.map((addon) => {
                const checked = selectedAddOns.includes(addon.id);
                return (
                  <label
                    key={addon.id}
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
                        onChange={() => handleToggleAddOn(addon.id)}
                        className="mt-1 accent-[#141413]"
                      />
                      <div>
                        <div className="text-xs font-medium text-[#141413]">
                          {addon.name}
                        </div>
                        <div className="text-[11px] text-[#57534E] mt-0.5">
                          {addon.description}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-medium text-[#141413] tabular-nums shrink-0">
                      +${addon.price.toLocaleString()}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Tabular Summary Breakdown */}
            <div className="pt-4 border-t border-[#D6D0C6] space-y-2 text-xs">
              <div className="flex justify-between text-[#57534E]">
                <span>{activeCollection.name}</span>
                <span className="font-mono tabular-nums">
                  ${estimate.basePrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>Extra Hours (+{extraHours}h)</span>
                <span className="font-mono tabular-nums">
                  ${estimate.extraHoursCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[#57534E]">
                <span>Selected Atelier Additions</span>
                <span className="font-mono tabular-nums">
                  ${estimate.addOnsTotal.toLocaleString()}
                </span>
              </div>
              <div className="pt-3 border-t border-[#E6E1DA] flex items-baseline justify-between text-base font-semibold text-[#141413]">
                <span>Estimated Total Investment</span>
                <span
                  data-testid="estimated-total"
                  className="font-serif text-2xl tabular-nums"
                >
                  ${estimate.totalInvestment.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-[#78716C] tabular-nums">
                <span>35% Reservation Retainer</span>
                <span>${estimate.retainerDue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Commission Inquiry Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border border-[#D6D0C6]">
            {submittedDossier ? (
              <div
                data-testid="inquiry-confirmation"
                className="py-6 space-y-6"
              >
                <div className="flex items-center gap-3 text-[#141413]">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0" />
                  <div>
                    <div className="text-xs font-mono text-[#57534E]">
                      Commission Dossier Registered · {submittedDossier.submittedAt}
                    </div>
                    <h3 className="font-serif text-3xl text-[#141413]">
                      Thank You, {submittedDossier.coupleNames}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#44403C] leading-relaxed">
                  Your wedding inquiry for{' '}
                  <strong className="text-[#141413]">
                    {submittedDossier.venueLocation}
                  </strong>{' '}
                  on{' '}
                  <strong className="text-[#141413]">
                    {submittedDossier.eventDate}
                  </strong>{' '}
                  has been logged with our Paris &amp; Amalfi desk. A bespoke monograph
                  proposal and availability confirmation has been prepared for{' '}
                  <span className="underline">{submittedDossier.email}</span>.
                </p>

                <div className="p-5 rounded-xl bg-[#F3EFEA] border border-[#E6E1DA] space-y-2 text-xs font-mono tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Selected Collection:</span>
                    <span className="text-[#141413] font-medium">
                      {submittedDossier.collectionName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Estimated Commission:</span>
                    <span className="text-[#141413] font-semibold">
                      ${submittedDossier.totalInvestment.toLocaleString()} (Retainer: $
                      {submittedDossier.retainerDue.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#57534E]">Attached Moodboard Plates:</span>
                    <span className="text-[#141413]">
                      {submittedDossier.moodboardFrames.length > 0
                        ? submittedDossier.moodboardFrames.join(', ')
                        : 'None selected'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedDossier(null)}
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
                      Request Date Availability
                    </h3>
                    <p className="text-xs text-[#57534E] mt-0.5">
                      Direct studio response within 24 hours ·{' '}
                      {STUDIO_INFO.instagramHandle}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#57534E] tabular-nums">
                    Moodboard Attached: {savedIds.length} Plate
                    {savedIds.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="couple-names"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      Couple Names *
                    </label>
                    <input
                      id="couple-names"
                      type="text"
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      placeholder="e.g., Clara & Matteo"
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
                      htmlFor="couple-email"
                      className="block text-xs font-medium text-[#141413] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="couple-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="clara.matteo@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413]"
                    />
                    {errors.email && (
                      <p
                        role="alert"
                        className="mt-1.5 text-xs text-red-700 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
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
                      Venue &amp; Destination *
                    </label>
                    <input
                      id="venue-location"
                      type="text"
                      value={venueLocation}
                      onChange={(e) => setVenueLocation(e.target.value)}
                      placeholder="e.g., Villa Cimbrone, Ravello"
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
                    Celebration Narrative &amp; Lighting Vision *
                  </label>
                  <textarea
                    id="vision-notes"
                    rows={4}
                    value={visionNotes}
                    onChange={(e) => setVisionNotes(e.target.value)}
                    placeholder="Share the atmosphere of your celebration, architectural setting, and what draws you to analog wedding photography..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6D0C6] rounded-lg text-[#141413] focus:outline-none focus:border-[#141413]"
                  />
                  {errors.visionNotes && (
                    <p
                      role="alert"
                      className="mt-1.5 text-xs text-red-700 flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.visionNotes}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-[#57534E]">
                    Configuring <strong className="text-[#141413]">{activeCollection.name}</strong>{' '}
                    (${estimate.totalInvestment.toLocaleString()})
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3.5 text-sm font-medium bg-[#141413] text-[#FAF8F5] rounded-lg hover:bg-[#2C2A28] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Submit Commission Inquiry
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
