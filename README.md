# Universal Jenga

A hybrid digital party game that combines a physical numbered Jenga tower with randomized challenges delivered via a progressive web application.

## Table of Contents

- [Overview](#overview)
- [Core Concept](#core-concept)
- [Game Modes](#game-modes)
- [Technical Architecture](#technical-architecture)
- [Features](#features)
    - [Implemented](#implemented)
    - [Planned](#planned)
    - [Under Discussion](#under-discussion)
- [Monetization Strategy](#monetization-strategy)
- [Go-to-Market Strategy](#go-to-market-strategy)
- [Success Metrics](#success-metrics)
- [Development Roadmap](#development-roadmap)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

---

## Overview

Universal Jenga is a digital party drinking game that bridges physical and digital gameplay. Players use a numbered Jenga tower (blocks 1-60) while a web application provides randomized challenges for each block number. The application offers multiple difficulty modes, from family-friendly to adults-only content, with a freemium business model.

**Target Audience**: Party-goers, couples, bars, hostels, event venues  
**Primary Markets**: DACH region (DE/AT/CH), with plans for international expansion  
**Revenue Model**: Freemium digital + physical product sales + B2B licensing

---

## Core Concept

### How It Works

1. Players gather around a physical Jenga tower with numbered blocks (1-60)
2. One player opens the web application on their mobile device
3. Players select a game mode (Easy, Drinking, Couple, Spicy, etc.)
4. Player pulls block #23 from the tower
5. Application displays the randomized challenge for block #23
6. When the tower falls, players can start a new game with reshuffled challenges
7. All 60 tasks are randomized per session but remain consistent until manually reshuffled

### Unique Selling Propositions

- **Hybrid Experience**: Physical game meets digital innovation
- **Ice Breaker Mechanism**: Designed to bring people together at parties
- **Adjustable Difficulty**: Suitable for various social contexts
- **Why Numbers Instead of Written Tasks?**
    - Traditional Jenga with written tasks exists (Pinterest, DIY tutorials) - but it's limiting
    - **Replayability**: Tasks are randomized every game - same tower, infinite variety
    - **Dynamic Content**: New tasks get added regularly, old ones get replaced
    - **Multiple Modes**: One numbered tower works for ALL game modes (Party, Drinking, Couples, Family, etc.)
    - **No Commitment**: Don't like a task? Reshuffle and it changes
    - **Scales Better**: Works with any tower size (30, 54, 60+ blocks)
- **No Installation Required**: Instant play via web browser
- **Offline Capability**: PWA enables gameplay without internet connection
- **Multiple Revenue Streams**: Digital premium, physical product, B2B licensing

---

## Game Modes & Difficulty System

Universal Jenga uses a two-dimensional system: **Game Modes** (theme/context) and **Difficulty Levels** (intensity). This architecture enables scalability through expansion packs and granular player control.

### Architecture

**Game Mode** = Thematic context (Who is playing? What environment?)  
**Difficulty** = Intensity level within that context (How far do you want to go?)

This separation allows:

- Expansion packs for new contexts (e.g., "Workplace", "College", "Festival")
- Granular intensity control within each mode
- Cross-mode difficulty consistency (Easy is always family-friendly, regardless of mode)
- Upsell opportunities (base modes free, premium difficulties or modes paid)

---

### Game Modes

#### Party Mode (Free)

**Context**: General social gatherings, bars, house parties  
**Target Audience**: Mixed groups of friends, college parties, bar nights  
**Content Themes**: Drinking, socializing, ice breakers, group challenges

**Available Difficulties**:

- **Easy** (Free): Light drinking, no embarrassment - "Take 2 sips", "Compliment someone"
- **Medium** (Free): Moderate drinking, mild dares - "Waterfall for 5 seconds", "Tell an embarrassing story"
- **Hard** (Premium): Heavy drinking, bold dares - "Take 3 shots", "Kiss someone on the cheek"
- **Extreme** (Premium): Maximum intensity - "Truth or dare combo", "Strip challenges"

---

#### Couples Mode (Premium Base Mode)

**Context**: Romantic partners playing alone or with other couples  
**Target Audience**: Dating couples, married partners, couple game nights  
**Content Themes**: Intimacy, romance, communication, physical affection

**Available Difficulties**:

- **Romantic** (Premium): Sweet, relationship-building - "Share a childhood memory", "Compliment your partner"
- **Playful** (Premium): Light teasing, flirting - "Stare into each other's eyes for 30s", "Massage shoulders"
- **Sensual** (Premium): Physical intimacy, kissing - "Kiss for 10 seconds", "Whisper something sexy"
- **Explicit** (Premium): Adults-only, sexual content - "Remove one piece of clothing", "Body shots"

---

#### Family Mode (Free - Future)

**Context**: Multi-generational gatherings, family game nights  
**Target Audience**: Parents, kids, grandparents playing together  
**Content Themes**: Storytelling, trivia, physical activities, wholesome fun

**Available Difficulties**:

- **Kids** (Free): Ages 6+ - "Do a silly dance", "Make a funny face"
- **Teens** (Free): Ages 13+ - "Do 15 push-ups", "Sing your favorite song"
- **All Ages** (Free): Mixed generations - "Tell a family story", "Group photo pose"

---

### Difficulty Levels Explained

**Difficulty levels are consistent across all game modes** to set clear expectations:

| Difficulty           | Intensity | Age Rating               | Content Guidelines                                |
| -------------------- | --------- | ------------------------ | ------------------------------------------------- |
| **Easy**             | Low       | All Ages (6+)            | No alcohol, no embarrassment, no physical contact |
| **Medium**           | Moderate  | 16+ / 18+ (with alcohol) | Light drinking, mild dares, no sexual content     |
| **Hard**             | High      | 18+                      | Heavy drinking, bold dares, kissing allowed       |
| **Extreme/Explicit** | Maximum   | 18+ (Consent required)   | Sexual content, nudity, intense dares             |

**Mode-specific difficulty names** (like "Romantic", "Sensual" for Couples) map to these base levels but use context-appropriate language.

---

### Monetization Structure

#### Free Tier

- **Party Mode**: Easy + Medium difficulties (50+ tasks each)
- **Family Mode** (when launched): All difficulties

#### Premium One-Time Purchase (€4.99)

- **Party Mode**: Hard + Extreme difficulties unlocked
- **Couples Mode**: Full access to all difficulties (Romantic, Playful, Sensual, Explicit)
- **Custom Tasks**: Create your own challenges
- **Ad-Free**: No interruptions

#### Expansion Packs (€2.99 each or bundled)

**Future revenue stream for new game modes**:

- **Workplace Mode**: Office party edition (Easy/Medium/Hard)
- **College Mode**: Dorm party, Greek life themes
- **Festival Mode**: Rave/concert-specific challenges
- **Bachelorette/Bachelor Mode**: Pre-wedding party pack
- **Holiday Packs**: Christmas, Halloween, New Year's editions

**Bundle Pricing**:

- Premium + 2 Expansion Packs: €9.99 (save €1.97)
- All-Access Pass (unlimited expansions): €14.99

---

## Technical Architecture

### Data Model

```typescript
// Core Types
GameMode: 'party' | 'couples' | 'family' | 'workplace' | 'college' | 'festival'

DifficultyLevel: 'easy' | 'medium' | 'hard' | 'extreme'

// Mode-specific difficulty aliases
PartyDifficulty: 'easy' | 'medium' | 'hard' | 'extreme'
CouplesDifficulty: 'romantic' | 'playful' | 'sensual' | 'explicit'
FamilyDifficulty: 'kids' | 'teens' | 'all-ages'

Task {
  id: string
  mode: GameMode
  difficulty: DifficultyLevel
  text: string
  isPremium: boolean
  ageRating: number  // 6, 13, 16, 18
  category: string
  tags: string[]  // e.g., ['drinking', 'physical', 'verbal']
  requirements?: string[]  // e.g., ['2+ players', 'drink required']
}

GameSession {
  id: string
  mode: GameMode
  difficulty: DifficultyLevel
  taskAssignments: Record<1-60, Task>
  usedBlocks: number[]
  createdAt: timestamp
  isPremiumUnlocked: boolean
  expansionPacks: string[]  // e.g., ['workplace', 'holiday-christmas']
}

ModeConfig {
  id: GameMode
  name: string
  description: string
  isPremium: boolean  // Is the entire mode premium?
  difficulties: {
    id: DifficultyLevel
    displayName: string  // Mode-specific name (e.g., "Romantic" for Couples)
    isPremium: boolean
    ageRating: number
    taskCount: number
  }[]
}
```

### Task Randomization Logic

- Each game session generates a unique mapping of 200+ tasks to 60 block numbers
- Tasks are shuffled using Fisher-Yates algorithm for true randomization
- Mapping persists throughout the session until manual reshuffle
- Used blocks are tracked to provide visual feedback

### State Management

- Pinia stores for game state, mode configuration, and premium status
- LocalStorage for session persistence across page refreshes
- IndexedDB for offline task database (PWA)

---

## Features

### Implemented

#### Core Gameplay

- Mode selection interface with free/premium categorization
- Random task assignment to 60 numbered blocks
- Task display upon block number selection
- Manual reshuffle functionality
- Session persistence

#### UI/UX

- Mobile-first responsive design
- Touch-optimized interactions
- Gradient color schemes per mode
- Smooth animations and transitions

#### Internationalization

- i18n infrastructure using @nuxtjs/i18n
- German and English language support
- Locale detection and manual switching

#### Technical Foundation

- TypeScript for type safety
- Vue 3 Composition API
- Nuxt 3 for SSR and routing
- Tailwind CSS for styling
- ESLint for code quality

---

### Planned

#### Party Sync (High Priority)

**Description**: Real-time synchronization across multiple devices using WebSocket connections.

**Features**:

- Host creates a game session and generates a QR code or 6-digit room code
- Participants scan QR code or enter code to join session
- All devices display the same task simultaneously when host selects a block
- Host controls game flow (next task, reshuffle, end game)
- "Who's turn?" rotation tracker
- Participant list with avatars/names

**Technical Requirements**:

- WebSocket server (Socket.io or similar)
- Room management system
- Session state synchronization
- QR code generation library
- Connection handling for dropped devices

**Challenges**:

- Server infrastructure and hosting costs
- Real-time latency management
- Scaling for multiple concurrent sessions

---

#### Snack Machine Number Pad (High Priority)

**Description**: Retro-styled number input interface with visual state management.

**Features**:

- Bento/grid layout of numbers 1-60
- Already-pulled numbers are greyed out/disabled
- Available numbers are highlighted and clickable
- Visual feedback on hover/touch
- Desktop: Skeuomorphic vending machine aesthetic
- Mobile: Clean, touch-optimized design
- Task "pops up" with animation when number is selected

**UI States**:

- Available (default state)
- Selected (current task being displayed)
- Used (already pulled in this session)
- Locked (premium mode when not unlocked)

---

#### Welcome Page & Onboarding (High Priority)

**Description**: Comprehensive introduction and tutorial system.

**Sections**:

- Hero section with product value proposition
- "How to Play" step-by-step guide with illustrations
- Mode comparison table
- Requirements per mode (players, items, age rating)
- DIY tutorial: "How to Number Your Jenga Tower"
    - Photo/video instructions
    - Printable number stickers template
    - Alternative: Purchase link to pre-numbered set
- Game rules and etiquette
- FAQ section
- Optional: Interactive first-game tutorial

**Compliance**:

- Amazon affiliate link with GDPR-compliant checkbox
- Age verification for 18+ modes
- Terms of service and content warnings

---

#### Task History (Medium Priority)

**Description**: Scrollable log of previously revealed tasks.

**Features**:

- Chronological list of pulled blocks and their tasks
- "What was block #12 again?" quick reference
- Prevents disputes during gameplay
- Swipe-to-reveal for spoiler protection
- Export history to PDF (premium feature)

**UI**:

- Slide-out drawer or dedicated tab
- Minimized by default to keep main UI clean
- Search/filter by block number

---

#### Screenshot Share Functionality (High Priority)

**Description**: Viral marketing through easy social sharing.

**Features**:

- "Share this task" button on task display
- Generates shareable image with:
    - Task text
    - Game mode indicator
    - Watermark with logo and URL
    - "We're playing Universal Jenga" tagline
- Direct share to Instagram Stories, TikTok, WhatsApp
- Copy link to clipboard
- Optional: Blur NSFW content in screenshots

**Technical**:

- HTML-to-canvas rendering
- Web Share API integration
- Open Graph metadata optimization

---

#### Progressive Web App (PWA) (High Priority)

**Description**: Installable, offline-capable application.

**Features**:

- Add to Home Screen functionality
- Offline task database using IndexedDB
- Service Worker for caching
- App manifest with icons and splash screens
- Works without internet after initial load

**Benefits**:

- Faster loading times
- Works in bars/venues with poor WiFi
- Native app experience without app stores
- Reduced server load

---

#### Custom Tasks (Community Feature) (Medium Priority)

**Description**: User-generated content system for task submissions.

**Features**:

- Submit custom tasks via web form
- Categorize by mode and difficulty
- Community voting system (upvote/downvote)
- Moderation queue for admin approval
- Top-rated tasks enter official database
- "Community Mode" with user-generated tasks only

**Moderation**:

- AI-powered content filtering (OpenAI Moderation API)
- Manual review for flagged submissions
- Report system for inappropriate content
- User reputation system

**Gamification**:

- Badge for first task submission
- Leaderboard for most upvoted contributors
- Premium reward for top contributors

---

#### Referral System (Medium Priority)

**Description**: Viral growth through incentivized sharing.

**Options**:

1. "Share with 3 friends → Unlock 1 premium mode for free"
2. "3 referrals → 1 month premium access"
3. Tiered rewards: 5/10/20 referrals unlock different benefits

**Tracking**:

- Unique referral codes per user
- Cookie-based attribution (7-day window)
- Dashboard showing referral stats

**Compliance**:

- GDPR-compliant tracking
- Clear terms on referral page

---

#### Wildcard/Power-Up System (Low Priority)

**Description**: Special events on certain block numbers for gameplay variety.

**Implementation**:

- Predefined special blocks (e.g., #7, #13, #27, #42, #60)
- Random or mode-specific power-ups:
    - "Swap tasks with another player"
    - "Everyone drinks"
    - "Next task is double difficulty"
    - "Choose anyone to take your task"
    - "Immunity: Skip this task"

**UI Indication**:

- Special icon/color on power-up blocks
- Suspenseful reveal animation
- Sound effect (optional)

---

#### Timer Mode (Low Priority)

**Description**: Countdown timer for time-based challenges.

**Features**:

- Integrated countdown timer (15s/30s/60s/custom)
- Pause/resume functionality
- Alarm sound on completion
- Visual progress bar
- Fullscreen mode for visibility

**Use Cases**:

- "Hold a plank for 30 seconds"
- "Drink continuously for 10 seconds"
- "Kiss for 1 minute" (Couple mode)

---

#### Difficulty Selector (High Priority - Core Feature)

**Description**: Core UI for selecting intensity level within chosen game mode.

**Implementation**:

- Mode-specific difficulty names (e.g., Party: Easy/Medium/Hard/Extreme, Couples: Romantic/Playful/Sensual/Explicit)
- Visual indicators for premium-locked difficulties
- Age rating badges (6+, 16+, 18+)
- Task count preview per difficulty
- Persists across sessions
- Quick-adjust during gameplay (reshuffles tasks with new difficulty)

**UI Flow**:

1. Select Game Mode (Party, Couples, etc.)
2. Select Difficulty (shows 2-4 options depending on mode)
3. Preview task example
4. Premium paywall if locked
5. Start game

**Visual Design**:

- Slider or card-based selection
- Color-coded by intensity (green → yellow → orange → red)
- Lock icon on premium difficulties
- "Try 1 task free" preview button

---

#### Expansion Pack Management (Medium Priority)

**Description**: System for purchasing, downloading, and managing additional game mode content.

**Features**:

- Browse expansion pack catalog with previews
- One-click purchase and instant unlock
- "Owned Packs" library view
- Update notifications for new packs
- Bundle deals (buy 3, save 20%)
- Seasonal/limited-time packs

**Expansion Pack Structure**:
Each pack includes:

- New game mode or sub-mode
- 200+ unique tasks
- Custom color scheme and branding
- Mode-specific illustrations/icons
- Exclusive achievements

**Examples**:

- **Workplace Mode** (€2.99): Office party tasks, team building
- **College Mode** (€2.99): Dorm party, Greek life, study break challenges
- **Festival Mode** (€2.99): Rave, concert, camping vibes
- **Holiday Bundle** (€7.99): Christmas, Halloween, New Year's, Valentine's
- **Bachelorette Party Pack** (€3.99): Pre-wedding exclusive content

**Technical**:

- JSON task files downloaded on purchase
- LocalStorage tracking of owned packs
- Server-side purchase validation via Stripe/Gumroad
- Offline support (packs cached in IndexedDB)

---

#### Achievements & Statistics System (High Priority)

**Description**: Gamification layer to increase engagement, retention, and shareability.

**Features**:

- Real-time achievement unlocks during gameplay
- Progress tracking across sessions
- Shareable achievement cards (social media integration)
- Global and personal statistics dashboard
- Unlockable cosmetic rewards

**Achievement Categories**:

**Milestone Achievements**:

- "First Steps": Pull your first block
- "Steady Hands": 5 blocks without tower collapse
- "Tower Master": 10 blocks without collapse
- "Legend": 20 blocks without collapse
- "Impossible": 30+ blocks without collapse
- "Party Starter": Complete your first game
- "Marathon Player": Play 10 games in one session
- "Veteran": Play 50 total games

**Mode-Specific Achievements**:

- "Party Animal": Complete 10 games in Party Mode
- "Romantic": Complete 5 games in Couples Mode
- "Explorer": Try all available modes
- "Difficulty Master": Complete a game on Extreme/Explicit difficulty

**Social Achievements**:

- "Influencer": Share 5 tasks on social media
- "Community Hero": Submit 10 custom tasks
- "Viral Star": Your custom task gets 100+ upvotes
- "Friend Magnet": Invite 5 friends via referral code

**Streak Achievements**:

- "Daily Player": Play 7 days in a row
- "Weekly Warrior": Play every week for a month
- "Dedicated": Play for 30 consecutive days

**Special Achievements**:

- "Lucky Number": Pull your age as block number
- "Unlucky": Pull block #13 on Friday the 13th
- "New Year, New Game": Play at midnight on New Year's
- "Valentine's Couple": Play Couples Mode on Valentine's Day

**Statistics Dashboard**:

- Total games played
- Total blocks pulled
- Longest tower (most blocks without collapse)
- Favorite mode/difficulty
- Time played (total hours)
- Achievement completion percentage
- Rank/Level based on XP system

**Gamification Mechanics**:

- XP system: Earn points for playing, achievements, social sharing
- Level progression (1-50): Unlocks cosmetic themes, special badges
- Daily/Weekly challenges: "Play Party Mode on Hard today" (+50 XP)
- Achievement showcase: Display top 3 on profile

**UI Elements**:

- Achievement notification popup (animated, celebratory)
- Progress bars for milestone achievements
- Badge collection gallery
- Shareable achievement cards (auto-generated graphics)

**Monetization Tie-In**:

- Some achievements unlock discount codes (e.g., "10% off Premium")
- Premium users get exclusive achievement badges
- All-Access Pass holders get special "VIP" badge

**Technical**:

- LocalStorage for achievement tracking
- Server-side validation for anti-cheat (for leaderboards)
- Push notifications for daily challenges (PWA)
- Social media API integration for sharing

---

#### Event Mode (Premium Feature) (Medium Priority)

**Description**: Customizable mode for special occasions.

**Features**:

- Create event-specific game sessions
- Personalized tasks mentioning participants by name
    - "Bride takes 2 shots"
    - "Best man tells embarrassing story"
- Custom event types:
    - Wedding
    - Bachelor/Bachelorette Party
    - Birthday
    - Anniversary
    - Team Building
- Upload participant list
- Generate personalized task set
- Save and reuse events

**Pricing**:

- €9.99 per event (one-time)
- Or included in premium subscription

---

#### Leaderboards & Competitive Features (Medium Priority)

**Description**: Social competition to drive engagement and retention.

**Leaderboard Types**:

**Global Leaderboards**:

- Longest Tower (most blocks pulled without collapse)
- Total Games Played (all-time)
- This Week's Top Players (resets weekly)
- Monthly Champions (resets monthly)

**Mode-Specific Leaderboards**:

- Party Mode Legends
- Couples Mode Champions
- Family Mode Masters

**Challenge Leaderboards**:

- Daily Challenge Winners
- Weekly Challenge Top 10
- Special Event Rankings (e.g., "Halloween Challenge")

**Friend Leaderboards**:

- Compare stats with friends only
- Private group leaderboards (for recurring game nights)

**Features**:

- Anonymous or named participation (user choice)
- Filter by region/country
- Time-based: All-time, yearly, monthly, weekly, daily
- Personal best history graph
- "Beat your friend" challenge system

**Anti-Cheat Measures**:

- Server-side validation of high scores
- Anomaly detection (impossible scores flagged)
- Report system for suspicious entries
- Premium users verified (less cheating)

**Gamification**:

- Top 10 get special badges
- Monthly winner gets free expansion pack
- Hall of Fame for yearly champions

**UI/UX**:

- Quick-access leaderboard button during game
- "You're ranked #247 globally!" notification
- Shareable leaderboard position cards

**Privacy**:

- Opt-in only (default: anonymous)
- GDPR-compliant (user can delete leaderboard data)
- No PII in public leaderboards

---

#### Analytics Dashboard (Admin Only) (High Priority)

**Description**: Business intelligence for product decisions.

**Metrics**:

- Daily/monthly active users
- Mode popularity (play counts)
- Task skip rates (which tasks are skipped?)
- Session duration averages
- Conversion funnel visualization
- Premium conversion rate
- Referral performance
- Geographic distribution
- Device/browser breakdown

**Tools**:

- Plausible Analytics (privacy-focused)
- Google Analytics 4 (if needed)
- Custom event tracking
- A/B testing framework

---

### Under Discussion

#### Advanced Party Sync Features

**Considerations**:

- Voice chat integration for remote play
- Video reactions (camera permission required)
- Voting system: Players vote if task was completed
- Spectator mode for non-players
- Tournament bracket system for multiple groups

**Concerns**:

- Complexity and development time
- Server costs for real-time features
- Privacy implications of video/audio
- May overcomplicate core experience

---

#### Task Downloads / PDF Export

**Considerations**:

- Download all tasks as PDF for offline reference
- Print-friendly format for bars/venues
- Could be marketing tool (share task lists)

**Concerns**:

- May cannibalize premium sales
- Users might share PDFs instead of paying
- Loses randomization element

**Potential Solutions**:

- Only export current session (not full database)
- Watermark with "Generated by Universal Jenga"
- Premium-only feature

---

#### Sound Effects & Haptic Feedback

**Considerations**:

- Task reveal "ding" sound
- Tower fall dramatic sound
- Haptic vibration on task display (mobile)
- Background music per mode
- Mute toggle for quiet venues

**Concerns**:

- Annoying in some contexts (bars are already loud)
- Accessibility considerations
- File size for PWA offline storage

**Decision**: Implement with default OFF, user opt-in

---

#### AI-Generated Tasks

**Considerations**:

- Use GPT-4 to generate infinite unique tasks
- Personalized tasks based on player preferences
- Real-time task generation (no database needed)

**Concerns**:

- API costs per request
- Content moderation challenges
- Latency for task generation
- Quality control

**Status**: Interesting for future, not MVP

---

#### Blockchain/NFT Integration

**Considerations**:

- Mint rare/legendary tasks as NFTs
- Blockchain-based leaderboard
- Crypto payment option

**Concerns**:

- Antithetical to accessible party game concept
- Environmental concerns
- Regulatory complexity
- Target audience mismatch

**Status**: Not pursuing

---

#### Native Mobile Apps (iOS/Android)

**Considerations**:

- Better performance than PWA
- Push notifications
- App Store visibility
- In-app purchase infrastructure

**Concerns**:

- Development and maintenance overhead
- App store fees (30% cut)
- Separate codebases to maintain
- PWA already provides 90% of native benefits

**Decision**: PWA first, native only if clear demand

---

#### Branded Modes for B2B Clients

**Considerations**:

- Custom modes for brands (e.g., "Red Bull Energy Mode")
- White-label versions for event companies
- Custom branding, colors, logos
- Exclusive task sets

**Pricing**:

- €500-2000 per branded mode
- Revenue share on sales (10-20%)

**Status**: Pursue after product-market fit

---

#### Live Streaming Integration

**Considerations**:

- Twitch/YouTube overlay for streamers
- OBS integration
- Viewer voting on tasks
- Streamer-specific modes

**Concerns**:

- Niche audience
- Technical complexity
- Moderation at scale

**Status**: Nice-to-have, low priority

---

## Monetization Strategy

### Digital Revenue (Primary)

#### Freemium Model - Three Tiers

**Tier 1: Free**

- **Party Mode**: Easy + Medium difficulties
- **Family Mode**: All difficulties (when launched)
- Limited to 60 tasks per session
- Ads after every 10 tasks

**Tier 2: Premium Core (€4.99 one-time)**

- **Party Mode**: Hard + Extreme difficulties unlocked
- **Couples Mode**: Full access (all difficulties)
- **Ad-Free**: No interruptions
- **Custom Tasks**: Create your own challenges
- **Unlimited Tasks**: No session limits
- **Task History**: View all previous tasks
- **Event Mode**: Personalized sessions

**Tier 3: All-Access Pass (€14.99 one-time or €4.99/year)**

- Everything in Premium Core
- **All Expansion Packs**: Current and future
- **Early Access**: New modes 2 weeks before public release
- **Exclusive Content**: Special seasonal packs
- **Priority Support**: Direct feedback channel

#### Expansion Packs (€2.99 each)

Individual packs for users who don't want full access:

- Workplace Mode
- College Mode
- Festival Mode
- Holiday Packs (Christmas, Halloween, Valentine's)
- Bachelorette/Bachelor Party Pack

**Bundle Deals**:

- Any 3 Packs: €6.99 (save €2)
- All Current Packs: €9.99 (when 5+ packs exist)

#### Conversion Tactics

- **Try-Before-You-Buy**: Play 3 random premium tasks for free
- **Limited-Time Offers**:
    - "Valentine's Day: Couples Mode 50% off"
    - "Black Friday: All-Access Pass €9.99"
- **Upgrade Path**: "Buy Premium Core + 3 Expansion Packs → Get All-Access Pass discount"
- **Gift Codes**: Purchase as gift for friends
- **Family/Group Plan**: Premium for up to 5 devices (€9.99)

### Physical Product (Secondary)

#### Pre-Numbered Jenga Set

- **Product**: Wooden Jenga tower with laser-engraved numbers (1-60)
- **Retail Price**: €24.99 - €29.99
- **COGS**: €12-15 (manufacturing, packaging, shipping)
- **Profit Margin**: €10-15 per unit
- **Bundling**: Include 6-month premium code in box

#### Distribution Channels

- Direct-to-consumer via website
- Amazon FBA (Fulfillment by Amazon)
- Partnerships with game stores
- B2B bulk orders for bars/venues

### B2B Licensing (Tertiary)

#### Bar & Club Partnerships

- **Offering**: "Universal Jenga Night" event package
- **Pricing**: €50-200/month per venue
- **Includes**:
    - Pre-numbered Jenga set
    - Branded in-app experience
    - Marketing materials (posters, social media assets)
    - Custom mode with bar-specific tasks

#### Hostel & Hotel Licensing

- **Offering**: Entertainment option for common areas
- **Pricing**: €100-500 one-time setup + €20/month
- **Includes**:
    - Multiple Jenga sets
    - Dedicated tablet with app
    - Usage analytics

#### Event Companies

- **Offering**: White-label version for team building, corporate events
- **Pricing**: €1000-5000 per event (custom task creation)
- **Includes**:
    - Branded interface
    - Company-specific tasks
    - Facilitator guide

### Advertising (Optional, Last Resort)

- Display ads for free users after every 5 tasks
- Non-intrusive, skippable after 3 seconds
- Estimated revenue: €0.50-2 CPM
- Only if premium conversion underperforms

---

## Go-to-Market Strategy

### Phase 1: Organic Growth (Months 1-2)

#### Social Media Virality

**TikTok/Instagram Reels**:

- Party reaction videos
- Fail compilations (tower falling)
- Couple mode reactions (with consent)
- "Try not to laugh" challenges
- Behind-the-scenes of game creation

**Content Cadence**: 3-5 posts per week

**Hashtags**: #UniversalJenga #Trinkspiel #PartyGames #DrinkingGames #CoupleGoals

#### Reddit Launch

**Target Subreddits**:

- r/de (German community)
- r/PartyGames
- r/SideProject
- r/gaming
- r/Austria, r/Switzerland

**Approach**: "I built a hybrid drinking game - feedback welcome" (with demo video)

#### Influencer Outreach

**Micro-Influencers (10k-100k followers)**:

- German party/lifestyle influencers
- Couple content creators
- College/university influencers

**Pitch**: Free premium access + custom promo code (10% discount for followers)

**Target**: 20 influencer partnerships in Month 1

### Phase 2: Paid Marketing (Months 3-4)

#### Meta Ads (Facebook/Instagram)

- Retargeting website visitors
- Lookalike audiences from premium purchasers
- Interest targeting: parties, drinking games, board games

**Budget**: €500/month initially, scale based on ROAS

#### Google Ads

- Search: "Trinkspiel online", "Jenga drinking game", "party games"
- Display: Retargeting banner ads

**Budget**: €300/month

#### TikTok Ads

- In-feed video ads of gameplay
- Spark Ads (boost organic content)

**Budget**: €200/month

### Phase 3: Partnerships & PR (Months 5-6)

#### Product Hunt Launch

- Schedule for Tuesday-Thursday launch
- Coordinate with maker community for upvotes
- Offer exclusive discount for PH users

#### Press Outreach

**Target Publications**:

- Niche blogs: Trinkspiele.de, Partyspiele-Info
- Lifestyle: Vice Germany, Broadly, BuzzFeed DE
- Tech: t3n, Gründerszene, deutsche Startups

**Pitch Angle**: "How a digital twist is reviving a classic party game"

#### Bar & Event Partnerships

- Approach 10 bars in Berlin, Munich, Hamburg
- Offer free trial for 1 month
- Co-marketing: Bar promotes game, we promote bar

### Phase 4: Scaling (Months 7-12)

#### International Expansion

- Launch English version (targeting UK, US, Australia)
- Translate to Spanish and French
- Localize tasks for cultural relevance

#### Affiliate Program

- Commission structure: 20% of premium sales
- Recruit party planning blogs, YouTube channels
- Provide affiliate dashboard with tracking

#### Event Sponsorships

- Sponsor university parties, festivals
- Booth at gaming conventions
- Host official "Universal Jenga Championship"

---

## Success Metrics

### Phase 1: Launch (Months 1-2)

- **Users**: 5,000-10,000 unique visitors
- **Active Players**: 500+ game sessions started
- **Premium Conversions**: 50+ purchases (€250 revenue)
- **Social Reach**: 5+ viral posts (>10k views each)
- **Conversion Rate**: 1-2% visitor-to-premium

### Phase 2: Growth (Months 3-6)

- **Users**: 50,000+ unique visitors
- **Active Players**: 5,000+ game sessions per month
- **Premium Conversions**: 500+ purchases (€2,500 revenue)
- **Physical Product**: 100+ Jenga sets sold (€1,000 profit)
- **Social Reach**: 100+ user-generated content posts
- **Conversion Rate**: 2-3%

### Phase 3: Scale (Months 6-12)

- **Users**: 200,000+ unique visitors
- **Active Players**: 20,000+ game sessions per month
- **Premium Conversions**: 2,000+ purchases (€10,000 revenue)
- **Physical Product**: 500+ sets sold (€5,000 profit)
- **B2B Clients**: 10+ bar/venue partnerships (€2,000 revenue)
- **Total Revenue**: €17,000+ per month
- **Break-even**: Achieved

### North Star Metrics

- **Monthly Active Users (MAU)**: Primary growth indicator
- **Premium Conversion Rate**: Primary monetization indicator
- **Session Duration**: Engagement indicator (target: 20+ minutes)
- **Viral Coefficient (K-factor)**: Organic growth indicator (target: >1.2)

---

## Development Roadmap

### Sprint 1-2 (Weeks 1-4): MVP Foundation

- [ ] Core game logic (task randomization, mode selection)
- [ ] Number pad UI with state management
- [ ] Task display interface
- [ ] Mobile-responsive design
- [ ] Welcome page with game rules
- [ ] Payment integration (Stripe/Gumroad)
- [ ] SEO optimization (meta tags, sitemap)
- [ ] Beta testing with 10+ users

### Sprint 3-4 (Weeks 5-8): Polish & Launch Prep

- [ ] PWA implementation (service worker, manifest)
- [ ] i18n setup (DE/EN)
- [ ] Screenshot share functionality
- [ ] Task history drawer
- [ ] Sound effects (with opt-out)
- [ ] Analytics integration (Plausible)
- [ ] Performance optimization
- [ ] Security audit

### Sprint 5-6 (Weeks 9-12): Launch & Iteration

- [ ] Public launch
- [ ] Monitor analytics and user feedback
- [ ] A/B test premium pricing
- [ ] Content marketing (blog posts, social media)
- [ ] Bug fixes and hotfixes
- [ ] Product Hunt launch preparation

### Sprint 7-8 (Weeks 13-16): Growth Features

- [ ] Referral system
- [ ] Custom tasks (community feature)
- [ ] Event mode (premium)
- [ ] Physical product prototypes
- [ ] B2B sales outreach

### Sprint 9-10 (Weeks 17-20): Party Sync

- [ ] WebSocket server setup
- [ ] Room management backend
- [ ] QR code generation
- [ ] Multi-device synchronization
- [ ] Host controls UI
- [ ] Stress testing for 10+ concurrent rooms

### Sprint 11-12 (Weeks 21-24): Scale & Optimize

- [ ] International expansion (ES/FR locales)
- [ ] Advanced analytics dashboard
- [ ] Branded modes for B2B
- [ ] Performance optimization for 100k+ users
- [ ] Advanced moderation tools
- [ ] API documentation for potential integrations

---

## Tech Stack

### Frontend

- **Framework**: Nuxt 3 (Vue 3 + SSR)
- **Language**: TypeScript (strict mode)
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Animations**: CSS transitions + Vue Transition API
- **Icons**: Heroicons or Lucide
- **Build Tool**: Vite

### Backend (for Party Sync)

- **Runtime**: Node.js
- **Framework**: Nitro (Nuxt server engine)
- **WebSockets**: Socket.io
- **Database**: Redis (session storage) + PostgreSQL (user data)
- **ORM**: Prisma (if needed)

### Infrastructure

- **Hosting**: Vercel (frontend) or Cloudflare Pages
- **CDN**: Cloudflare
- **Analytics**: Plausible Analytics (privacy-focused)
- **Payments**: Stripe (credit cards) + Gumroad (alternative)
- **Error Tracking**: Sentry
- **Uptime Monitoring**: BetterStack or UptimeRobot

### Development Tools

- **Version Control**: Git + GitHub
- **CI/CD**: GitHub Actions
- **Code Quality**: ESLint + Prettier
- **Type Checking**: vue-tsc
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Documentation**: TypeDoc (API docs)

### Third-Party Services

- **i18n**: @nuxtjs/i18n
- **Image Optimization**: @nuxt/image
- **PWA**: @vite-pwa/nuxt
- **QR Codes**: qrcode library
- **Screenshot Generation**: html-to-image
- **Content Moderation**: OpenAI Moderation API (for UGC)

---

## Getting Started

### Prerequisites

- Node.js v22+ (specified in `.nvmrc`)
- npm or pnpm
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/WlanKabL/Jenga.git
cd Jenga

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

### Environment Variables

```env
# Base Configuration
BASE_URL=http://localhost:3000

# Payment Integration
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Analytics (optional)
PLAUSIBLE_DOMAIN=universaljenga.com

# Party Sync (when implemented)
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://...
```

### Development Commands

```bash
# Development server (with hot reload)
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test
npm run test:e2e
```

### Project Structure

```
/
├── assets/          # Stylesheets, fonts
├── components/      # Vue components
├── composables/     # Vue composables
├── layouts/         # Nuxt layouts
├── locales/         # i18n translation files
├── pages/           # File-based routing
├── public/          # Static assets
│   └── tasks/       # Task JSON files per mode
├── server/          # Nitro server (API, WebSocket)
├── stores/          # Pinia stores
├── types/           # TypeScript type definitions
├── utils/           # Helper functions
├── nuxt.config.ts   # Nuxt configuration
├── tailwind.config.ts
└── tsconfig.json
```

---

## Contributing

This is currently a private project. Contributions are by invitation only.

### Code Standards

- Follow TypeScript strict mode
- Use Composition API (no Options API)
- Write tests for critical paths
- Document complex logic
- Keep components under 200 lines
- Use semantic commit messages (Conventional Commits)

---

## License

Proprietary - All rights reserved

© 2025 Universal Jenga. This project and its contents are confidential and proprietary. Unauthorized copying, distribution, or use is strictly prohibited.

---

## Contact

**Project Lead**: Philip  
**Repository**: https://github.com/WlanKabL/Jenga  
**Website**: [Coming Soon]

For business inquiries: [contact email]

---

**Last Updated**: December 3, 2025  
**Version**: 0.1.0 (Pre-Alpha)
