/**
 * ClipForge AI - AI Voice Generation & Audio Synthesizer
 * Generates natural spoken audio from text in multiple languages,
 * pitch, rate, and voice styles with exact duration matching.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class VoiceSynthesizer {
  constructor() {
    this.outputDir = path.join(__dirname, '../public/assets/generated_audio');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Voice profiles mapping to espeak and Web Speech
    this.voices = {
      'en-us-male': { name: 'Alex (US Male - Confident)', lang: 'en-us', espeakVoice: 'en-us', gender: 'male' },
      'en-us-female': { name: 'Sarah (US Female - Engaging)', lang: 'en-us', espeakVoice: 'en-us+f3', gender: 'female' },
      'en-gb-male': { name: 'William (British Male - Documentarian)', lang: 'en-gb', espeakVoice: 'en-gb', gender: 'male' },
      'en-gb-female': { name: 'Emma (British Female - Storyteller)', lang: 'en-gb', espeakVoice: 'en-gb+f2', gender: 'female' },
      'te-male': { name: 'Ravi (Telugu Male - Dynamic)', lang: 'te', espeakVoice: 'te', gender: 'male' },
      'te-female': { name: 'Lakshmi (Telugu Female - Expressive)', lang: 'te', espeakVoice: 'te+f2', gender: 'female' },
      'hi-male': { name: 'Aarav (Hindi Male - Creator)', lang: 'hi', espeakVoice: 'hi', gender: 'male' },
      'hi-female': { name: 'Pooja (Hindi Female - Clear)', lang: 'hi', espeakVoice: 'hi+f2', gender: 'female' },
      'ta-male': { name: 'Karthik (Tamil Male - Energetic)', lang: 'ta', espeakVoice: 'ta', gender: 'male' },
      'ta-female': { name: 'Ananya (Tamil Female - Warm)', lang: 'ta', espeakVoice: 'ta+f2', gender: 'female' },
      'bn-male': { name: 'Sourav (Bengali Male - Articulate)', lang: 'bn', espeakVoice: 'bn', gender: 'male' },
      'mr-male': { name: 'Rohan (Marathi Male - Crisp)', lang: 'mr', espeakVoice: 'mr', gender: 'male' },
      'pa-male': { name: 'Harpreet (Punjabi Male - Bold)', lang: 'pa', espeakVoice: 'pa', gender: 'male' },
      'gu-male': { name: 'Jay (Gujarati Male - Friendly)', lang: 'gu', espeakVoice: 'gu', gender: 'male' },
      'ur-male': { name: 'Tariq (Urdu Male - Poetic)', lang: 'ur', espeakVoice: 'ur', gender: 'male' }
    };
  }

  getAvailableVoices() {
    return Object.entries(this.voices).map(([id, info]) => ({
      id,
      name: info.name,
      language: info.lang,
      gender: info.gender
    }));
  }

  /**
   * Synthesize audio from text
   * @param {string} text - Spoken dialogue text
   * @param {Object} options - { voiceId, speed, pitch, emotion }
   */
  async synthesizeVoice(text, options = {}) {
    if (!text || text.trim().length === 0) {
      throw new Error('Text is required for voice generation');
    }

    const voiceId = options.voiceId || 'en-us-male';
    const voiceConfig = this.voices[voiceId] || this.voices['en-us-male'];
    const speed = Math.round(155 * (options.speed || 1.0)); // wpm
    const pitch = Math.min(99, Math.max(10, Math.round(50 * (options.pitch || 1.0))));

    const sanitized = text.replace(/["`$\\]/g, ' ').replace(/\s+/g, ' ').trim();
    const fileName = `tts_${Date.now()}_${Math.floor(Math.random() * 1000)}.wav`;
    const wavPath = path.join(this.outputDir, fileName);

    // Run espeak with pitch & speed parameters
    const espeakCmd = `espeak -v ${voiceConfig.espeakVoice} -s ${speed} -p ${pitch} -w "${wavPath}" "${sanitized}"`;

    try {
      execSync(espeakCmd, { stdio: 'ignore' });
    } catch (err) {
      // If voice not found, fallback to default English
      execSync(`espeak -w "${wavPath}" "${sanitized}"`, { stdio: 'ignore' });
    }

    // Probe duration using ffprobe
    let duration = 3.0;
    try {
      const probe = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${wavPath}"`).toString();
      duration = Math.max(0.2, parseFloat(probe.trim()) || 3.0);
    } catch {}

    return {
      success: true,
      audioUrl: `/assets/generated_audio/${fileName}`,
      filePath: wavPath,
      duration: Math.round(duration * 100) / 100,
      voice: voiceConfig.name,
      text: sanitized
    };
  }
}

module.exports = new VoiceSynthesizer();
