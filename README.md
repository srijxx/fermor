# Fermor

A production-quality fintech homepage built as a frontend developer assignment. Fermor is a financial product designed around one core idea: **make sense of your money** — not just display it.

---

## Tech Stack

- **Next.js 16** — App Router, static export
- **React 19** — Client components with hooks for animations and interactivity
- **JavaScript** — No TypeScript, per spec
- **Tailwind CSS v4** — Utility classes plus a custom CSS design system via custom properties
- **Lucide React** — Icon library for UI icons

---

## Features

### Visual & UX
- Sticky navbar with scroll-triggered blur + border state
- Fully functional mobile hamburger menu with body scroll lock
- Smooth IntersectionObserver-based section reveal animations
- Animated count-up numbers for financial stats (using requestAnimationFrame)
- SVG sparkline with animated stroke-dashoffset draw effect
- SVG donut chart for spending breakdown with animated slices
- Animated progress bars (transform: scaleX) throughout
- Hover micro-interactions on all cards — lift, border highlight, icon animation
- Dark sections with accent glow radial gradients

### Sections
1. **Navbar** — Fixed, scroll-aware, mobile menu
2. **Hero** — Two-column layout with financial dashboard preview
3. **Value Strip** — Dark band communicating core product value
4. **Clarity Section** — See → Understand → Act → Grow cards
5. **Next Best Move** — Standout product-thinking section with actionable insight
6. **Financial Overview** — Full dashboard: 4 stat cards + donut chart + goal tracker
7. **Money Story** — Transaction activity timeline with connecting lines
8. **How It Works** — Interactive 4-step flow with active state
9. **Philosophy** — Brand statement section
10. **Final CTA** — Dark closing section with primary action
11. **Footer** — Navigation, social links, copyright

### Responsive Design
Tested breakpoints: 360px, 390px, 768px, 1024px, 1440px. All grids collapse naturally. No horizontal overflow on mobile.

---

## Design Approach

### Core concept: See → Understand → Act → Grow

Most financial apps stop at **See** — they show you numbers. Fermor is designed around the idea that visibility alone isn't enough. The product flow guides users from raw data to actionable clarity.

Every section on the page reflects a stage in that progression:
- The Hero shows your financial snapshot (See)
- The Clarity Section explains the framework (Understand)
- The Next Best Move surfaces one recommended action (Act)
- The Financial Overview and Goal Tracker measure progress (Grow)

### Why "Your Next Best Move" exists

This is the product-thinking centrepiece. Most fintech dashboards present data passively — they show you what happened. "Your Next Best Move" flips this by surfacing a single, contextual, actionable recommendation.

The design decision was deliberate: one big insight card (primary focus) plus three small metric cards (supporting context). This hierarchy prevents cognitive overload while still giving users the data they need to trust the recommendation.

The dark card treatment isolates this section visually, signaling that this isn't just another data display — it's the thing worth acting on.

### Visual direction

- **Palette**: Deep charcoal for text, warm off-white for backgrounds, Fermor green (`#1a9e5c`) as the single accent
- **Typography**: Geist Sans — tight letter-spacing on headings, comfortable body text
- **Whitespace**: Generous. Sections breathe. Cards don't crowd.
- **Animations**: Fast, subtle, purposeful. Nothing animates just to animate.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

---

## Deployment

The project deploys directly to Vercel or Netlify with zero configuration. Connect the repository and deploy — no environment variables required.

**Live demo:** _[Add URL after deployment]_

**Repository:** _[Add GitHub URL]_
