# Wisdom SaaS - Project Details

## Overview

Wisdom SaaS is an AI-powered educational platform that allows users to create, personalize, and interact with virtual learning companions ("Companions") tailored to various subjects. The platform leverages modern web technologies and cloud services to deliver a customizable, interactive, and scalable learning experience.

## Key Features

- **AI Companions:** Users can build and personalize AI-powered companions for subjects like Maths, Science, Language, Coding, History, and Economics.
- **Session Management:** Track and revisit recent learning sessions with companions.
- **Customizable Learning:** Choose companion name, subject, topic, voice (male/female), style (formal/casual), and session duration.
- **Companion Library:** Browse, search, and filter a library of available companions.
- **User Authentication:** Secure sign-in and user management via Clerk.
- **Cloud Database:** All data (companions, sessions, bookmarks) is stored and managed via Supabase.
- **Premium Features:** Subscription and plan management for advanced features and increased limits.
- **Monitoring & Error Tracking:** Integrated Sentry for real-time error monitoring and performance tracking.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) (App Router, SSR, API routes)
  - [React 19](https://react.dev/)
  - [Tailwind CSS](https://tailwindcss.com/) (with PostCSS)
  - [Radix UI](https://www.radix-ui.com/) (UI primitives)
  - [Lottie React](https://lottiereact.com/) (animations)
- **Backend & Cloud:**
  - [Supabase](https://supabase.com/) (Postgres DB, Auth, API)
  - [Vapi AI](https://vapi.ai/) (AI/voice SDK integration)
  - [Clerk](https://clerk.com/) (Authentication, user management, pricing table)
  - [Sentry](https://sentry.io/) (Monitoring & error tracking)
- **State & Forms:**
  - [React Hook Form](https://react-hook-form.com/) (form management)
  - [Zod](https://zod.dev/) (schema validation)
- **Other Libraries:**
  - [clsx](https://github.com/lukeed/clsx), [class-variance-authority], [lucide-react] (icons), [@jsmastery/utils]

## Directory Structure (Partial)

- `/app` - Main Next.js app, routes, and pages
- `/components` - UI and logic components (CompanionCard, CompanionsList, CompanionForm, etc.)
- `/lib` - Core logic, API clients, utilities (Supabase, Vapi, actions)
- `/constants` - Subjects, colors, and other static data
- `/public` - Static assets (icons, images)

## How It Works

1. **Sign Up/Login:** Users authenticate via Clerk.
2. **Build a Companion:** Users fill out a form to create a new AI companion, choosing subject, topic, voice, style, and duration.
3. **Start a Session:** Launch a session with a companion for interactive learning.
4. **Track Progress:** View recent sessions, bookmark companions, and manage your library.
5. **Upgrade:** Subscribe for premium features and higher limits.

## Getting Started

- Install dependencies: `npm install`
- Run development server: `npm run dev`
- Visit: [http://localhost:3000](http://localhost:3000)

## Deployment

- Designed for deployment on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## License

This project is proprietary and not open source by default. Contact the author for licensing details.
