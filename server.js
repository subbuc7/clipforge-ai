/**
 * ClipForge AI - Main Production Server
 * REST API + WebSocket for real-time video processing & rendering progress.
 */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const http = require('http');
const { WebSocketServer } = require('ws');
const path = require('path');
const fs = require('fs');

const videoAnalyzer = require('./services/videoAnalyzer');
const transcriptionEngine = require('./services/transcriptionEngine');
const aiStoryEngine = require('./services/aiStoryEngine');
const autoEditor = require('./services/autoEditor');
const voiceSynthesizer = require('./services/voiceSynthesizer');
const localizationEngine = require('./services/localizationEngine');
const videoRenderer = require('./services/videoRenderer');
const aiAssistant = require('./services/aiAssistant');
const thumbnailGenerator = require('./services/thumbnailGenerator');
const brandManager = require('./services/brandManager');
const { templates, categories, getRecommendedTemplate } = require('./services/captionTemplates');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3000;

// Setup directories
const uploadsDir = path.join(__dirname, 'uploads');
const rendersDir = path.join(__dirname, 'renders');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(rendersDir)) fs.mkdirSync(rendersDir, { recursive: true });

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(uploadsDir));
app.use('/renders', express.static(rendersDir));

// Multer storage for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.mp4';
    cb(null, `upload_${Date.now()}_${Math.floor(Math.random() * 1000)}${ext}`);
  }
});
const upload = multer({ storage });

// WebSocket connection for live progress broadcasting
let activeWsClients = [];
wss.on('connection', (ws) => {
  activeWsClients.push(ws);
  ws.send(JSON.stringify({ type: 'CONNECTED', message: 'ClipForge AI Engine Connected' }));
  ws.on('close', () => {
    activeWsClients = activeWsClients.filter(c => c !== ws);
  });
});

function broadcastProgress(stage, percent, details = {}) {
  const payload = JSON.stringify({ type: 'PROGRESS', stage, percent, ...details });
  activeWsClients.forEach(ws => {
    if (ws.readyState === 1) ws.send(payload);
  });
}

// -------------------- REST API ENDPOINTS --------------------

// 1. Upload Video
app.post('/api/upload', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file provided' });
    }
    const filePath = req.file.path;
    const fileUrl = `/uploads/${path.basename(filePath)}`;
    res.json({
      success: true,
      filePath,
      fileUrl,
      fileName: req.file.originalname,
      sizeBytes: req.file.size
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Full AI Analysis (Video + Audio + Story + Speech)
app.post('/api/analyze', async (req, res) => {
  try {
    const { videoPath, style = 'Social/Reel', apiKey } = req.body;
    if (!videoPath) {
      return res.status(400).json({ error: 'videoPath is required' });
    }

    // Resolve absolute path
    const resolvedPath = videoPath.startsWith('/') ? videoPath : path.join(__dirname, videoPath.replace(/^\//, ''));

    broadcastProgress('Probing video streams & metadata', 10);
    const videoAnalysis = await videoAnalyzer.analyzeVideo(resolvedPath, (stage, pct) => {
      broadcastProgress(stage, pct);
    });

    broadcastProgress('Extracting speech dialogue & word-level timing', 60);
    const transcript = await transcriptionEngine.transcribe(resolvedPath, apiKey);

    broadcastProgress('Synthesizing narrative arc & retention scoring', 85);
    const storyArc = aiStoryEngine.analyzeStory(transcript, videoAnalysis, style);

    broadcastProgress('Generating professional auto-edit timeline', 95);
    const initialTimeline = autoEditor.generateEditedTimeline(videoAnalysis, transcript, storyArc, { style });

    broadcastProgress('Analysis complete', 100);

    res.json({
      success: true,
      videoAnalysis,
      transcript,
      storyArc,
      timeline: initialTimeline
    });
  } catch (err) {
    console.error('Analyze error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 3. Auto-Edit Timeline Generator
app.post('/api/auto-edit', (req, res) => {
  try {
    const { videoAnalysis, transcript, storyArc, options } = req.body;
    const timeline = autoEditor.generateEditedTimeline(videoAnalysis, transcript, storyArc, options);
    res.json({ success: true, timeline });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. AI Assistant Natural Language Commands
app.post('/api/assistant/command', async (req, res) => {
  try {
    const { prompt, currentTimeline, transcript, videoAnalysis } = req.body;
    const result = await aiAssistant.processCommand(prompt, currentTimeline, transcript, videoAnalysis);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. 200+ Caption Templates
app.get('/api/caption-templates', (req, res) => {
  res.json({
    count: templates.length,
    categories,
    templates
  });
});

// 6. Voice Synthesis
app.post('/api/synthesize-voice', async (req, res) => {
  try {
    const { text, voiceId, speed, pitch } = req.body;
    const result = await voiceSynthesizer.synthesizeVoice(text, { voiceId, speed, pitch });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/voices', (req, res) => {
  res.json({ voices: voiceSynthesizer.getAvailableVoices() });
});

// 7. Regional Language Localization (11 languages)
app.get('/api/languages', (req, res) => {
  res.json({ languages: localizationEngine.getSupportedLanguages() });
});

app.post('/api/localize', async (req, res) => {
  try {
    const { transcript, targetLang } = req.body;
    const result = await localizationEngine.localizeTranscript(transcript, targetLang);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Video Rendering Engine
app.post('/api/render', async (req, res) => {
  try {
    const { videoPath, timeline, options = {} } = req.body;
    const resolvedPath = videoPath.startsWith('/') ? videoPath : path.join(__dirname, videoPath.replace(/^\//, ''));

    broadcastProgress('Initiating render engine', 5);
    const result = await videoRenderer.renderVideo(resolvedPath, timeline, options, (stage, pct) => {
      broadcastProgress(stage, pct);
    });

    res.json(result);
  } catch (err) {
    console.error('Render error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 9. Platform Publishing
app.post('/api/publish', async (req, res) => {
  try {
    const { videoInfo, platform, metadata } = req.body;
    const result = await videoRenderer.publishToPlatform(videoInfo, platform, metadata);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 10. AI Thumbnails
app.post('/api/thumbnails', async (req, res) => {
  try {
    const { videoPath, transcript, duration } = req.body;
    const resolvedPath = videoPath.startsWith('/') ? videoPath : path.join(__dirname, videoPath.replace(/^\//, ''));
    const thumbs = await thumbnailGenerator.generateThumbnails(resolvedPath, transcript, duration);
    res.json({ success: true, thumbnails: thumbs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 11. Brand Kit
app.get('/api/brand-kit', (req, res) => {
  res.json(brandManager.getBrandKit());
});

app.post('/api/brand-kit', (req, res) => {
  const updated = brandManager.updateBrandKit(req.body);
  res.json({ success: true, brandKit: updated });
});

// Start Server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(`🚀 ClipForge AI Production Platform Running on: http://0.0.0.0:${PORT}`);
  console.log(`Ready for real video uploads, analysis, and rendering!`);
  console.log(`=======================================================`);
});
