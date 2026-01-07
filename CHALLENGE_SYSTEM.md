# Challenge System - Type-Safe Structure

## Overview

Fully type-safe challenge system with mode/difficulty validation and rich metadata.

## Types

### Core Types

```typescript
// Challenge categories
type ChallengeCategory =
    | "truth"
    | "dare"
    | "action"
    | "question"
    | "game"
    | "drinking"
    | "physical"
    | "creative"
    | "social"
    | "intimate";

// Who performs the challenge
type ChallengeTarget = "self" | "group" | "other" | "pair" | "all";

// Duration estimates
type ChallengeDuration = "quick" | "medium" | "long"; // <1min, 1-3min, >3min

// Intensity levels
type ChallengeIntensity = "light" | "moderate" | "intense" | "extreme";
```

### Challenge Interface

```typescript
interface Challenge<T extends GameModeId = GameModeId> {
    id: string; // Unique ID
    mode: T; // Game mode (validated)
    difficulties: DifficultyId<T>[]; // Valid difficulties for mode
    category: ChallengeCategory; // Challenge type
    target: ChallengeTarget; // Who does it
    duration: ChallengeDuration; // Time estimate
    intensity: ChallengeIntensity; // How intense
    i18nKey: string; // Translation key
    isPremium: boolean; // Requires subscription
    requiresProps: boolean; // Needs items
    props?: string[]; // Required items list
    minAge?: number; // Age override
    tags?: string[]; // Search/filter tags
    canDecline?: boolean; // Can skip without penalty
    groupChallenge?: boolean; // Affects all players
}
```

## Type Safety

### Mode/Difficulty Validation

TypeScript ensures only valid difficulty IDs for each mode:

```typescript
// ✅ Valid - "easy" belongs to "drinking"
defineChallenge({
    mode: "drinking",
    difficulties: ["easy", "hard"],
    // ...
});

// ❌ Compile error - "icebreaker" doesn't belong to "drinking"
defineChallenge({
    mode: "drinking",
    difficulties: ["icebreaker"], // TypeScript error!
    // ...
});
```

### Generic Helper

Use `defineChallenge<T>()` for full type inference:

```typescript
const challenge = defineChallenge({
    mode: "party",
    difficulties: ["icebreaker"], // TypeScript validates this!
    // ... rest of properties
});
```

## Example Challenges

### Drinking Mode

```typescript
{
  id: "drinking-001",
  mode: "drinking",
  difficulties: ["easy", "hard"],
  category: "drinking",
  target: "self",
  duration: "quick",
  intensity: "light",
  i18nKey: "challenges.drinking.001", // "Take 2 sips of your drink"
  isPremium: false,
  requiresProps: false,
}
```

### Party Mode (Group)

```typescript
{
  id: "party-042",
  mode: "party",
  difficulties: ["icebreaker", "spicy"],
  category: "game",
  target: "group",
  duration: "medium",
  intensity: "moderate",
  i18nKey: "challenges.party.042", // "Everyone: Show your best dance move!"
  isPremium: false,
  requiresProps: true,
  props: ["phone", "timer"],
  groupChallenge: true,
}
```

### Couples Mode (Intimate)

```typescript
{
  id: "couples-015",
  mode: "couples",
  difficulties: ["romantic", "afterdark"],
  category: "intimate",
  target: "pair",
  duration: "medium",
  intensity: "moderate",
  i18nKey: "challenges.couples.015",
  isPremium: true, // Premium only
  requiresProps: false,
}
```

### Family Mode (Kid-friendly)

```typescript
{
  id: "family-008",
  mode: "family",
  difficulties: ["kids", "teens"],
  category: "creative",
  target: "self",
  duration: "quick",
  intensity: "light",
  i18nKey: "challenges.family.008",
  isPremium: false,
  minAge: 6,
}
```

## Helper Functions

### Get Challenges for Mode/Difficulty

```typescript
const challenges = getChallengesForMode("drinking", "easy");
// Returns: Challenge<"drinking">[]
```

### Get Random Challenge

```typescript
const challenge = getRandomChallenge("party", "icebreaker", ["party-001"]);
// Returns: Challenge<"party"> | null
// Excludes challenge IDs in array
```

### Filter Challenges

```typescript
const filtered = exampleChallenges.filter((c) =>
    matchesFilter(c, {
        mode: "party",
        intensity: "moderate",
        requiresProps: false,
    }),
);
```

## i18n Integration

Challenge texts are stored in i18n files:

```json
{
    "challenges": {
        "drinking": {
            "001": "Take 2 sips of your drink"
        },
        "party": {
            "042": "Everyone: Show your best dance move! The group votes on the winner."
        }
    }
}
```

Usage:

```typescript
const text = t(challenge.i18nKey);
```

## Future Extensions

### Easy to add:

- ✅ More challenge properties (points, rewards, etc.)
- ✅ Challenge variants/alternatives
- ✅ Difficulty-specific challenge pools
- ✅ User-created challenges
- ✅ Challenge voting/rating system
- ✅ Challenge history/stats
- ✅ Challenge recommendations based on group

### Already prepared:

- `UsedChallenge` interface for tracking
- `ChallengeFilter` for advanced filtering
- Generic types for extensibility
- Tag system for categorization

## Best Practices

### Creating Challenges

1. **Always use `defineChallenge()`** for type safety
2. **Set appropriate minAge** if differs from mode default
3. **Use descriptive i18n keys** (e.g., `challenges.{mode}.{number}`)
4. **Tag appropriately** for better filtering
5. **Mark premium challenges** correctly
6. **List all required props** if `requiresProps: true`

### Challenge IDs

Format: `{mode}-{number}` (e.g., `drinking-001`, `party-042`)

- Keeps IDs unique per mode
- Easy to sort and filter
- Clear mode association

### Duration Guidelines

- **quick**: <1 minute (simple actions, single sentences)
- **medium**: 1-3 minutes (mini-games, longer actions)
- **long**: >3 minutes (complex games, deep questions)

### Intensity Guidelines

- **light**: Safe for everyone, no embarrassment
- **moderate**: Slightly challenging, fun embarrassment
- **intense**: Challenging, noticeable embarrassment
- **extreme**: Very challenging, high risk (use sparingly!)

## Type Safety Benefits

✅ **Compile-time validation** of mode/difficulty combinations
✅ **Autocomplete** for all challenge properties
✅ **No runtime errors** from invalid configurations
✅ **Refactoring safety** - TypeScript catches breaking changes
✅ **Self-documenting** - types explain the structure

## Files

- `types/challenge.ts` - Type definitions
- `data/challenges.ts` - Example challenges & helpers
- `i18n/locales/en.json` - English challenge texts
- `i18n/locales/de.json` - German challenge texts
