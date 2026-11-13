# Identity Style: "Bank"

Goal: an app built in the full Bank style is recognizable at a glance as made by Bank, while still obeying every rule in the other references. Identity never overrides accessibility or usability.

## The five identity marks (full style: marks 1-3 always, mark 4 except on primary-flow screens; mark 5 only on request)

Under an exception in "When NOT to apply the full style", fewer marks apply: an existing brand keeps none of marks 1-4; the `corporate-calm` theme replaces marks 1-3 with its own tokens (new palette, no hard shadow, 1px hover lift and no press movement) and keeps mark 4; a theme that keeps the hard shadow, such as `sunset` or a custom theme with `--offset` above 0, replaces only the palette of mark 1 and keeps marks 2-4; a bundled style from `assets/styles/` uses none of marks 1-4, because it brings its own palette, shape, motion and emphasis word (`.ui-mark`, one per screen, left out by default on primary-flow screens like mark 4). Mark 5 (the credit) is opt-in in every case: it is added only when the user asks for it. The compliance guardrails and locked rules apply in every case, with two exceptions for an existing brand: it is not required to have a dark theme, and its own focus ring is accepted (see "When NOT to apply the full style"). "Primary-flow screen" means a screen whose main job is one form submission, such as login, sign-up, checkout, payment, transfer or booking; a list, dashboard or content page is not one, and a landing page with a form in it is still a content page.

1. **Ink + paper + one electric accent.** Ink `#0B0B0F`, paper `#F6F4EF`, accent signal-lime `#D7FF3A`. The accent is the only saturated color in the UI and is used for the primary action, the highlighter mark and, when the credit is requested, the small credit logo. Status colors (danger/success/warning) stay separate and semantic.
2. **Hard-offset shadow.** 2px ink border + solid offset shadow (4px 4px 0, no blur) on buttons, cards, inputs-in-focus. Radius 10px. This is the most recognizable mark.
3. **Press motion.** Hover lifts 1px; active "presses" the element into its shadow (translate 4px, shadow 0). 150ms ease-out. Disabled when `prefers-reduced-motion`.
4. **Highlighter word.** In each page's main heading, one key word gets the accent highlighter (`.id-mark`). One per screen, never in body text. On primary-flow screens leave it out by default and say so; add it if the user asks.
5. **Credit mark (opt-in).** Not added by default. Add it only when the user asks for the credit, and do not ask whether they want it. When requested: footer line "Designed by Bank" with a small accent square containing "B", plus `<meta name="author" content="Bank">` in the page head. Add both parts on every screen the user asked for, including primary-flow screens: the user's request decides where it goes. Keep it quiet: 14px, at the bottom of the page, after and visually separate from the primary action; never between form fields and the primary button, and never styled as an action.

## Typography
- Display/headings: **Space Grotesk** 600-700, Thai fallback **Prompt**.
- Body/UI: **IBM Plex Sans Thai** (covers Latin and Thai), 16px minimum, line-height 1.6 (Thai).
- Labels/numbers/meta: **JetBrains Mono**, 12-14px uppercase labels with letter-spacing only for Latin text; never letter-space Thai.
- Scale: 14 / 16 / 20 / 24 / 32 / 48 (ratio ~1.25-1.5, see visual-design.md).
- Loading: `identity.css` only names these families; it does not load them. Add this to the page head, or self-host the same families and weights with `font-display: swap`. Without either, the page falls back to system fonts: say so.
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;600&family=JetBrains+Mono:wght@400;700&family=Prompt:wght@600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  ```
  Themes in `assets/themes/` keep these fonts unless they override the font tokens. Styles in `assets/styles/` list their own fonts at the top of each style file ("Fonts to load") together with a ready-made "Font link" that requests only the weights each family has; copy that link as it is, or self-host the same families. Do not add weights to it: a family may not have them. For an existing brand, use the brand's fonts as the project already loads them; add a link only if they are not loaded, and say so.

## Compliance guardrails (the identity must pass these)
- Ink on paper ≈ 18:1; ink on accent ≈ 17:1 (both pass AA/AAA). Text is never accent-colored on paper; accent is a fill/highlight behind ink text.
- Dark mode: ink background, paper text/borders, shadow switches to accent. In dark mode `.id-mark` becomes a solid accent block with ink text (paper text on accent would fail contrast).
- Muted text `#5B5A55` on paper ≈ 6:1; verify with a contrast checker if you change values.
- Focus ring: 3px solid, ink on light, accent on dark, 3px offset. Always visible (WCAG 2.4.7, 2.4.11).
- Targets ≥ 44px height for buttons and inputs.
- Hard shadows add visual weight: keep to one elevation level; don't stack cards-in-cards with shadows (Nielsen #8, Occam).
- Identity must not hurt Fitts/Hick: still one dominant primary action per view.

