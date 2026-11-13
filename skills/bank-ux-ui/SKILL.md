---
name: bank-ux-ui
description: >-
  Design and review web UI/UX against named rules (Nielsen heuristics, Laws of
  UX, Norman, Shneiderman, WCAG 2.2, Gestalt, Apple HIG / Material, Core Web
  Vitals). Applies the author's 'Bank' house style by default (lime accent,
  hard-offset shadow, one highlighter word); a 'Designed by Bank' credit is
  added only when the user asks for it; regulated UI such as banking, medical
  or legal gets the calmer corporate-calm theme, and an existing brand keeps
  its own tokens. Also bundles 38 named styles (glassmorphism, swiss, art deco,
  ...) for when the user asks for one. Use when building or reviewing HTML/CSS
  screens, components, forms, landing pages or dashboard layouts, or when asked
  to "ออกแบบ UI", "ทำหน้าเว็บ", "รีวิว UX", "เช็ค accessibility", "ปรับ layout",
  "ทำให้หน้าเว็บสวย/ใช้ง่ายขึ้น". Not for Figma files, the design of charts
  themselves, slides or documents, or native iOS/Android code.
---

# UX/UI Rules

Every design decision must trace to a named rule. When you make or critique a design choice, cite the rule (e.g. "Fitts's Law", "Nielsen #5", "WCAG 1.4.3") so the reasoning is checkable, not taste.

## Workflow

1. **Context first.** Establish: users and their goal, primary task, device (mobile/desktop), brand constraints, existing design system. If unknown and it changes the design, ask once; otherwise state assumptions. Brand, credit and web-versus-native have fixed defaults below and are never asked about. An existing brand or design system counts only when the user supplies brand tokens or a style guide, asks to match an existing site, or the project already has its own stylesheet or tokens; otherwise assume there is none, say so, and do not ask. The bundled assets are web only (HTML/CSS). Native code (Swift, Kotlin, Flutter) is outside this skill's scope; if the task turns out to be native after the skill loaded, use only the rules and token values as guidance: no CSS files, no credit markup, no theme check, and say so. When a request says "app" or "mobile app" without naming a native framework (for example "mobile banking app"), build a mobile-first web page and state that assumption instead of asking.
2. **Structure before style.** Define the task flow and information hierarchy (what is primary, secondary, tertiary) before colors and fonts.
   - Rules: `references/usability-heuristics.md`, `references/laws-of-ux.md`
