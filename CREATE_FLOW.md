# Create Flow - Route Structure

This document describes the new route-based structure for the game creation flow.

## Routes

### 1. `/create` - Mode Selection

**File:** `pages/create/index.vue`

- **Purpose:** Select game mode
- **Guards:**
    - Age warning modal for 18+ modes
- **Next:** Navigate to `/create/[mode]`

**Features:**

- Shows only active game modes
- Age badges (e.g., "18+")
- Age warning modal for restricted content
- Clean card-based UI with hover animations

---

### 2. `/create/[mode]` - Difficulty Selection

**File:** `pages/create/[mode].vue`

- **Purpose:** Select difficulty level for chosen mode
- **Guards:**
    - Mode must exist and be active (404 if not)
    - Premium modal for premium difficulties
- **Next:** Navigate to `/create/[mode]/[difficulty]`

**Features:**

- Shows mode name and age rating
- Back button to mode selection
- FREE/PRO badges on difficulty cards
- Premium modal with upgrade CTA
- Clean card-based UI with hover animations

**Type Safety:**

- Route param `mode` is validated against `GameModeId`
- Only shows difficulties for selected mode
- TypeScript ensures difficulty belongs to mode

---

### 3. `/create/[mode]/[difficulty]` - Block Count & Start

**File:** `pages/create/[mode]/[difficulty].vue`

- **Purpose:** Set block count and start game
- **Guards:**
    - Mode must exist and be active (404 if not)
    - Difficulty must exist for this mode (404 if not)
    - Difficulty premium check (403 if user not premium)
- **Next:** Navigate to `/play` (TODO: when implemented)

**Features:**

- Breadcrumb showing mode → difficulty
- Back button to difficulty selection
- Block count selector (39-60 in steps of 3)
- Interactive slider + increment/decrement buttons
- Start game button with loading state
- Console.log placeholder for game creation

**Type Safety:**

- Route params validated at runtime
- TypeScript ensures difficulty matches mode
- Generic types maintain type safety

---

## Guards & Validation

### Route Guards (implemented as `createError`)

1. **Mode exists and is active** (`/create/[mode]`)
    - Returns 404 if mode not found
    - Returns 404 if mode is inactive

2. **Difficulty exists for mode** (`/create/[mode]/[difficulty]`)
    - Returns 404 if difficulty not found
    - Returns 404 if difficulty doesn't belong to mode

3. **Premium check** (`/create/[mode]/[difficulty]`)
    - Returns 403 if difficulty is premium and user not subscribed
    - Currently uses placeholder `isPremiumUser` ref
    - TODO: Replace with actual auth store check

### Modal Guards (implemented as modals)

1. **Age warning** (`/create`)
    - Shows modal for 18+ modes
    - User must confirm age to proceed
    - Can cancel to go back

2. **Premium required** (`/create/[mode]`)
    - Shows modal for premium difficulties
    - Links to `/pricing` page
    - Can cancel to stay on difficulty selection

---

## Benefits of Route-Based Structure

### 1. **Shareability**

Users can share direct links to specific steps:

- Share a mode: `/create/drinking`
- Share a full setup: `/create/drinking/hard`

### 2. **Separation of Concerns**

Each step is a separate page with its own:

- State management
- Guards and validation
- SEO metadata
- Clear responsibility

### 3. **Better UX**

- Browser back button works naturally
- Bookmarkable URLs
- Clear navigation breadcrumbs
- Progressive disclosure

### 4. **Type Safety**

- Route params validated at runtime
- TypeScript prevents invalid mode/difficulty combos
- Compile-time checking with generics

### 5. **Extensibility**

Easy to add:

- More steps (e.g., player setup)
- Custom guards (e.g., auth check)
- Analytics tracking per step
- A/B testing per page

---

## TODO: Premium Integration

Currently uses placeholder for premium check:

```typescript
const isPremiumUser = ref(false); // TODO: Replace with auth store
```

When auth is implemented:

1. Create `useAuthStore` or similar
2. Replace `isPremiumUser` with actual check
3. Update guards in both modal and route
4. Add login redirect if needed

---

## Design Consistency

All pages maintain the same design language:

- Red-orange gradient theme
- Smooth transitions and animations
- Dark/light mode support
- Consistent spacing and typography
- Hover effects on interactive elements
- Age badges and premium badges
- Back buttons with icon animations

No layout or design changes were made during refactor - only routing structure improved! ✨
