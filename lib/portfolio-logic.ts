export type GalleryCategory =
  | 'all'
  | 'ceremony'
  | 'editorial'
  | 'elopement'
  | 'details'
  | 'analog';

export type GalleryViewMode = 'bento' | 'masonry' | 'index';

export type SortMode = 'featured' | 'latest' | 'film-sequence';

export interface GalleryWork {
  id: string;
  frameNumber: string;
  title: string;
  couple: string;
  category: Exclude<GalleryCategory, 'all'>;
  location: string;
  country: string;
  date: string;
  year: number;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  bentoSpan: 'hero' | 'wide' | 'tall' | 'standard';
  camera: string;
  lens: string;
  filmStock: string;
  aperture: string;
  shutter: string;
  iso: number;
  instagramHandle: string;
  instagramCode: string;
  instagramLikes: number;
  caption: string;
  storyId: string;
  featuredOrder: number;
}

export interface CoupleStory {
  id: string;
  number: string;
  couple: string;
  title: string;
  subtitle: string;
  location: string;
  season: string;
  venue: string;
  filmRollsUsed: number;
  framesDelivered: number;
  coverImage: string;
  secondaryImage: string;
  detailImage: string;
  quote: string;
  quoteAttribution: string;
  editorialNotes: string;
  timeline: { time: string; moment: string; lightNote: string }[];
}

export interface CollectionTier {
  id: 'elopement' | 'signature' | 'destination';
  number: string;
  name: string;
  tagline: string;
  basePrice: number;
  includedHours: number;
  deliverables: string[];
  idealFor: string;
}

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface InquiryFormInput {
  coupleNames: string;
  email: string;
  eventDate: string;
  venueLocation: string;
  collectionId: 'elopement' | 'signature' | 'destination';
  extraHours: number;
  selectedAddOns: string[];
  visionNotes: string;
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
  }
): GalleryWork[] {
  const query = options.searchQuery.trim().toLowerCase();
  const savedSet = new Set(options.savedIds ?? []);

  const filtered = works.filter((work) => {
    if (options.category !== 'all' && work.category !== options.category) {
      return false;
    }
    if (options.onlySaved && !savedSet.has(work.id)) {
      return false;
    }
    if (query.length > 0) {
      const searchable = [
        work.title,
        work.couple,
        work.location,
        work.country,
        work.camera,
        work.filmStock,
        work.caption,
        work.frameNumber,
        work.category,
      ]
        .join(' ')
        .toLowerCase();
      return searchable.includes(query);
    }
    return true;
  });

  return [...filtered].sort((a, b) => {
    if (options.sortBy === 'latest') {
      return b.year - a.year || a.featuredOrder - b.featuredOrder;
    }
    if (options.sortBy === 'film-sequence') {
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

export function formatExifSummary(work: Pick<GalleryWork, 'camera' | 'lens' | 'aperture' | 'shutter' | 'iso' | 'filmStock'>): string {
  return `${work.camera} · ${work.lens} · ${work.aperture} · ${work.shutter} · ISO ${work.iso} · ${work.filmStock}`;
}

export function calculateCommissionEstimate(params: {
  basePrice: number;
  extraHours: number;
  hourlyRate?: number;
  selectedAddOnPrices: number[];
}): {
  basePrice: number;
  extraHoursCost: number;
  addOnsTotal: number;
  totalInvestment: number;
  retainerDue: number;
} {
  const hourlyRate = params.hourlyRate ?? 450;
  const clampedExtraHours = Math.max(0, Math.min(6, Math.floor(params.extraHours)));
  const extraHoursCost = clampedExtraHours * hourlyRate;
  const addOnsTotal = params.selectedAddOnPrices.reduce((sum, p) => sum + p, 0);
  const totalInvestment = params.basePrice + extraHoursCost + addOnsTotal;
  const retainerDue = Math.round(totalInvestment * 0.35);

  return {
    basePrice: params.basePrice,
    extraHoursCost,
    addOnsTotal,
    totalInvestment,
    retainerDue,
  };
}

export function validateInquiryForm(input: InquiryFormInput): InquiryValidationResult {
  const errors: Partial<Record<keyof InquiryFormInput, string>> = {};

  if (!input.coupleNames || input.coupleNames.trim().length < 3) {
    errors.coupleNames = 'Please enter both partners’ names (at least 3 characters).';
  }

  const emailTrimmed = (input.email ?? '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
    errors.email = 'Please provide a valid email address for your monograph proposal.';
  }

  if (!input.eventDate || input.eventDate.trim().length === 0) {
    errors.eventDate = 'Please select your anticipated wedding or elopement date.';
  }

  if (!input.venueLocation || input.venueLocation.trim().length < 3) {
    errors.venueLocation = 'Please enter your ceremony city, venue, or destination.';
  }

  if (!input.visionNotes || input.visionNotes.trim().length < 10) {
    errors.visionNotes = 'Please share a few words about your celebration and lighting vision (min 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
