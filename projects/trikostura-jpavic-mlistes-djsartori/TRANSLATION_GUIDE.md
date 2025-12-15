# Translation Implementation Guide

This guide shows you how to add English/Croatian translations to the remaining pages in your application.

## Translation System Overview

### 1. Translation Files
- **Translations**: `lib/translations.ts` - Contains all translation strings
- **Context**: `contexts/language-context.tsx` - Manages current language state
- **Toggle**: `components/ui/language-toggle.tsx` - Language dropdown (HR/EN)

### 2. How Translations Work

The translation system uses React Context to provide translations throughout the app:

```typescript
// In any client component:
'use client';
import { useLanguage } from '@/contexts/language-context';

export function MyComponent() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t('myTranslationKey')}</h1>
      <p>Current language: {language}</p>
    </div>
  );
}
```

## Implementation Patterns

### Pattern 1: Simple Server Component → Client Component

**When**: The page is a server component with hardcoded Croatian text.

**Steps**:
1. Create a new client component file
2. Move the JSX/UI code to the client component
3. Use the `useLanguage()` hook
4. Replace Croatian strings with `t('translationKey')`
5. Import and use the client component in the server component

**Example**:

Original server component (`app/forum/users/page.tsx`):
```typescript
export default async function UsersPage() {
  // ... data fetching ...

  return (
    <div>
      <h1>Zajednica Studenata</h1>
      <p>Upoznaj aktivne članove naše zajednice</p>
    </div>
  );
}
```

New client component (`components/forum/users-content.tsx`):
```typescript
'use client';

import { useLanguage } from '@/contexts/language-context';

export function UsersContent() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t('usersTitle')}</h1>
      <p>{t('usersSubtitle')}</p>
    </div>
  );
}
```

Updated server component:
```typescript
import { UsersContent } from '@/components/forum/users-content';

export default async function UsersPage() {
  // ... data fetching ...

  return <UsersContent data={data} />;
}
```

### Pattern 2: Already Client Component

**When**: The page is already a client component.

**Steps**:
1. Add `import { useLanguage } from '@/contexts/language-context';`
2. Add `const { t } = useLanguage();` at the top of component
3. Replace all Croatian strings with `t('translationKey')`

**Example**:

```typescript
'use client';

import { useLanguage } from '@/contexts/language-context';

export default function SearchPage() {
  const { t } = useLanguage(); // Add this

  return (
    <div>
      <h1>{t('searchTitle')}</h1> {/* Was: Pretraga */}
      <input placeholder={t('searchPlaceholder')} /> {/* Was: Pretraži... */}
      <button>{t('search')}</button> {/* Was: Pretraži */}
    </div>
  );
}
```

### Pattern 3: Nested Components

**When**: You have reusable components that need translation.

**Steps**:
1. Make the component a client component
2. Add `useLanguage()` hook
3. Pass translated strings as props OR use `t()` directly inside

**Example**:

```typescript
'use client';

import { useLanguage } from '@/contexts/language-context';

export function StatCard({ count, type }: { count: number; type: 'users' | 'topics' }) {
  const { t } = useLanguage();

  return (
    <div>
      <div className="text-2xl">{count}</div>
      <div className="text-sm">{t(type)}</div>
    </div>
  );
}
```

## Adding New Translations

### Step 1: Add to translations.ts

Open `lib/translations.ts` and add your keys:

```typescript
export const translations = {
  hr: {
    // ... existing translations ...
    myNewKey: 'Hrvatski tekst',
    anotherKey: 'Još jedan tekst',
  },
  en: {
    // ... existing translations ...
    myNewKey: 'English text',
    anotherKey: 'Another text',
  },
};
```

### Step 2: Use in Components

```typescript
const { t } = useLanguage();

<h1>{t('myNewKey')}</h1>
<p>{t('anotherKey')}</p>
```

## Common Translation Keys Already Available

Check `lib/translations.ts` for existing keys. Here are some commonly used ones:

### Navigation
- `forum`, `users`, `leaderboard`, `search`, `admin`
- `newTopic`, `bookmarks`, `messages`, `notifications`
- `login`, `register`, `logout`

### Actions
- `save`, `cancel`, `delete`, `edit`, `close`
- `submit`, `update`, `confirm`
- `back`, `next`, `previous`
- `viewAll`, `loadMore`

### Common UI
- `loading`, `error`, `success`
- `noResults`, `filters`, `sortBy`
- `searchPlaceholder`, `searchResults`

### Users/Profile
- `usersTitle`, `usersSubtitle`
- `reputation`, `joined`, `topContributors`
- `profileTitle`, `editProfile`
- `myTopics`, `myReplies`, `savedTopics`

### Admin
- `adminDashboard`, `manageUsers`, `manageTopics`
- `statistics`

## Quick Reference: Pages to Translate

### Priority 1 (Most Used)
- [ ] `/forum/users` - Users directory
- [ ] `/forum/leaderboard` - Leaderboard
- [ ] `/forum/search` - Search page
- [ ] `/forum/user/[username]` - User profile
- [ ] `/forum/user/[username]/edit` - Edit profile

### Priority 2 (Common)
- [ ] `/forum/new` - New topic
- [ ] `/forum/bookmarks` - Bookmarks
- [ ] `/messages` - Messages
- [ ] `/notifications` - Notifications

### Priority 3 (Admin)
- [ ] `/admin` - Admin dashboard
- [ ] `/admin/users` - User management
- [ ] `/admin/topics` - Topic moderation
- [ ] `/admin/categories` - Category management
- [ ] `/admin/reports` - Reports

### Priority 4 (Auth - if not done)
- [ ] `/auth/login` - Login page
- [ ] `/auth/register` - Register page

## Tips

1. **Keep Croatian strings as reference**: Comment out the old Croatian text to keep as reference
   ```typescript
   {/* Was: Zajednica Studenata */}
   <h1>{t('usersTitle')}</h1>
   ```

2. **Test both languages**: Switch between HR and EN to verify translations work

3. **Maintain consistency**: Use the same translation key across pages for the same concept

4. **Check TypeScript**: The `TranslationKey` type will help catch typos

5. **Plural forms**: For now, use separate keys for singular/plural if needed
   ```typescript
   topicsCount: 'tema',    // for single
   topicsCountPlural: 'teme',  // for plural
   ```

## Example: Complete Page Translation

See how the Forum page was translated:

**Before** (`app/forum/page.tsx`):
```typescript
<h1>Forum Kategorije</h1>
<p>Pridruži se diskusijama...</p>
```

**After** (created `components/forum/forum-page-content.tsx`):
```typescript
'use client';
import { useLanguage } from '@/contexts/language-context';

export function ForumPageContent({ categories }: Props) {
  const { t } = useLanguage();

  return (
    <>
      <h1>{t('forumCategoriesTitle')}</h1>
      <p>{t('forumCategoriesSubtitle')}</p>
    </>
  );
}
```

Then in server component:
```typescript
import { ForumPageContent } from '@/components/forum/forum-page-content';

export default async function ForumPage() {
  // ... fetch data ...
  return <ForumPageContent categories={categoryData} />;
}
```

## Need Help?

- Check `lib/translations.ts` for available keys
- Look at `app/forum/page.tsx` and `components/forum/forum-page-content.tsx` as examples
- The Language Toggle is already in the navbar and works globally!
