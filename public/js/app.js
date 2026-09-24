/**
 * ClipForge AI - Core Studio Frontend Application
 * Coordinates real-time canvas video rendering, multi-track timeline,
 * 200+ caption templates, speech editing, and FFmpeg export.
 */

class ClipForgeApp {
  constructor() {
    this.currentVideoPath = '/assets/podcast_sample.mp4';
    this.rawVideoAnalysis = null;
    this.transcript = null;
    this.storyArc = null;
    this.timeline = null;
    this.templates = [];
    this.categories = [];
    this.activeTemplateId = 'viral_hormozi';
    this.aspectRatio = '9:16';
    this.zoomPxPerSec = 25;
    this.isPlaying = false;
    this.currentTime = 0;
    this.isMuted = false;
    this.selectedClip = null;
    this.historyStack = [];
    this.historyIndex = -1;

    this.initElements();
    this.initWebSocket();
    this.initEventListeners();
    this.loadTemplates();

    // Auto-load initial sample on startup
    this.loadSampleVideo('/assets/podcast_sample.mp4', 'Social/Reel');
  }

  initElements() {
    this.video = document.getElementById('programVideo');
    this.canvas = document.getElementById('programCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.playhead = document.getElementById('timelinePlayhead');
    this.tracksLane = document.getElementById('timelineTracksLane');
    this.timeDisplay = document.getElementById('timeDisplay');
    this.playBtn = document.getElementById('playBtn');
    this.volumeBtn = document.getElementById('volumeBtn');
    this.renderModal = document.getElementById('renderModal');
  }

  initWebSocket() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;
    try {
      this.ws = new WebSocket(wsUrl);
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'PROGRESS') {
          this.handleProgressUpdate(data);
        }
      };
      this.ws.onopen = () => {
        document.getElementById('wsStatusText').innerText = 'AI Engine Connected';
      };
      this.ws.onclose = () => {
        document.getElementById('wsStatusText').innerText = 'Offline (Auto-Reconnecting)';
      };
    } catch (e) {
      console.warn('WebSocket init warning:', e);
    }
  }

  handleProgressUpdate(data) {
    const progressBar = document.getElementById('renderProgressBar');
    const stageText = document.getElementById('renderStageText');
    const pctText = document.getElementById('renderPercentText');
    if (progressBar && stageText && pctText) {
      progressBar.style.width = `${data.percent}%`;
      stageText.innerText = data.stage;
      pctText.innerText = `${data.percent}%`;
    }
  }

  initEventListeners() {
    // Left Tab Switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
        const targetPane = document.getElementById(tabId);
        if (targetPane) targetPane.style.display = 'block';
        if (window.lucide) lucide.createIcons();
      });
    });

    // Sample Loaders
    document.getElementById('loadPodcastBtn').addEventListener('click', () => {
      this.loadSampleVideo('/assets/podcast_sample.mp4', 'Podcast');
    });
    document.getElementById('loadProductBtn').addEventListener('click', () => {
      this.loadSampleVideo('/assets/product_sample.mp4', 'Product');
    });

    // Upload Video Button
    const uploadInput = document.getElementById('videoFileInput');
    document.getElementById('uploadBtn').addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', async (e) => {
      if (e.target.files.length > 0) {
        await this.uploadCustomVideo(e.target.files[0]);
      }
    });

    // Video Playback Controls
    this.playBtn.addEventListener('click', () => this.togglePlay());
    document.getElementById('rewindBtn').addEventListener('click', () => this.seekTo(Math.max(0, this.currentTime - 5)));
    document.getElementById('forwardBtn').addEventListener('click', () => this.seekTo(this.currentTime + 5));
    this.volumeBtn.addEventListener('click', () => this.toggleMute());

    // Aspect Ratio Buttons
    document.querySelectorAll('.aspect-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.aspect-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setAspectRatio(btn.getAttribute('data-ratio'));
      });
    });

    // Timeline Zoom Slider
    const zoomInput = document.getElementById('timelineZoomInput');
    zoomInput.addEventListener('input', (e) => {
      this.zoomPxPerSec = parseInt(e.target.value, 10);
      this.renderTimeline();
    });

    // Timeline Click to Seek
    this.tracksLane.addEventListener('click', (e) => {
      const rect = this.tracksLane.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const targetTime = clickX / this.zoomPxPerSec;
      this.seekTo(targetTime);
    });

    // Timeline Editing Tools
    document.getElementById('splitClipBtn').addEventListener('click', () => this.splitActiveClip());
    document.getElementById('rippleDeleteBtn').addEventListener('click', () => this.rippleDeleteActiveClip());
    document.getElementById('punchInToggleBtn').addEventListener('click', () => this.togglePunchInZoom());
    document.getElementById('runAutoEditBtn').addEventListener('click', () => this.regenerateAutoEdit());

    // AI Assistant Command Runner
    const assistantInput = document.getElementById('assistantInput');
    const runAssistant = async () => {
      const prompt = assistantInput.value.trim();
      if (!prompt) return;
      assistantInput.value = '';
      await this.executeAssistantCommand(prompt);
    };
    document.getElementById('assistantSendBtn').addEventListener('click', runAssistant);
    assistantInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') runAssistant(); });

    document.querySelectorAll('.prompt-suggestion').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = btn.innerText.replace(/[«»]/g, '').trim();
        this.executeAssistantCommand(text);
      });
    });

    // Regional Language Dubbing
    document.getElementById('runLocalizationBtn').addEventListener('click', () => this.runLocalization());

    // Rendering Modal Handlers
    document.getElementById('renderModalBtn').addEventListener('click', () => {
      this.renderModal.style.display = 'flex';
      if (window.lucide) lucide.createIcons();
    });
    document.getElementById('closeRenderModalBtn').addEventListener('click', () => {
      this.renderModal.style.display = 'none';
    });
    document.getElementById('startRenderBtn').addEventListener('click', () => this.startRender());

    // Platform Choices in Render Modal
    document.querySelectorAll('.platform-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.platform-choice-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Subtitle Search & Category Filters
    document.getElementById('captionSearchInput').addEventListener('input', (e) => {
      this.filterTemplates(e.target.value);
    });

    // Export SRT button
    document.getElementById('exportSrtBtn').addEventListener('click', () => this.downloadSRT());

    // Video frame animation loop
    this.video.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.video.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updatePlayBtn();
    });

    this.renderLoop();
  }

  /**
   * Load and analyze video file
   */
  async loadSampleVideo(videoPath, style = 'Social/Reel') {
    this.currentVideoPath = videoPath;
    this.video.src = videoPath;
    this.video.load();

    document.getElementById('wsStatusText').innerText = 'Analyzing Real Footage...';

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoPath, style })
      });
      const data = await res.json();
      if (data.success) {
        this.rawVideoAnalysis = data.videoAnalysis;
        this.transcript = data.transcript;
        this.storyArc = data.storyArc;
        this.timeline = data.timeline;

        this.pushHistory();
        this.updateAnalysisUI();
        this.renderTranscriptUI();
        this.renderTimeline();
        this.loadThumbnails();

        document.getElementById('wsStatusText').innerText = 'AI Edit Ready';
        if (window.lucide) lucide.createIcons();
      }
    } catch (err) {
      console.error('Analysis error:', err);
    }
  }

  async uploadCustomVideo(file) {
    document.getElementById('wsStatusText').innerText = 'Uploading raw video...';
    const formData = new FormData();
    formData.append('video', file);

    try {
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (uploadData.success) {
        await this.loadSampleVideo(uploadData.fileUrl, 'Social/Reel');
      }
    } catch (err) {
      alert(`Upload error: ${err.message}`);
    }
  }

  updateAnalysisUI() {
    if (!this.rawVideoAnalysis) return;
    const dur = this.rawVideoAnalysis.mediaInfo.duration;
    document.getElementById('rawDurationBadge').innerText = `${Math.round(dur)}s Source`;
    document.getElementById('viralityScore').innerText = this.storyArc.overallViralityScore || 94;
    document.getElementById('sceneCount').innerText = `${this.rawVideoAnalysis.scenes.length} Shots`;
    document.getElementById('silenceCount').innerText = `${this.rawVideoAnalysis.silences.length} Silences`;

    if (this.storyArc && this.storyArc.hook) {
      document.getElementById('arcHook').innerText = `"${this.storyArc.hook.text.slice(0, 45)}..."`;
    }
    if (this.storyArc && this.storyArc.cta) {
      document.getElementById('arcCTA').innerText = `"${this.storyArc.cta.text.slice(0, 45)}..."`;
    }
  }

  /**
   * Render Multi-Track Timeline
   */
  renderTimeline() {
    if (!this.timeline) return;

    const totalDur = Math.max(this.timeline.finalDuration || 20, 10);
    const laneWidth = totalDur * this.zoomPxPerSec + 200;
    this.tracksLane.style.width = `${laneWidth}px`;

    // Render Ruler
    const ruler = document.getElementById('timelineRuler');
    ruler.innerHTML = '';
    const step = 5; // seconds
    for (let t = 0; t <= totalDur + 5; t += step) {
      const mark = document.createElement('div');
      mark.style.position = 'absolute';
      mark.style.left = `${t * this.zoomPxPerSec}px`;
      mark.style.top = '4px';
      mark.style.fontSize = '9px';
      mark.style.color = '#64748B';
      mark.style.borderLeft = '1px solid #334155';
      mark.style.paddingLeft = '2px';
      mark.style.height = '14px';
      mark.innerText = `${t}s`;
      ruler.appendChild(mark);
    }

    // Render Clips for Each Track
    const lanes = {
      'video-2': document.getElementById('lane-video-2'),
      'video-1': document.getElementById('lane-video-1'),
      'subtitles': document.getElementById('lane-subtitles'),
      'audio-1': document.getElementById('lane-audio-1'),
      'audio-3': document.getElementById('lane-audio-3')
    };

    Object.values(lanes).forEach(l => { if (l) l.innerHTML = ''; });

    this.timeline.tracks.forEach(track => {
      const laneEl = lanes[track.id];
      if (!laneEl) return;

      track.clips.forEach(clip => {
        const clipEl = document.createElement('div');
        clipEl.className = `timeline-clip clip-${track.type || 'video'}`;
        if (track.id === 'video-2') clipEl.className = 'timeline-clip clip-broll';
        if (track.id === 'subtitles') clipEl.className = 'timeline-clip clip-subtitles';
        if (track.id === 'audio-3') clipEl.className = 'timeline-clip clip-music';

        const leftPx = clip.timelineIn * this.zoomPxPerSec;
        const widthPx = Math.max(12, (clip.timelineOut - clip.timelineIn) * this.zoomPxPerSec - 2);

        clipEl.style.left = `${leftPx}px`;
        clipEl.style.width = `${widthPx}px`;
        clipEl.innerText = clip.name || clip.text || 'Clip';
        clipEl.title = `${clip.name || clip.text} (${clip.timelineIn}s - ${clip.timelineOut}s)`;

        if (this.selectedClip && this.selectedClip.id === clip.id) {
          clipEl.style.outline = '2px solid #FACC15';
        }

        clipEl.addEventListener('click', (e) => {
          e.stopPropagation();
          this.selectedClip = clip;
          this.renderTimeline();
          this.seekTo(clip.timelineIn);
        });

        laneEl.appendChild(clipEl);
      });
    });

    document.getElementById('editedDurationBadge').innerText = `${this.formatTime(totalDur)}`;
    this.updatePlayheadPosition();
  }

  updatePlayheadPosition() {
    const left = this.currentTime * this.zoomPxPerSec;
    this.playhead.style.left = `${left}px`;
  }

  seekTo(time) {
    this.currentTime = Math.max(0, time);
    this.video.currentTime = this.currentTime;
    this.updatePlayheadPosition();
    this.updateTimeDisplay();
  }

  togglePlay() {
    if (this.video.paused) {
      this.video.play();
      this.isPlaying = true;
    } else {
      this.video.pause();
      this.isPlaying = false;
    }
    this.updatePlayBtn();
  }

  updatePlayBtn() {
    this.playBtn.innerHTML = this.isPlaying ? '<i data-lucide="pause"></i>' : '<i data-lucide="play"></i>';
    if (window.lucide) lucide.createIcons();
  }

  toggleMute() {
    this.video.muted = !this.video.muted;
    this.isMuted = this.video.muted;
    this.volumeBtn.innerHTML = this.isMuted ? '<i data-lucide="volume-x"></i>' : '<i data-lucide="volume-2"></i>';
    if (window.lucide) lucide.createIcons();
  }

  onTimeUpdate() {
    this.currentTime = this.video.currentTime;
    this.updatePlayheadPosition();
    this.updateTimeDisplay();
  }

  updateTimeDisplay() {
    const cur = this.formatTime(this.currentTime);
    const dur = this.formatTime(this.timeline ? this.timeline.finalDuration : this.video.duration || 0);
    this.timeDisplay.innerText = `${cur} / ${dur}`;
  }

  formatTime(seconds) {
    const s = Math.floor(seconds || 0);
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  setAspectRatio(ratio) {
    this.aspectRatio = ratio;
    const stage = document.getElementById('playerStage');
    if (ratio === '9:16') {
      stage.style.width = '320px';
      stage.style.height = '568px';
      this.canvas.width = 1080;
      this.canvas.height = 1920;
    } else if (ratio === '16:9') {
      stage.style.width = '568px';
      stage.style.height = '320px';
      this.canvas.width = 1920;
      this.canvas.height = 1080;
    } else if (ratio === '1:1') {
      stage.style.width = '400px';
      stage.style.height = '400px';
      this.canvas.width = 1080;
      this.canvas.height = 1080;
    } else if (ratio === '4:5') {
      stage.style.width = '320px';
      stage.style.height = '400px';
      this.canvas.width = 1080;
      this.canvas.height = 1350;
    } else if (ratio === '2:3') {
      stage.style.width = '320px';
      stage.style.height = '480px';
      this.canvas.width = 1080;
      this.canvas.height = 1620;
    }
  }

  /**
   * Main real-time Canvas rendering loop
   * Draws cropped video, dynamic punch-in zoom, and animated captions
   */
  renderLoop() {
    requestAnimationFrame(() => this.renderLoop());
    if (!this.video.videoWidth) return;

    const cw = this.canvas.width;
    const ch = this.canvas.height;
    const vw = this.video.videoWidth;
    const vh = this.video.videoHeight;

    this.ctx.clearRect(0, 0, cw, ch);

    // 1. Calculate punch-in scale from active clip in timeline
    let scale = 1.0;
    const v1Track = this.timeline ? this.timeline.tracks.find(t => t.id === 'video-1') : null;
    if (v1Track) {
      const activeClip = v1Track.clips.find(c => this.currentTime >= c.timelineIn && this.currentTime <= c.timelineOut);
      if (activeClip && activeClip.scale) {
        scale = activeClip.scale;
      }
    }

    // 2. Draw Video with Aspect Ratio Center-Crop & Punch-In Zoom
    const targetAspect = cw / ch;
    const videoAspect = vw / vh;

    let sx = 0, sy = 0, sw = vw, sh = vh;
    if (videoAspect > targetAspect) {
      sw = vh * targetAspect;
      sx = (vw - sw) / 2;
    } else {
      sh = vw / targetAspect;
      sy = (vh - sh) / 2;
    }

    // Apply punch-in zoom
    if (scale > 1.0) {
      const zoomFactor = 1 / scale;
      const zoomedW = sw * zoomFactor;
      const zoomedH = sh * zoomFactor;
      sx += (sw - zoomedW) / 2;
      sy += (sh - zoomedH) / 2;
      sw = zoomedW;
      sh = zoomedH;
    }

    this.ctx.drawImage(this.video, sx, sy, sw, sh, 0, 0, cw, ch);

    // 3. Draw Watermark if enabled in Brand Kit
    const brandPos = document.getElementById('watermarkPosSelect').value;
    if (brandPos !== 'none') {
      this.ctx.save();
      this.ctx.font = 'bold 28px Inter, sans-serif';
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      this.ctx.shadowBlur = 6;
      const markText = document.getElementById('brandNameInput').value || 'ClipForge AI';
      if (brandPos === 'top-right') {
        this.ctx.textAlign = 'right';
        this.ctx.fillText(markText, cw - 60, 90);
      } else if (brandPos === 'top-left') {
        this.ctx.textAlign = 'left';
        this.ctx.fillText(markText, 60, 90);
      } else {
        this.ctx.textAlign = 'right';
        this.ctx.fillText(markText, cw - 60, ch - 120);
      }
      this.ctx.restore();
    }

    // 4. Draw Real-Time Animated Karaoke Subtitles
    this.drawSubtitles(cw, ch);
  }

  /**
   * Draw active subtitle word highlights matching current template
   */
  drawSubtitles(cw, ch) {
    if (!this.transcript || !this.transcript.words) return;

    // Find active word at this.currentTime
    const activeWord = this.transcript.words.find(w => this.currentTime >= w.start && this.currentTime <= w.end);
    // Find active sentence
    const activeSentence = this.transcript.sentences ? this.transcript.sentences.find(s => this.currentTime >= s.start && this.currentTime <= s.end) : null;

    if (!activeSentence) return;

    const template = this.templates.find(t => t.id === this.activeTemplateId) || (this.templates[0] || {});
    const textWords = activeSentence.words || [];

    // Group into 3 words window around active word
    const activeIdx = activeWord ? textWords.findIndex(w => w.word === activeWord.word && w.start === activeWord.start) : 0;
    const windowStart = Math.max(0, Math.min(activeIdx - 1, textWords.length - 3));
    const visibleWords = textWords.slice(windowStart, windowStart + 3);

    if (visibleWords.length === 0) return;

    this.ctx.save();
    const fontSize = template.fontSize ? template.fontSize * 1.8 : 64;
    this.ctx.font = `${template.fontWeight || '900'} ${fontSize}px ${template.fontFamily || 'Montserrat, sans-serif'}`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    const yPos = ch * ((template.positionY || 78) / 100);

    // Calculate total width of words
    const spaceWidth = this.ctx.measureText(' ').width;
    const wordWidths = visibleWords.map(w => this.ctx.measureText(template.textTransform === 'uppercase' ? w.word.toUpperCase() : w.word).width);
    const totalTextWidth = wordWidths.reduce((a, b) => a + b, 0) + spaceWidth * (visibleWords.length - 1);

    // Draw background pill if configured
    if (template.backgroundColor && template.backgroundColor !== 'transparent') {
      this.ctx.fillStyle = template.backgroundColor;
      const padX = 30;
      const padY = 20;
      this.ctx.beginPath();
      this.ctx.roundRect((cw - totalTextWidth) / 2 - padX, yPos - fontSize / 2 - padY, totalTextWidth + padX * 2, fontSize + padY * 2, 20);
      this.ctx.fill();
    }

    let currentX = (cw - totalTextWidth) / 2;

    visibleWords.forEach((w, idx) => {
      const isCurrent = activeWord && w.word === activeWord.word && w.start === activeWord.start;
      const wordText = template.textTransform === 'uppercase' ? w.word.toUpperCase() : w.word;
      const wWidth = wordWidths[idx];
      const wordCenterX = currentX + wWidth / 2;

      // Active word highlight color & bounce
      let wordY = yPos;
      if (isCurrent && template.animation === 'bounce') {
        wordY -= 8; // subtle bouncy hop
      }

      // Stroke / Outline
      if (template.strokeWidth > 0) {
        this.ctx.lineWidth = template.strokeWidth * 3;
        this.ctx.strokeStyle = template.strokeColor || '#000000';
        this.ctx.strokeText(wordText, wordCenterX, wordY);
      }

      // Fill color (highlight if current active word)
      this.ctx.fillStyle = isCurrent ? (template.highlightColor || '#FFE600') : (template.textColor || '#FFFFFF');
      if (isCurrent && template.shadow) {
        this.ctx.shadowColor = template.highlightColor || '#FFE600';
        this.ctx.shadowBlur = 15;
      } else {
        this.ctx.shadowColor = 'rgba(0,0,0,0.8)';
        this.ctx.shadowBlur = 8;
      }

      this.ctx.fillText(wordText, wordCenterX, wordY);
      currentX += wWidth + spaceWidth;
    });

    this.ctx.restore();
  }

  /**
   * Load 200+ caption templates catalog
   */
  async loadTemplates() {
    try {
      const res = await fetch('/api/caption-templates');
      const data = await res.json();
      this.templates = data.templates;
      this.categories = data.categories;

      document.getElementById('templatesCountBadge').innerText = `${this.templates.length} Ready`;

      // Render Category Pills
      const pillsContainer = document.getElementById('captionCategoryPills');
      pillsContainer.innerHTML = '';
      const allPill = document.createElement('button');
      allPill.className = 'tool-btn active';
      allPill.innerText = 'All';
      allPill.addEventListener('click', () => {
        document.querySelectorAll('#captionCategoryPills .tool-btn').forEach(p => p.classList.remove('active'));
        allPill.classList.add('active');
        this.renderTemplatesGrid(this.templates);
      });
      pillsContainer.appendChild(allPill);

      this.categories.forEach(cat => {
        const pill = document.createElement('button');
        pill.className = 'tool-btn';
        pill.innerText = cat;
        pill.addEventListener('click', () => {
          document.querySelectorAll('#captionCategoryPills .tool-btn').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const filtered = this.templates.filter(t => t.category.toLowerCase() === cat.toLowerCase());
          this.renderTemplatesGrid(filtered);
        });
        pillsContainer.appendChild(pill);
      });

      this.renderTemplatesGrid(this.templates.slice(0, 30));
    } catch (err) {
      console.warn('Error loading caption templates:', err);
    }
  }

  renderTemplatesGrid(list) {
    const grid = document.getElementById('templatesGrid');
    grid.innerHTML = '';

    list.forEach(t => {
      const card = document.createElement('div');
      card.className = `template-card ${t.id === this.activeTemplateId ? 'active' : ''}`;

      card.innerHTML = `
        <div class="template-preview-badge" style="background: ${t.backgroundColor}; color: ${t.highlightColor}; font-family: ${t.fontFamily}; text-transform: ${t.textTransform};">
          VIRAL HOOK
        </div>
        <div class="template-meta">
          <span style="font-weight: 600; color: white;">${t.name}</span>
          <span>${t.category}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        this.activeTemplateId = t.id;
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });

      grid.appendChild(card);
    });
  }

  filterTemplates(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.renderTemplatesGrid(this.templates.slice(0, 30));
      return;
    }
    const filtered = this.templates.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    this.renderTemplatesGrid(filtered);
  }

  /**
   * Render Interactive Searchable Transcript
   */
  renderTranscriptUI() {
    const container = document.getElementById('transcriptSentencesContainer');
    if (!container || !this.transcript || !this.transcript.sentences) return;
    container.innerHTML = '';

    this.transcript.sentences.forEach(s => {
      const item = document.createElement('div');
      item.className = 'stat-card';
      item.style.marginBottom = '6px';
      item.style.cursor = 'pointer';

      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #38BDF8; margin-bottom: 4px;">
          <span>${s.speaker || 'Speaker 1'}</span>
          <span>${this.formatTime(s.start)} - ${this.formatTime(s.end)}</span>
        </div>
        <div contenteditable="true" class="sentence-editable" style="font-size: 0.85rem; color: white; outline: none; border-bottom: 1px dashed transparent;">${s.text}</div>
      `;

      const editable = item.querySelector('.sentence-editable');
      editable.addEventListener('click', (e) => {
        e.stopPropagation();
      });
      editable.addEventListener('blur', () => {
        s.text = editable.innerText;
        // update words
        const words = s.text.split(/\s+/);
        s.words = words.map((w, i) => ({
          word: w,
          start: s.start + (i * (s.duration / words.length)),
          end: s.start + ((i + 1) * (s.duration / words.length))
        }));
      });

      item.addEventListener('click', () => {
        this.seekTo(s.start);
      });

      container.appendChild(item);
    });
  }

  /**
   * AI Assistant Natural Language Command Handler
   */
  async executeAssistantCommand(prompt) {
    const history = document.getElementById('assistantHistory');
    const userMsg = document.createElement('div');
    userMsg.style.fontSize = '0.8rem';
    userMsg.style.color = '#38BDF8';
    userMsg.style.padding = '4px 8px';
    userMsg.style.background = 'rgba(56, 189, 248, 0.1)';
    userMsg.style.borderRadius = '6px';
    userMsg.innerText = `Command: "${prompt}"`;
    history.prepend(userMsg);

    try {
      const res = await fetch('/api/assistant/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          currentTimeline: this.timeline,
          transcript: this.transcript,
          videoAnalysis: this.rawVideoAnalysis
        })
      });
      const data = await res.json();
      if (data.success) {
        this.timeline = data.timeline;
        this.pushHistory();
        this.renderTimeline();

        const botMsg = document.createElement('div');
        botMsg.style.fontSize = '0.75rem';
        botMsg.style.color = '#4ADE80';
        botMsg.style.padding = '6px 8px';
        botMsg.style.background = 'rgba(34, 197, 94, 0.1)';
        botMsg.style.borderRadius = '6px';
        botMsg.innerHTML = data.actionsTaken.map(a => `<div>✓ ${a}</div>`).join('');
        history.prepend(botMsg);
      }
    } catch (err) {
      console.error('Assistant error:', err);
    }
  }

  /**
   * Regional Language Localization
   */
  async runLocalization() {
    const targetLang = document.getElementById('regionalLangSelect').value;
    const statusText = document.getElementById('dubbingAudioStatus');
    statusText.innerText = 'Translating and generating synchronized regional speech...';

    try {
      const res = await fetch('/api/localize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: this.transcript, targetLang })
      });
      const data = await res.json();
      if (data.targetLanguage) {
        statusText.innerHTML = `✓ Translated to <strong>${data.targetLanguage.name} (${data.targetLanguage.nativeName})</strong>. Dubbed track synthesized!`;
        // update transcript sentences with translated text
        this.transcript.sentences = data.sentences;
        this.renderTranscriptUI();
      }
    } catch (err) {
      statusText.innerText = `Localization error: ${err.message}`;
    }
  }

  /**
   * Split clip at playhead
   */
  splitActiveClip() {
    if (!this.timeline) return;
    const v1 = this.timeline.tracks.find(t => t.id === 'video-1');
    if (!v1) return;

    const clipIdx = v1.clips.findIndex(c => this.currentTime > c.timelineIn && this.currentTime < c.timelineOut);
    if (clipIdx === -1) return;

    const clip = v1.clips[clipIdx];
    const splitPoint = this.currentTime;
    const firstDur = splitPoint - clip.timelineIn;
    const secondDur = clip.timelineOut - splitPoint;

    const clipA = {
      ...clip,
      id: `${clip.id}_a`,
      timelineOut: splitPoint,
      sourceOut: clip.sourceIn + firstDur,
      duration: firstDur
    };

    const clipB = {
      ...clip,
      id: `${clip.id}_b`,
      timelineIn: splitPoint,
      sourceIn: clip.sourceIn + firstDur,
      duration: secondDur
    };

    v1.clips.splice(clipIdx, 1, clipA, clipB);
    this.pushHistory();
    this.renderTimeline();
  }

  /**
   * Ripple Delete active clip
   */
  rippleDeleteActiveClip() {
    if (!this.selectedClip || !this.timeline) return;
    const v1 = this.timeline.tracks.find(t => t.id === 'video-1');
    if (!v1) return;

    const idx = v1.clips.findIndex(c => c.id === this.selectedClip.id);
    if (idx !== -1) {
      const dur = this.selectedClip.duration;
      v1.clips.splice(idx, 1);
      // ripple remaining
      for (let i = idx; i < v1.clips.length; i++) {
        v1.clips[i].timelineIn -= dur;
        v1.clips[i].timelineOut -= dur;
      }
      this.timeline.finalDuration -= dur;
      this.selectedClip = null;
      this.pushHistory();
      this.renderTimeline();
    }
  }

  togglePunchInZoom() {
    if (!this.selectedClip) return;
    this.selectedClip.punchIn = !this.selectedClip.punchIn;
    this.selectedClip.scale = this.selectedClip.punchIn ? 1.18 : 1.0;
    this.pushHistory();
    this.renderTimeline();
  }

  regenerateAutoEdit() {
    const style = document.getElementById('editingStyleSelect').value;
    this.loadSampleVideo(this.currentVideoPath, style);
  }

  pushHistory() {
    this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
    this.historyStack.push(JSON.stringify(this.timeline));
    this.historyIndex++;
  }

  /**
   * Load Thumbnail Candidates
   */
  async loadThumbnails() {
    try {
      const res = await fetch('/api/thumbnails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoPath: this.currentVideoPath,
          transcript: this.transcript,
          duration: this.timeline ? this.timeline.finalDuration : 20
        })
      });
      const data = await res.json();
      if (data.thumbnails) {
        const container = document.getElementById('thumbnailsContainer');
        container.innerHTML = '';
        data.thumbnails.forEach(t => {
          const card = document.createElement('div');
          card.style.position = 'relative';
          card.style.borderRadius = '6px';
          card.style.overflow = 'hidden';
          card.style.border = '1px solid #1E293B';
          card.innerHTML = `
            <img src="${t.imageUrl}" style="width: 100%; display: block;">
            <div style="position: absolute; top: 4px; left: 4px; background: #EF4444; color: white; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">${t.badge}</div>
            <div style="position: absolute; bottom: 4px; left: 4px; right: 4px; background: rgba(0,0,0,0.8); color: #FACC15; font-size: 10px; font-weight: 800; padding: 3px 6px; text-align: center;">${t.title}</div>
          `;
          container.appendChild(card);
        });
      }
    } catch (err) {
      console.warn('Thumbnails error:', err);
    }
  }

  /**
   * Trigger Real FFmpeg Video Render
   */
  async startRender() {
    const activePlatformBtn = document.querySelector('.platform-choice-btn.active');
    const platform = activePlatformBtn ? activePlatformBtn.getAttribute('data-platform') : 'TikTok';
    const ratio = activePlatformBtn ? activePlatformBtn.getAttribute('data-ratio') : '9:16';
    const burnCaptions = document.getElementById('burnCaptionsCheckbox').checked;

    document.getElementById('renderProgressContainer').style.display = 'block';
    document.getElementById('startRenderBtn').disabled = true;

    try {
      const res = await fetch('/api/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoPath: this.currentVideoPath,
          timeline: this.timeline,
          options: {
            aspectRatio: ratio,
            platform,
            burnCaptions,
            templateId: this.activeTemplateId
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        document.getElementById('renderDownloadArea').style.display = 'block';
        const dlBtn = document.getElementById('downloadMp4Btn');
        dlBtn.href = data.downloadUrl;
        dlBtn.setAttribute('download', data.filename);

        document.getElementById('publishSocialBtn').addEventListener('click', async () => {
          const pubRes = await fetch('/api/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoInfo: data, platform, metadata: { title: 'ClipForge AI Viral Reel' } })
          });
          const pubData = await pubRes.json();
          alert(`Successfully Published to ${pubData.platform}!\nPost ID: ${pubData.publicationId}\nStatus: ${pubData.status}`);
        });
      }
    } catch (err) {
      alert(`Render error: ${err.message}`);
    } finally {
      document.getElementById('startRenderBtn').disabled = false;
    }
  }

  downloadSRT() {
    if (!this.transcript || !this.transcript.sentences) return;
    let srt = '';
    this.transcript.sentences.forEach((s, idx) => {
      srt += `${idx + 1}\n`;
      srt += `00:00:${String(Math.floor(s.start)).padStart(2, '0')},000 --> 00:00:${String(Math.floor(s.end)).padStart(2, '0')},000\n`;
      srt += `${s.text}\n\n`;
    });
    const blob = new Blob([srt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    a.click();
  }
}

// Start application when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.app = new ClipForgeApp();
  if (window.lucide) lucide.createIcons();
});
