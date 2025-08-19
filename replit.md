# CleanBlue Water Technology Platform

## Overview

CleanBlue is a modern web application for a premium water technology company specializing in nanobubble-infused water products. The platform serves as a comprehensive business website featuring product showcases, technology information, customer testimonials, and contact functionality. Built as a full-stack application, it demonstrates advanced water purification technology through an elegant, responsive user interface while providing backend services for data management and customer interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **UI Components**: Radix UI primitives providing accessible, unstyled components

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API services
- **Language**: TypeScript for full-stack type safety
- **Data Storage**: In-memory storage implementation with interface for database abstraction
- **API Design**: RESTful endpoints for products, testimonials, and contact submissions
- **Schema Validation**: Zod for runtime type checking and data validation

### Development Environment
- **Build Tool**: Vite for fast development and optimized production builds
- **Package Manager**: npm with ES modules for modern JavaScript standards
- **Code Quality**: TypeScript strict mode for enhanced type checking
- **Hot Reload**: Vite HMR for rapid development cycles

### Database Design
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema**: Structured tables for products, testimonials, and contact submissions
- **Migration**: Drizzle Kit for database schema management and migrations
- **Connection**: Neon Database serverless PostgreSQL integration

### Component Architecture
- **Design System**: shadcn/ui components with customizable styling variables
- **Layout**: Responsive design with mobile-first approach
- **Accessibility**: ARIA compliance through Radix UI component foundation
- **Performance**: Lazy loading and optimized asset delivery

### API Structure
- **Products API**: CRUD operations for water product catalog management
- **Testimonials API**: Customer review and rating system
- **Contact API**: Form submission handling with validation
- **Error Handling**: Centralized error management with appropriate HTTP status codes

## External Dependencies

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: Pre-built component library based on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icon sets for social media and branding

### Data and Forms
- **TanStack Query**: Server state management and data fetching library
- **React Hook Form**: Performance-focused form library with minimal re-renders
- **Zod**: TypeScript-first schema validation for runtime type safety
- **Drizzle ORM**: Lightweight TypeScript ORM for database operations

### Development Tools
- **Vite**: Next-generation frontend build tool with fast HMR
- **TypeScript**: Static type checking for enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer for browser compatibility

### Database and Hosting
- **Neon Database**: Serverless PostgreSQL for scalable data storage
- **Drizzle Kit**: Database migration and schema management tool
- **connect-pg-simple**: PostgreSQL session store for Express.js

### Utilities
- **date-fns**: Modern date utility library for time formatting
- **clsx**: Utility for conditional className construction
- **class-variance-authority**: Type-safe variant API for component styling
- **nanoid**: Secure URL-friendly unique ID generator