/**
 * ClipForge AI - AI Story & Content Understanding Engine
 * Analyzes narrative arc (Hook -> Story -> Key Info -> Visuals -> CTA -> Ending)
 * and adapts editing rules based on 12 professional video styles.
 */

class AIStoryEngine {
  constructor() {
    this.editingStyles = {
      'Social/Reel': {
        tempo: 'Fast',
        targetDuration: 30, // seconds
        maxShotLength: 2.8,
        punchInFrequency: 3.0,
        punchInScale: 1.18,
        aspectRatio: '9:16',
        captionStyle: 'viral_hormozi',
        colorGrade: { contrast: 1.15, saturation: 1.2, brightness: 0.02 },
        transitionType: 'quick_zoom',
        musicGenre: 'Phonk / High Energy Lo-Fi',
        duckingDb: -14
      },
      'Cinematic': {
        tempo: 'Slow & Deliberate',
        targetDuration: 60,
        maxShotLength: 6.0,
        punchInFrequency: 0,
        punchInScale: 1.0,
        aspectRatio: '16:9',
        letterbox: true,
        captionStyle: 'cine_silver',
        colorGrade: { contrast: 1.25, saturation: 0.9, brightness: -0.02, temperature: 1.05 },
        transitionType: 'cross_dissolve',
        musicGenre: 'Ambient Cinematic Orchestral',
        duckingDb: -18
      },
      'Advertisement': {
        tempo: 'High Urgency',
        targetDuration: 20,
        maxShotLength: 2.2,
        punchInFrequency: 2.5,
        punchInScale: 1.2,
        aspectRatio: '9:16',
        captionStyle: 'ad_sale_flash',
        colorGrade: { contrast: 1.2, saturation: 1.25, brightness: 0.05 },
        transitionType: 'flash_cut',
        musicGenre: 'Uplifting Commercial Beats',
        duckingDb: -15
      },
      'Product': {
        tempo: 'Snappy & Crisp',
        targetDuration: 30,
        maxShotLength: 3.5,
        punchInFrequency: 4.0,
        punchInScale: 1.15,
        aspectRatio: '9:16',
        captionStyle: 'mod_glass',
        colorGrade: { contrast: 1.1, saturation: 1.1, brightness: 0.04 },
        transitionType: 'smooth_slide',
        musicGenre: 'Modern Minimal Tech Electronic',
        duckingDb: -12
      },
      'Real Estate': {
        tempo: 'Smooth & Elegant',
        targetDuration: 45,
        maxShotLength: 5.0,
        punchInFrequency: 0,
        punchInScale: 1.0,
        aspectRatio: '9:16',
        captionStyle: 're_modern_villa',
        colorGrade: { contrast: 1.12, saturation: 1.15, brightness: 0.06 },
        transitionType: 'dip_to_white',
        musicGenre: 'Deep Luxury Chill Lounge',
        duckingDb: -16
      },
      'Food': {
        tempo: 'Sensory & Vibrant',
        targetDuration: 25,
        maxShotLength: 2.5,
        punchInFrequency: 3.0,
        punchInScale: 1.22,
        aspectRatio: '9:16',
        captionStyle: 'food_spicy',
        colorGrade: { contrast: 1.2, saturation: 1.35, brightness: 0.03 },
        transitionType: 'quick_whip',
        musicGenre: 'Bouncy Upbeat Groove',
        duckingDb: -14
      },
      'Travel': {
        tempo: 'Dynamic Exploration',
        targetDuration: 45,
        maxShotLength: 3.8,
        punchInFrequency: 4.5,
        punchInScale: 1.15,
        aspectRatio: '9:16',
        captionStyle: 'trv_sunset',
        colorGrade: { contrast: 1.15, saturation: 1.25, brightness: 0.02 },
        transitionType: 'zoom_blur',
        musicGenre: 'Epic Tropical House / Indie Folk',
        duckingDb: -14
      },
      'Talking Head': {
        tempo: 'Clean Conversational',
        targetDuration: 45,
        maxShotLength: 4.0,
        punchInFrequency: 3.5,
        punchInScale: 1.16,
        aspectRatio: '9:16',
        captionStyle: 'viral_yellow',
        colorGrade: { contrast: 1.08, saturation: 1.1, brightness: 0.02 },
        transitionType: 'jump_cut_punch',
        musicGenre: 'Subtle Lo-Fi Bedroom Beats',
        duckingDb: -16
      },
      'Podcast': {
        tempo: 'Long-form Paced',
        targetDuration: 60,
        maxShotLength: 5.5,
        punchInFrequency: 5.0,
        punchInScale: 1.12,
        aspectRatio: '9:16',
        captionStyle: 'pod_lex',
        colorGrade: { contrast: 1.1, saturation: 1.0, brightness: 0.0 },
        transitionType: 'smooth_cut',
        musicGenre: 'Subtle Dark Ambient Drone',
        duckingDb: -20
      },
      'Educational': {
        tempo: 'Clear & Structured',
        targetDuration: 50,
        maxShotLength: 4.5,
        punchInFrequency: 4.0,
        punchInScale: 1.14,
        aspectRatio: '9:16',
        captionStyle: 'edu_highlighter',
        colorGrade: { contrast: 1.05, saturation: 1.05, brightness: 0.03 },
        transitionType: 'subtle_fade',
        musicGenre: 'Soft Study Ambient Piano',
        duckingDb: -18
      },
      'Storytelling': {
        tempo: 'Dramatic Arc',
        targetDuration: 60,
        maxShotLength: 4.8,
        punchInFrequency: 4.0,
        punchInScale: 1.15,
        aspectRatio: '9:16',
        captionStyle: 'sty_novel',
        colorGrade: { contrast: 1.2, saturation: 0.95, brightness: -0.01 },
        transitionType: 'film_dissolve',
        musicGenre: 'Emotional Acoustic Strings',
        duckingDb: -18
      },
      'Luxury': {
        tempo: 'Refined & Minimalist',
        targetDuration: 35,
        maxShotLength: 4.5,
        punchInFrequency: 0,
        punchInScale: 1.0,
        aspectRatio: '9:16',
        captionStyle: 'lux_gold',
        colorGrade: { contrast: 1.25, saturation: 1.05, brightness: 0.01 },
        transitionType: 'dip_to_black',
        musicGenre: 'Classical High Fashion Piano',
        duckingDb: -16
      }
    };
  }

