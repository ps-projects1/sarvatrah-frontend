// Booking Calculation API Types

export interface CalculateBookingRequest {
  hotel_id: string;           // MongoDB ID of the hotel
  roomType: string;           // Room type, e.g., "standard", "deluxe", "super deluxe"
  startDate: string;          // Booking start date (YYYY-MM-DD)
  endDate: string;            // Booking end date (YYYY-MM-DD)
  occupancy: number;          // Number of adults (1, 2, 3…)
  childWithBed: boolean;      // Boolean: child with bed
  childWithoutBed: boolean;   // Boolean: child without bed
  vehicleCost: number;        // Vehicle cost in your currency
  priceMarkup: number;        // Vehicle markup percentage
}

export interface BookingCostBreakdown {
  occupancyRate: number;      // Price for selected occupancy per day
  childTotal: number;         // Total child charges per day
  perDayAmount: number;       // Hotel cost per day (occupancy + child)
  hotelCost: number;          // Hotel cost for the selected duration
  vehicleFinal: number;       // Vehicle cost including markup
}

export interface CalculateBookingResponse {
  success: boolean;
  message: string;
  days?: number;              // Number of days in the booking
  finalPackage?: number;      // Total package cost
  breakdown?: BookingCostBreakdown;
}

export interface BookingCalculationError {
  success: false;
  message: string;
}

// Helper type for the API response
export type BookingCalculationResult = CalculateBookingResponse | BookingCalculationError;

// Create Booking API Types

export interface TravellerInfo {
  firstName: string;
  lastName?: string;
  email?: string;
  phone?: string;
  age: number;
  gender: string;
  isLeadTraveller: boolean;
}

export interface BillingInfo {
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface CreateBookingRequest {
  userId: string;
  startDate: string;          // YYYY-MM-DD
  endDate: string;            // YYYY-MM-DD
  bookingDate: string;        // YYYY-MM-DD
  totalPrice: number;
  totalTraveller: number;
  vehicleId: string;
  hotelId: string;
  packageId: string;
  travellers: TravellerInfo[];
  billingInfo: BillingInfo;
}

export interface BookingResponse {
  _id: string;
  user: string;
  holidayPackageId: string;
  vehicleId: string;
  hotelId: string;
  startDate: string;
  endDate: string;
  bookingDate: string;
  totalTraveller: number;
  totalPrice: number;
  status: string;
  travellers: TravellerInfo[];
  billingInfo: BillingInfo;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingResponse {
  message: string;
  booking: BookingResponse;
}

export interface FetchBookingsResponse extends Array<BookingResponse> {}
