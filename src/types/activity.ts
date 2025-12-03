
export interface ActivityLocation {
  address?: string;
  city?: string;
  state?: string;
  latitude?: number;
  longitude?: number;
  location?: string;
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

export interface ActivityDescriptionObject {
  short_des?: string;
  detail_dec?: string;
}

export type ActivityDescription = string | ActivityDescriptionObject;

export interface Activity {
  _id: string;
  title: string;
  location?: ActivityLocation;
  duration?: number | string;
  groupSize?: string | number;
  publicTransportUsed?: string[];
  traveller_facilty?: 'meet_on_location' | 'pickup_available' | string;
  overview?: string;
  description?: ActivityDescription;
  availableLanguages?: string[];
  cancellationPolicy?: CancellationPolicy;
  targetPlaces?: string[];
  included?: string[];
  excluded?: string[];
  inclusions?: ActivityDescriptionObject;
  exclusions?: ActivityDescriptionObject;
  pricePerPerson?: number;
  price?: number;
  pricing?: ActivityPricing[];
  images?: string[];
  img?: ActivityImage;
  img_link?: ActivityImage[];
  meetingPoint?: string;
  meetingPointName?: string;
  [key: string]: unknown;
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
