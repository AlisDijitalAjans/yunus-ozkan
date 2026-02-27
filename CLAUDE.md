# Yunus Özkan İnşaat - Next.js Website

## Tech Stack
- **Next.js 16.1.6** (App Router) + **React 19.2.3** + **TypeScript 5**
- **Tailwind CSS 4** (`@tailwindcss/postcss`) — `@import "tailwindcss"` in globals.css
- **framer-motion ^12.34.3** — section animations, modals, drawer
- **keen-slider ^6.8.6** — carousel (Projects, Gallery)
- **lucide-react ^0.575.0** — icon library
- **Font**: Poppins (Google Fonts, weights 300-900)

## Scripts
```bash
npm run dev      # next dev
npm run build    # next build
npm run start    # next start
npm run lint     # eslint
```

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout, ThemeProvider, Poppins font, lang="tr"
│   ├── page.tsx            # Homepage: Hero → About → Projects → Services → Gallery
│   ├── globals.css         # Tailwind config, @theme, @utility, theme variables
│   ├── hakkimizda/
│   │   └── page.tsx        # About page (PageHeader + HakkimizdaContent + Footer)
│   ├── projeler/
│   │   └── page.tsx        # Projects page (PageHeader + ProjelerContent + Footer)
│   ├── hizmetler/
│   │   └── page.tsx        # Services page (PageHeader + HizmetlerContent + Footer)
│   ├── galeri/
│   │   └── page.tsx        # Gallery page (PageHeader + GaleriContent + Footer)
│   └── blog/
│       └── page.tsx        # Blog page (PageHeader + BlogContent + Footer)
├── components/
│   ├── Header.tsx          # Fixed nav, mobile drawer, theme toggle, scroll detection
│   ├── Hero.tsx            # ✅ Refactored — zero inline styles
│   ├── About.tsx           # Stats, features, equipment cards — props: { showHeader?: boolean }
│   ├── Projects.tsx        # keen-slider video carousel + modal — props: { showHeader?: boolean }
│   ├── Services.tsx        # Service cards grid + modal — props: { showHeader?: boolean }
│   ├── Gallery.tsx         # keen-slider carousel + lightbox — props: { showHeader?: boolean, variant?: "slider" | "grid" }
│   ├── Footer.tsx          # 4-column grid, CTA box, contact
│   ├── CursorFollower.tsx  # Custom cursor (rAF, LERP) — DO NOT refactor inline styles
│   ├── PageHeader.tsx      # Reusable page header — props: { badge, title, highlight, description }
│   ├── HakkimizdaContent.tsx  # About page: hero, stats, timeline (5 milestones), values, equipment, CTA
│   ├── ProjelerContent.tsx    # Projects page: stats bar, alternating project cards, video modal
│   ├── HizmetlerContent.tsx   # Services page: alternating service cards, 4-step process, CTA
│   ├── GaleriContent.tsx      # Gallery page: category filter (6 categories), stats, animated grid, lightbox
│   └── BlogContent.tsx        # Blog page: 3-column grid, 6 posts (Unsplash images)
└── context/
    └── ThemeContext.tsx     # Dark/light toggle via data-theme attribute + localStorage
