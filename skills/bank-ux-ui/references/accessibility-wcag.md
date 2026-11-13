# Accessibility (WCAG 2.2, target Level AA)

Four principles: Perceivable, Operable, Understandable, Robust (POUR).

## Perceivable
- **1.1.1 Non-text content**: meaningful images have alt text; decorative images use empty alt.
- **1.3.1 Info and relationships**: use semantic HTML (headings, lists, tables, labels), not styled divs.
- **1.3.5 Identify input purpose**: use `autocomplete` tokens on personal-data fields.
- **1.4.1 Use of color**: never convey meaning by color alone.
- **1.4.3 Contrast (minimum)**: text ≥ 4.5:1; large text (≥ 24px, or ≥ 18.66px bold) ≥ 3:1.
- **1.4.10 Reflow**: no horizontal scroll at 320 CSS px width / 400% zoom.
- **1.4.11 Non-text contrast**: UI component boundaries, icons, focus indicators ≥ 3:1.
- **1.4.12 Text spacing**: layout survives line-height 1.5, paragraph spacing 2x, letter 0.12em, word 0.16em.
- **1.4.4 Resize text**: usable at 200% zoom; use rem/em, not fixed px containers.
- **1.2.1-1.2.5 Time-based media**: prerecorded video has captions (1.2.2) and audio description or a text alternative (1.2.3, AA 1.2.5); audio-only/video-only has a transcript (1.2.1); live video has captions (AA 1.2.4).
- **1.3.2 Meaningful sequence**: DOM reading order matches visual order; don't rely on CSS positioning to reorder content.
- **1.3.3 Sensory characteristics**: instructions don't depend only on shape, position, or sound ("click the round button on the right").
- **1.3.4 Orientation (AA)**: works in portrait and landscape; don't lock orientation unless essential.
- **1.4.2 Audio control**: audio that plays over 3 s can be paused or muted; no autoplay with sound.
- **1.4.5 Images of text (AA)**: use real text, not text baked into images (logos excepted).
- **1.4.13 Content on hover or focus (AA)**: tooltips and popovers are dismissible (Esc), hoverable (pointer can move onto them), and persistent until dismissed.

## Operable
- **2.1.1 Keyboard**: everything usable with keyboard; **2.1.2** no keyboard traps.
- **2.4.1 Bypass blocks**: skip-to-content link.
- **2.4.3 Focus order** logical; **2.4.7 Focus visible** always; **2.4.11 Focus not obscured** by sticky headers/banners (2.2).
- **2.4.4 Link purpose**: link text makes sense out of context (no "click here").
- **2.5.8 Target size (minimum)**: ≥ 24×24 CSS px (2.2). Recommended: 44×44 (Apple) / 48×48 dp (Material).
- **2.5.7 Dragging movements**: provide a non-drag alternative (2.2).
- **2.2.2 Pause, stop, hide** for auto-moving content; **2.3.1** no flashing > 3/s.
- **2.1.4 Character key shortcuts**: single-key shortcuts can be turned off, remapped, or only fire on focus.
- **2.2.1 Timing adjustable**: session or form time limits can be turned off, extended, or adjusted (OTP and checkout timers included).
- **2.4.2 Page titled**: each page/screen has a unique, descriptive `<title>`.
- **2.4.5 Multiple ways (AA)**: more than one way to find a page (nav + search, or sitemap), except steps in a process.
- **2.4.6 Headings and labels (AA)**: headings and labels describe their topic or purpose.
- **2.5.1 Pointer gestures**: multi-point or path gestures (pinch, swipe) have a single-pointer alternative.
- **2.5.2 Pointer cancellation**: act on pointer up, not down, so users can abort by moving away.
- **2.5.3 Label in name**: the accessible name contains the visible label text (voice control users say what they see).
- **2.5.4 Motion actuation**: shake/tilt features have a UI control alternative and can be disabled.

## Understandable
- **3.1.1 Language of page**: set `lang` (e.g. `th`, `en`).
- **3.1.2 Language of parts (AA)**: mark passages in another language with `lang` (e.g. an English quote in a Thai page).
- **3.2.1 On focus / 3.2.2 On input**: focusing a field or changing a control must not trigger a context change (navigation, submit, focus jump) without warning.
- **3.2.3 / 3.2.4 Consistent navigation and identification.**
- **3.2.6 Consistent help** (2.2): help in the same place across pages.
- **3.3.1 Error identification**, **3.3.2 Labels or instructions**, **3.3.3 Error suggestion**, **3.3.4 Error prevention** for legal/financial/data actions (reversible, checked, or confirmed). Applies to flows involving money, legal commitments, or data changes.
- **3.3.7 Redundant entry**: don't make users re-enter info already provided (2.2).
- **3.3.8 Accessible authentication**: no cognitive tests (memorizing, transcribing) without alternative; allow paste and password managers (2.2).

## Robust
- **4.1.2 Name, role, value**: custom controls expose proper ARIA; prefer native elements first ("No ARIA is better than bad ARIA").
- **4.1.3 Status messages**: announce dynamic updates with `role="status"` / `aria-live`.

## Practical rules
- Use `<button>` for actions, `<a>` for navigation. Don't remove outlines without replacing them.
- Modals: `role="dialog"`, `aria-modal`, labelled, focus moved in and restored on close.
- Form errors: link to field via `aria-describedby`, `aria-invalid="true"`, focus first error on submit.
- Tooltips/popovers: show on focus as well as hover, close with Esc, keep open while the pointer is over them (1.4.13).
- Voice control: visible button text must appear in the accessible name; don't override with a different `aria-label` (2.5.3).
- WCAG 2.2 removed 4.1.1 Parsing; don't cite it. Items without "(AA)" above are Level A and also required for AA conformance.
- Test: keyboard-only pass, screen reader pass (NVDA/VoiceOver), zoom 200%, contrast checker, automated (axe/Lighthouse) as a floor, not a ceiling.