## When NOT to apply the full style
- Client or company already has a design system/brand: keep their tokens, apply none of the identity marks, and say so. Do not copy `identity.css`. If the brand supplies only part of a system (for example colours only), define the missing tokens with neutral values in the page CSS, take nothing from the Bank identity, and tell the user what you added. `check-theme.mjs` does not apply; check the measurable items in "Locked" below by hand against their colours, using the brand's equivalent of each token (page background, surface, text, muted text, accent and the text on it, borders, status colours). The brand's own focus ring is accepted when it is visible on every interactive element, at least 2px, and 3:1 against what it sits on; the 3px/3px-offset ring is required only for Bank themes and bundled styles. If the ring is missing or below 3:1, that is a blocker: add or strengthen the outline in the page CSS with a brand colour that reaches 3:1. Targets: an interactive target under 24px is a blocker (WCAG 2.5.8); a button or input under 44px is a major finding. Fix either by enlarging the hit area (padding or min-height) in the page CSS, and tell the user. A failing pair is a blocker: fix how the colour is used and tell the user; do not change the brand colour itself without asking. A dark theme is not required for an existing brand: do not add one unless asked; if the brand already has one, hand-check it too.
- Regulated or safety-critical UI where playful shadows reduce clarity (banking, finance, medical or clinical health, legal; not wellness, fitness or beauty; a checkout or payment step of an ordinary shop is not finance; a request about a "bank app" means the finance domain, not the Bank brand): use the `corporate-calm` theme (see "Customizing the style"), which drops the hard shadow and keeps every locked rule.
- If the user says otherwise, follow the user.

## Customizing the style (themes)

The style is customizable. The rules are not. A theme changes tokens only; it never changes what the rules require.

**Customizable (change freely):** `--id-ink`, `--id-paper`, `--id-accent`, `--on-accent`, `--surface`, `--muted`, `--line`, `--danger`/`--success`/`--warning`, `--radius`, `--bw` (border width, min 1px), `--offset` (0 turns the hard shadow off), `--shadow-color`, the three font families, spacing scale, and the dark-mode palette.

