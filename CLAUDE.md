# Yunus Özkan İnşaat - Next.js Website

## Tech Stack
- **Next.js 16.1.6** (App Router) + **React 19.2.3** + **TypeScript 5**
- **Tailwind CSS 4** (`@tailwindcss/postcss`) — `@import "tailwindcss"` in globals.css
- **framer-motion** — section animations, modals, drawer
- **keen-slider** — carousel (Projects, Gallery)
- **lucide-react** — icon library
- **Font**: Poppins (Google Fonts, weights 300-900)

## Project Structure
```
src/
├── app/
│   ├── layout.tsx        # Root layout, ThemeProvider, Poppins font
│   ├── page.tsx          # Single page: Header → Hero → About → Projects → Services → Gallery → Footer
│   └── globals.css       # Tailwind config, @theme, @utility, theme variables, custom classes
├── components/
│   ├── Header.tsx        # Fixed nav, mobile drawer, theme toggle, scroll detection
│   ├── Hero.tsx          # ✅ Refactored — zero inline styles
│   ├── About.tsx         # Stats, features, equipment cards
│   ├── Projects.tsx      # keen-slider video carousel + modal
│   ├── Services.tsx      # Service cards grid + modal
│   ├── Gallery.tsx       # keen-slider image carousel + lightbox
│   ├── Footer.tsx        # 4-column grid, CTA box, contact
│   └── CursorFollower.tsx # Custom cursor (rAF, LERP) — DO NOT refactor inline styles
└── context/
    └── ThemeContext.tsx   # Dark/light toggle via data-theme attribute + localStorage
```

## Styling Architecture

### Tailwind v4 Critical Notes
- **NO unlayered `*` reset** — Tailwind v4 preflight (`@layer base`) handles it. Unlayered resets break all `@layer utilities`.
- **`@theme inline`** only supports static values. `var()` references are silently ignored.
- **`@utility`** is the correct way to define theme-aware utilities with `var()` or `clamp()`.
- **Unlayered CSS** (`.glass`, `.btn-primary`, `.text-gradient-gold`) beats `@layer utilities` in cascade.

### Token System (globals.css)

**Static colors** — `@theme inline`:
```
text-primary-gold / bg-primary-gold / border-primary-gold  → #d5b36b
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
- `.section-padding` — responsive section spacing (30px→60px)
- `.container-custom` — max-width 1500px, responsive padding
- `.header-bg` — header backdrop + pattern background
- `.nav-link` / `.nav-underline` / `.drawer-link` — navigation styles
- `.pulse-glow` / `.float-animation` — keyframe animations

### Theme System
- **Dark (default)**: `#0a0a0a` bg, `#ffffff` text, gold accents `#d5b36b`
- **Light**: `#f5f2ec` bg, `#1a1a1a` text, darker gold `#b8943d`
- Toggle: `document.documentElement.setAttribute("data-theme", ...)` + localStorage
- CSS vars in `:root` (dark) / `[data-theme="light"]`

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

## Common Patterns

### Modal Pattern
```tsx
<AnimatePresence>
  {modalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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

## Breakpoints
- `sm:` 640px | `md:` 768px | `lg:` 1024px | `xl:` 1280px | `2xl:` 1536px
