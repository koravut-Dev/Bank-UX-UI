#!/usr/bin/env node
// check-theme.mjs: verify that a Bank theme or a bundled style still obeys the skill's locked rules.
// Usage: node check-theme.mjs [path/to/theme-or-style.css]
//   No argument: checks assets/identity.css alone (the default Bank identity).
//   With a file: the base is the skill's assets/identity.css for a Bank theme, or assets/styles/base.css
//   for a bundled style or bank-layer.css (chosen by file content, see below). The file's :root and dark
//   blocks override the base, which is how the browser cascades them when the file is loaded after its base.
// Exit code 0 = all locked rules pass, 1 = at least one failure. No dependencies (Node 18+).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const themePath = process.argv[2] ? path.resolve(process.argv[2]) : null;
// Bundled styles (assets/styles/*.css) build on assets/styles/base.css; Bank themes build on assets/identity.css.
// A style file is recognised by its content, not its folder, so a copy in any project folder is checked against the
// right base: every style declares --mark-kind, and bank-layer.css declares --bank-accent. identity.css and the
// themes in assets/themes/ declare neither. The folder name is deliberately ignored: projects often keep CSS in a
// folder called "styles", and a Bank theme copied there must still be checked against identity.css.
const themeSrc = themePath ? fs.readFileSync(themePath, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') : '';
const isStyle = !!themePath && /(^|[\s;{])--(mark-kind|bank-accent)\s*:/.test(themeSrc);
const basePath = path.join(here, '..', 'assets', isStyle ? 'styles/base.css' : 'identity.css');

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');
const SELECTORS = {
  light: ':root',
  dark: ':root[data-theme="dark"]',
  media: ':root:not([data-theme="light"])',
};

function parseDecls(body) {
  const out = {};
  for (const m of body.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

function parseBlocks(css) {
  css = strip(css);
  const res = { light: {}, dark: {}, media: {} };
  // Lookbehind (not a consumed delimiter) so back-to-back blocks like `}:root[...]{` are all read.
  const re = /(?<=^|[}{])\s*(:root(?:\[data-theme="dark"\]|:not\(\[data-theme="light"\]\))?)\s*\{([^}]*)\}/g;
  let found = 0;
  for (const m of css.matchAll(re)) {
    const key = Object.keys(SELECTORS).find((k) => SELECTORS[k] === m[1]);
    Object.assign(res[key], parseDecls(m[2]));
    found++;
  }
  // Guard against silent misses: every `:root` selector in the file must have been parsed.
  const total = (css.match(/:root(?:\[data-theme="dark"\]|:not\(\[data-theme="light"\]\))?\s*\{/g) || []).length;
  if (found !== total) {
    console.error(`error: parsed ${found} of ${total} :root blocks; use only these selectors: ${Object.values(SELECTORS).join('  |  ')}`);
    process.exit(2);
  }
  return res;
}

const base = parseBlocks(fs.readFileSync(basePath, 'utf8'));
const theme = themePath ? parseBlocks(fs.readFileSync(themePath, 'utf8')) : { light: {}, dark: {}, media: {} };

const light = { ...base.light, ...theme.light };
const dark = { ...light, ...base.dark, ...theme.dark };
const media = { ...light, ...base.media, ...theme.media };

function resolve(name, env, depth = 0) {
  let v = env[name];
  if (v === undefined) return undefined;
  if (depth > 10) return v;
  return v.replace(/var\(--([\w-]+)[^)]*\)/g, (_, n) => resolve(n, env, depth + 1) ?? '');
}

function hex(v) {
  if (!v) return null;
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(v.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function lum([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function ratio(a, b) {
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

// [foreground token, background token, minimum ratio, rule]
const PAIRS = [
  ['fg', 'bg', 4.5, 'WCAG 1.4.3 body text on page'],
  ['fg', 'surface', 4.5, 'WCAG 1.4.3 text on cards/inputs'],
  ['muted', 'bg', 4.5, 'WCAG 1.4.3 muted text on page'],
  ['muted', 'surface', 4.5, 'WCAG 1.4.3 muted text on surface'],
  ['on-accent', 'accent', 4.5, 'WCAG 1.4.3 text on the accent fill (primary button, highlighter)'],
  ['danger', 'bg', 4.5, 'WCAG 1.4.3 danger text'],
  ['danger', 'surface', 4.5, 'WCAG 1.4.3 danger text on surface'],
  ['success', 'bg', 4.5, 'WCAG 1.4.3 success text'],
  ['warning', 'bg', 4.5, 'WCAG 1.4.3 warning text'],
  ['line', 'bg', 3, 'WCAG 1.4.11 component borders'],
  ['line', 'surface', 3, 'WCAG 1.4.11 borders on surface'],
  ['focus', 'bg', 3, 'WCAG 1.4.11 / 2.4.7 focus ring'],
];

let failures = 0;
const HEXRE = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g;
function hexesIn(v) { return (v && v.match(HEXRE)) || []; }

function checkMode(label, env, isLight = false) {
  console.log(`\n${label}`);
  const pairs = [...PAIRS];
  const kind = (resolve('mark-kind', env) || '').trim();
  if (kind) {
    // Styles in assets/styles/ declare which kind of word emphasis they use (--mark-kind) and must pass that kind's pairs.
    const K = {
      band:     [['fg', 'accent', 4.5, 'emphasis band: text overlaps the accent band']],
      block:    [['on-accent', 'accent', 4.5, 'emphasis block: text on the accent block']],
      brush:    [['on-accent', 'accent', 4.5, 'emphasis brush: text sits on the accent stroke']],
      thick:    [['em-strong', 'bg', 3, 'emphasis underline is visible (non-text 3:1)']],
      wavy:     [['em-strong', 'bg', 3, 'emphasis wavy underline is visible (non-text 3:1)']],
      double:   [['em-strong', 'bg', 3, 'emphasis double underline is visible (non-text 3:1)']],
      outline:  [['em-strong', 'bg', 3, 'emphasis outline box is visible (non-text 3:1)']],
      circle:   [['em-strong', 'bg', 3, 'emphasis circle is visible (non-text 3:1)']],
      pill:     [['fg', 'em-soft', 4.5, 'emphasis pill: text on the soft tint']],
      color:    [['em-strong', 'bg', 4.5, 'emphasis colored text']],
      gradient: [['em-strong', 'bg', 4.5, 'emphasis gradient text, first stop'], ['em-strong2', 'bg', 4.5, 'emphasis gradient text, second stop']],
      serif:    [],
      bold:     [],
    };
    if (!(kind in K)) {
      failures++;
      console.log(`  FAIL  --mark-kind "${kind}" is not one of: ${Object.keys(K).join(' | ')}`);
    } else pairs.push(...K[kind]);
  } else if (isLight) {
    // Bank identity.css (no --mark-kind): a gradient band lets the text overlap the accent, so --mark-fg must also read on
    // --accent; a solid block needs --mark-fg on --mark-bg. Dark mode uses a solid on-accent block (covered by on-accent/accent).
    const mb = resolve('mark-bg', env) || '';
    if (/gradient/i.test(mb)) pairs.push(['mark-fg', 'accent', 4.5, 'highlighter text overlapping the accent band']);
    else pairs.push(['mark-fg', 'mark-bg', 4.5, 'highlighter text on solid block']);
  }

  // Surfaces that may be gradients: text must read on EVERY color stop. Translucent (rgba) values are skipped;
  // for those the theme must keep --surface as the solid worst-case color (already checked above).
  const stops = [
    ['fg', 'page-bg', 4.5, 'text on every stop of the page background'],
    ['muted', 'page-bg', 4.5, 'muted text on every stop of the page background'],
    ['fg', 'card-bg', 4.5, 'text on every stop of the card background'],
    ['fg', 'btn-bg', 4.5, 'text on every stop of the button background'],
    ['on-accent', 'primary-bg', 4.5, 'text on every stop of the primary button background'],
    ['line', 'card-bg', 3, 'WCAG 1.4.11 card border on every stop of the card background'],
  ];
  for (const [f, b, min, why] of stops) {
    const bv = resolve(b, env);
    if (!bv || /rgba?\(/i.test(bv)) continue;
    const list = hexesIn(bv);
    const fc = hex(resolve(f, env));
    for (const h of list) {
      const r = ratio(fc, hex(h));
      const ok = r >= min;
      if (!ok) failures++;
      console.log(`  ${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1 (min ${min})  --${f} ${resolve(f, env)} on ${h} in --${b}  [${why}]`);
    }
  }
  for (const [f, b, min, why] of pairs) {
    const fv = resolve(f, env), bv = resolve(b, env);
    const fc = hex(fv), bc = hex(bv);
    if (!fc || !bc) {
      console.log(`  FAIL  --${f} on --${b}: cannot read colors (${fv} / ${bv}); use plain hex values or var() chains that end in hex`);
      failures++;
      continue;
    }
    const r = ratio(fc, bc);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1 (min ${min})  --${f} ${fv} on --${b} ${bv}  [${why}]`);
  }
  const tgt = parseFloat(resolve('target', env));
  const tOk = tgt >= 44;
  if (!tOk) failures++;
  console.log(`  ${tOk ? 'pass' : 'FAIL'}  --target ${tgt}px (min 44)  [touch targets, WCAG 2.5.8 + Fitts]`);
  const bw = parseFloat(resolve('bw', env));
  const bwOk = bw >= 1;
  if (!bwOk) failures++;
  console.log(`  ${bwOk ? 'pass' : 'FAIL'}  --bw ${bw}px (min 1)  [visible component boundary]`);
}

console.log(`Theme check: ${themePath ? path.relative(process.cwd(), themePath) : 'default identity.css'}`);
console.log(`Base: ${isStyle ? 'assets/styles/base.css (bundled style)' : 'assets/identity.css (Bank identity/theme)'}`);
checkMode('LIGHT', light, true);
checkMode('DARK  ([data-theme="dark"])', dark);

// Bank layer (assets/styles/bank-layer.css): brand text/accent pair is mode-independent and must be readable.
if (resolve('bank-accent', light) !== undefined || resolve('bank-on-accent', light) !== undefined) {
  console.log('\nBANK LAYER (identical in light and dark; elements set their own text color)');
  const f = resolve('bank-on-accent', light), b = resolve('bank-accent', light);
  const fc = hex(f), bc = hex(b);
  if (!fc || !bc) { failures++; console.log(`  FAIL  --bank-on-accent on --bank-accent: cannot read colors (${f} / ${b})`); }
  else {
    const r = ratio(fc, bc), ok = r >= 4.5;
    if (!ok) failures++;
    console.log(`  ${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1 (min 4.5)  --bank-on-accent ${f} on --bank-accent ${b}  [WCAG 1.4.3 brand tag, mark, selection, credit logo]`);
  }
}

// The OS-dark media block must match the explicit dark block, or users get two different dark themes.
console.log('\nDARK PARITY (prefers-color-scheme block vs data-theme="dark" block)');
const keys = new Set([...Object.keys(base.dark), ...Object.keys(theme.dark), ...Object.keys(base.media), ...Object.keys(theme.media)]);
let drift = 0;
for (const k of keys) {
  const a = resolve(k, dark), b = resolve(k, media);
  if (a !== b) { drift++; console.log(`  FAIL  --${k}: data-theme dark = ${a}, media dark = ${b}`); }
}
if (drift) failures += drift; else console.log('  pass  both dark blocks are identical');

// Light and dark must not be the same palette (a dark theme is required).
if (resolve('bg', light) === resolve('bg', dark)) {
  failures++;
  console.log('\nFAIL  dark --bg equals light --bg: a dark theme is required (platform rule: support light and dark)');
}

console.log(failures ? `\nRESULT: ${failures} failure(s). Fix the tokens above, then run again.` : '\nRESULT: all locked rules pass.');
process.exit(failures ? 1 : 0);
