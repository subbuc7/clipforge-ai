/**
 * ClipForge AI - Brand Identity & Consistency System
 * Manages brand kits: logos, primary/secondary colors, brand typography,
 * intro/outro bumpers, default caption styles, and watermarks.
 */

class BrandManager {
  constructor() {
    this.defaultBrandKit = {
      brandName: 'ClipForge Studio',
      logoUrl: '/assets/logo_default.png',
      watermarkEnabled: true,
      watermarkPosition: 'top-right', // 'top-right', 'bottom-right', 'top-left', 'bottom-left'
      watermarkOpacity: 0.85,
      colors: {
        primary: '#FFE600',
        secondary: '#00F0FF',
        accent: '#FF0055',
        background: '#0F172A',
        text: '#FFFFFF'
      },
      fontFamily: 'Inter, sans-serif',
      defaultCaptionStyle: 'viral_hormozi',
      introDurationSec: 0,
      outroDurationSec: 2.0,
      defaultCTA: 'Follow @ClipForge for more daily viral secrets 🚀'
    };

    this.currentKit = { ...this.defaultBrandKit };
  }

  getBrandKit() {
    return this.currentKit;
  }

  updateBrandKit(updates) {
    this.currentKit = {
      ...this.currentKit,
      ...updates,
      colors: {
        ...this.currentKit.colors,
        ...(updates.colors || {})
      }
    };
    return this.currentKit;
  }
}

module.exports = new BrandManager();
