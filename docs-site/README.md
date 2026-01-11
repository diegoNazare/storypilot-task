# Storyteller Documentation Site

Beautiful, minimal documentation for the Storyteller personalized video feeds system.

## Quick Start

### Development Mode
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm install
npm run build
npm start
```

## Structure

- `/` - Overview and introduction
- `/architecture` - System components and data flows
- `/api` - API contract and endpoint specifications
- `/data-model` - Database schemas and relationships
- `/implementation` - Technical decisions and trade-offs
- `/rollout` - Feature flags and observability
- `/ai` - AI usage write-up

## Design Language

The site follows a minimal, brutalist aesthetic with:
- **Colors**: Black/white/grey palette
  - Ink: #1A1A1A (primary text)
  - Paper: #FFFFFF (background)
  - Cloud: #FAFAFA (subtle backgrounds)
  - Silver: #8A8A8A (secondary text)
  - Mist: #E5E5E5 (borders)
- **Typography**: 
  - Bebas Neue for headlines (uppercase, bold)
  - Roboto Condensed for body text
- **Patterns**: Subtle diagonal stripes, dots, grids for visual interest
- **Style**: No drop shadows, no gradients, clean whitespace
- **Layout**: Fixed sidebar navigation, responsive mobile menu

Inspired by the nazfer project's design language.

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety
- **Tailwind CSS v4**: Utility-first styling
- **Lucide Icons**: Minimal icon set

## Features

- 📱 **Responsive**: Mobile-friendly navigation
- 🎨 **Beautiful Design**: Minimal, modern aesthetic
- 📝 **Comprehensive**: All deliverables in one place
- 🔍 **Easy Navigation**: Clear sidebar with sections
- 💻 **Code Examples**: Syntax-highlighted with copy buttons
- ⚡ **Fast**: Static generation for optimal performance
