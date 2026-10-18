export type GalleryCategory =
  | 'all'
  | 'christian-wedding'
  | 'couple-portraits'
  | 'haldi'
  | 'bridal'
  | 'saree-ceremony';

export type GalleryViewMode = 'bento' | 'masonry' | 'index';

export type SortMode = 'featured' | 'post-group' | 'frame-sequence';

export interface GalleryWork {
  id: string;
  frameNumber: string;
  slideNumber: number;
  totalSlidesInPost: number;
  postShortcode: string;
  postUrl: string;
  title: string;
  couple: string;
  collaboratorHandle: string;
  collaboratorUrl: string;
  category: Exclude<GalleryCategory, 'all'>;
  categoryLabel: string;
  location: string;
  locationUrl: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape';
  dimensions: string;
  bentoSpan: 'hero' | 'wide' | 'tall' | 'standard';
  capturedOn: string;
  cameraHandleUrl: string;
  creditedBy: string;
  instagramHandle: string;
  caption: string;
  hashtags: string[];
  storyId: string;
  featuredOrder: number;
  width?: number;
  height?: number;
  focalPosition?: string;
  shortLocation?: string;
}

export interface InstagramSeriesStory {
  id: string;
  seriesNumber: string;
  postShortcode: string;
  postUrl: string;
  couple: string;
  collaboratorHandle: string;
  collaboratorUrl: string;
  eventType: string;
  location: string;
  shortLocation?: string;
  locationUrl: string;
  capturedOn: string;
  creditedBy: string;
  slidesCount: number;
  coverImage: string;
  secondaryImage: string;
  thirdImage: string;
  coverFocalPosition?: string;
  secondaryFocalPosition?: string;
  thirdFocalPosition?: string;
  factualIntro?: string;
  exactCaption: string;
  hashtags: string[];
  slidesSummary: { slide: string; frameTitle: string; dimensions: string }[];
}

export interface EventCoverageOption {
  id: Exclude<GalleryCategory, 'all'>;
  number: string;
  name: string;
  instagramTag: string;
  featuredCouple: string;
  featuredLocation: string;
  capturedOn: string;
  postShortcode: string;
  postUrl: string;
  highlights: string[];
}

export interface InquiryFormInput {
  coupleNames: string;
  contactInfo: string;
  eventDate: string;
  venueLocation: string;
  selectedEvents: string[];
  notes: string;
}

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof InquiryFormInput, string>>;
}

export function filterAndSortGallery(
  works: GalleryWork[],
  options: {
    category: GalleryCategory;
    searchQuery: string;
    sortBy: SortMode;
    onlySaved?: boolean;
    savedIds?: string[];
    postShortcode?: string;
  }
): GalleryWork[] {
  const query = options.searchQuery.trim().toLowerCase();
  const savedSet = new Set(options.savedIds ?? []);

  const filtered = works.filter((work) => {
    if (options.category !== 'all' && work.category !== options.category) {
      return false;
    }
    if (options.postShortcode && work.postShortcode !== options.postShortcode) {
      return false;
    }
    if (options.onlySaved && !savedSet.has(work.id)) {
      return false;
    }
    if (query.length > 0) {
      const searchable = [
        work.title,
        work.couple,
        work.collaboratorHandle,
        work.location,
        work.capturedOn,
        work.creditedBy,
        work.caption,
        work.postShortcode,
        work.frameNumber,
        work.categoryLabel,
        ...work.hashtags,
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(query);
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (options.sortBy === 'post-group') {
      const codeCompare = a.postShortcode.localeCompare(b.postShortcode);
      if (codeCompare !== 0) return codeCompare;
      return a.slideNumber - b.slideNumber;
    }
    if (options.sortBy === 'frame-sequence') {
      return a.frameNumber.localeCompare(b.frameNumber);
    }
    return a.featuredOrder - b.featuredOrder;
  });
}

export function getAdjacentWorkIndex(
  currentIndex: number,
  totalCount: number,
  direction: 'next' | 'prev'
): number {
  if (totalCount <= 0) return -1;
  if (direction === 'next') {
    return (currentIndex + 1) % totalCount;
  }
  return (currentIndex - 1 + totalCount) % totalCount;
}

export function formatCaptureCredit(
  work: Pick<GalleryWork, 'capturedOn' | 'creditedBy' | 'postShortcode' | 'slideNumber' | 'totalSlidesInPost'>
): string {
  return `Captured on ${work.capturedOn} · ${work.creditedBy} · IG /p/${work.postShortcode} (Slide ${work.slideNumber}/${work.totalSlidesInPost})`;
}

export function summarizeSelectedCelebrations(params: {
  selectedEventIds: string[];
  availableEvents: EventCoverageOption[];
  savedWorkIds: string[];
  allWorks: GalleryWork[];
}): {
  selectedCount: number;
  selectedNames: string[];
  camerasUsed: string[];
  savedFramesSummary: string[];
} {
  const chosen = params.availableEvents.filter((e) =>
    params.selectedEventIds.includes(e.id)
  );
  const camerasUsed = Array.from(new Set(chosen.map((c) => c.capturedOn)));
  const savedFramesSummary = params.allWorks
    .filter((w) => params.savedWorkIds.includes(w.id))
    .map((w) => `Frame ${w.frameNumber} (${w.couple} · /p/${w.postShortcode})`);

  return {
    selectedCount: chosen.length,
    selectedNames: chosen.map((c) => c.name),
    camerasUsed,
    savedFramesSummary,
  };
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  if (!input.coupleNames || input.coupleNames.trim().length < 2) {
    errors.coupleNames = 'Please enter the bride, groom, or family name (at least 2 characters).';
  }

  const contactTrimmed = (input.contactInfo ?? '').trim();
  if (!contactTrimmed || contactTrimmed.length < 5) {
    errors.contactInfo = 'Please provide your email address, phone number, or Instagram handle.';
  }

  if (!input.eventDate || input.eventDate.trim().length === 0) {
    errors.eventDate = 'Please select your wedding or ceremony date.';
  }

  if (!input.venueLocation || input.venueLocation.trim().length < 3) {
    errors.venueLocation = 'Please enter the venue or city (e.g., Hyderabad and Beyond).';
  }

  if (!input.selectedEvents || input.selectedEvents.length === 0) {
    errors.selectedEvents = 'Please select at least one celebration type from @light_of_love__.';
  }

  if (!input.notes || input.notes.trim().length < 8) {
    errors.notes = 'Please share a few details about your celebration (min 8 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
