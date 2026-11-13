# Visual Design Rules

## Hierarchy (CRAP: Contrast, Repetition, Alignment, Proximity)
- Establish 3 levels max per screen: primary, secondary, tertiary. Use size, weight, color, and space to rank.
- One primary action per view. Secondary actions are quieter (outline/ghost); tertiary as text links.
- Align to a grid; align left edges. Repeat styles for repeated meanings.

## Spacing and layout
- Use a base unit (4 or 8px) and scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Group by proximity: inner spacing < outer spacing between groups.
- 12-column grid desktop, 4-column mobile; gutters 16-24px; page margin ≥ 16px mobile.
- Content width: body text lines 45-75 characters (≈ 60-75ch max).
- Whitespace is a tool, not waste. Cramped = harder scanning; generous spacing around key actions.
- Reading patterns: F-pattern (text-heavy), Z-pattern (sparse landing pages). Put the key message top-left/top.

## Typography
- Max 2 font families (often 1); define roles: display, heading, body, mono.
- Type scale with consistent ratio (1.2 minor third, 1.25 major third, 1.333 perfect fourth), e.g. 12/14/16/20/24/32/40.
- Body ≥ 16px (web). Line-height: body 1.4-1.6, headings 1.1-1.3. Letter-spacing slightly tighter on large headings.
- Weights: ≤ 3-4 in use. Use weight and size for hierarchy, not ALL CAPS paragraphs.
- Left-align body text (LTR). Avoid justified text on web. Avoid long italic runs.
- Thai: use fonts with proper Thai glyphs (Noto Sans Thai, Sarabun, Prompt, IBM Plex Sans Thai); increase line-height (≈ 1.6-1.8) because of stacked vowel/tone marks; never letter-space Thai.

## Color
- Define color **roles**, not just hues: background, surface, text, text-muted, border, primary, success, warning, danger, info; each with a hover/active state.
- 60-30-10 guideline: ~60% neutral, 30% secondary/surface, 10% accent.
- Build a neutral scale (≈ 9-11 steps) plus 1 brand color scale; derive states from the scale.
- Meaning conventions: red = danger/error, green = success, amber = warning, blue = info/link. Never color alone (add icon/text) → WCAG 1.4.1.
- Contrast requirements: see accessibility reference.
- Dark mode: don't invert; use dark grays (not pure #000) with lighter elevation, desaturate accents, re-check contrast.

## Shape, elevation, imagery
- Consistent radius tokens (e.g. 4/8/12/full). Nested radius = outer radius − padding.
- Elevation (shadow/surface tint) expresses layering; use 3-4 levels max.
- Icons: one style/stroke weight, align to pixel grid, pair with text labels for non-universal icons.
- Images: consistent aspect ratios, meaningful alt text, optimize and lazy-load below the fold.

## Components
- Buttons: min height 40-48px, clear label (verb + noun), distinct states, loading state prevents double submit.
- Inputs: visible border (3:1 against background), visible label, clear focus ring, helper text, error text.
- Tables: right-align numbers, left-align text, sticky header for long lists, zebra or row dividers, responsive strategy for small screens.
- Modals: only for focused, interruptive tasks; trap focus, Esc to close, return focus on close.
- Toasts: non-critical, auto-dismiss with enough time (≥ 5s) and not the only place for important errors.

## Motion
- Purpose: feedback, orientation, continuity. Not decoration.
- Duration: micro-interactions 100-200ms, transitions 200-300ms, large/complex ≤ 500ms. Ease-out for entering, ease-in for exiting.
- Respect `prefers-reduced-motion`; no flashing > 3 times per second (WCAG 2.3.1).
