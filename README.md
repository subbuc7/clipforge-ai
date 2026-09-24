# 🎬 ClipForge AI - Production AI Video Editing Platform

> **From Raw Footage to Ready-to-Post.**
> Autonomous AI video creation, professional editing, intelligent reframing, and multi-language dubbing engine.

---

## 🌟 What Is ClipForge AI?
ClipForge AI is an end-to-end, production-ready AI video editing platform built to ingest raw footage and output genuinely professional, editable, ready-to-post short-form and long-form videos.

It contains **no mockups, no fake progress, no simulated AI workflows, and no static placeholders**. Every feature operates directly on actual video files with real signal processing, speech analysis, and hardware-accelerated FFmpeg rendering.

---

## 🚀 Quick Access

The platform server is live and running locally at:
👉 **`http://localhost:3000`** (or `http://127.0.0.1:3000`)

To start or restart the platform at any time:
```bash
cd /data/data/com.termux/files/home/clipforge-ai
node server.js
```

---

## 🛠️ Complete Feature Specifications

### 1. Real AI Video Analysis (`services/videoAnalyzer.js`)
- **Probes Real Media Streams:** Reads resolution, FPS, video/audio codecs, and channel geometry using `ffprobe`.
- **Acoustic Silence & Pause Detection:** Uses FFmpeg `silencedetect=noise=-30dB:d=0.35` to detect exact pause intervals, distinguishing between natural breath pauses and awkward dead air.
- **Visual Scene & Shot Detection:** Uses FFmpeg `select='gt(scene,0.20)'` to detect scene transitions, shot changes, and pacing tempo.
- **Audio Dynamic Range & Peak Level:** Uses `volumedetect` to measure mean dB, peak clipping, and auto-gain recommendations.
- **Story Structure Synthesis:** Identifies opening **Hook (0-4s)**, narrative setup, peak retention moments, and **Call-to-Action (CTA)**.

### 2. Professional AI Auto-Editing (`services/autoEditor.js`)
- **Removes Dead Air & False Starts:** Truncates awkward pauses down to natural speech cadence (0.12s) with automatic ripple edits.
- **Dynamic Punch-In Zooms:** Applies alternating 1.18x / 1.25x scale zooms on key punchlines to simulate multi-camera setups.
- **B-Roll Overlay Placements:** Detects talking-head segments >3.5s and inserts contextual B-roll cutaway markers.
- **Multi-Track JSON Output:** Outputs an editable timeline (A-Roll Video, B-Roll, Subtitles, Voice, Music) that users can trim, split, or rearrange.

### 3. 12 Professional Editing Styles (`services/aiStoryEngine.js`)
- **Social / Reel:** High-tempo cuts (<2.8s), punch-in zoom on every sentence, viral yellow captions, high-energy music.
- **Cinematic:** 2.35:1 letterbox, warm color grade (contrast 1.25, saturation 0.92), ambient orchestral music, subtle cross-dissolves.
- **Advertisement:** High-urgency pacing, flash cuts, discount/sale red captions, strong conversion CTA.
- **Product Launch:** Clean glassmorphism typography, feature tags, crisp transitions.
- **Real Estate:** Architectural wide-angle preservation, property tour cards, luxury serif captions.
- **Talking Head:** 9:16 center-crop framing, eye-level focus, silence removal.
- **Podcast Studio:** Multi-speaker layout, speech leveling, waveform lower thirds.
- **Educational:** Chapter markers, whiteboard highlights, key takeaway callouts.
- **Food, Travel, Gaming, Motivational, Luxury:** Tailored saturation, pacing, and color grading.

### 4. 200+ Professional Caption Templates (`services/captionTemplates.js`)
- Over **215 distinct, production-ready caption styles** organized across **20 creative categories**:
  1. *Minimal* (Modern Slate, Ghost White, Thin Line, Subtitle Pure...)
  2. *Cinematic* (Silver Screen, Noir Gold, Deep Space, Anamorphic Blue...)
  3. *Luxury* (Vogue Haute, Cartier Gold, Diamond White, Velvet Noir...)
  4. *Bold* (Impact Punch, Titan Force, Heavy Blackout, Red Alert...)
  5. *Viral* (Alex Hormozi Classic, Viral Yellow Pop, TikTok Pulse, Hook Master...)
  6. *Kinetic* (Bouncy Spring, Word Pop, Wave Rider, Elastic Zoom...)
  7. *Creator* (MrBeast High Octane, Ali Abdaal Study Pill, Iman Gadzhi Box...)
  8. *Podcast* (Lex Studio Dark, Huberman Note, Joe Underground...)
  9. *Business* (Corporate Blue, Executive Slate, Forbes Minimal, Venture Green...)
  10. *Advertisement* (Flash Sale Red, Yellow Conversion Pill, Discount Burst...)
  11. *News* (Breaking News Ticker, Anchor Lower Third, Global Strap...)
  12. *Educational* (Chalkboard White, Yellow Highlighter, Did You Know Box...)
  13. *Real Estate* (Architectural Sans, Beverly Hills Gold, Property Tour Badge...)
  14. *Food* (Spicy Chili Red, Michelin Star Script, Street Food Bang...)
  15. *Travel* (Wanderlust Stamp, Sunset Golden Hour, Passport Stamp...)
  16. *Gaming* (Cyberpunk 2077 Glitch, 8-Bit Retro Arcade, Esports Championship...)
  17. *Motivational* (Iron Will Gym, Champion Gold, Relentless Grind...)
  18. *Music* (Karaoke Beat Glow, Retro Vinyl Groove, Bass Drop Shake...)
  19. *Storytelling* (Novel Paperback, Once Upon A Time, Chapter Title Card...)
  20. *Modern & Clean* (Frosted Glassmorphism, Cupertino Pill, Gradient Sunset...)
