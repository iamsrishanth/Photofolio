import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterAndSortGallery,
  getAdjacentWorkIndex,
  formatExifSummary,
  calculateCommissionEstimate,
  validateInquiryForm,
  type GalleryWork,
} from './portfolio-logic.ts';

const sampleWorks: GalleryWork[] = [
  {
    id: 'w-1',
    frameNumber: '01',
    title: 'Golden Colonnade Vows',
    couple: 'Clara & Matteo',
    category: 'ceremony',
    location: 'Ravello, Amalfi Coast',
    country: 'Italy',
    date: 'September 2026',
    year: 2026,
    image: '/images/hero-editorial.jpg',
    aspectRatio: 'portrait',
    bentoSpan: 'hero',
    camera: 'Leica M6',
    lens: '35mm Summilux f/1.4',
    filmStock: 'Kodak Portra 400',
    aperture: 'f/2.0',
    shutter: '1/1000s',
    iso: 400,
    instagramHandle: '@light_of_love__',
    instagramCode: 'LOL-01',
    instagramLikes: 1840,
    caption: 'Sunlit limestone colonnade at Villa Cimbrone.',
    storyId: 'story-1',
    featuredOrder: 2,
  },
  {
    id: 'w-2',
    frameNumber: '02',
    title: 'Morning Silk & Shadow',
    couple: 'Élodie & Julian',
    category: 'editorial',
    location: 'Paris',
    country: 'France',
    date: 'May 2025',
    year: 2025,
    image: '/images/bridal-window.jpg',
    aspectRatio: 'portrait',
    bentoSpan: 'tall',
    camera: 'Contax 645',
    lens: '80mm Planar f/2.0',
    filmStock: 'Ilford HP5 Plus',
    aperture: 'f/2.8',
    shutter: '1/500s',
    iso: 400,
    instagramHandle: '@light_of_love__',
    instagramCode: 'LOL-02',
    instagramLikes: 2410,
    caption: 'Directional morning light across draped silk.',
    storyId: 'story-2',
    featuredOrder: 1,
  },
  {
    id: 'w-3',
    frameNumber: '03',
    title: 'Dusk Over Coastal Dunes',
    couple: 'Sora & Liam',
    category: 'elopement',
    location: 'Big Sur, California',
    country: 'USA',
    date: 'October 2026',
    year: 2026,
    image: '/images/elopement-dunes.jpg',
    aspectRatio: 'landscape',
    bentoSpan: 'wide',
    camera: 'Leica SL2-S',
    lens: '50mm APO-Summicron',
    filmStock: 'Kodak Tri-X 400',
    aperture: 'f/2.0',
    shutter: '1/250s',
    iso: 800,
    instagramHandle: '@light_of_love__',
    instagramCode: 'LOL-03',
    instagramLikes: 1520,
    caption: 'Windswept coastal dunes at blue hour.',
    storyId: 'story-3',
    featuredOrder: 3,
  },
];

test('filterAndSortGallery filters by category and sorts by featured order', () => {
  const allFeatured = filterAndSortGallery(sampleWorks, {
    category: 'all',
    searchQuery: '',
    sortBy: 'featured',
  });
  assert.equal(allFeatured.length, 3);
  assert.equal(allFeatured[0].id, 'w-2');

  const ceremonies = filterAndSortGallery(sampleWorks, {
    category: 'ceremony',
    searchQuery: '',
    sortBy: 'featured',
  });
  assert.equal(ceremonies.length, 1);
  assert.equal(ceremonies[0].id, 'w-1');
});

test('filterAndSortGallery filters by search query and saved bookmarks', () => {
  const bySearch = filterAndSortGallery(sampleWorks, {
    category: 'all',
    searchQuery: 'amalfi',
    sortBy: 'featured',
  });
  assert.equal(bySearch.length, 1);
  assert.equal(bySearch[0].couple, 'Clara & Matteo');

  const savedOnly = filterAndSortGallery(sampleWorks, {
    category: 'all',
    searchQuery: '',
    sortBy: 'film-sequence',
    onlySaved: true,
    savedIds: ['w-3', 'w-1'],
  });
  assert.equal(savedOnly.length, 2);
  assert.equal(savedOnly[0].frameNumber, '01');
  assert.equal(savedOnly[1].frameNumber, '03');
});

test('getAdjacentWorkIndex wraps circularly in both directions', () => {
  assert.equal(getAdjacentWorkIndex(0, 5, 'prev'), 4);
  assert.equal(getAdjacentWorkIndex(4, 5, 'next'), 0);
  assert.equal(getAdjacentWorkIndex(2, 5, 'next'), 3);
  assert.equal(getAdjacentWorkIndex(0, 0, 'next'), -1);
});

test('formatExifSummary creates clean unboxed typographic metadata', () => {
  const summary = formatExifSummary(sampleWorks[0]);
  assert.equal(
    summary,
    'Leica M6 · 35mm Summilux f/1.4 · f/2.0 · 1/1000s · ISO 400 · Kodak Portra 400'
  );
});

test('calculateCommissionEstimate computes total investment and 35% retainer accurately', () => {
  const estimate = calculateCommissionEstimate({
    basePrice: 6800,
    extraHours: 2,
    hourlyRate: 450,
    selectedAddOnPrices: [950, 1200],
  });
  assert.equal(estimate.extraHoursCost, 900);
  assert.equal(estimate.addOnsTotal, 2150);
  assert.equal(estimate.totalInvestment, 9850);
  assert.equal(estimate.retainerDue, 3448);
});

test('validateInquiryForm rejects empty/invalid inputs and accepts complete inquiry', () => {
  const invalid = validateInquiryForm({
    coupleNames: 'A',
    email: 'not-an-email',
    eventDate: '',
    venueLocation: '',
    collectionId: 'signature',
    extraHours: 0,
    selectedAddOns: [],
    visionNotes: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.coupleNames);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.eventDate);
  assert.ok(invalid.errors.venueLocation);
  assert.ok(invalid.errors.visionNotes);

  const valid = validateInquiryForm({
    coupleNames: 'Elena & Marcus',
    email: 'elena.marcus@example.com',
    eventDate: '2027-06-19',
    venueLocation: 'Lake Como, Italy',
    collectionId: 'signature',
    extraHours: 2,
    selectedAddOns: ['film-pack'],
    visionNotes: 'Intimate sunset ceremony in an olive grove followed by candlelit courtyard dinner.',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
