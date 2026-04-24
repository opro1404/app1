---
name: website-to-hyperframes
description: Capture a website and create a HyperFrames video from it. Use when: (1) a user provides a URL and wants a video, (2) someone says "capture this site", "turn this into a video", "make a promo from my site", (3) the user wants a social ad, product tour, or any video based on an existing website, (4) the user shares a link and asks for any kind of video content.
---

# Website to HyperFrames

Capture a website and transform it into a professional video through a structured 7-step workflow.

## Seven-Step Workflow

### Step 1 — Capture & Understand

Extract site data and summarize:
- Brand name and tagline
- Color palette (primary, secondary, accent)
- Typography (heading font, body font)
- Key assets (hero images, product shots, icons, logos)
- Overall vibe / tone

### Step 2 — Write DESIGN.md

Create a 6-section brand reference (~90 lines):

```markdown
# DESIGN.md

## Brand Identity
[name, tagline, mission]

## Color Palette
primary: #XXXXXX
secondary: #XXXXXX
accent: #XXXXXX
background: #XXXXXX
text: #XXXXXX

## Typography
heading: [font name] [weight]
body: [font name] [weight]
mono: [font name] (if applicable)

## Tone & Motion
[adjectives: bold, minimal, energetic, etc.]
[animation style: snappy, fluid, cinematic]

## Asset Inventory
[list of key visual assets available]

## Constraints
[any brand-specific rules]
```

### Step 3 — Write SCRIPT

Develop narration with scene timing. Scene durations derive from narration timing (average 130 words/minute for narration):

```markdown
# SCRIPT.md

[Scene 1 — ~4s]
Headline copy here.

[Scene 2 — ~6s]
Supporting narration here.
```

### Step 4 — Write STORYBOARD

Per-beat creative direction:

```markdown
# STORYBOARD.md

## Beat 1 [0–4s]
**Mood:** [cinematic / energetic / calm]
**Camera:** [static / slow zoom / pan]
**Layout:** [describe hero frame]
**Animation:** [describe entrance motion]
**Transition:** [fade / slide / shader]
**Assets:** [list elements]
**SFX:** [optional sound cue]
```

### Step 5 — Generate VO + Map Timing

1. Run `npx hyperframes tts --file SCRIPT.md --out narration.wav`
2. Transcribe: `npx hyperframes transcribe narration.wav --format json`
3. Update STORYBOARD.md with real word-level timestamps from `transcript.json`

### Step 6 — Build Compositions

Construct each composition following the storyboard. Self-review checkpoints:

- [ ] Layout-first: hero frame CSS written before animations
- [ ] Every element has an entrance animation (`gsap.from()`)
- [ ] Transitions between every scene (no jump cuts)
- [ ] No exit animations except on final scene
- [ ] All timelines registered in `window.__timelines`
- [ ] WCAG contrast passes at key timestamps

### Step 7 — Validate & Deliver

```bash
npx hyperframes lint
npx hyperframes validate
npx hyperframes preview
# render only on explicit user request:
npx hyperframes render --quality high
```

---

## Video Type Reference

| Type | Duration | Beats | Best For |
|------|----------|-------|----------|
| Social ad | 10–15s | 3–4 | Instagram, TikTok, Twitter |
| Feature announcement | 15–30s | 3–5 | Product launches |
| Launch teaser | 10–20s | 2–3 | Pre-launch hype |
| Brand reel | 20–45s | 4–6 | About/overview |
| Product demo | 30–60s | 5–8 | Sales, onboarding |

**Supported formats:** Landscape (1920×1080), Portrait (1080×1920), Square (1080×1080)

---

## Key Artifacts Per Step

| Step | Output |
|------|--------|
| 1 | Site summary (in conversation) |
| 2 | `DESIGN.md` |
| 3 | `SCRIPT.md` |
| 4 | `STORYBOARD.md` |
| 5 | `narration.wav` + `transcript.json` + updated `STORYBOARD.md` |
| 6 | Composition HTML files |
| 7 | Lint/validate pass + preview running |

Each step's output enables the next — never skip steps or reorder them.
