---
name: hyperframes
description: Author HyperFrames video compositions in HTML. Use when writing or editing HyperFrames compositions, adding scenes, wiring clips, or building GSAP timelines. Covers data attributes, composition structure, timeline contract, animation rules, and quality checks.
---

# HyperFrames

HyperFrames enables video creation through HTML, treating markup as the authoritative source. Compositions use `data-*` attributes for timing, GSAP timelines for animation, and CSS for styling.

## Core Workflow

Before authoring HTML, consider four dimensions:

1. **Narrative** — What emotional arc and key moments define the viewer's experience?
2. **Architecture** — How many compositions exist; which are sub-compositions versus inline; what content flows through each track?
3. **Pacing** — Which clips establish duration; where do transitions occur; what's the rhythm?
4. **Layout** — Build the final visual state first, then layer motion on top.
5. **Motion** — Apply animation using GSAP according to established rules.

## Visual Identity (Required First Step)

Before writing ANY composition HTML, you MUST have a visual identity defined. Check in this sequence:

1. Does `DESIGN.md` exist? Use its exact colors, fonts, and constraints.
2. Does `visual-style.md` exist? Apply its structured fields and `style_prompt_full`.
3. Did the user name a style (e.g., "Swiss Pulse")? Generate a minimal `DESIGN.md` from [visual-styles.md](./visual-styles.md).
4. None above? Ask three clarifying questions about mood, canvas darkness, and brand references before writing any code.

Without this gate, you risk generic defaults like `#333` or `Roboto`.

## Layout-First Principle

Position every element where it should be at its most visible moment — the frame where it's fully entered, correctly placed, and not yet exiting.

### Process

1. **Identify the hero frame** — the moment when the most elements are simultaneously visible.
2. **Write static CSS** — fill the scene with `.scene-content` using `width: 100%; height: 100%; padding: Npx;` and flex layout. Reserve `position: absolute` for decorative elements only.
3. **Add entrances with `gsap.from()`** — animate FROM offscreen/invisible TO the CSS position.
4. **Add exits with `gsap.to()`** — animate TO offscreen/invisible FROM the CSS position.

**Why:** If you position at the animated start state and tween to where you think elements should land, you're guessing the final layout. Building the end state first reveals overlap and sizing problems before rendering.

---

## Data Attributes

### All Clips

| Attribute | Required | Values |
|---|---|---|
| `id` | Yes | Unique identifier |
| `data-start` | Yes | Seconds or reference (`"el-1"`, `"intro + 2"`) |
| `data-duration` | Required for img/div/compositions | Seconds; video/audio default to media duration |
| `data-track-index` | Yes | Integer; same-track clips cannot overlap |
| `data-media-start` | No | Trim offset into source (seconds) |
| `data-volume` | No | 0–1 (default 1) |

### Composition Clips

| Attribute | Required | Values |
|---|---|---|
| `data-composition-id` | Yes | Unique composition ID |
| `data-start` | Yes | Start time (root: `"0"`) |
| `data-duration` | Yes | Precedence over GSAP timeline |
| `data-width` / `data-height` | Yes | Pixel dimensions (1920×1080 or 1080×1920) |
| `data-composition-src` | No | Path to external HTML file |

---

## Composition Structure

**Standalone** (main `index.html`) places `data-composition-id` directly in `<body>` — NO `<template>` wrapper.

**Sub-compositions** wrap content in `<template>`:

```html
<template id="my-comp-template">
  <div data-composition-id="my-comp" data-width="1920" data-height="1080">
    <!-- content -->
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      // tweens...
      window.__timelines["my-comp"] = tl;
    </script>
  </div>
</template>
```

Load in root: `<div id="el-1" data-composition-id="my-comp" data-composition-src="compositions/my-comp.html" data-start="0" data-duration="10" data-track-index="1"></div>`

---

## Video and Audio

Video must be `muted playsinline`. Audio is always a separate `<audio>` element:

```html
<video id="el-v" data-start="0" data-duration="30" data-track-index="0"
  src="video.mp4" muted playsinline></video>
<audio id="el-a" data-start="0" data-duration="30" data-track-index="2"
  src="video.mp4" data-volume="1"></audio>
```

---

## Timeline Contract

- All timelines start `{ paused: true }` — the player owns playback.
- Register every timeline: `window.__timelines["<composition-id>"] = tl`
- Framework auto-nests sub-timelines — do NOT manually add them.
- Duration comes from `data-duration`, not GSAP timeline length.
- Never create empty tweens to set duration.

---

## Non-Negotiable Rules

**Deterministic:** No `Math.random()`, `Date.now()`, or time-based logic. Use seeded PRNGs if needed.

**GSAP:** Animate only visual properties (`opacity`, `x`, `y`, `scale`, `rotation`, `color`, `backgroundColor`, `borderRadius`, transforms). Never animate `visibility`, `display`, or call `video.play()`/`audio.play()`.

**Animation conflicts:** Never animate the same property on the same element from multiple timelines simultaneously.

**No `repeat: -1`:** Infinite loops break the capture engine. Calculate exact repeats: `repeat: Math.ceil(duration / cycleDuration) - 1`