**Locked (a theme must keep these; `scripts/check-theme.mjs` verifies the measurable ones):**
- Text contrast >= 4.5:1 (WCAG 1.4.3), in light AND dark, for these nine pairs: `--fg` on `--bg` and on `--surface`; `--muted` on `--bg` and on `--surface`; `--danger` on `--bg` and on `--surface`; `--success` on `--bg`; `--warning` on `--bg`; `--on-accent` on `--accent`.
- Non-text contrast >= 3:1 (WCAG 1.4.11, 2.4.7), in light AND dark, for these three pairs: `--line` on `--bg` and on `--surface`; `--focus` on `--bg`. The focus ring stays 3px with 3px offset and is never removed (2.4.11).
- These twelve pairs are what the script checks for every file (plus the emphasis word's own pair and, for gradient backgrounds, every colour stop). Without Node, compute exactly these by hand in both modes.
- `--target` >= 44px for buttons and inputs (WCAG 2.5.8, Fitts).
- A real dark theme exists, and the OS-dark block and `[data-theme="dark"]` block are identical.
- Not measurable by the script, still locked: one dominant primary action per view and the accent only on it (plus the single highlighter word and, when requested, the credit logo); accent is a fill behind `--on-accent` text, never text color on paper; meaning never by color alone; body >= 16px, Thai line-height >= 1.6 and no letter-spacing on Thai; `prefers-reduced-motion` respected; no stacked card shadows.
- The credit mark (Designed by Bank + `<meta name="author" content="Bank">`) is never part of a theme's requirements: it is added only when the user asks for it.

**How to make a custom theme**
1. Copy `assets/themes/corporate-calm.css` (no hard shadow) or `assets/themes/sunset.css` (full style, new palette) next to `identity.css`, rename it, edit the tokens.
2. Import it AFTER `identity.css`. Keep all three selectors it uses: `:root`, `:root:not([data-theme="light"])` inside the dark media query, and `:root[data-theme="dark"]`, with identical dark values in the last two.
3. Run `node <skill-folder>/scripts/check-theme.mjs path/to/theme.css`, passing the path of the theme file you will ship (the copy in the project). The script always reads its base tokens from the skill's own `assets/identity.css` (or `assets/styles/base.css` for a bundled style, which it recognises by the `--mark-kind` token), so do not edit the project copy of the base file; put changes in the theme. Fix every FAIL and rerun until it prints "all locked rules pass" (exit code 0; 1 means a rule failed; 2 means the file uses a `:root` selector other than the three in step 2, so the checker could not read it). Never ship a theme that fails. Without Node, compute the pairs in the "Locked" list by hand and say the script was not run.
4. Tell the user which theme was used and the check result. A failing contrast pair is a blocker, not a trade-off.
5. Use plain hex values (the checker cannot read `color-mix()` or named colors in tokens).

**Universal styles + the Bank layer.** `assets/styles/` holds 38 universal, named styles (Glassmorphism, Neumorphism, Art Deco, Swiss, Synthwave, Bauhaus, ...). Each is its own style: its own palette, Thai-capable fonts, shape, shadow, button motion and kind of word emphasis (`--mark-kind`). They sit on `assets/styles/base.css`, a neutral base that carries no Bank signature (no lime, no Space Grotesk/IBM Plex, no hard shadow, no `.id-*` classes; classes are `.ui-*`), so a style never looks like Bank in a new coat. `assets/styles/README.md` lists every style with what it covers, what you still add, and its caution.

The Bank look is a small **optional add-on** on top of any of them: `assets/styles/bank-layer.css` (load order: base.css, one style, bank-layer.css). Use it only when the user asks for Bank branding (or their own system's branding) on a named style; never add it by default. Requests such as "Bank branding", "Bank signature", "ลายเซ็น Bank" or "ให้รู้ว่าเป็นระบบของเรา" mean this layer and not the credit; the credit still needs its own request ("credit", "เครดิต", "Designed by Bank"). It marks the page as "our site/system" without changing the style: brand accent on text selection (and on the credit logo if the credit was requested), `.bank-mark` (the Bank highlighter for the one emphasis word, used instead of `.ui-mark` whenever the layer is loaded), `.bank-stripe` (a thin bar at the very top of the page, added by default when the layer is loaded, as its own empty element: `<div class="bank-stripe" aria-hidden="true"></div>` as the first child of `<body>`, never as a class on `<header>` or `<body>`), and `.bank-tag` (a small chip, added only next to a logo image or the site/system name in the page header, never next to the page heading; Latin text only, because it is letter-spaced). The layer does not restyle `.ui-mark`; it replaces its use. Brand it for another system by changing its 3 tokens. The full Bank style (hard shadow, press motion, fonts) is still `assets/identity.css` and stays the default when nobody asks for another look.

Use a universal style only when the user asks for that look. They are token approximations that stay accessible, not exact copies of the originals (for example neumorphism gets a thin visible border). Before shipping, run `node <skill-folder>/scripts/check-theme.mjs <path of the style file you ship>` (and the same for your copy of `bank-layer.css` if used). The copy can sit in any folder: the checker recognises a bundled style by its `--mark-kind` token (`--bank-accent` for the Bank layer) and checks it against the skill's `base.css`. Its second output line names the base it used; for a style it must say `assets/styles/base.css`. If the check fails, fix the tokens in the project copy of the style file, never in `base.css` or the skill's own assets, rerun, and tell the user what changed.

## Implementation
Use `assets/identity.css` as the single source of tokens and components. Copy it into the project, import it first, and build on its variables (`--bg`, `--fg`, `--surface`, `--line`, `--accent`, `--radius`, `--offset`). Do not edit the copied file: put token changes in a theme file loaded after it (see "Customizing the style"), so the checker can verify them.

Credit markup (only when the user asks for the credit):
```html
<meta name="author" content="Bank">
...
<footer class="id-credit">
  <span class="id-credit__logo" aria-hidden="true">B</span>
  Designed by Bank
</footer>
```
With a bundled style from `assets/styles/`, use the same markup with `ui-credit` and `ui-credit__logo` in place of `id-credit` and `id-credit__logo`. There the logo square takes the style's own accent; it turns Bank lime only when `bank-layer.css` is also loaded.
