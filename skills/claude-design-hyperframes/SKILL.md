---
name: claude-design-hyperframes
description: Template-first visual prototyping for HyperFrames in Claude Design. Use when starting a new video composition from a brief, picking a skeleton template, or producing a brand-accurate first draft with GSAP animations and shader transitions. Covers the 5-step design workflow, four skeleton templates, and copy-paste animation patterns.
---

# Claude Design + HyperFrames (Template-First)

## Your Role

Produce a structurally valid first draft: brand identity, layout, scene content, and reasonable first-pass animations. Claude Code refines timing, easing, and pacing after download.

**What you create:** Complete, playable first drafts. Each composition includes:
- Valid HTML with GSAP timeline (passes lint immediately)
- Scene-by-scene animations (no static slides)
- Shader transitions at key narrative moments
- CSS grain, vignettes, and brand-accurate styling

**What you do NOT do:**
- No React, Babel, or component frameworks
- No `copy_starter_component`
- No incomplete HTML

---

## 5-Step Workflow

### Step 1 — Understand the Brief

Collect from the user (or infer if provided):
1. **Video type** — social reel, launch teaser, product explainer, cinematic title
2. **Duration & aspect ratio** — e.g. "15s vertical" or "25s horizontal"
3. **Brand identity** — colors (hex), fonts, screenshots, or style name
4. **Content** — headlines, stats, key messages, CTA

If visual direction is missing: ask for brand screenshots, color hex codes, or typeface names before picking a skeleton.

### Step 2 — Pick a Skeleton

Choose the skeleton that matches video type and duration. Fill in brand identity, colors, and content. Do NOT start from scratch — skeletons are pre-valid.

| Skeleton | Duration | Use For |
|----------|----------|---------|
| Social Reel | 15s | Instagram, TikTok — 3 scenes, portrait |
| Launch Teaser | 20s | Product launch — 4 scenes, landscape |
| Product Explainer | 45s | Demo/walkthrough — 6 scenes, landscape |
| Cinematic Title | 12s | Dramatic opener — 2 scenes, landscape |

### Step 3 — Fill Scenes

For each scene in the skeleton:
1. Apply brand colors and fonts from DESIGN.md
2. Insert actual content (headlines, stats, imagery)
3. Add entrance animations: `gsap.from()` for every visible element
4. Add mid-scene activity (floats, counters, glows, pulses)
5. Ensure transitions at every scene boundary

### Step 4 — Transitions

Add shader transitions at 2–3 key moments:
- **Hero reveal** (scene 1 → 2) — energy entrance
- **Energy shift** (midpoint) — mood change
- **CTA** (penultimate → final) — momentum close

Use CSS fade/slide transitions elsewhere. Never use jump cuts.

### Step 5 — Verify Preview

Before delivering:
- [ ] All scenes have entrance animations
- [ ] Transitions present at every scene boundary
- [ ] No exit animations except final scene
- [ ] All timelines registered in `window.__timelines`
- [ ] `npx hyperframes lint` passes

---

## Non-Negotiable Constraints

- Plain HTML + CSS + paused GSAP timeline only
- No React, Babel, or build tools
- Every scene needs entrance tweens + mid-scene activity
- Shader transitions at 2–3 key moments only
- Use `autoAlpha` (not `visibility`) for scene toggling when shaders are present
- Minimum font sizes: **60px+** headlines, **20px+** body, **16px+** labels
- No banned typefaces: Inter, Roboto, Arial, Helvetica, system-ui, Playfair Display, Montserrat, Lato

---

## Skeleton Templates