  /**
   * Analyze complete story structure from transcript & video metrics
   */
  analyzeStory(transcript, videoAnalysis, selectedStyle = 'Social/Reel') {
    const fullText = transcript.fullText || '';
    const sentences = transcript.sentences || [];
    const duration = transcript.duration || (videoAnalysis.mediaInfo ? videoAnalysis.mediaInfo.duration : 30);

    // 1. Identify Hook (first 3-5 seconds or first 2 sentences)
    const hookSentences = sentences.slice(0, 2);
    const hookText = hookSentences.map(s => s.text).join(' ');
    const hookStart = hookSentences[0] ? hookSentences[0].start : 0;
    const hookEnd = hookSentences[hookSentences.length - 1] ? hookSentences[hookSentences.length - 1].end : Math.min(4.0, duration);

    // Calculate Hook Strength (0-100) based on power words, question marks, and brevity
    let hookScore = 80;
    if (/\?|how|secret|biggest|why|never|stop|watch|discover|look/i.test(hookText)) hookScore += 12;
    if (hookEnd <= 3.5) hookScore += 6;
    if (hookText.length < 50) hookScore += 2;
    hookScore = Math.min(99, hookScore);

    // 2. Identify CTA (sentences with follow, subscribe, comment, click, buy, link)
    let ctaSentences = sentences.filter(s => /follow|subscribe|comment|link|share|save|dm|buy|download|check/i.test(s.text));
    if (ctaSentences.length === 0 && sentences.length > 2) {
      ctaSentences = [sentences[sentences.length - 1]];
    }
    const ctaText = ctaSentences.map(s => s.text).join(' ');
    const ctaStart = ctaSentences[0] ? ctaSentences[0].start : Math.max(0, duration - 4.5);
    const ctaEnd = duration;

    // 3. Narrative Core / Main Story (middle section)
    const coreSentences = sentences.filter(s => s.start >= hookEnd && s.end <= ctaStart);
    const coreText = coreSentences.map(s => s.text).join(' ');

    // 4. Important Highlights / Retention Peaks
    const highlights = sentences.map((s, idx) => {
      let virality = 70;
      if (s.start <= 4.0) virality += 20; // Hook boost
      if (/secret|biggest|wrong|skyrocket|real|truth|viral|million|insane/i.test(s.text)) virality += 18;
      if (s.duration >= 2.0 && s.duration <= 4.5) virality += 5; // optimal cadence
      return {
        id: s.id,
        index: idx + 1,
        text: s.text,
        start: s.start,
        end: s.end,
        duration: s.duration,
        viralityScore: Math.min(98, virality),
        isHook: s.start <= hookEnd,
        isCTA: s.start >= ctaStart,
        isKeyTakeaway: /secret|wrong|retention|skyrocket|real|key/i.test(s.text)
      };
    });

    // 5. Generate Virality & Retention Prediction Curve
    const retentionCurve = [
      { second: 0, retentionPercent: 100 },
      { second: 3, retentionPercent: Math.round(hookScore * 0.95) },
      { second: 10, retentionPercent: Math.round(hookScore * 0.84) },
      { second: 20, retentionPercent: Math.round(hookScore * 0.76) },
      { second: Math.round(duration), retentionPercent: Math.round(hookScore * 0.68) }
    ];

    const overallViralityScore = Math.round((hookScore * 0.45) + (88 * 0.35) + (92 * 0.20));

    // Get style preset configuration
    const stylePreset = this.editingStyles[selectedStyle] || this.editingStyles['Social/Reel'];

    return {
      selectedStyle,
      styleConfig: stylePreset,
      overallViralityScore,
      hook: {
        text: hookText,
        start: hookStart,
        end: hookEnd,
        duration: Math.round((hookEnd - hookStart) * 100) / 100,
        score: hookScore,
        strategy: 'Attention grabber + immediate premise reveal'
      },
      cta: {
        text: ctaText,
        start: ctaStart,
        end: ctaEnd,
        duration: Math.round((ctaEnd - ctaStart) * 100) / 100,
        type: 'Social Follow & Save Prompt'
      },
      storyArc: {
        hook: { text: hookText, timeRange: [hookStart, hookEnd] },
        mainStory: { text: coreText, timeRange: [hookEnd, ctaStart] },
        cta: { text: ctaText, timeRange: [ctaStart, ctaEnd] }
      },
      highlights,
      retentionCurve,
      availableStyles: Object.keys(this.editingStyles)
    };
  }
}

module.exports = new AIStoryEngine();
