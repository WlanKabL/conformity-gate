# Conformity Gate

A Stranger Things conspiracy theory website investigating the alleged hidden Episode 9. Features live countdown, community chat, evidence database, and admin moderation tools.

## Table of Contents

- [Overview](#overview)
- [The Conspiracy](#the-conspiracy)
- [Features](#features)
  - [Implemented](#implemented)
  - [Planned](#planned)
- [Technical Architecture](#technical-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Deployment](#production-deployment)
- [Configuration](#configuration)
- [Admin System](#admin-system)
- [Security Features](#security-features)
- [SEO & Marketing](#seo--marketing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**Conformity Gate** is a conspiracy theory website centered around the alleged existence of a hidden ninth episode of Stranger Things Season 4. The site serves as a support group and investigation hub for believers who are convinced that Netflix is hiding Episode 9 from the public.

**Live Date**: January 8, 2026, 02:00 AM  
**Target Audience**: Stranger Things fans, conspiracy theorists, online communities  
**Purpose**: Community building, viral marketing, fan engagement  
**Theme**: Stranger Things aesthetic with dark, mysterious, retro-80s vibes

---

## The Conspiracy

### The Theory

Believers in "Conformity Gate" claim that:

- **Episode 9 exists** but Netflix refuses to release it
- Hidden clues in all Season point to a missing episode
- The runtime discrepancies prove content was cut
- Character arcs are incomplete without Episode 9
- Netflix is waiting for the "right moment" to reveal the truth

### Evidence Chain

The site documents alleged evidence across Stranger Things seasons:

- **WSQK Radio Station**: Hidden messages in background audio
- **Number 7**: Recurring symbol throughout the series
- **Fourth Wall Breaks**: Lucas seemingly looking at the camera
- **Timeline Gaps**: Unexplained time jumps in Season 4
- **Vecna's Visions**: Deleted scenes allegedly filmed but never aired
- **Duffer Brothers Hints**: Cryptic social media posts

### Community Reaction

The site features:

- Live countdown to the alleged "reveal date"
- Real-time chat for believers to discuss theories
- Evidence database organized by season
- Timeline of significant events
- FAQ addressing skeptics

---

## Features

### Implemented

#### Landing Page

- **Countdown Timer**: Live countdown to January 8, 2026, 02:00 AM
- **Stranger Things Aesthetic**: Custom fonts, red glowing text, scanlines effect
- **Lightning Animation**: HTML5 Canvas lightning strikes for atmosphere
- **Konami Code Easter Egg**: "Upside Down Mode" animation (↑↑↓↓←→←→BA)
- **Result Display**: Post-countdown message (if Episode 9 exists or not)
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Open Graph tags, Twitter Cards, Schema.org structured data
- **Background Audio**: Vecna Lives theme (autoplay, looping)

#### Chat System

- **Real-time Messaging**: 30-second polling for new messages
- **Message Pagination**: Load older messages with "Load More"
- **Username System**: Persistent usernames via localStorage
- **Stranger Things Theme**: Dark UI with red accents
- **Message Metadata**: Timestamps, IP tracking for moderation
- **Forensic Data**: IP addresses and User-Agent strings stored with messages
- **Chronological Order**: Messages display oldest → newest

#### Admin System

- **JWT Authentication**: Secure token-based admin login
- **Hidden Login Page**: `/admin-login` not linked anywhere
- **Admin Controls**: Delete messages, ban users (visible only to admins)
- **Message Deletion**: Soft delete (shows "Message deleted" to users, original content to admin)
- **Dual Banning**: Ban by username + IP address simultaneously
- **Developer Badge**: Special badge for "wlankabl" username (DEVELOPER)
- **Admin Verification**: JWT token verified on every admin action
- **Compact Icon Buttons**: 24×24px delete (✕) and ban (⊘) buttons
- **Pinia Store**: Admin state management with token persistence

#### Moderation Features

- **Bad Word Filter**: ~90 words (insults, slurs, hate speech, threats)
- **IP-based Rate Limiting**: 3 messages/minute, 20 messages/hour
- **Username Bans**: Banned users cannot post (case-insensitive)
- **IP Bans**: Prevents incognito mode bypass
- **Ban Persistence**: Bans instant effect, no Docker restart needed
- **Message History**: All messages stored for legal/moderation purposes
- **Banned Message Visibility**: Banned user messages stay visible (not auto-deleted)

#### Security

- **JWT Tokens**: No expiry, signed with JWT_SECRET from .env
- **Password Protection**: Admin password stored in .env
- **IP Extraction**: Reads x-forwarded-for and x-real-ip headers
- **Forensic Tracking**: IP + User-Agent stored with every message
- **Username Protection**: "wlankabl" reserved for admin only
- **Git Security**: .env and data files excluded from version control

#### Episode Status System

- **Dynamic Configuration**: `episode-status.json` in public folder
- **No Deployment Needed**: Update status without rebuilding Docker image
- **Result Display**: Shows different content if Episode 9 is real or not

#### Internationalization

- English and German language support
- i18n infrastructure with @nuxtjs/i18n
- No prefix routing strategy
- Language switcher component

#### SEO & Discoverability

- **Meta Tags**: Comprehensive title, description, keywords, robots
- **Open Graph**: Full Facebook/LinkedIn sharing support
- **Twitter Cards**: Large image summary cards
- **Canonical URLs**: Prevent duplicate content
- **Schema.org JSON-LD**: WebSite and Organization structured data
- **Dynamic Sitemap**: Auto-generated at `/sitemap.xml`
- **robots.txt**: Configured for search engine crawlers
- **Semantic HTML**: Header, section, article tags for accessibility

### Planned

#### Evidence Section (High Priority)

- **Season-by-Season Breakdown**: Organized evidence by Stranger Things season
- **Interactive Timeline**: Visual timeline of clues and events
- **Image Galleries**: Annotated screenshots from episodes
- **Video Clip Analysis**: Embedded YouTube clips with commentary
- **Community Evidence Voting**: Upvote/downvote evidence strength
- **Evidence Categories**:
  - Visual clues (screenshots, frame analysis)
  - Audio clues (hidden messages, soundtrack hints)
  - Timeline discrepancies (runtime gaps, continuity errors)
  - Character arc analysis (incomplete storylines)
  - Duffer Brothers hints (social media, interviews)

#### Stranger Things Timeline (High Priority)

- **Complete Chronological Timeline**: All series events in order
- **Highlighted Gaps**: Unexplained time jumps marked
- **Cross-reference Dates**: Real-world vs in-universe timeline
- **Visual Representation**: Interactive timeline slider
- **Evidence Placement**: Show where each piece of evidence appears
- **Season Markers**: Clear separation of seasons/episodes

#### FAQ Page (Medium Priority)

- **Common Questions**: "Is this real?", "Where's the proof?", "Why would Netflix hide it?"
- **Theory Origins**: How Conformity Gate started
- **Community Guidelines**: Respectful discussion rules
- **Legal Disclaimers**: Satire notice, fair use
- **Netflix Response**: Official statements (if any)
- **Debunking Section**: Address skeptic arguments

#### Rules Page (Medium Priority)

- **Chat Conduct Rules**: No harassment, no spam, no illegal content
- **Community Standards**: Respectful debate, evidence-based discussion
- **Moderation Policy**: What gets you banned
- **Ban Appeal Process**: How to appeal (if implemented)
- **Age Restrictions**: 13+ for chat participation

#### Legal Pages (Medium Priority)

- **Imprint**: Legal entity information (GDPR requirement)
- **Privacy Policy**: Data collection, cookies, analytics
- **Terms of Service**: Usage agreement, disclaimer

---

## Technical Architecture

### Frontend

- **Framework**: Nuxt 4.2.1 (Vue 3 Composition API)
- **Styling**: Tailwind CSS 4.1.17
- **State Management**: Pinia 3.0.4
- **Routing**: Nuxt Typed Router
- **Icons**: Nuxt Icon
- **Images**: Nuxt Image
- **Internationalization**: @nuxtjs/i18n
- **SEO**: @nuxtjs/sitemap
- **Utilities**: @vueuse/nuxt

### Backend (API Routes)

- **Runtime**: Nuxt Server API Routes
- **Authentication**: JWT (jsonwebtoken)
- **Storage**: JSON file-based persistence
- **Rate Limiting**: IP-based in-memory + file storage
- **Unique IDs**: nanoid for message IDs

### Data Persistence

All data stored in JSON files (auto-created on first run):

- `data/messages.json`: Chat messages (max 1000, includes IP + User-Agent)
- `data/banned-users.json`: Banned usernames (lowercase)
- `data/banned-ips.json`: Banned IP addresses
- `data/rate-limits.json`: IP-based rate limit tracking
- `public/episode-status.json`: Episode 9 status (true/false)

### API Endpoints

#### Public Endpoints

- `GET /api/messages`: Fetch messages (pagination with before/since)
- `POST /api/messages`: Post new message (rate limited, filtered, tracked)

#### Admin Endpoints (JWT Required)

- `POST /api/admin-login`: Generate JWT token
- `POST /api/admin-verify`: Verify JWT token validity
- `POST /api/ban-user`: Ban user by username + IP
- `POST /api/delete-message`: Soft delete message by ID

#### Sitemap

- `GET /api/__sitemap__/urls`: Dynamic sitemap generation

### Polling Architecture

- **Interval**: 30 seconds
- **Pagination**: 
  - `since` parameter: Load newer messages (used in polling)
  - `before` parameter: Load older messages (used in "Load More")
- **Ordering**: Chronological (oldest → newest)
- **Message Limit**: 1000 messages stored, oldest deleted when exceeded

### Bad Word Filtering

Server-side regex with word boundaries checking for:

- **Insults**: bitch, cunt, whore, slut, etc.
- **Slurs**: n-word, f-word, k-word, r-word, etc.
- **Off-topic Sexual**: porn, sex, nude, dick, cock, etc.
- **Sexual Violence**: rape, molest, assault
- **Threats**: kys, kill yourself, suicide encouragement
- **Hate Speech**: nazi, holocaust denial, white power
- **German Insults**: hurensohn, fotze, schlampe, etc.

**Total**: ~90 words/phrases

---

## Tech Stack

### Core

- **Node.js**: Runtime environment (v18+ recommended)
- **TypeScript**: Type safety and better DX
- **Nuxt 4.2.1**: Meta-framework for Vue 3
- **Vue 3.5.25**: Reactive UI framework
- **Pinia 3.0.4**: State management

### Styling & UI

- **Tailwind CSS 4.1.17**: Utility-first CSS framework
- **@tailwindcss/vite**: Vite plugin for Tailwind
- **Custom Fonts**: Stranger Things Outlined font
- **HTML5 Canvas**: Lightning animation effects

### Backend & API

- **jsonwebtoken**: JWT authentication
- **nanoid**: Unique ID generation
- **fs/promises**: File system operations (Node.js built-in)

### Tooling

- **ESLint 9.39.1**: Code linting with Nuxt config
- **Prettier 3.7.4**: Code formatting
- **TypeScript 5.9.3**: Type checking
- **Nuxt DevTools**: Development debugging

### Deployment

- **Docker**: Container orchestration
- **Docker Compose**: Multi-container management
- **Port**: 8455 (mapped to internal 3000)

---

## Getting Started

### Prerequisites

- **Node.js**: v18+ recommended
- **npm**: v9+ (or pnpm/yarn)
- **Docker**: For production deployment
- **Docker Compose**: For orchestration

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/conformity-gate.git
cd conformity-gate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your secrets (see Configuration section)
```

### Development

```bash
# Start development server
npm run dev

# Server runs on http://localhost:3000
# Chat available at http://localhost:3000/chat
# Admin login at http://localhost:3000/admin-login
```

#### Development Scripts

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Fix formatting
npm run format:fix

# Type check
npm run types:check
```

### Production Deployment

#### Using Docker Compose

```bash
# 1. Update .env with production secrets
nano .env

# Change these:
# ADMIN_PASSWORD=your-secure-password
# JWT_SECRET=your-random-64-character-secret

# Generate JWT secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Build and start Docker container
docker-compose up -d --build

# 3. Check logs
docker-compose logs -f

# 4. Test deployment
# Visit http://your-domain:8455
```

#### First Run

On first run, all JSON files are auto-created:

- `data/messages.json`: Empty array `[]` (will be populated with 15 fake messages)
- `data/banned-users.json`: Empty array `[]`
- `data/banned-ips.json`: Empty array `[]`
- `data/rate-limits.json`: Empty object `{}`
- `public/episode-status.json`: `false` (Episode 9 doesn't exist yet)

**No manual setup required!** All files are created automatically by the API endpoints.

---

## Configuration

### Environment Variables (.env)

```env
# Discord Webhook (optional, for notifications)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...

# Admin password for /admin-login (CHANGE THIS!)
ADMIN_PASSWORD=conformity2026

# JWT Secret for admin authentication (CHANGE THIS!)
JWT_SECRET=conformity-gate-super-secret-2026-change-this-in-production
```

**⚠️ CRITICAL**: Change `ADMIN_PASSWORD` and `JWT_SECRET` before production deployment!

### Episode Status

Edit `public/episode-status.json` to change result:

```json
false  // Episode 9 doesn't exist (default)
true   // Episode 9 is real!
```

Changes take effect immediately, no deployment needed.

### Nuxt Configuration

`nuxt.config.ts` key settings:

```typescript
{
  ssr: false,  // SPA mode for client-side rendering
  site: {
    url: 'https://conformity-gate.com',  // Change to your domain
    name: 'Conformity Gate',
    description: '...'
  },
  sitemap: {
    strictNuxtContentPaths: true,
    autoLastmod: true
  }
}
```

### Docker Compose

`docker-compose.yml` configuration:

```yaml
services:
  app:
    build: .
    ports:
      - "8455:3000"
    volumes:
      - ./data:/app/data  # Persists all chat data
      - ./public/episode-status.json:/app/public/episode-status.json
    env_file:
      - .env
    restart: unless-stopped
```

---

## Admin System

### Login

1. Navigate to `/admin-login` (not linked anywhere)
2. Enter password from `.env` (`ADMIN_PASSWORD`)
3. JWT token stored in localStorage as `conformity-admin-token`
4. Token persists across refreshes (no expiry)

### Admin Controls

**Visible only when JWT-verified admin is logged in**:

#### Delete Message

- **Button**: ✕ (orange, 24×24px icon)
- **Action**: Soft delete - sets `deleted: true` flag
- **User View**: "Message deleted" (grey text)
- **Admin View**: Original message content (for forensics)
- **Purpose**: Remove inappropriate content while preserving evidence

#### Ban User

- **Button**: ⊘ (red, 24×24px icon)
- **Action**: 
  - Bans username (case-insensitive)
  - Bans IP address
  - Writes to `data/banned-users.json` and `data/banned-ips.json`
- **Effect**: User cannot post new messages
- **Visibility**: Banned user's existing messages stay visible
- **Instant**: No Docker restart needed

### Developer Badge

- **Username**: Contains "wlankabl" (case-insensitive)
- **Badge**: DEVELOPER (yellow, visible to all users)
- **Restriction**: Only JWT-verified admin can use this username
- **Frontend Check**: Username input validates against "wlankabl"
- **Backend Check**: JWT token verified when posting with "wlankabl" username

---

## Security Features

### Rate Limiting

- **3 messages per minute** per IP
- **20 messages per hour** per IP
- Tracked in `data/rate-limits.json`
- Timestamps older than 1 hour automatically cleaned
- Error message: "Too many messages. Please slow down."

### Banning System

- **Username Ban**: Case-insensitive, stored in `banned-users.json`
- **IP Ban**: Prevents incognito bypass, stored in `banned-ips.json`
- **Dual Enforcement**: Both checked on every message post
- **Instant Effect**: File read on every request, no cache
- **Error Messages**:
  - Username banned: "You have been permanently banned from the chat."
  - IP banned: "Your IP address has been banned."

### Forensic Tracking

Every message stores:

```json
{
  "id": "unique-nanoid",
  "username": "HawkinsBeliever",
  "content": "Episode 9 is real!",
  "timestamp": 1704672000000,
  "deleted": false,
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..."
}
```

**Purpose**: 
- Legal compliance (GDPR, law enforcement requests)
- Moderation history
- Abuse tracking
- Ban evasion detection

**Privacy**: Not visible to users, admin-only access

### JWT Authentication

- **Token Generation**: Admin login endpoint
- **Signing**: JWT_SECRET from .env
- **Payload**: `{ admin: true }`
- **Expiry**: None (permanent until logout)
- **Verification**: Every admin action checks token validity
- **Storage**: localStorage (`conformity-admin-token`)

### Git Security

`.gitignore` excludes:

```
.env
data/messages.json
data/banned-users.json
data/banned-ips.json
data/rate-limits.json
```

**Never commit secrets or user data!**

---

## SEO & Marketing

### SEO Optimization

#### Meta Tags

- **Title**: "Conformity Gate - Stranger Things Episode 9 Evidence | The Truth Is Out There"
- **Description**: 160 characters with keywords
- **Keywords**: Stranger Things Episode 9, Conformity Gate, hidden episode, Netflix conspiracy
- **Robots**: index, follow, max-image-preview:large
- **Author**: Conformity Gate Community

#### Open Graph (Facebook/LinkedIn)

- **Type**: website
- **URL**: Canonical URL
- **Title**: "Conformity Gate - The Hidden Episode 9 Evidence"
- **Description**: Optimized for social sharing
- **Image**: 1200×630px (create `/public/og-image.jpg`)
- **Locale**: en_US
- **Site Name**: Conformity Gate

#### Twitter Cards

- **Card**: summary_large_image
- **Site**: @ConformityGate
- **Title**: Same as OG
- **Description**: Same as OG
- **Image**: Same as OG image

#### Schema.org JSON-LD

**WebSite Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Conformity Gate",
  "url": "https://...",
  "description": "...",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "..."
  }
}
```

**Organization Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Conformity Gate",
  "url": "...",
  "logo": "...",
  "sameAs": ["https://twitter.com/ConformityGate"]
}
```

#### Sitemap

- **URL**: `/sitemap.xml`
- **Pages**: All public pages with priorities and changefreq
- **Auto-generated**: Updates on deployment

#### robots.txt

```
User-Agent: *
Allow: /
Disallow: /admin-login

Sitemap: https://conformity-gate.com/sitemap.xml
```

### Social Sharing

- **OG Image**: 1200×630px (create and upload to `/public/og-image.jpg`)
- **Twitter Image**: Same as OG image
- **Alt Text**: "Conformity Gate - Stranger Things Episode 9 Investigation"
- **Share Previews**: Optimized for Facebook, Twitter, LinkedIn

### Virality Tactics

1. **Countdown Creates Urgency**: "Only X days until the truth is revealed"
2. **Conspiracy Theory Hooks Curiosity**: People love mysteries
3. **Chat Encourages Engagement**: Real-time discussion builds community
4. **Evidence Section Fuels Discussion**: Share-worthy content
5. **Stranger Things Fandom**: Built-in audience of millions

### Marketing Channels

- **Reddit**: r/StrangerThings, r/FanTheories, r/conspiracy
- **Twitter/X**: #StrangerThings, #ConformityGate hashtags
- **TikTok**: Conspiracy theory videos, evidence breakdowns
- **YouTube**: Theory videos, evidence compilation
- **Discord**: Stranger Things servers
- **Instagram**: Evidence screenshots, countdown posts

---

## Project Structure

```
conformity-gate/
├── .env                          # Environment variables (not in git)
├── .env.example                  # Example env file (commit this)
├── .gitignore                    # Git exclusions
├── docker-compose.yml            # Docker orchestration
├── Dockerfile                    # Docker image config
├── nuxt.config.ts                # Nuxt configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── eslint.config.mjs             # ESLint config
├── README.md                     # This file
├── TODO.txt                      # Project roadmap
├── DEPLOYMENT_CHECKLIST.md       # Deployment guide
│
├── app/
│   └── spa-loading-template.html # Loading screen
│
├── assets/
│   ├── tailwind.css              # Global styles
│   ├── vecnalives.mp3            # Background audio
│   └── Stranger Things Outlined.ttf  # Custom font
│
├── components/
│   ├── ActionButton.vue
│   ├── AppFooter.vue
│   ├── AppHeader.vue
│   ├── CountdownDisplay.vue      # Countdown timer component
│   ├── ResultDisplay.vue         # Post-countdown result
│   ├── LanguageSwitcher.vue
│   ├── ThemeSwitcher.vue
│   └── ... (other components)
│
├── composables/
│   └── useToast.ts               # Toast notifications
│
├── data/                          # JSON storage (auto-created, not in git)
│   ├── messages.json             # Chat messages (max 1000)
│   ├── banned-users.json         # Banned usernames
│   ├── banned-ips.json           # Banned IPs
│   ├── rate-limits.json          # Rate limit tracking
│   └── evidence.ts               # Evidence database
│
├── i18n/
│   └── locales/
│       ├── de.json               # German translations
│       └── en.json               # English translations
│
├── layouts/
│   └── default.vue               # Default layout
│
├── pages/
│   ├── index.vue                 # Landing page (countdown)
│   ├── admin-login.vue           # Hidden admin login
│   ├── chat/
│   │   └── index.vue             # Chat page
│   ├── evidence/
│   │   ├── index.vue             # Evidence overview
│   │   └── submit.vue            # Submit evidence
│   ├── timeline/
│   │   └── index.vue             # Timeline page
│   ├── faq/
│   │   └── index.vue             # FAQ page
│   └── legal/
│       ├── imprint.vue
│       ├── privacy.vue
│       └── terms.vue
│
├── public/
│   ├── robots.txt                # SEO crawl instructions
│   ├── episode-status.json       # Dynamic config (not in git)
│   └── og-image.jpg              # Social media image (create this!)
│
├── server/
│   └── api/
│       ├── admin-login.post.ts   # JWT generation
│       ├── admin-verify.post.ts  # JWT verification
│       ├── ban-user.post.ts      # Ban user endpoint
│       ├── delete-message.post.ts # Delete message endpoint
│       ├── messages.get.ts       # Fetch messages
│       ├── messages.post.ts      # Post message (rate limited)
│       └── __sitemap__/
│           └── urls.ts           # Sitemap generator
│
├── stores/
│   ├── useAdminStore.ts          # Admin state (JWT)
│   └── useSettingsStore.ts       # Settings state (theme, language)
│
└── types/
    ├── chat.ts                   # Chat types + BAD_WORDS list
    ├── evidence.ts               # Evidence types
    └── settings.ts               # Settings types
```

---

## Contributing

This is a conspiracy theory satire project and fan tribute to Stranger Things. Contributions welcome!

### Guidelines

- Follow TypeScript strict mode
- Use Prettier for formatting (`npm run format:fix`)
- Run ESLint before committing (`npm run lint:fix`)
- Test on mobile devices (mobile-first design)
- Respect Stranger Things IP (fair use only)
- Keep the conspiracy theory tone (satirical, mysterious)

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/evidence-section`)
3. Make your changes
4. Run linting and formatting
5. Commit with clear messages
6. Push to your fork
7. Open a Pull Request

### Contribution Ideas

- Evidence section implementation
- Timeline visualization
- FAQ content
- Additional chat features
- Performance optimizations
- Bug fixes
- Documentation improvements

---

## License

MIT License

**Disclaimer**: This is a fan project and satire. Stranger Things is owned by Netflix. No copyright infringement intended. All referenced materials are used under fair use for parody and commentary purposes.

**Not affiliated with Netflix, the Duffer Brothers, or Stranger Things in any official capacity.**

---

## Acknowledgments

- **Stranger Things**: Created by the Duffer Brothers
- **Netflix**: Original series distributor
- **Community**: All the believers who make this fun

---

**The truth is out there. Join us on January 8, 2026.**