```

## Page Routes & SEO

| Route | File | Title | Components |
|-------|------|-------|------------|
| `/` | `app/page.tsx` | (default) | Hero, About, Projects, Services, Gallery |
| `/hakkimizda` | `app/hakkimizda/page.tsx` | Hakkımızda | PageHeader + HakkimizdaContent + Footer |
| `/projeler` | `app/projeler/page.tsx` | Projeler | PageHeader + ProjelerContent + Footer |
| `/hizmetler` | `app/hizmetler/page.tsx` | Hizmetlerimiz | PageHeader + HizmetlerContent + Footer |
| `/galeri` | `app/galeri/page.tsx` | Galeri | PageHeader + GaleriContent + Footer |
| `/blog` | `app/blog/page.tsx` | Blog | PageHeader + BlogContent + Footer |

- Each page exports `metadata` object for SEO (title, description)
- Homepage sections double as standalone pages with expanded content
- `showHeader` prop controls whether section title renders (false on homepage, true on detail pages)
- Header and CursorFollower are rendered in root layout (shared across all pages)

## Configuration

### next.config.ts
- **Remote images**: `images.unsplash.com` allowed (used in BlogContent)

### tsconfig.json
- **Path alias**: `@/*` → `./src/*`
- **Target**: ES2017, strict mode enabled

### postcss.config.mjs
- Single plugin: `@tailwindcss/postcss`

## Public Assets

### Images
- `logo.png` — Company logo (317KB)
- `hero.jpg` — Hero section background
- `about.jpg` — About section image
- `galeri-1.jpg` … `galeri-13.jpg` — Gallery images (13 total)
- `hizmet-istinat.jpg`, `hizmet-arazi.jpg`, `hizmet-kazi.jpg`, `hizmet-dolgu.jpg`, `hizmet-tasev.jpg`, `hizmet-parke.jpg` — Service images (6)

### Videos
- `dora-dikey.mp4`, `his-dora-dikey.mp4`, `okandan-dikey.mp4`, `hafriyat-dikey.mp4` — Project videos (~9-10MB each, vertical)
- `hizmet-drenaj.mp4` — Service video (511KB)

## Styling Architecture

### Tailwind v4 Critical Notes
- **NO unlayered `*` reset** — Tailwind v4 preflight (`@layer base`) handles it. Unlayered resets break all `@layer utilities`.
- **`@theme inline`** only supports static values. `var()` references are silently ignored.
- **`@utility`** is the correct way to define theme-aware utilities with `var()` or `clamp()`.
- **Unlayered CSS** (`.glass`, `.btn-primary`, `.text-gradient-gold`) beats `@layer utilities` in cascade.

### Token System (globals.css)

**Static colors** — `@theme inline`:
```
--color-primary-gold: #d5b36b
--color-primary-gold-dark: #c9a961
--color-primary-gold-light: #f4e4c1

Usage: text-primary-gold / bg-primary-gold / border-primary-gold
```

**Theme colors** — `@utility`:
```
text-theme-text              → var(--theme-text)
text-theme-text-secondary    → var(--theme-text-secondary)
text-theme-text-muted        → var(--theme-text-muted)
text-theme-text-faint        → var(--theme-text-faint)
bg-theme-bg                  → var(--theme-bg)
bg-theme-glass-bg            → var(--theme-glass-bg)
border-theme-border          → var(--theme-border)
border-theme-glass-border    → var(--theme-glass-border)
bg-theme-drawer-bg           → var(--theme-drawer-bg)
bg-theme-drawer-hover        → var(--theme-drawer-hover)
text-theme-nav-text          → var(--theme-nav-text)
text-theme-nav-hover         → var(--theme-nav-hover)
```

**Fluid typography** — `@utility`:
```
text-fluid-hero         → clamp(1.875rem, 5vw, 4.5rem)
text-fluid-section      → clamp(1.875rem, 4vw, 3rem)
text-fluid-subsection   → clamp(1.5rem, 3vw, 2.25rem)
text-fluid-stat         → clamp(1.5rem, 2.5vw, 1.875rem)
text-fluid-stat-lg      → clamp(1.5rem, 2.5vw, 2.25rem)
text-fluid-body         → clamp(1rem, 1.5vw, 1.25rem)
text-fluid-card-title   → clamp(0.875rem, 1.5vw, 1.125rem)
```

### Custom CSS Classes (unlayered, globals.css)
- `.glass` — glassmorphism (backdrop-blur + border)
- `.gold-gradient` — linear-gradient gold background
- `.text-gradient-gold` — gradient text clip
- `.btn-primary` — gold button with hover shimmer (sets own padding/color/weight)
- `.section-padding` — responsive section spacing (30px→40px→60px)
- `.container-custom` — max-width 1500px, responsive padding
- `.header-bg` — header backdrop + pattern background
- `.nav-link` / `.nav-underline` / `.drawer-link` — navigation styles
- `.pulse-glow` / `.float-animation` — keyframe animations
- Custom scrollbar styling (track: theme var, thumb: primary-gold)

### Responsive Grid Classes (globals.css)
- `.footer-grid` — 1 col → 2 cols (md) → 4 cols (lg)
- `.hero-grid` — 1 col → 2 cols (lg) with order swap
- `.about-content-grid` — 1 col → 2 cols (lg)
- `.equipment-grid` — 1 col → 2 cols (sm) → 3 cols (md)
- `.services-grid` — 1 col → 2 cols (sm) → 3 cols (lg)
- `.gallery-grid` — 2 cols → 3 cols (sm) → 4 cols (lg)

### Theme System
- **Dark (default)**: `#0a0a0a` bg, `#ffffff` text, gold accents `#d5b36b`
- **Light**: `#f5f2ec` bg, `#1a1a1a` text, darker gold `#b8943d`
- Toggle: `document.documentElement.setAttribute("data-theme", ...)` + localStorage
- CSS vars in `:root` (dark) / `[data-theme="light"]`

## Component Details

### Header.tsx
- **State**: `scrolled`, `drawerOpen`
- **Hooks**: `useTheme()`, `usePathname()`
- **Data**: `navLinksLeft` (3), `navLinksRight` (3), `drawerLinks` (6 with icons)
- **Features**: `isActiveLink()` for current route detection, logo size change on scroll, body overflow lock when drawer open

### Hero.tsx
- **State**: None (pure presentation)
- **Data**: `features` (3 items), `stats` (3 items: value + label)
- **Features**: Glass badge with pulsing dot, text gradient heading, scroll indicator, two CTA buttons (WhatsApp + Projects)

### About.tsx
- **Props**: `{ showHeader?: boolean }`
- **Data**: `statsData` (4 with icons), `featuresList` (4), `equipmentCards` (3 with dynamic icons)

### Projects.tsx
- **Props**: `{ showHeader?: boolean }`
- **State**: `currentSlide`, `mutedStates`, `modalOpen`, `activeProject`
- **Data**: `projects` (4 with title, video, description)
- **Features**: Custom VolumeOn/VolumeOff SVG icons, video autoplay with sound toggle, keen-slider breakpoints (2→3→4 perView)

### Services.tsx
- **Props**: `{ showHeader?: boolean }`
- **State**: `modalOpen`, `activeService`
- **Data**: `services` (7 with title, desc, image, fullDesc, features, iconPath, mediaType)
- **Features**: Dual media support (image + video), SVG icon paths (not lucide)

### Gallery.tsx
- **Props**: `{ showHeader?: boolean, variant?: "slider" | "grid" }`
- **State**: `lightboxOpen`, `activeIndex`
- **Data**: `galleryItems` (13 items), `slides` (doubled for loop)
- **Features**: Two rendering modes (grid vs slider), lightbox with prev/next, image counter

### Footer.tsx
- **Data**: `quickLinks` (4), `services` (4)
- **Features**: CTA box with gradient, WhatsApp/phone links, social media placeholders, "Alis Dijital" agency credit

### PageHeader.tsx
- **Props**: `{ badge: string, title: string, highlight: string, description: string }`
- **Features**: Animated entry, gradient highlight text, glass badge

### HakkimizdaContent.tsx
- **Data**: `statsData` (4), `featuresList` (4), `equipmentCards` (3), `timeline` (5 milestones 2015-2024), `values` (3)
- **Sections**: Hero + stats + timeline + values + equipment + CTA

### ProjelerContent.tsx
- **State**: `modalOpen`, `activeProject`, `mutedStates`, `videoRefs`
- **Data**: `projects` (4 with category, location)
- **Features**: Stats bar (4 stats), alternating layout, video modal with 2-col grid, category badges, Eye icon for location

### HizmetlerContent.tsx
- **Data**: `services` (7 with features), `processSteps` (4 steps with icons: Phone→FileSearch→Hammer→ThumbsUp)
- **Sections**: Services list (alternating) + process steps + CTA

### GaleriContent.tsx
- **State**: `activeCategory`, `lightboxOpen`, `activeIndex`
- **Data**: `categories` (6), `galleryItems` (13 with categories), `stats` (3 with icons)
- **Features**: Category filter, animated layout transitions, lightbox, empty state message

### BlogContent.tsx
- **Data**: `blogPosts` (6 with title, excerpt, image from Unsplash, date, category)
- **Features**: Category badges, Calendar icon for dates, image hover scale

## Refactoring Conventions

### Color Mapping (when converting inline styles)
| Old | New |
|-----|-----|
| `text-white` or `style={{ color: "#fff" }}` | `text-theme-text` |
| `text-gray-300` | `text-theme-text-secondary` |
| `text-gray-400` | `text-theme-text-muted` |
| `text-gray-500` | `text-theme-text-faint` |
| `text-[#d5b36b]` | `text-primary-gold` |
| `bg-[#d5b36b]` | `bg-primary-gold` |
| `border-[#d5b36b]/30` | `border-primary-gold/30` |
| `border-gray-700/50` | `border-theme-border` |

### Inline Style → Tailwind Quick Reference
| Inline | Tailwind |
|--------|----------|
| `display: "flex"` | `flex` |
| `display: "grid"` | `grid` |
| `flexDirection: "column"` | `flex-col` |
| `gap: "0.75rem"` | `gap-3` |
| `padding: "1rem"` | `p-4` |
| `zIndex: 10` | `z-10` |
| `position: "relative"` | `relative` |
| `fontSize: "clamp(...)"` | `text-fluid-*` |
| `borderRadius: "1rem"` | `rounded-2xl` |
| `maxWidth: "36rem"` | `max-w-xl` |

### Rules
1. **CursorFollower.tsx** — DO NOT refactor (rAF inline styles are intentional)
2. **btn-primary** — don't override padding with Tailwind (unlayered CSS wins)
3. **glass** — border comes from glass class; Tailwind border-color won't override it
4. Keep `hover:text-white` as actual white for scroll indicator (not theme-text)
5. Responsive grid: replace custom CSS grid classes with `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
6. All data is static (arrays at component top). No API/CMS integration.
7. All components are `"use client"` (framer-motion, keen-slider, state)
8. Page route files are Server Components (only import content components + set metadata)
9. Data is partially duplicated between homepage sections and detail page content components (e.g., Projects.tsx vs ProjelerContent.tsx) — keep them in sync when editing

## Common Patterns

### Modal Pattern
```tsx
<AnimatePresence>
  {modalOpen && (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center">
      <motion.div onClick={close} /> {/* overlay */}
      <motion.div initial/animate/exit> {/* content */}
      </motion.div>
    </div>
  )}
