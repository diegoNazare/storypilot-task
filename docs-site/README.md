# Storypilot Documentation Site

Beautiful, minimal documentation for the Storypilot personalized video feeds system.

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

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your Git repository
   - Configure project settings:
     - **Root Directory**: `docs-site`
     - **Framework Preset**: Next.js (auto-detected)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)

3. **Environment Variables** (optional):
   - Add `NEXT_PUBLIC_API_URL` if you have a deployed API
   - Example: `https://your-api.railway.app`
   - Leave empty to hide prototype links

4. **Deploy**: Click "Deploy" and wait for build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy from docs-site directory**:
   ```bash
   cd docs-site
   vercel
   ```

3. **Follow the prompts**:
   - Link to existing project or create new one
   - Accept default settings

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Environment Variables

The site uses one optional environment variable:

- **`NEXT_PUBLIC_API_URL`**: URL of the prototype API
  - Development: `http://localhost:3001`
  - Production: Your deployed API URL (e.g., Railway)
  - Empty/unset: Hides "Try Demo API" links

To set in Vercel:
- Dashboard: Project Settings → Environment Variables
- CLI: During deployment prompts or via `vercel env add`

### After Deployment

Your documentation will be live at:
- **Production**: `https://your-project-name.vercel.app`
- **Preview**: Automatic preview URLs for pull requests
- **Auto-deploy**: Every push to main branch triggers deployment

### Troubleshooting

**Build fails:**
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard
- Test locally with `npm run build`

**Environment variables not working:**
- Must start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding/changing env vars
