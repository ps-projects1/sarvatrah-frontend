# Project Documentation

## What is this?
A travel and tourism booking platform built with Next.js. Users can browse and book holidays, activities, pilgrimages, and adventure packages.

## Key Features
- Holiday packages with detailed itineraries
- Activity booking system
- Pilgrimage tours
- Adventure packages
- Traveler information collection
- Booking management

## Tech Stack
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React, React Icons
- **State Management**: TanStack Query
- **Date Handling**: date-fns, react-day-picker
- **TypeScript**: Full type safety

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
npm start
```

## Project Structure
```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── holiday/           # Holiday packages
│   ├── activities/        # Activity listings & details
│   ├── adventure/         # Adventure packages
│   ├── pilgrimage/        # Pilgrimage tours
│   ├── booking/           # Booking flow
│   └── activity-booking/  # Activity booking flow
│
└── components/
    ├── Header.tsx         # Navigation
    ├── Footer.tsx         # Footer
    ├── SafeImage.tsx      # Secure image component
    ├── home/              # Homepage sections
    ├── holidayDetails/    # Holiday package components
    ├── activities/        # Activity components
    ├── booking/           # Booking form components
    ├── activity-booking/  # Activity booking components
    └── ui/                # Reusable UI components
```

## Key Pages
- `/` - Homepage with destinations and testimonials
- `/holiday` - Browse holiday packages
- `/holiday/[id]` - Holiday details with itinerary
- `/activities` - Browse activities
- `/activities/[id]` - Activity details
- `/adventure` - Adventure packages
- `/pilgrimage` - Pilgrimage tours
- `/booking/[id]` - Complete booking for holidays
- `/activity-booking/[id]` - Complete booking for activities

## Important Components

### SafeImage
Secure image rendering with sanitization using DOMPurify

### Itinerary System
- DayHeader - Daily schedule header
- ActivityCard - Activity details
- HotelCard - Accommodation info
- TransferCard - Transportation details
- EndOfDayCard - Day summary

### Booking Flow
- TravellerDetails - Collect passenger info
- BookingSummary - Review and confirm
- PaymentSection - Payment processing

## Notes for Developers
- All pages use client components (`"use client"`)
- Images should use SafeImage component for security
- Use Radix UI for consistent component behavior
- TanStack Query handles data fetching
- Follow existing component patterns in `/components/ui`

## Security
- Content sanitization with DOMPurify
- Security headers configured
- Safe image rendering

## Tips
- Hot reload works automatically
- Check console for TypeScript errors
- Use existing UI components before creating new ones
- Follow the established folder structure