</AnimatePresence>
```

### Keen-Slider Pattern
```tsx
const [sliderRef, instanceRef] = useKeenSlider({ loop: true, slides: { perView: 2 } });
<div ref={sliderRef} className="keen-slider">
  {items.map(item => <div className="keen-slider__slide">...</div>)}
</div>
```

### Animation Pattern
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
```

### Video Pattern
```tsx
<video src={videoSrc} muted autoPlay loop playsInline />
// With sound toggle: mutedStates array + toggleMute callback
```

### Page Route Pattern (Server Component)
```tsx
import { Metadata } from "next";
export const metadata: Metadata = { title: "...", description: "..." };
export default function Page() {
  return (
    <>
      <PageHeader badge="..." title="..." highlight="..." description="..." />
      <XxxContent />
      <Footer />
    </>
  );
}
```

### Alternating Layout Pattern (detail pages)
```tsx
<div className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"}`}>
```

## Breakpoints
- `sm:` 640px | `md:` 768px | `lg:` 1024px | `xl:` 1280px | `2xl:` 1536px

## Known Considerations
- **No API routes / middleware / .env** — Fully static site
- **All content in Turkish** — UI text and data are hardcoded in Turkish
- **BlogContent uses Unsplash** — Requires `images.unsplash.com` in next.config.ts remote patterns
- **Large video files** — 4 project videos (~9-10MB each) in public/
- **Accessibility**: ARIA labels on interactive elements, semantic HTML throughout
