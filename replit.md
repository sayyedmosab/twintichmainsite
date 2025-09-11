# AI Twin Tech

## Project Overview
AI Twin Tech is a React-based web application built with Vite, featuring 3D animations using Three.js, user authentication with Supabase, and an interactive forum system. The application provides lessons on architecture and includes various interactive components.

## Architecture
- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.12
- **3D Graphics**: Three.js with React Three Fiber
- **Authentication**: Supabase (database and auth)
- **Routing**: React Router DOM 7.8.0

## Current Status
- Successfully imported from GitHub and configured for Replit environment
- Environment variables configured for Supabase integration
- Frontend server running on port 5000
- Deployment configuration set up for autoscale target
- All dependencies installed and no LSP errors

## Key Features
- User authentication (login/register with email, Google, Apple)
- Interactive 3D Rubik's cube animations
- Forum system for discussions
- Architect lessons and roadmap
- Responsive design with Tailwind CSS

## Recent Changes (September 11, 2025)
- Fixed security vulnerability by removing exposed API keys from vite.config.ts
- Updated Vite configuration to use port 5000 and proper host settings for Replit proxy
- Configured environment variables for Supabase integration
- Set up frontend workflow for development server
- Configured deployment settings for production

## Project Structure
- `src/components/` - Reusable React components including UI components
- `src/pages/` - Page components for different routes
- `src/services/` - Service layer including Supabase client
- `src/context/` - React context providers (AuthContext)
- `public/` - Static assets including 3D animation files and lesson content

## Environment Variables Required
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## User Preferences
- No specific user preferences documented yet