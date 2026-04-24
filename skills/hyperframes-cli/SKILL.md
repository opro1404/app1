---
name: hyperframes-cli
description: HyperFrames CLI reference. Use when running npx hyperframes commands — init, lint, validate, preview, render, tts, transcribe, doctor, or benchmark. Covers all flags, options, and recommended quality settings.
---

# HyperFrames CLI

Accessed via `npx hyperframes`. Requires Node.js >= 22 and FFmpeg.

## Core Workflow

1. `npx hyperframes init my-video` — scaffold project
2. Author HTML compositions
3. `npx hyperframes lint` — validate before previewing
4. `npx hyperframes preview` — browser studio with hot-reload
5. `npx hyperframes render` — export to MP4

---

## Commands

### init

Scaffold a new project with a template.

```bash
npx hyperframes init <dir>
npx hyperframes init my-video --template warm-grain
npx hyperframes init my-video --example counter-animation
npx hyperframes init my-video --media ./footage.mp4  # auto-transcribes
npx hyperframes init my-video --non-interactive      # CI/agents
```

**Templates:** `blank`, `warm-grain`, `play-mode` (and others)

### lint

Validate `index.html` and the `compositions/` directory.

```bash
npx hyperframes lint
npx hyperframes lint --json          # machine-readable output
```

Catches: missing `data-composition-id`, overlapping `data-track-index` values, missing required attributes, and structural errors.

### validate

WCAG contrast audit — samples background pixels behind every text element at 5 timestamps.

```bash
npx hyperframes validate
```

Reports contrast ratio violations with element selector, text content, ratio found, and ratio required (4.5:1 normal / 3:1 large text).

### preview

Launch development server with hot-reload.

```bash
npx hyperframes preview
npx hyperframes preview --port 3002  # default port
npx hyperframes preview --no-open   # skip auto browser launch
```

### render

Export compositions to video.

```bash
npx hyperframes render
npx hyperframes render --output out/video.mp4
npx hyperframes render --fps 30             # 24 | 30 | 60
npx hyperframes render --quality standard   # draft | standard | high
npx hyperframes render --format webm        # mp4 | webm
npx hyperframes render --workers 4
npx hyperframes render --gpu                # GPU acceleration
npx hyperframes render --docker             # reproducible builds
npx hyperframes render --non-interactive    # CI/agents
```

**Quality guidance:** `draft` while iterating, `standard` for review, `high` for final delivery.

### tts

Generate narration audio from text.

```bash
npx hyperframes tts "Hello world" --voice en-us-1
npx hyperframes tts --file script.txt --out narration.wav
npx hyperframes tts --list-voices
```

Uses Kokoro-82M by default. Outputs WAV for lossless quality.

### transcribe

Convert audio/video to word-level timestamps for captions and timing.

```bash
npx hyperframes transcribe narration.wav
npx hyperframes transcribe narration.wav --format json   # transcript.json
npx hyperframes transcribe narration.wav --format srt    # subtitles
npx hyperframes transcribe --import existing.srt         # import existing
```

Uses Whisper under the hood.

### compositions

List all compositions in the project.

```bash
npx hyperframes compositions
```

### doctor

Diagnose environment issues.

```bash
npx hyperframes doctor
```

Checks: Node.js version, FFmpeg installation, Chrome availability, system memory.

### browser

Manage the headless Chrome used for rendering.

```bash
npx hyperframes browser install
npx hyperframes browser info
```

### info

Display CLI version and environment summary.

```bash
npx hyperframes info
```

### benchmark

Measure render performance.

```bash
npx hyperframes benchmark
```

---

## hyperframes.json

Optional project config at root:

```json
{
  "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
  "paths": {
    "blocks": "compositions",
    "components": "compositions/components",
    "assets": "assets"
  }
}
```

---

## Agent Usage

For non-interactive pipelines (CI, AI agents), always pass `--non-interactive`:

```bash
npx hyperframes init my-video --template blank --non-interactive
npx hyperframes render --quality draft --non-interactive
```
