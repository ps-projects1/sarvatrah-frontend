
export interface PackageDuration {
  days: number;
  nights: number;
}

export interface DestinationCity {
  _id: string;
  name: string;
  state: string;
  country: string;
}

export interface ThemeImg {
  filename: string;
  path: string;
  mimetype: string;
}

export interface Transport {
  type: string;
  details: string;
}

export interface Activity {
  type: string;
  title: string;
  description: string;
  duration: string;
}

export interface ItineraryDay {
  dayNo: number;
  title: string;
  subtitle: string;
  description: string;
  stay: boolean;
  hotel_id?: string;
  state?: string;
  city?: string;
  mealsIncluded: string[];
  transport: Transport;
  placesToVisit: string[];
  activities: Activity[];
  notes?: string;
  [key: string]: unknown;
}

export interface VehiclePrice {
  vehicle_id: string;
  vehicleType: string;
  price: number;
}

export interface HolidayPackage {
  _id: string;
  packageDuration: PackageDuration;
  objectType?: string;
  packageName: string;
  themeImg: ThemeImg;
  selectType: string;
  uniqueId?: string;
  packageType: string;
  destinationCity: (string | DestinationCity)[];
  highlights: string;
  createPilgrimage?: boolean;
  displayHomepage?: boolean;
  recommendedPackage?: boolean;
  roomLimit?: number;
  partialPayment: boolean;
  partialPaymentDueDays: number;
  partialPaymentPercentage: number;
  cancellationPolicyType?: string;
  refundablePercentage?: number;
  refundableDays?: number;
  include: string;
  exclude: string;
  priceMarkup: number;
  inflatedPercentage: number;
  active?: boolean;
  startCity: string;
  images: Array<{
    filename: string;
    path: string;
    mimetype: string;
  }>;
  itinerary: ItineraryDay[];
  vehiclePrices: VehiclePrice[];
  availableVehicle?: unknown[];
  packagePrice?: number;
  [key: string]: unknown;
}
