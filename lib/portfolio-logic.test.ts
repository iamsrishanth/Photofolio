import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterAndSortGallery,
  getAdjacentWorkIndex,
  formatCaptureCredit,
  summarizeSelectedCelebrations,
  validateInquiryForm,
  type GalleryWork,
  type EventCoverageOption,
} from './portfolio-logic.ts';

const sampleWorks: GalleryWork[] = [
  {
    id: 'ig-DR8zWcOCBSn-1',
    frameNumber: '01',
    slideNumber: 1,
    totalSlidesInPost: 5,
    postShortcode: 'DR8zWcOCBSn',
    postUrl: 'https://www.instagram.com/p/DR8zWcOCBSn/',
    title: 'Abhishikth & Deepthi — Christian Wedding Portrait I',
    couple: 'Abhishikth & Deepthi',
    collaboratorHandle: '@mende_deepthi',
    collaboratorUrl: 'https://www.instagram.com/mende_deepthi/',
    category: 'christian-wedding',
    categoryLabel: 'Christian Wedding',
    location: 'Hyderabad , Telengana. India',
    locationUrl: 'https://www.instagram.com/explore/locations/113332783424828/hyderabad-telengana-india/',
    image: '/images/ig-DR8zWcOCBSn-1.jpg',
    aspectRatio: 'portrait',
    dimensions: '1440 × 1919',
    bentoSpan: 'hero',
    capturedOn: '@nikonindiaofficial',
    cameraHandleUrl: 'https://www.instagram.com/nikonindiaofficial/',
    creditedBy: '@light_of_love__ and team',
    instagramHandle: '@light_of_love__',
    caption: 'From the aisle to the altar, every moment felt like a blessing. Abhishikth & Deepthi’s Christian wedding was filled with purity, joy, and God’s grace 🤍',
    hashtags: ['#weddingphotography', '#christianwedding', '#hyderabadweddings'],
    storyId: 'post-DR8zWcOCBSn',
    featuredOrder: 2,
  },
  {
    id: 'ig-DFAfTWaMW2c-1',
    frameNumber: '02',
    slideNumber: 1,
    totalSlidesInPost: 4,
    postShortcode: 'DFAfTWaMW2c',
    postUrl: 'https://www.instagram.com/p/DFAfTWaMW2c/',
    title: 'Amulya & Yash — Couple Portrait I',
    couple: 'Amulya & Yash',
    collaboratorHandle: '@light_of_love__',
    collaboratorUrl: 'https://www.instagram.com/light_of_love__/',
    category: 'couple-portraits',
    categoryLabel: 'Couple Shoot',
    location: 'mallika gardens,shamshabad',
    locationUrl: 'https://www.instagram.com/explore/locations/263769849/mallika-gardens-shamshabad/',
    image: '/images/ig-DFAfTWaMW2c-1.jpg',
    aspectRatio: 'portrait',
    dimensions: '1440 × 1800',
    bentoSpan: 'tall',
    capturedOn: '@nikonindiaofficial Z 7 ii',
    cameraHandleUrl: 'https://www.instagram.com/nikonindiaofficial/',
    creditedBy: '@light_of_love__ Films',
    instagramHandle: '@light_of_love__',
    caption: 'Amulya & Yash . . . Captured on @nikonindiaofficial Z 7 ii by @light_of_love__ Films',
    hashtags: ['#weddingphotography', '#amulyayash', '#lightoflove'],
    storyId: 'post-DFAfTWaMW2c',
    featuredOrder: 1,
  },
  {
    id: 'ig-DFSQ_qds4JO-1',
    frameNumber: '03',
    slideNumber: 1,
    totalSlidesInPost: 4,
    postShortcode: 'DFSQ_qds4JO',
    postUrl: 'https://www.instagram.com/p/DFSQ_qds4JO/',
    title: 'Anjali & Ashok — Bridal Portrait I',
    couple: 'Anjali & Ashok',
    collaboratorHandle: '@geetuu_0612',
    collaboratorUrl: 'https://www.instagram.com/geetuu_0612/',
    category: 'bridal',
    categoryLabel: 'Bridal Portrait',
    location: 'Nellore City',
    locationUrl: 'https://www.instagram.com/explore/locations/250979538/nellore-city/',
    image: '/images/ig-DFSQ_qds4JO-1.jpg',
    aspectRatio: 'portrait',
    dimensions: '1440 × 1800',
    bentoSpan: 'standard',
    capturedOn: '@sonyalphain',
    cameraHandleUrl: 'https://www.instagram.com/sonyalphain/',
    creditedBy: '@light_of_love__ Films',
    instagramHandle: '@light_of_love__',
    caption: 'Her smile tells a story of love, grace, and a brand-new beginning 💚 . Captured on @sonyalphain by @light_of_love__ Films',
    hashtags: ['#weddingphotography', '#anjaliashok', '#lightoflove'],
    storyId: 'post-DFSQ_qds4JO',
    featuredOrder: 3,
  },
];