3. **Visual system + identity.** Pick tokens (type scale, spacing, color roles, radius, elevation) and apply them consistently. Choose the style in this order, first match wins, and tell the user which one you used:
   1. The user names a look or a style: follow the user. A theme from `assets/themes/` is copied together with `assets/identity.css`, which loads first; a theme that keeps the hard shadow (such as `sunset`) keeps identity marks 2-4. A named style from `assets/styles/` is copied together with `assets/styles/base.css`, which loads first. Add `assets/styles/bank-layer.css` on top of a named style only when the user asks for Bank branding (or their own system's branding) on that style; never by default. Requests such as "Bank branding", "Bank signature", "ลายเซ็น Bank" or "ให้รู้ว่าเป็นระบบของเรา" mean this layer, not the credit; the credit is added only when the user says "credit", "เครดิต" or "Designed by Bank". With the layer loaded, the emphasis word uses `.bank-mark` instead of `.ui-mark`, and `.bank-stripe` goes at the top of the page by default; add `.bank-tag` only next to a logo or system name. In a project that already has its own stylesheets, load the copied files before every existing project stylesheet and keep linking the project's global stylesheet; if its rules override the theme's body, fonts or tokens, report that to the user instead of editing it.
   2. The client or company already has a design system or brand: keep their tokens. Do not copy `identity.css`, a theme, or a style file; write the page's CSS with their tokens, and use their fonts as the project already loads them. If the brand supplies only part of a system (for example colours only), define the missing tokens (spacing, radius, status colours) with neutral values in the page CSS, take no values or marks from the Bank identity, and tell the user what you added. `check-theme.mjs` does not apply to their stylesheet: check the contrast pairs, targets and focus ring by hand as "When NOT to apply the full style" in `references/identity.md` describes (the brand's own focus ring of 2px or more is accepted; the 3px ring is for Bank themes and bundled styles only). A failing pair is a blocker: fix it by changing how the colour is used (for example the text colour placed on it), tell the user, and do not change the brand colour itself without asking. A dark theme is not required for an existing brand: do not add one unless asked; if the brand already has one, hand-check it too.
   3. Regulated or safety-critical product (banking, finance, medical or clinical health, legal; not wellness, fitness or beauty; a checkout or payment step of an ordinary shop is not finance): use `assets/themes/corporate-calm.css` on top of `assets/identity.css`. Copy both files and import the theme after `identity.css`. The theme keeps the emphasis word (mark 4, `.id-mark`). "Bank" in this skill's name is the author's brand, not the finance domain; a request about a "bank app" is the finance domain.
   4. Otherwise: the full Bank identity. Copy `assets/identity.css` into the project and apply identity marks 1-4 in `references/identity.md`.

   Copy CSS files into the project's existing stylesheet folder; if there is no project yet, put them next to the HTML file you create. Put page-specific CSS in one new file shared by the screens you build, loaded last (in a project with an existing brand, add it after their stylesheet rather than editing theirs); do not edit the copied base file. "Primary-flow screen" below means a screen whose main job is one form submission, such as login, sign-up, checkout, payment, transfer or booking; a list, dashboard or content page is not one, and a landing page with a form in it is still a content page. The credit ("Designed by Bank" footer and `<meta name="author" content="Bank">`, identity mark 5) is opt-in: never add either part unless the user asks for the credit in this conversation. Do not ask whether they want it. When the user does ask, add both parts on the screens they asked for, primary-flow screens included, and place the footer as mark 5 in `references/identity.md` says: at the bottom of the page, after and visually separate from the primary action. On primary-flow screens leave the emphasis word (mark 4, or `.ui-mark` in a named style) out by default and say so; add it if the user asks. Load the fonts the chosen style names (see "Typography" in `references/identity.md`); the CSS files only name the families and do not load them. For any Bank theme or bundled style other than the unmodified `identity.css`, run `node <skill-folder>/scripts/check-theme.mjs <path of the theme file you ship>` (Node 18+; run it again for your copy of `bank-layer.css` if used); the locked rules (contrast, 44px targets, focus ring, dark theme) must pass. If it fails, fix the tokens in the project copy of that theme or style file, never in the base file or the skill's own assets, rerun, and tell the user what changed. If Node is not available, compute the twelve contrast pairs listed under "Locked" in `references/identity.md` (light and dark) by hand with the WCAG formula and report that the script was not run.
   - Rules: `references/visual-design.md`, `references/identity.md`
4. **States and feedback.** Design every state: default, hover, focus, active, disabled, loading, empty, error, success.
5. **Accessibility and platform.** Check against `references/accessibility-wcag.md` and `references/platform-and-performance.md`.
6. **Self-review.** Run `references/checklist.md` before delivering. Fix failures, list any consciously accepted trade-offs. Done means: every checklist item is pass or n/a (an Identity item is n/a only where the checklist item itself says so, by style or by screen type, with the reason stated), the theme check result is reported (n/a for the unmodified `identity.css`; for an existing brand, or when Node is unavailable, the hand check result is reported in its place; n/a for native code along with the Identity items), and the user has been told the style used, the assumptions made, and what was not verified.

## Output rules

- Default to design tokens (CSS variables) over hard-coded values.
- Mobile-first, responsive down to 320px width.
- Support light and dark themes when the stack allows it (an existing brand without a dark theme stays light-only unless asked); never rely on color alone to convey meaning.
- When reviewing, report findings as: **Issue → Rule violated → Severity (blocker/major/minor) → Fix**.
- Do not invent rules. If a choice is taste rather than a rule, say so.

## Which reference to load

| Need | File |
|---|---|
| Flows, forms, errors, navigation | `references/usability-heuristics.md` |
| Cognitive/perceptual decisions (choices, grouping, speed, memory) | `references/laws-of-ux.md` |
| Typography, color, spacing, layout, motion | `references/visual-design.md` |
| Bank's recognizable identity (palette, shadows, opt-in credit mark) | `references/identity.md`, `assets/identity.css` |
| Custom style/theme that must still obey the rules | `references/identity.md` (Customizing), `assets/themes/*.css`, `scripts/check-theme.mjs` |
| A named universal style the user asks for (glassmorphism, neumorphism, art deco, swiss, ... 38 styles); the Bank add-on layer only when the user asks for it | `assets/styles/README.md` (catalogue), `assets/styles/base.css` + `assets/styles/<style>.css` (+ `assets/styles/bank-layer.css`) |
| Contrast, keyboard, screen reader, target size | `references/accessibility-wcag.md` |
| iOS/Android conventions, performance budgets | `references/platform-and-performance.md` |
| Final pass | `references/checklist.md` |
