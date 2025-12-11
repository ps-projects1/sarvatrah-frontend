
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

export interface AvailableVehicle {
  vehicleType: string;
  price: number;
  rate: number;
  seatLimit: number;
  vehicle_id: string;
  brandName: string;
  modelName: string;
}

export interface HolidayPackage {
  _id: string;
  packageDuration: PackageDuration;
  objectType: "holidays" | "pilgrimage" | "special";
  packageName: string;
  themeImg: ThemeImg;
  selectType: "domestic" | "international" | "both";
  uniqueId: string;
  packageType: "family" | "honeymoon" | "adventure" | "luxury" | "budget" | "group" | "custom";
  destinationCity: (string | DestinationCity)[];
  startCity: string;
  highlights: string;
  include: string;
  exclude: string;
  createPilgrimage: boolean;
  displayHomepage: boolean;
  recommendedPackage: boolean;
  roomLimit: number;
  partialPayment: boolean;
  partialPaymentDueDays: number;
  partialPaymentPercentage: number;
  cancellationPolicyType: "refundble" | "non-refundble";
  refundablePercentage: number;
  refundableDays: number;
  priceMarkup: number;
  inflatedPercentage: number;
  active: boolean;
  images: ThemeImg[];
  itinerary: ItineraryDay[];
  vehiclePrices: VehiclePrice[];
  availableVehicle: AvailableVehicle[];
  packagePrice?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown;
}

// API Request/Response Types

// 1.2 User Holiday Package List
export interface UserHolidayPackageListParams {
  page?: number;
  limit?: number;
  packageType?: string;
  nights?: string; // e.g., "5", "<7", ">3", "3-7"
  objectType?: "holidays" | "pilgrimage" | "special";
  selectType?: "domestic" | "international" | "both";
  destinationCity?: string;
  recommendedPackage?: boolean;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface UserHolidayPackageListResponse {
  success: boolean;
  message: string;
  data: {
    holidayPackages: HolidayPackage[];
    pagination: PaginationInfo;
  };
}

// 1.4 Advanced Package Search
export interface AdvancedPackageSearchRequest {
  page?: number;
  page_size?: number;
  sort_by_price?: "asc" | "desc";
  budget_range?: {
    gt?: number;
    lt?: number;
  };
  tour_duration?: {
    gt?: number;
    lt?: number;
  };
  theme?: string;
}

export interface AdvancedPackageSearchResult {
  _id: string;
  packageName: string;
  packageDuration: PackageDuration;
  themeImg: ThemeImg;
  perPersonRate: number;
  totalHotelRate: number;
  totalTransferRate: number;
  totalActivitiesRate: number;
  noOfHotels: number;
  noOfVehicles: number;
  noOfActivities: number;
}

// 2.1 Package Details Request
export interface RoomConfiguration {
  roomType: string;
  adults: number;
  children?: {
    withBed: number;
    withoutBed: number;
  };
}

export interface PackageDetailsRequest {
  startDate: string; // YYYY-MM-DD
  rooms: RoomConfiguration[];
  vehicle?: string;
  hotels?: string[];
}

export interface VehicleOption {
  _id: string;
  vehicleType: string;
  vehicleCategory: string;
  brandName: string;
  seatLimit: number;
  rate: number;
}

export interface PackageDetailsResponse {
  success: boolean;
  message: string;
  data: HolidayPackage & {
    vehicleOptions?: VehicleOption[];
  };
}

// 3.1 Itinerary Information
export interface ItineraryActivity {
  sequence: number;
  objType: string;
  activityID: string;
  vehicleCategory?: string;
  vehicleType?: string;
  price?: number;
  seatLimit?: number;
  quantity?: number;
  totalPrice?: number;
}

export interface ItineraryDayInfo {
  title: string;
  dayCount: number;
  place: string;
  activities: ItineraryActivity[];
}

export interface ItineraryResponse {
  itinerary: ItineraryDayInfo[];
}

// 3.2 Vehicle Options
export interface VehicleUpdateOption {
  vehicleCategory: string;
  activityID: string;
  vehicleType: string;
  price: number;
  seatLimit: number;
  quantity: number;
  totalPrice: number;
}

// 3.3 Hotel Options
export interface HotelRoom {
  roomType: string;
  child: {
    childWithBedPrice: number;
    childWithoutBedPrice: number;
  };
  occupancyRates: number[];
  amenities: string[];
  duration: Array<{
    startDate: string;
    endDate: string;
    _id: string;
  }>;
  totalPrice: number;
  payable: number;
  _id: string;
}

export interface HotelOption {
  _id: string;
  objectType: string;
  hotelType: string;
  hotelName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phoneNumber: string;
  email: string;
  contactPerson: string;
  imgs: Array<{
    filename: string;
    path: string;
    mimetype: string;
  }>;
  rooms: HotelRoom[];
}
