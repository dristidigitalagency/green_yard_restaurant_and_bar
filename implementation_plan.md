# Green Yard Restaurant & Bar — Website Implementation Plan

## Overview

A premium single-page Next.js website for **Green Yard Restaurant & Bar** — a nature-immersed restaurant in Kathmandu. Inspired by [Lavie Garden](https://garden.laviehospitality.com.np/), the design emphasizes lush greenery, peace, and celebration. Key features: glassmorphism header, rotating menu showcase, paper-textured "real menu" background, WhatsApp booking CTA, and occasions section.

---

## Tech Stack

- **Next.js 16 (App Router)** — already installed
- **Tailwind CSS v4** — already installed
- **Vanilla CSS** for custom animations & glass effects
- **No extra packages** needed

---

## Architecture: Single Page (scroll-based)

All sections live in `app/page.tsx` as a single scrollable page with smooth anchors.

```
/ (root)
├── Header (glassmorphism, logo center, hamburger left)
├── Hero (restaurant photo, tagline overlay)
├── About (greenery story)
├── Menu Showcase (rotating dish display)
├── Occasions (birthday, teej, wedding, etc.)
├── Book a Table (WhatsApp CTA form)
├── Testimonials
└── Footer
```

---

## Files to Create / Modify

### `app/globals.css` [MODIFY]
- Paper/parchment texture background using CSS gradients + noise filter
- CSS custom properties for color palette (deep greens, cream, gold)
- Global font imports (Playfair Display + Lato from Google Fonts)
- Glassmorphism utility class
- Dish rotation animation (`@keyframes dishRotate`)
- Mobile menu slide-in animation
- Smooth scroll behavior

### `app/layout.tsx` [MODIFY]
- Update metadata: title, description, OG tags
- Add Google Fonts link tag in `<head>`

### `app/page.tsx` [MODIFY → full rewrite]
- Complete page with all sections as a single `'use client'` component
- State: `menuOpen`, `currentDish`, `isRotating`
- All interactive logic (menu toggle, dish rotation) in one file

### `public/` [ADD images]
- Generated AI images for hero, dishes (7 menu items), occasions

### `components/` [NEW directory]
- `Header.tsx` — glassmorphism navbar with mobile drawer
- `Hero.tsx` — full-screen hero with parallax tagline
- `MenuShowcase.tsx` — rotating dish carousel (left photo, right details)
- `Occasions.tsx` — grid of occasion cards with hover effects
- `BookingCTA.tsx` — form → WhatsApp deep link
- `Testimonials.tsx` — review cards
- `Footer.tsx` — contact, hours, social

---

## Design System

### Color Palette
```
--green-deep:    #1a3d1f   (dark forest green)
--green-mid:     #2d6a4f   (rich garden green)
--green-light:   #52b788   (fresh leaf green)
--cream:         #f5f0e8   (warm paper cream)
--cream-dark:    #e8dcc8   (aged paper)
--gold:          #c9a84c   (warm gold accent)
--brown-bark:    #5c3d2e   (wood/bark brown)
```

### Background — "Real Menu" Paper Effect
CSS combination of:
1. `background-color: #f5f0e8`
2. Radial gradients mimicking paper stains / age spots
3. `filter: url(#noise)` SVG noise filter for paper grain texture
4. Subtle border decorations (like a printed menu)

### Typography
- **Headings**: Playfair Display (serif, elegant)
- **Body/UI**: Lato (clean, readable)
- **Decorative numbers**: Large Playfair Display italic

### Glassmorphism Header
```css
background: rgba(255, 255, 255, 0.12);
backdrop-filter: blur(16px);
border-bottom: 1px solid rgba(255, 255, 255, 0.25);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
```

---

## Key Interactions

### Menu Showcase (Rotating Dishes)
- Left: Large circular plate image (800×800 clipped to circle)
- Right: Dish name, category, description, price
- "Next" button triggers 3D Y-axis rotation animation on the plate
- `isRotating` state locks button during animation (~600ms)
- After rotation, `currentDish` index advances

### WhatsApp Booking
Form fields: Name, No. of People, Date, Time, Table No.
Generates a WhatsApp deep link:
```
https://wa.me/977XXXXXXXXXX?text=...URL-encoded message...
```

### Mobile Navigation
- Hamburger icon (left of header)
- Full-screen overlay slide-in menu
- Frosted glass background

---

## Sections Detail

1. **Header** — Fixed, glassmorphism, logo centered, hamburger left, "Book Table" CTA right
2. **Hero** — Full-viewport image, "Where Nature Meets Flavor" tagline, scroll arrow
3. **About** — Split layout: text left, greenery imagery right
4. **Menu Showcase** — "Popular Dishes" with rotating plate animation
5. **Occasions** — 6 cards: Birthday, Bride to be, Teej, Engagement, Meeting, Anniversary
6. **Book a Table** — Form on paper-card with whatsapp integration
7. **Testimonials** — Carousel of 5-star reviews
8. **Footer** — Green background, contact, hours, map link

---

## Images to Generate

1. `hero-restaurant.jpg` — Outdoor garden restaurant, lush greenery, Nepal setting, golden hour
2. `dish-momo.jpg` — Nepalese momo dumplings plate
3. `dish-thali.jpg` — Traditional Nepali thali set
4. `dish-pasta.jpg` — Garden pasta with fresh herbs
5. `dish-grilled-chicken.jpg` — Grilled chicken platter
6. `dish-cocktail.jpg` — Refreshing cocktail with garden backdrop
7. `dish-dessert.jpg` — Traditional Nepali dessert
8. `occasion-birthday.jpg` — Birthday setup outdoor
9. `about-garden.jpg` — Restaurant interior with plants

---

## Verification

1. `pnpm dev` — check all sections render
2. Browser subagent screenshot of full page
3. Test menu rotation animation
4. Test WhatsApp link formation
5. Mobile responsive check
