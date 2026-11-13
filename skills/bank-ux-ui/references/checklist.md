# Final Review Checklist

Mark each item pass / fail / n/a. For every fail: state the rule, severity, and fix. When the work covers several screens and an item's result differs between them, mark it per screen.

## Task and clarity (Nielsen, Shneiderman)
- [ ] Primary task is obvious within 5 seconds; one dominant primary action. (Von Restorff, Hick)
- [ ] Labels use user language, not internal jargon. (Nielsen #2)
- [ ] System status visible: loading, saving, progress, success. (Nielsen #1)
- [ ] Undo/cancel/back available; destructive actions confirmed or reversible. (Nielsen #3, #5)
- [ ] Errors say what, why, and how to fix; input is preserved. (Nielsen #9)
- [ ] Empty, loading, error, success, disabled states are all designed.

## Structure and cognition (Laws of UX)
- [ ] Related items grouped by proximity/region; unrelated separated. (Proximity, Common Region)
- [ ] Choices limited or chunked; defaults and recommendations provided. (Hick, Miller)
- [ ] Familiar patterns used; deviations justified. (Jakob)
- [ ] Targets large and near for primary actions. (Fitts)
- [ ] Response feedback < 400 ms or a progress indicator. (Doherty)

## Visual
- [ ] Uses tokens: spacing scale, type scale, color roles, radius. No stray one-off values.
- [ ] Hierarchy clear in 3 levels or fewer; alignment on grid.
- [ ] Body text ≥ 16px, line length ≤ ~75ch, adequate line-height (Thai ≥ 1.6).
- [ ] Consistent icon style; icons paired with labels unless universal.
- [ ] Dark mode checked if supported.

## Identity (Bank)
An item is n/a only where the item itself says so; every other item applies to every style. Give the reason for each n/a. For native code the whole section is n/a. "Primary-flow screen" means a screen whose main job is one form submission, such as login, sign-up, checkout, payment, transfer or booking; a list, dashboard or content page is not one, and a landing page with a form in it is still a content page.
- [ ] The style chosen in SKILL.md step 3 is stated to the user.
- [ ] Full Bank style only: `identity.css` tokens used; ink/paper/accent palette, hard-offset shadow, press motion (the highlighter word is the next item). A theme that keeps the hard shadow (such as `sunset`) is checked the same way with the theme's palette. n/a for `corporate-calm`, a bundled style, and an existing brand.
- [ ] One emphasis word in the main heading: `.id-mark` for the Bank style and any theme from `assets/themes/`, `.ui-mark` for a bundled style (`.bank-mark` instead if `bank-layer.css` is used). n/a for an existing brand. On primary-flow screens it is left out by default: mark n/a and tell the user (pass if the user asked for it and it is present).
- [ ] `bank-layer.css` is loaded only if the user asked for Bank (or their own system's) branding or signature on a named style. Pass when it is not loaded and was not asked for. When loaded: `.bank-mark` is the emphasis word, `.bank-stripe` is its own empty element first in `<body>`, `.bank-tag` appears only next to a logo image or the site/system name in the page header, and the copy of `bank-layer.css` also passes `check-theme.mjs`. A request for the layer is not a request for the credit.
- [ ] No "Designed by Bank" footer credit and no `<meta name="author" content="Bank">` unless the user asked for the credit. If they asked: meta tag and footer credit present on every screen they asked for, primary-flow screens included; the footer sits at the bottom of the page, after and separate from the primary action.
- [ ] Identity did not reduce contrast, target size, or focus visibility. n/a for an existing brand (no identity applied).
- [ ] If any Bank theme or bundled style other than the unmodified `identity.css` is used (including `corporate-calm`): `node <skill-folder>/scripts/check-theme.mjs <path of the file you ship>` prints "all locked rules pass" (light and dark). n/a for the unmodified `identity.css`. Without Node: pass if the twelve hand-computed pairs under "Locked" in `identity.md` pass in light and dark, and report that the script was not run. Existing brand: no script; contrast pairs, targets (under 24px is a blocker, a button or input under 44px is a major finding; either is a fail for this item until fixed) and the brand's own focus ring (visible, at least 2px, 3:1) checked by hand and reported (pass if the hand check passes); a dark theme is not required.
- [ ] The fonts the style names are loaded (link or self-hosted), or the fallback to system fonts is stated. Existing brand: the brand's fonts are confirmed as already loaded by the project; a link was added only if they were not, and the user was told.

## Accessibility (WCAG 2.2 AA)
- [ ] Text contrast ≥ 4.5:1 (large 3:1); UI/focus indicators ≥ 3:1.
- [ ] Meaning never by color alone.
- [ ] Fully keyboard operable, visible focus, logical order, no traps, focus not hidden.
- [ ] Targets ≥ 24px minimum, ≥ 44px preferred on touch.
- [ ] Semantic HTML, labels tied to inputs, alt text, `lang` set.
- [ ] Works at 320px width and 200% zoom; respects reduced motion.
- [ ] Dynamic messages announced (aria-live/status).
- [ ] Video has captions and audio description or transcript; no autoplay audio (1.2.x, 1.4.2).
- [ ] Reading order in DOM matches visual order; instructions don't rely on shape/position/sound alone (1.3.2, 1.3.3).
- [ ] Works in portrait and landscape; real text, not images of text (1.3.4, 1.4.5).
- [ ] Tooltips/popovers: appear on focus and hover, dismiss with Esc, stay while hovered (1.4.13).
- [ ] Single-key shortcuts can be turned off; time limits adjustable; page has a unique title (2.1.4, 2.2.1, 2.4.2).
- [ ] More than one way to find content; headings and labels describe their purpose (2.4.5, 2.4.6).
- [ ] Gestures (pinch, swipe, drag, shake) have a simple alternative; actions fire on pointer up (2.5.1, 2.5.2, 2.5.4).
- [ ] Accessible name contains the visible label text (2.5.3).
- [ ] Other-language passages marked with `lang`; focus/input never triggers an unexpected context change (3.1.2, 3.2.1, 3.2.2).

## Responsive and performance
- [ ] No horizontal scroll 320-1920px; touch and hover both handled.
- [ ] LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 (or plan to measure).
- [ ] Images sized, optimized, lazy-loaded; fonts subset.

## Ethics and trust
- [ ] No dark patterns; opt-out as easy as opt-in.
- [ ] Sensitive flows show summary, confirmation, and receipt.

## Report format
`Issue → Rule → Severity → Fix`, then list accepted trade-offs and what was not verified (e.g. real screen reader test).
