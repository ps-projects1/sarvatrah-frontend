
export interface ActivityLocation {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
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
  _id?: string;
  ticket_category: string;
  occupancy: number;
  price: number;
  currency?: string;
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

export interface CategoryTheme {
  category: string[];
  theme: string[];
}

export interface AvailabilityDetail {
  _id?: string;
  day: string;
  isOpen: boolean;
  is24Hours: boolean;
  openHour: string;
  closeHour: string;
}

export interface StartTime {
  _id?: string;
  start_time: string;
  duration: string;
  internal_label: string;
  external_label: string;
  product_code: string;
}

export interface MeetingPoint {
  _id?: string;
  address: string;
  country: string;
  city: string;
  pin_code: string;
  pickup: string;
  drop: string;
}

export interface RRule {
  freq: string;
  interval: number;
  dtstart: string;
  count: number;
  byhour: number[];
}

export interface Participant {
  minimum: number;
  maximum: number;
}

export interface CalendarEvent {
  _id?: string;
  experienceId: string;
  title: string;
  isBlackout: boolean;
  rrule: RRule;
  participant: Participant;
}

export interface Experience {
  _id: string;
  title: string;
  location?: ActivityLocation;
  category_theme?: CategoryTheme;
  description?: ActivityDescriptionObject;
  inclusions?: ActivityDescriptionObject;
  exclusions?: ActivityDescriptionObject;
  video_link?: string[];
  predefinedTimeAllowances?: string;
  availability_detail?: AvailabilityDetail[];
  start_time?: StartTime[];
  allow_custom_availability?: boolean;
  capacity?: string;
  pricing?: ActivityPricing[];
  meeting_point?: MeetingPoint[];
  calender_events?: CalendarEvent[];
  groupSize?: number;
  cancelation_policy?: string;
  img_link?: ActivityImage[];
  duration?: string;
  availabilityType?: string;
  traveller_facilty?: 'meet_on_location' | 'pickup_available' | string;
}

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
  meeting_point?: MeetingPoint[];
  category_theme?: CategoryTheme;
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