const sampleEvents: EventCoverageOption[] = [
  {
    id: 'christian-wedding',
    number: '01',
    name: 'Christian Wedding Coverage',
    instagramTag: '#christianwedding',
    featuredCouple: 'Abhishikth & Deepthi',
    featuredLocation: 'Hyderabad , Telengana. India',
    capturedOn: '@nikonindiaofficial',
    postShortcode: 'DR8zWcOCBSn',
    postUrl: 'https://www.instagram.com/p/DR8zWcOCBSn/',
    highlights: ['Aisle to altar ceremony', 'Bridal & groom portraits'],
  },
  {
    id: 'bridal',
    number: '02',
    name: 'Bridal & Wedding Portraits',
    instagramTag: '#anjaliashok',
    featuredCouple: 'Anjali & Ashok',
    featuredLocation: 'Nellore City',
    capturedOn: '@sonyalphain',
    postShortcode: 'DFSQ_qds4JO',
    postUrl: 'https://www.instagram.com/p/DFSQ_qds4JO/',
    highlights: ['Bridal elegance portraits', 'Ceremonial candid moments'],
  },
];

test('filterAndSortGallery filters by @light_of_love__ category and sorts by featured order', () => {
  const allFeatured = filterAndSortGallery(sampleWorks, {
    category: 'all',
    searchQuery: '',
    sortBy: 'featured',
  });
  assert.equal(allFeatured.length, 3);
  assert.equal(allFeatured[0].id, 'ig-DFAfTWaMW2c-1');

  const christianWedding = filterAndSortGallery(sampleWorks, {
    category: 'christian-wedding',
    searchQuery: '',
    sortBy: 'featured',
  });
  assert.equal(christianWedding.length, 1);
  assert.equal(christianWedding[0].couple, 'Abhishikth & Deepthi');
});

test('filterAndSortGallery searches by Instagram shortcode, location, camera, or hashtag', () => {
  const byLocation = filterAndSortGallery(sampleWorks, {
    category: 'all',
    searchQuery: 'shamshabad',
    sortBy: 'featured',
  });
  assert.equal(byLocation.length, 1);
  assert.equal(byLocation[0].couple, 'Amulya & Yash');

  const byCamera = filterAndSortGallery(sampleWorks, {
    category: 'all',
    searchQuery: 'sonyalphain',
    sortBy: 'featured',
  });
  assert.equal(byCamera.length, 1);
  assert.equal(byCamera[0].couple, 'Anjali & Ashok');

  const savedOnly = filterAndSortGallery(sampleWorks, {
    category: 'all',
    searchQuery: '',
    sortBy: 'frame-sequence',
    onlySaved: true,
    savedIds: ['ig-DFSQ_qds4JO-1', 'ig-DR8zWcOCBSn-1'],
  });
  assert.equal(savedOnly.length, 2);
  assert.equal(savedOnly[0].frameNumber, '01');
  assert.equal(savedOnly[1].frameNumber, '03');
});

test('getAdjacentWorkIndex wraps circularly in both directions', () => {
  assert.equal(getAdjacentWorkIndex(0, 23, 'prev'), 22);
  assert.equal(getAdjacentWorkIndex(22, 23, 'next'), 0);
  assert.equal(getAdjacentWorkIndex(4, 23, 'next'), 5);
  assert.equal(getAdjacentWorkIndex(0, 0, 'next'), -1);
});

test('formatCaptureCredit formats authentic @light_of_love__ Instagram credit', () => {
  const credit = formatCaptureCredit(sampleWorks[1]);
  assert.equal(
    credit,
    'Captured on @nikonindiaofficial Z 7 ii · @light_of_love__ Films · IG /p/DFAfTWaMW2c (Slide 1/4)'
  );
});

test('summarizeSelectedCelebrations aggregates selected events, cameras, and saved frames', () => {
  const summary = summarizeSelectedCelebrations({
    selectedEventIds: ['christian-wedding', 'bridal'],
    availableEvents: sampleEvents,
    savedWorkIds: ['ig-DR8zWcOCBSn-1'],
    allWorks: sampleWorks,
  });
  assert.equal(summary.selectedCount, 2);
  assert.deepEqual(summary.camerasUsed, ['@nikonindiaofficial', '@sonyalphain']);
  assert.equal(summary.savedFramesSummary.length, 1);
});

test('validateInquiryForm validates required fields and accepts authentic booking request', () => {
  const invalid = validateInquiryForm({
    coupleNames: 'A',
    contactInfo: '123',
    eventDate: '',
    venueLocation: '',
    selectedEvents: [],
    notes: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.coupleNames);
  assert.ok(invalid.errors.contactInfo);
  assert.ok(invalid.errors.eventDate);
  assert.ok(invalid.errors.venueLocation);
  assert.ok(invalid.errors.selectedEvents);
  assert.ok(invalid.errors.notes);

  const valid = validateInquiryForm({
    coupleNames: 'Meghana & Kiran',
    contactInfo: '@meghanakiran / meghana@example.com',
    eventDate: '2026-12-18',
    venueLocation: 'Hyderabad, Telangana, India',
    selectedEvents: ['christian-wedding'],
    notes: 'Looking for wedding & haldi photography by @light_of_love__ Films in Hyderabad.',
  });
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
