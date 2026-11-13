# Platform Conventions and Performance

## Apple Human Interface Guidelines (iOS)
- Touch target ≥ 44×44 pt. Respect safe areas (notch, home indicator).
- Navigation: tab bar (3-5 primary destinations) at bottom, navigation bar with back at top, swipe-back gesture must work.
- Support Dynamic Type, dark mode, and VoiceOver. Use system fonts/SF Symbols where possible.
- Prefer sheets and system patterns over custom ones.

## Material Design (Android / web)
- Touch target ≥ 48×48 dp, 8dp spacing between targets.
- Navigation bar (3-5 destinations), navigation rail (tablet), drawer (desktop/many items).
- Use color roles and elevation tokens; state layers for hover/focus/pressed.
- Back behavior follows system back gesture.

## Responsive web
- Mobile-first breakpoints (e.g. 480, 768, 1024, 1280); content-driven when possible.
- Thumb zone: primary actions reachable in the lower half on mobile; avoid top-corner-only critical actions.
- Don't disable zoom. Use `viewport` meta, `rem`, `clamp()` for fluid type, container queries for components.
- Hover is not available on touch: never hide essential info behind hover.

## Performance (Core Web Vitals, "good" thresholds, 75th percentile)
- **LCP** ≤ 2.5 s (largest content paint). Optimize hero image, fonts, critical CSS.
- **INP** ≤ 200 ms (interaction responsiveness). Avoid long main-thread tasks.
- **CLS** ≤ 0.1 (layout shift). Reserve space for images/ads/embeds, set width/height or aspect-ratio.
- Perceived speed: skeletons, optimistic updates, progressive loading (Doherty Threshold).
- Fonts: `font-display: swap`, subset (including Thai), limit weights.

## Trust and sensitive flows (finance, health, identity)
- Show clear confirmation before irreversible actions; show summary (amount, recipient) and success state with receipt/reference.
- Mask sensitive data with reveal toggle; never block paste in password/OTP fields; allow OTP autofill (`autocomplete="one-time-code"`).
- Plain-language security and error messages; don't expose technical details or cause lockout without recovery path.
- Respect WCAG 3.3.4 and 3.3.8 (see accessibility reference).

## Ethics
- No dark patterns: no forced continuity, hidden costs, confirmshaming, disguised ads, roach-motel cancellation.
- Make opt-out as easy as opt-in; default to the user's benefit.
