
export interface ActivityLocation {
  address?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  location?: string; // For old API format (iframe string)
}

export interface CancellationPolicy {
  isRefundable: boolean;
  refundPercentage?: number;
  cancellationWindowHours?: number;
  policyDescription?: string;
}

export interface ActivityPricing {
  price: number;
  currency?: string;
  [key: string]: unknown;
}

export interface ActivityImage {
  filename?: string;
  path: string;
  mimetype?: string;
  src?: string;
  alt?: string;
}

// Old API description format
export interface ActivityDescriptionObject {
  short_des?: string;
  detail_dec?: string;
}

// Support both string and object formats for description
export type ActivityDescription = string | ActivityDescriptionObject;

export interface Activity {
  _id: string;
  title: string;
  location?: ActivityLocation;
  duration?: number | string; // Can be number (hours) or string
  groupSize?: string | number;
  publicTransportUsed?: string[];
  traveller_facilty?: 'meet_on_location' | 'pickup_available' | string;
  overview?: string;
  description?: ActivityDescription;
  availableLanguages?: string[];
  cancellationPolicy?: CancellationPolicy;
  targetPlaces?: string[];
  included?: string[]; // New API format
  excluded?: string[]; // New API format
  inclusions?: ActivityDescriptionObject; // Old API format
  exclusions?: ActivityDescriptionObject; // Old API format
  pricePerPerson?: number;
  price?: number;
  pricing?: ActivityPricing[];
  images?: string[];
  img?: ActivityImage; // Old API format
  img_link?: ActivityImage[]; // Old API format
  meetingPoint?: string;
  meetingPointName?: string;
  [key: string]: unknown; // For any additional fields
}

export interface SearchParams {
  query: string;
  type?: 'all' | 'hotels' | 'tours' | 'activities' | 'experiences' | 'cars' | 'pilgrimage';
  page?: number;
  limit?: number;
  sort?: 'name_asc' | 'name_desc';
}

export interface SearchResults {
  hotels?: Activity[];
  tours?: Activity[];
  activities?: Activity[];
  experiences?: Activity[];
  cars?: Activity[];
  pilgrimage?: Activity[];
}

export interface SearchResponse {
  success: boolean;
  query: string;
  type: string;
  page: number;
  limit: number;
  sort: string;
  results: SearchResults;
}