### Social Reel (15s, 1080×1920)

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1080px; height: 1920px; overflow: hidden; background: #0A0A0A; font-family: 'DM Sans', sans-serif; }
  .scene { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 80px; }
  .headline { font-size: 96px; font-weight: 800; line-height: 1.05; color: #FFFFFF; text-align: center; }
  .sub { font-size: 36px; font-weight: 400; color: rgba(255,255,255,0.7); margin-top: 32px; text-align: center; }
  .cta { font-size: 40px; font-weight: 700; color: #FFFFFF; background: #FF3D00; padding: 24px 60px; border-radius: 60px; margin-top: 48px; }
</style>
</head>
<body>
<div data-composition-id="social-reel" data-width="1080" data-height="1920">

  <!-- Scene 1: Hook [0–5s] -->
  <div class="scene" id="s1">
    <div class="headline" id="s1-h">YOUR HEADLINE HERE</div>
    <div class="sub" id="s1-sub">Supporting message</div>
  </div>

  <!-- Scene 2: Value [5–11s] -->
  <div class="scene" id="s2" style="opacity:0">
    <div class="headline" id="s2-h">KEY BENEFIT</div>
    <div class="sub" id="s2-sub">Why it matters</div>
  </div>

  <!-- Scene 3: CTA [11–15s] -->
  <div class="scene" id="s3" style="opacity:0">
    <div class="headline" id="s3-h">READY?</div>
    <div class="cta" id="s3-cta">Get Started</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
  <script>
    window.__timelines = window.__timelines || {};
    const tl = gsap.timeline({ paused: true });

    // Scene 1 entrances
    tl.from("#s1-h", { y: 60, autoAlpha: 0, duration: 0.8, ease: "power3.out" }, 0.2)
      .from("#s1-sub", { y: 40, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 0.5);

    // Transition to Scene 2
    tl.to("#s1", { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 4.6)
      .to("#s2", { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 5.0)
      .from("#s2-h", { y: 60, autoAlpha: 0, duration: 0.8, ease: "power3.out" }, 5.2)
      .from("#s2-sub", { y: 40, autoAlpha: 0, duration: 0.6, ease: "power2.out" }, 5.5);

    // Transition to Scene 3
    tl.to("#s2", { autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 10.6)
      .to("#s3", { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, 11.0)
      .from("#s3-h", { y: 60, autoAlpha: 0, duration: 0.8, ease: "power3.out" }, 11.2)
      .from("#s3-cta", { scale: 0.8, autoAlpha: 0, duration: 0.6, ease: "back.out(1.7)" }, 11.6);

    // Final fade
    tl.to("#s3", { autoAlpha: 0, duration: 0.5 }, 14.5);

    window.__timelines["social-reel"] = tl;
  </script>
</div>
</body>
</html>
```

### Launch Teaser (20s, 1920×1080)

Three-act structure: Problem → Solution → CTA. Replace `background: #0D0D0D` and headline copy with brand colors and messaging.

### Product Explainer (45s, 1920×1080)

Six-scene walkthrough: Hook → Problem → Feature 1 → Feature 2 → Feature 3 → CTA. Each scene ~7s. Use `data-composition-src` to split into sub-compositions for maintainability.

### Cinematic Title (12s, 1920×1080)

Two scenes. Scene 1: atmospheric build with title reveal using clip-path or scale entrance. Scene 2: tagline fade-in + logo lock-up. Heavy use of shader transition between scenes.

---

## Copy-Paste Animation Patterns

### Counter (number animation)

```javascript
const obj = { val: 0 };
tl.to(obj, {
  val: 1000000,
  duration: 2,
  ease: "power2.out",
  onUpdate: () => {
    document.querySelector("#counter").textContent =
      Math.round(obj.val).toLocaleString();
  }
}, 1.0);
```

### SVG Draw

```javascript
tl.from("#svg-path", {
  strokeDashoffset: document.querySelector("#svg-path").getTotalLength(),
  duration: 1.5,
  ease: "power2.inOut"
}, 0.5);
```

### Character Stagger

```javascript
// Split text into spans first
const chars = document.querySelectorAll("#title .char");
tl.from(chars, {
  y: 80,
  autoAlpha: 0,
  rotation: 8,
  stagger: { each: 0.04, from: "start" },
  duration: 0.6,
  ease: "power3.out"
}, 0.3);
```

### Float (mid-scene activity)

```javascript
tl.to("#logo", {
  y: -12,
  duration: 2,
  ease: "sine.inOut",
  repeat: Math.ceil(8 / 4) - 1,
  yoyo: true
}, 1.0);
```

### Bar Fill

```javascript
tl.from("#bar-fill", {
  scaleX: 0,
  transformOrigin: "left center",
  duration: 1.2,
  ease: "power2.out"
}, 0.8);
```

### Sweep (reveal)

```javascript
tl.from("#reveal-box", {
  clipPath: "inset(0 100% 0 0)",
  duration: 1.0,
  ease: "power3.inOut"
}, 0.4);
```
