# Restyle & animate: Andrej consultancy page

Restyle the existing landing page (`andrej-consultancy.html`) into a high-end, monochrome, theatrical experience. Keep ALL existing copy, structure, and section order exactly as-is — this is a visual and interaction pass only, not a content rewrite. Do not invent new sections or change any wording.

## The aesthetic in one line
Refined brutalism meets close-up magic: white-on-black, typographically driven, theatrical, restrained. Editorial and cinematic — the opposite of a typical Web3 / startup site. The visitor should leave **spellbound**: impressed, slightly disarmed, wanting more.

## Reference sensibility (do not copy, absorb)
Channel the restraint and menace-under-elegance of Derren Brown, Derek DelGaudio, Rob Zabrecky; the high-contrast cinematic typography of Gaspar Noé and Romain Gavras; the deadpan, anti-slick observation of Jim Jarmusch and John Wilson; the unhurried analog cool of Josh Homme. Visual cousins: chenting.co and deepwork.studio — sparse, confident, white-on-black, generous negative space, type as the hero.

## Colour
- Background: true near-black (`#0a0a0a` or `#0c0b0b`, not pure `#000`).
- Foreground: off-white (`#f4f1ea`, slightly warm, never pure white).
- Single accent: oxblood `#6e2113` (and a brighter `#a8442f` for hover/active only). Use it like a held breath — rarely, deliberately. One accent moment per viewport at most. Blood on black.
- No other colours. No gradients except, if anything, an almost-imperceptible vignette/grain for atmosphere.

## Typography
- Display & headings: **ABC Whyte Inktrap** (license owned — load the local font files via `@font-face`; assume files in `/fonts/`). Use its ink traps at large sizes where they're visible. Tight letter-spacing on big headings (`-0.02em` to `-0.04em`).
- Body: ABC Whyte (non-inktrap) if available, otherwise a clean neutral grotesque as fallback. Generous line-height (1.6–1.7), restrained size.
- Everything sentence case. Never all-caps except possibly tiny eyebrow labels with wide tracking (`0.15em`).
- Type is the primary visual element. Let headings be large and confident. Negative space is luxury — use a lot of it.

## Motion philosophy — MISDIRECTION, not decoration
Motion should control *where the eye looks*, the way a magician directs attention — never flashy for its own sake. Principles:
- **Reveals on scroll**: elements resolve into place as they enter — fade + small rise, staggered. Never bouncy. Easing should be slow-in, slow-out, slightly long (600–900ms). Calm, deliberate, theatrical.
- **The page-load is one orchestrated moment**: the hero resolves in a single choreographed sequence (headline lines stagger in, accent appears last). One strong opening, not scattered micro-animations.
- **Custom cursor**: a subtle, refined cursor treatment — a small ring or dot that gently lags/eases behind the real pointer, and shifts (grows, inverts, or reveals a word like "look") over interactive elements. Tasteful, not gimmicky.
- **Attention misdirection moments** (subtle, 1–3 total across the page): something changes when the user's attention is likely *elsewhere* — e.g. a number in the proof bar quietly counts up only after you've scrolled past it; a word in a heading swaps to a synonym on a slow interval; an element fades in at the edge of vision. The feeling should be "wait — did that just change?" never an obvious effect.
- **Hover states** that surprise gently: links that don't just underline but reveal or redact; the oxblood appearing only on intent.
- Respect `prefers-reduced-motion` — disable non-essential motion gracefully.

## Texture & atmosphere
- A very fine film grain / noise overlay across the whole page (low opacity, ~3–5%) for an analog, cinematic, slightly unsettling texture. CSS or a tiny tiled PNG.
- Optional: an extremely subtle vignette darkening the edges.
- Hairline rules (1px, low-opacity off-white) to divide sections — brutalist, architectural.
- Section transitions: consider full-bleed black sections with enormous type, alternating density (a dense section then a near-empty one) for theatrical pacing.

## Interaction details to implement
- Smooth-scroll navigation.
- The proof-bar stats count up once, when scrolled into view.
- Testimonials: consider them appearing one at a time on scroll, like cards being dealt.
- The "on stage" talks list: hairline rows that reveal/expand subtly on hover.
- Sticky minimal nav that thins/condenses after scroll.

## Hard constraints
- Keep it a single self-contained HTML file (inline CSS + JS) unless the project is already structured otherwise. Vanilla JS or a tiny library only — no heavy frameworks.
- Performance: motion must be 60fps, GPU-friendly (transform/opacity only). No layout-thrashing animations.
- Fully responsive; the theatrical type must scale down elegantly on mobile (`clamp()`).
- Accessible: real contrast, focus states, reduced-motion support, semantic HTML preserved.
- Do not use pure black, pure white, or any colour outside the palette above.

## What "done" looks like
A monochrome, grain-textured, type-led page that feels like a DelGaudio show programme crossed with a Noé title sequence — calm, confident, a little uncanny. Every animation earns its place by directing attention. Nothing decorative. The oxblood lands maybe five times in the whole scroll and each time it matters.