**Synchronous timeline construction:** Never build timelines inside `async`/`await`, `setTimeout`, or Promises. The capture engine reads `window.__timelines` synchronously post-load.

### Prohibited Patterns

1. Forget `window.__timelines` registration
2. Use video for audio — always muted video + separate `<audio>`
3. Nest video inside a timed div — use a non-timed wrapper
4. Use `data-layer` (use `data-track-index`) or `data-end` (use `data-duration`)
5. Animate video element dimensions — animate a wrapper div
6. Call play/pause/seek on media — framework owns playback
7. Create a top-level container without `data-composition-id`
8. Use `repeat: -1` on any timeline or tween — always finite
9. Build timelines asynchronously
10. Use `gsap.set()` on clip elements from later scenes — they don't exist at page load. Use `tl.set(selector, vars, timePosition)` inside the timeline instead
11. Use `<br>` in content text — text wraps naturally via `max-width`. Exception: short display titles deliberately stacked (e.g., "THE\nIMMORTAL\nGAME" at 130px)

---

## Scene Transitions (Mandatory Multi-Scene Rule)

Every multi-scene composition MUST follow ALL rules:

1. **ALWAYS use transitions.** No jump cuts.
2. **ALWAYS add entrance animations on every scene.** Every element animates IN via `gsap.from()`. No element appears fully-formed.
3. **NEVER use exit animations** except on the final scene. Do NOT animate opacity to 0, y offscreen, scale to 0 before a transition. The transition IS the exit. Content MUST be fully visible when the transition starts.
4. **Final scene only:** The last scene may fade elements out. This is the ONLY place `gsap.to(..., { opacity: 0 })` is allowed.

**Wrong — exit before transition:**
```js
tl.to("#s1-title", { opacity: 0, y: -40, duration: 0.4 }, 6.5);
// transition fires on empty frame — BANNED
```

**Right — entrance only, transition handles exit:**
```js
tl.from("#s1-title", { y: 50, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.3);
// NO exit tweens — transition at 7.2s handles the scene change
```

---

## Animation Guardrails

- Offset first animation 0.1–0.3s (not t=0)
- Vary eases across entrance tweens — use at least 3 different eases per scene
- Don't repeat an entrance pattern within a scene
- Avoid full-screen linear gradients on dark backgrounds (H.264 banding — use radial or solid + localized glow)
- 60px+ headlines, 20px+ body, 16px+ data labels for rendered video
- `font-variant-numeric: tabular-nums` on number columns

---

## Typography and Assets

- Write the `font-family` you want in CSS — the compiler embeds supported fonts automatically. If unsupported, the compiler warns.
- Add `crossorigin="anonymous"` to external media.
- For dynamic text overflow: `window.__hyperframes.fitTextFontSize(text, { maxWidth, fontFamily, fontWeight })`
- All files live at the project root alongside `index.html`; sub-compositions use `../`

---

## Quality Checks

### Contrast Validation

`hyperframes validate` runs a WCAG contrast audit by default, seeking 5 timestamps and sampling background pixels behind every text element:

```
⚠ WCAG AA contrast warnings (3):
  · .subtitle "secondary text" — 2.67:1 (need 4.5:1, t=5.3s)
```

On dark backgrounds, brighten the failing color to 4.5:1 (normal text) or 3:1 (large text, 24px+ or 19px+ bold). On light backgrounds, darken it. Stay within the palette family — adjust the existing color, don't invent a new one.

### Animation Map

After authoring animations, verify choreography:

```bash
node skills/hyperframes/scripts/animation-map.mjs <composition-dir> \
  --out <composition-dir>/.hyperframes/anim-map
```

Outputs per-tween summaries, ASCII timeline, stagger detection, dead zones, element lifecycles, scene snapshots, and flags (`offscreen`, `collision`, `invisible`, `paced-fast`, `paced-slow`).

---

## References (On Demand)

- **captions.md** — Captions, subtitles, lyrics, karaoke synced to audio
- **tts.md** — Text-to-speech with Kokoro-82M, voice selection, speed tuning
- **audio-reactive.md** — Map frequency bands and amplitude to GSAP properties
- **css-patterns.md** — Marker highlighting: highlight, circle, burst, scribble, sketchout
- **typography.md** — Font pairing, OpenType features, dark-background adjustments
- **motion-principles.md** — Easing as emotion, timing as weight, choreography as hierarchy
- **visual-styles.md** — 8 named visual styles with hex palettes and GSAP signatures
- **house-style.md** — Default motion, sizing, and palettes when no style is specified
- **patterns.md** — PiP, title cards, slide show patterns
- **data-in-motion.md** — Data, stats, and infographic patterns
- **transitions.md** — Scene transitions, energy/mood selection, CSS vs WebGL
- **dynamic-techniques.md** — Karaoke, clip-path, slam, scatter, elastic, 3D techniques

---

## Output Checklist

- [ ] `npx hyperframes lint` and `npx hyperframes validate` both pass
- [ ] Contrast warnings addressed
- [ ] Animation choreography verified