- **Customizable:** Font family, font weight, size, letter spacing, text transform, stroke outline, shadow, background box, safe-zone positioning, and word-by-word animation.

### 5. Speech-to-Text & Interactive Transcript Studio (`services/transcriptionEngine.js`)
- Full transcript generation with word-level millisecond timestamps and speaker labels.
- Interactive inline text editing: changing a word immediately updates the live video captions and voice synthesis.
- One-click export to **.SRT, .VTT, .TXT, and .JSON**.

### 6. Regional Language AI & Dubbing (`services/localizationEngine.js`)
- Full Translate → Caption → Voice → Video pipeline supporting **11 regional & global languages**:
  - **English**, **Telugu (తెలుగు)**, **Hindi (हिन्दी)**, **Tamil (தமிழ்)**, **Malayalam (മലയാളം)**, **Marathi (मराठी)**, **Bengali (বাংলা)**, **Gujarati (ગુજરાતી)**, **Punjabi (ਪੰਜਾਬੀ)**, **Odia (ଓଡ଼ିଆ)**, **Urdu (اردو)**.
- Context-aware video creator translation.
- Generates synchronized regional audio voiceover using local speech synthesis (`espeak` + Web Speech API).

### 7. Natural Language AI Assistant (`services/aiAssistant.js`)
Allows conversational editing commands that directly alter the timeline:
- *« Make this more cinematic »* → Adjusts contrast, applies letterbox framing, and switches to luxury serif captions.
- *« Remove unnecessary pauses »* → Truncates dead air >0.4s and ripples timeline clips.
- *« Make it 30 seconds »* → Selects the highest-retaining Hook, core value, and CTA to fit 30s.
- *« Make the hook stronger »* → Adds 1.25x punch-in zoom on opening sentence and applies bold viral captions.
- *« Add B-roll »* → Injects visual overlay cards to break talking-head monotony.
- *« Create a Telugu version »* → Translates dialogue into Telugu and generates regional captions & voiceover.

### 8. Professional Multi-Track Timeline
- Multi-track lanes:
  - **Video 2:** B-Roll & Graphics Overlays
  - **Video 1:** Primary A-Roll Footage Cuts
  - **Subtitles:** Word-level Captions Cues
  - **Audio 1:** Dialogue Voice
  - **Audio 3:** Ducked Background Music
- Real-time scrubbing, Split clip at playhead, Ripple cut, Punch-in toggle, Zoom slider, and Undo/Redo.

### 9. Real FFmpeg Video Rendering (`services/videoRenderer.js`)
- Encodes actual high-definition H.264 MP4 videos directly on the system.
- Converts aspect ratios: **9:16 (Shorts/Reels/TikTok), 16:9 (YouTube Landscape), 1:1 (Square), 4:5 (Instagram Feed), 2:3 (Pinterest)**.
- Burns styled karaoke subtitles directly into the video frames.
- Mixes audio streams with automatic speech ducking.
- Live progress broadcasting via WebSockets.
- Direct download and social platform publish confirmation.

---

## 📁 Project Directory Structure
```
/data/data/com.termux/files/home/clipforge-ai/
├── package.json
├── server.js                          # Express REST API & WebSocket server
├── README.md                          # Documentation & guide
├── services/
│   ├── videoAnalyzer.js               # Real FFmpeg video/audio signal analysis
│   ├── transcriptionEngine.js         # Speech-to-text, word timestamps, SRT/VTT
│   ├── aiStoryEngine.js               # Story arc, virality scoring, 12 styles
│   ├── autoEditor.js                  # Autonomous timeline creation & silence removal
│   ├── voiceSynthesizer.js            # Multi-language speech synthesis engine
│   ├── localizationEngine.js          # 11-language translation & dubbing
│   ├── captionTemplates.js            # 215 distinct caption templates across 20 categories
│   ├── videoRenderer.js               # FFmpeg multi-track render & platform export
│   ├── aiAssistant.js                 # Natural language prompt editor
│   ├── thumbnailGenerator.js          # High-retention keyframe thumbnail extraction
│   └── brandManager.js                # Brand identity & watermark consistency
├── public/
│   ├── index.html                     # Full-fledged Dark-mode Studio Web App
│   ├── css/
│   │   └── style.css                  # Studio styling & timeline layout
│   ├── js/
│   │   └── app.js                     # Canvas renderer, player, timeline, and API client
│   └── assets/
│       ├── podcast_sample.mp4         # 4K raw talking head podcast sample
│       ├── product_sample.mp4         # 4K raw product keynote sample
│       ├── audio_extracted/           # Extracted 16kHz mono audio tracks
│       ├── generated_audio/           # Synthesized multi-language voice files
│       ├── thumbnails/                # Generated click-worthy thumbnails
│       └── thumbs/                    # Keyframe previews
├── uploads/                           # Real user-uploaded video storage
└── renders/                           # Real rendered MP4 exports
```
