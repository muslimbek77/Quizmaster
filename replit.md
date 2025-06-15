# Quiz Application

## Overview

This is a modern web-based quiz application built for testing knowledge of "Innovatsion Iqtisodiyot" (Innovation Economics) in Uzbek language. The application provides an interactive quiz experience with 50 randomly selected questions from a database of 600+ questions, immediate feedback, and comprehensive results tracking.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend, backend, and database layers:

- **Frontend**: React-based SPA with TypeScript and Tailwind CSS
- **Backend**: Express.js server with TypeScript 
- **Database**: PostgreSQL with Drizzle ORM
- **Build System**: Vite for frontend bundling and development
- **Deployment**: Replit-optimized with autoscale deployment target

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling
- **Vite** for fast development and optimized builds

### Backend Architecture
- **Express.js** server with TypeScript
- **REST API** design with organized route handlers
- **Drizzle ORM** for type-safe database operations
- **Neon Serverless** PostgreSQL driver for cloud database connectivity
- **Session management** with connect-pg-simple for PostgreSQL-backed sessions

### Database Schema
- **Questions table**: Stores quiz questions with multiple choice options and correct answers
- **Quiz sessions table**: Tracks user quiz attempts with scores and answers
- **Users table**: Basic user management (prepared for future authentication)

### Component Structure
- **Quiz Flow**: Welcome screen → Quiz screen → Results screen
- **Modals**: Feedback modal for immediate answer feedback, Review modal for reviewing all answers
- **Reusable UI**: Comprehensive shadcn/ui component library with consistent theming

## Data Flow

1. **Quiz Initialization**: Frontend requests random questions from `/api/quiz/questions`
2. **Question Display**: Questions rendered with multiple choice options
3. **Answer Selection**: User selections tracked in local state with immediate feedback
4. **Quiz Completion**: Final results calculated and displayed with performance metrics
5. **Session Storage**: Quiz sessions can be persisted to database for tracking

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Cloud PostgreSQL connectivity
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@radix-ui/**: Headless UI primitives for accessibility
- **connect-pg-simple**: PostgreSQL session storage

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development server and optimized production builds
- **ESBuild**: Fast backend compilation for production
- **Tailwind CSS**: Utility-first CSS framework

## Deployment Strategy

The application is configured for Replit deployment with:
- **Autoscale deployment target** for automatic scaling
- **Development mode**: `npm run dev` starts both frontend and backend
- **Production build**: Vite builds frontend, ESBuild bundles backend
- **Environment**: Node.js 20 with PostgreSQL 16 module
- **Port configuration**: Development on 5000, production on 80

The build process creates optimized bundles with the frontend served as static files and the backend as a standalone Node.js application.

## Changelog

- June 15, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.