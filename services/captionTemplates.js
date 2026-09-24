/**
 * ClipForge AI - Professional Caption Templates Catalog
 * Over 200 genuinely distinct, professionally designed caption templates
 * organized into 20 creative & commercial categories.
 */

const categories = [
  'Minimal', 'Cinematic', 'Luxury', 'Bold', 'Viral',
  'Kinetic', 'Creator', 'Podcast', 'Business', 'Advertisement',
  'News', 'Educational', 'Real Estate', 'Food', 'Travel',
  'Gaming', 'Motivational', 'Music', 'Storytelling', 'Modern & Clean'
];

// Helper to create template definitions
function createTemplate(id, name, category, options) {
  return {
    id,
    name,
    category,
    fontFamily: options.fontFamily || 'Inter, sans-serif',
    fontSize: options.fontSize || 38,
    fontWeight: options.fontWeight || '700',
    fontStyle: options.fontStyle || 'normal',
    letterSpacing: options.letterSpacing || '0px',
    textTransform: options.textTransform || 'none', // 'uppercase', 'capitalize', 'none'
    textColor: options.textColor || '#FFFFFF',
    highlightColor: options.highlightColor || '#FFE600',
    secondaryColor: options.secondaryColor || '#00FFCC',
    backgroundColor: options.backgroundColor || 'transparent',
    backgroundPadding: options.backgroundPadding || '6px 16px',
    borderRadius: options.borderRadius || '8px',
    strokeWidth: options.strokeWidth || 0,
    strokeColor: options.strokeColor || '#000000',
    shadow: options.shadow || '0 4px 12px rgba(0,0,0,0.8)',
    positionY: options.positionY || 78, // % from top
    safeArea: options.safeArea || { bottom: 120, side: 40 },
    animation: options.animation || 'word-pop', // 'word-pop', 'karaoke', 'bounce', 'slide-up', 'fade', 'glow', 'typewriter'
    wordsPerScreen: options.wordsPerScreen || 3, // 1 to 6
    emojiEnabled: options.emojiEnabled !== undefined ? options.emojiEnabled : true,
    boxBlur: options.boxBlur || 0,
    border: options.border || 'none'
  };
}

// Build 200+ distinct templates across all 20 categories (10+ per category)
const templates = [];

// 1. MINIMAL (10 templates)
const minimalStyles = [
  { id: 'min_slate', name: 'Modern Slate', font: 'Inter', color: '#F1F5F9', hi: '#94A3B8', bg: 'rgba(15,23,42,0.6)', words: 4 },
  { id: 'min_ghost', name: 'Ghost White', font: 'Helvetica Neue', color: '#FFFFFF', hi: '#E2E8F0', stroke: 1, words: 3 },
  { id: 'min_thin', name: 'Thin Line', font: 'Space Grotesk', color: '#F8FAFC', hi: '#CBD5E1', border: '1px solid rgba(255,255,255,0.2)', words: 4 },
  { id: 'min_pure', name: 'Subtitle Pure', font: 'Roboto', color: '#FFFFFF', hi: '#FDE047', shadow: '0 2px 4px rgba(0,0,0,0.9)', words: 5 },
  { id: 'min_mono', name: 'Code Mono', font: 'JetBrains Mono', color: '#A7F3D0', hi: '#34D399', bg: 'rgba(0,0,0,0.7)', words: 3 },
  { id: 'min_pill', name: 'Pill Dot', font: 'Inter', color: '#FFFFFF', hi: '#38BDF8', bg: 'rgba(30,41,59,0.8)', radius: '999px', words: 3 },
  { id: 'min_nordic', name: 'Nordic Frost', font: 'Outfit', color: '#E0F2FE', hi: '#7DD3FC', words: 4 },
  { id: 'min_subtle', name: 'Subtle Smoke', font: 'Plus Jakarta Sans', color: '#E2E8F0', hi: '#FFFFFF', bg: 'rgba(0,0,0,0.4)', words: 4 },
  { id: 'min_under', name: 'Underline Minimal', font: 'Inter', color: '#FFFFFF', hi: '#60A5FA', animation: 'karaoke', words: 3 },
  { id: 'min_zen', name: 'Zen Soft', font: 'DM Sans', color: '#F8FAFC', hi: '#A5B4FC', words: 4 }
];
minimalStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Minimal', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, strokeWidth: s.stroke || 0, wordsPerScreen: s.words, border: s.border, animation: s.animation || 'fade'
})));

// 2. CINEMATIC (10 templates)
const cinematicStyles = [
  { id: 'cine_silver', name: 'Silver Screen', font: 'Cinzel', color: '#E2E8F0', hi: '#F8FAFC', letter: '3px', textTransform: 'uppercase' },
  { id: 'cine_noir', name: 'Noir Gold', font: 'Playfair Display', color: '#FEF08A', hi: '#EAB308', letter: '2px', shadow: '0 4px 20px rgba(0,0,0,1)' },
  { id: 'cine_interstellar', name: 'Deep Space', font: 'Montserrat', color: '#BAE6FD', hi: '#38BDF8', letter: '4px', textTransform: 'uppercase' },
  { id: 'cine_anamorphic', name: 'Anamorphic Blue', font: 'Oswald', color: '#FFFFFF', hi: '#0284C7', shadow: '0 0 15px rgba(2,132,199,0.8)' },
  { id: 'cine_vintage', name: 'Vintage 35mm', font: 'Lora', color: '#FEF3C7', hi: '#D97706', fontStyle: 'italic' },
  { id: 'cine_imax', name: 'IMAX Bold', font: 'Bebas Neue', color: '#FFFFFF', hi: '#FACC15', letter: '2px', fontSize: 44 },
  { id: 'cine_moody', name: 'Moody Teal', font: 'Montserrat', color: '#CCFBF1', hi: '#14B8A6', shadow: '0 4px 16px rgba(0,0,0,0.9)' },
  { id: 'cine_epic', name: 'Epic Trailer', font: 'Cinzel', color: '#FFFFFF', hi: '#DC2626', letter: '5px', textTransform: 'uppercase' },
  { id: 'cine_letterbox', name: 'Letterbox Classic', font: 'Roboto Condensed', color: '#FFFFFF', hi: '#FBBF24', positionY: 82 },
  { id: 'cine_panavision', name: 'Panavision Clean', font: 'Didot', color: '#FFFFFF', hi: '#E2E8F0', letter: '3px' }
];
cinematicStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Cinematic', {
  fontFamily: s.font + ', serif', textColor: s.color, highlightColor: s.hi, letterSpacing: s.letter,
  textTransform: s.textTransform, shadow: s.shadow, fontSize: s.fontSize, positionY: s.positionY || 80, animation: 'fade'
})));

// 3. LUXURY (10 templates)
const luxuryStyles = [
  { id: 'lux_vogue', name: 'Vogue Haute', font: 'Playfair Display', color: '#FFFFFF', hi: '#FDE047', letter: '2px' },
  { id: 'lux_gold', name: 'Cartier Gold', font: 'Cinzel', color: '#FCD34D', hi: '#F59E0B', shadow: '0 0 18px rgba(245,158,11,0.6)' },
  { id: 'lux_diamond', name: 'Diamond White', font: 'Bodoni MT', color: '#FFFFFF', hi: '#E0F2FE', shadow: '0 0 25px rgba(255,255,255,0.8)' },
  { id: 'lux_velvet', name: 'Velvet Noir', font: 'Prata', color: '#FEE2E2', hi: '#F87171', bg: 'rgba(20,5,10,0.7)' },
  { id: 'lux_emerald', name: 'Royal Emerald', font: 'Cormorant Garamond', color: '#A7F3D0', hi: '#10B981', letter: '1px' },
  { id: 'lux_champagne', name: 'Champagne Flute', font: 'Italiana', color: '#FEF9C3', hi: '#FACC15', letter: '3px' },
  { id: 'lux_rolex', name: 'Oyster Platinum', font: 'Montserrat', color: '#E2E8F0', hi: '#38BDF8', letter: '3px', textTransform: 'uppercase' },
  { id: 'lux_monaco', name: 'Monaco Harbor', font: 'Playfair Display', color: '#FFFFFF', hi: '#F43F5E' },
  { id: 'lux_silk', name: 'Pure Silk', font: 'Cormorant', color: '#FFF1F2', hi: '#FB7185', fontStyle: 'italic' },
  { id: 'lux_prestige', name: 'Prestige Black', font: 'Cinzel Decorative', color: '#FDE68A', hi: '#F59E0B', bg: 'rgba(0,0,0,0.8)' }
];
luxuryStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Luxury', {
  fontFamily: s.font + ', serif', textColor: s.color, highlightColor: s.hi, letterSpacing: s.letter,
  backgroundColor: s.bg, shadow: s.shadow, fontStyle: s.fontStyle, textTransform: s.textTransform, animation: 'fade'
})));

// 4. BOLD (10 templates)
const boldStyles = [
  { id: 'bold_impact', name: 'Impact Punch', font: 'Impact', color: '#FFFFFF', hi: '#FFE600', stroke: 3, textTransform: 'uppercase', fontSize: 44 },
  { id: 'bold_titan', name: 'Titan Force', font: 'Anton', color: '#FFFFFF', hi: '#FF0055', stroke: 2, textTransform: 'uppercase', fontSize: 46 },
  { id: 'bold_blackout', name: 'Heavy Blackout', font: 'Montserrat', color: '#FFE600', hi: '#FFFFFF', bg: '#000000', textTransform: 'uppercase', weight: '900' },
  { id: 'bold_red_alert', name: 'Red Alert', font: 'Bebas Neue', color: '#FFFFFF', hi: '#EF4444', stroke: 2, strokeColor: '#B91C1C', textTransform: 'uppercase', fontSize: 46 },
  { id: 'bold_slam', name: 'Text Slam', font: 'Rubik', color: '#FACC15', hi: '#38BDF8', stroke: 2, weight: '900', textTransform: 'uppercase' },
  { id: 'bold_block', name: 'Chunky Block', font: 'Archivo Black', color: '#FFFFFF', hi: '#22C55E', bg: 'rgba(0,0,0,0.85)', radius: '4px' },
  { id: 'bold_cyber', name: 'Cyber Punch', font: 'Orbitron', color: '#22D3EE', hi: '#F43F5E', stroke: 1, textTransform: 'uppercase' },
  { id: 'bold_stomp', name: 'Heavy Stomp', font: 'Anton', color: '#F87171', hi: '#FDE047', stroke: 2, fontSize: 48 },
  { id: 'bold_thunder', name: 'Thunder Strike', font: 'Impact', color: '#FFFFFF', hi: '#A855F7', shadow: '0 6px 0 #581C87', textTransform: 'uppercase' },
  { id: 'bold_iron', name: 'Ironclad', font: 'Oswald', color: '#E2E8F0', hi: '#3B82F6', weight: '900', stroke: 3, strokeColor: '#0F172A' }
];
boldStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Bold', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, strokeWidth: s.stroke || 0,
  strokeColor: s.strokeColor || '#000000', backgroundColor: s.bg, borderRadius: s.radius, textTransform: s.textTransform,
  fontSize: s.fontSize || 42, fontWeight: s.weight || '900', animation: 'word-pop'
})));

// 5. VIRAL (10 templates)
const viralStyles = [
  { id: 'viral_hormozi', name: 'Hormozi Classic', font: 'Montserrat', color: '#FFFFFF', hi: '#22C55E', stroke: 3, weight: '900', textTransform: 'uppercase', animation: 'karaoke', words: 2 },
  { id: 'viral_yellow', name: 'Viral Yellow Pop', font: 'Anton', color: '#FFFFFF', hi: '#FDE047', stroke: 3, textTransform: 'uppercase', animation: 'bounce', words: 2 },
  { id: 'viral_tiktok_pulse', name: 'TikTok Pulse', font: 'Poppins', color: '#FFFFFF', hi: '#00F2FE', stroke: 2, weight: '800', animation: 'word-pop', words: 3 },
  { id: 'viral_hook_master', name: 'Hook Master', font: 'Bebas Neue', color: '#FFE600', hi: '#FF0055', stroke: 2, fontSize: 46, textTransform: 'uppercase', words: 2 },
  { id: 'viral_cyan_pop', name: 'Cyan Shockwave', font: 'Montserrat', color: '#FFFFFF', hi: '#06B6D4', stroke: 3, weight: '900', textTransform: 'uppercase', words: 2 },
  { id: 'viral_green_cash', name: 'Cash Flow Green', font: 'Impact', color: '#4ADE80', hi: '#FDE047', stroke: 2, textTransform: 'uppercase', words: 2 },
  { id: 'viral_flame', name: 'Fire Hook', font: 'Rubik', color: '#FFFFFF', hi: '#F97316', stroke: 3, weight: '900', animation: 'bounce', words: 2 },
  { id: 'viral_double_box', name: 'Double Highlight Box', font: 'Inter', color: '#000000', hi: '#000000', bg: '#FACC15', radius: '6px', weight: '800', words: 3 },
  { id: 'viral_neon_edge', name: 'Neon Edge Pop', font: 'Space Grotesk', color: '#FFFFFF', hi: '#EC4899', shadow: '0 0 15px #EC4899', weight: '800', words: 2 },
  { id: 'viral_split_word', name: 'Split Word Punch', font: 'Montserrat', color: '#FFFFFF', hi: '#3B82F6', stroke: 3, weight: '900', words: 2 }
];
viralStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Viral', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, strokeWidth: s.stroke || 0,
  strokeColor: s.strokeColor || '#000000', backgroundColor: s.bg, borderRadius: s.radius, textTransform: s.textTransform,
  fontWeight: s.weight || '900', fontSize: s.fontSize || 40, animation: s.animation || 'word-pop', wordsPerScreen: s.words
})));

// 6. KINETIC (10 templates)
const kineticStyles = [
  { id: 'kin_spring', name: 'Bouncy Spring', font: 'Montserrat', color: '#FFFFFF', hi: '#38BDF8', animation: 'bounce', words: 2 },
  { id: 'kin_pop', name: 'Word Pop Explosion', font: 'Anton', color: '#FFFFFF', hi: '#F43F5E', animation: 'word-pop', words: 1, fontSize: 48 },
  { id: 'kin_wave', name: 'Wave Rider', font: 'Poppins', color: '#FEF08A', hi: '#3B82F6', animation: 'karaoke', words: 3 },
  { id: 'kin_elastic', name: 'Elastic Zoom', font: 'Rubik', color: '#FFFFFF', hi: '#A855F7', animation: 'bounce', words: 2 },
  { id: 'kin_staccato', name: 'Staccato Rhythm', font: 'Inter', color: '#E2E8F0', hi: '#10B981', animation: 'word-pop', words: 2 },
  { id: 'kin_slide_up', name: 'Elevator Slide', font: 'Space Grotesk', color: '#FFFFFF', hi: '#F59E0B', animation: 'slide-up', words: 3 },
  { id: 'kin_typewriter', name: 'Terminal Typewriter', font: 'Fira Code', color: '#34D399', hi: '#A7F3D0', animation: 'typewriter', words: 4 },
  { id: 'kin_pulse', name: 'Heartbeat Pulse', font: 'Montserrat', color: '#FDA4AF', hi: '#E11D48', animation: 'bounce', words: 2 },
  { id: 'kin_shuffle', name: 'Kinetic Shuffle', font: 'Outfit', color: '#FFFFFF', hi: '#8B5CF6', animation: 'word-pop', words: 2 },
  { id: 'kin_whirl', name: 'Vortex Snap', font: 'Bebas Neue', color: '#FDE047', hi: '#06B6D4', stroke: 2, words: 2 }
];
kineticStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Kinetic', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, animation: s.animation,
  strokeWidth: s.stroke || 0, wordsPerScreen: s.words, fontSize: s.fontSize || 38
})));

// 7. CREATOR (10 templates)
const creatorStyles = [
  { id: 'cre_beast', name: 'MrBeast High Octane', font: 'Impact', color: '#FFFFFF', hi: '#FFDD00', stroke: 3, textTransform: 'uppercase', words: 2 },
  { id: 'cre_ali', name: 'Ali Abdaal Study Pill', font: 'Inter', color: '#1E293B', hi: '#2563EB', bg: '#F8FAFC', radius: '999px', words: 4, weight: '700' },
  { id: 'cre_iman', name: 'Iman Gadzhi Matte Box', font: 'Montserrat', color: '#FFFFFF', hi: '#CA8A04', bg: 'rgba(0,0,0,0.85)', radius: '6px', words: 3 },
  { id: 'cre_vlog', name: 'Vlogger Stamp', font: 'Caveat', color: '#FEF08A', hi: '#F43F5E', fontSize: 44, words: 3 },
  { id: 'cre_tech_reviewer', name: 'MKBHD Matte Clean', font: 'Space Grotesk', color: '#FFFFFF', hi: '#EF4444', bg: 'rgba(15,15,15,0.75)', words: 3 },
  { id: 'cre_streamer', name: 'Twitch Chat Box', font: 'Rubik', color: '#A78BFA', hi: '#C084FC', bg: 'rgba(17,24,39,0.9)', radius: '8px', words: 3 },
  { id: 'cre_lifestyle', name: 'Lifestyle Pastel', font: 'Quicksand', color: '#FDF2F8', hi: '#F472B6', bg: 'rgba(80,20,50,0.5)', radius: '12px', words: 3 },
  { id: 'cre_storytime', name: 'Storytime Yellow', font: 'Comic Neue', color: '#000000', hi: '#DC2626', bg: '#FEF08A', radius: '8px', words: 3 },
  { id: 'cre_podcast_clip', name: 'Clip Channel Pill', font: 'Poppins', color: '#FFFFFF', hi: '#38BDF8', bg: 'rgba(30,58,138,0.7)', radius: '999px', words: 3 },
  { id: 'cre_daily_vlog', name: 'Casey Neistat Marker', font: 'Permanent Marker', color: '#FFFFFF', hi: '#FACC15', stroke: 2, words: 2 }
];
creatorStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Creator', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, strokeWidth: s.stroke || 0,
  backgroundColor: s.bg, borderRadius: s.radius, textTransform: s.textTransform, wordsPerScreen: s.words,
  fontSize: s.fontSize || 38, fontWeight: s.weight || '800'
})));

// 8. PODCAST (10 templates)
const podcastStyles = [
  { id: 'pod_lex', name: 'Lex Studio Dark', font: 'Inter', color: '#94A3B8', hi: '#F1F5F9', bg: 'rgba(15,23,42,0.9)', radius: '8px', words: 4 },
  { id: 'pod_huberman', name: 'Neuroscience Note', font: 'Roboto', color: '#FFFFFF', hi: '#38BDF8', bg: 'rgba(0,0,0,0.8)', border: '1px solid #38BDF8', words: 4 },
  { id: 'pod_joe', name: 'Underground Studio', font: 'Oswald', color: '#FDE047', hi: '#FFFFFF', stroke: 2, textTransform: 'uppercase', words: 3 },
  { id: 'pod_wave_pill', name: 'Audio Wave Pill', font: 'Montserrat', color: '#FFFFFF', hi: '#10B981', bg: 'rgba(6,78,59,0.8)', radius: '999px', words: 3 },
  { id: 'pod_broadcast', name: 'Broadcast Ribbon', font: 'Plus Jakarta Sans', color: '#FFFFFF', hi: '#F59E0B', bg: '#1E293B', words: 4 },
  { id: 'pod_fireside', name: 'Fireside Warmth', font: 'Merriweather', color: '#FED7AA', hi: '#F97316', bg: 'rgba(67,20,7,0.75)', words: 4 },
  { id: 'pod_dual_speaker', name: 'Host / Guest Split', font: 'Inter', color: '#E0F2FE', hi: '#0284C7', bg: 'rgba(0,0,0,0.8)', words: 3 },
  { id: 'pod_radio_show', name: 'FM Radio Tape', font: 'Courier Prime', color: '#FEF08A', hi: '#FACC15', bg: '#000000', words: 3 },
  { id: 'pod_monologue', name: 'Deep Monologue', font: 'DM Sans', color: '#CBD5E1', hi: '#FFFFFF', words: 5 },
  { id: 'pod_clubhouse', name: 'Audio Room Badge', font: 'Poppins', color: '#FFFFFF', hi: '#EC4899', bg: 'rgba(80,7,45,0.7)', radius: '16px', words: 3 }
];
podcastStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Podcast', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, strokeWidth: s.stroke || 0, border: s.border, textTransform: s.textTransform, wordsPerScreen: s.words
})));

// 9. BUSINESS (10 templates)
const businessStyles = [
  { id: 'biz_corporate', name: 'Corporate Blue', font: 'Inter', color: '#FFFFFF', hi: '#60A5FA', bg: 'rgba(30,58,138,0.85)', radius: '6px', words: 4 },
  { id: 'biz_slate', name: 'Executive Slate', font: 'Plus Jakarta Sans', color: '#F8FAFC', hi: '#38BDF8', bg: 'rgba(15,23,42,0.9)', radius: '8px', words: 4 },
  { id: 'biz_forbes', name: 'Forbes Minimal', font: 'Georgia', color: '#FFFFFF', hi: '#E2E8F0', border: '1px solid rgba(255,255,255,0.4)', words: 4 },
  { id: 'biz_pitch', name: 'Pitch Deck Clean', font: 'Space Grotesk', color: '#FFFFFF', hi: '#10B981', bg: 'rgba(0,0,0,0.7)', words: 3 },
  { id: 'biz_techcrunch', name: 'Venture Green', font: 'Montserrat', color: '#22C55E', hi: '#86EFAC', bg: '#052E16', radius: '6px', words: 3 },
  { id: 'biz_bloomberg', name: 'Market Ticker', font: 'Roboto Mono', color: '#FACC15', hi: '#F59E0B', bg: '#000000', words: 4 },
  { id: 'biz_consulting', name: 'McKinsey Crisp', font: 'Calibri', color: '#FFFFFF', hi: '#93C5FD', bg: 'rgba(10,25,47,0.8)', words: 4 },
  { id: 'biz_saas', name: 'SaaS Modern', font: 'Outfit', color: '#FFFFFF', hi: '#6366F1', bg: 'rgba(49,46,129,0.7)', radius: '10px', words: 3 },
  { id: 'biz_quarterly', name: 'Q4 Earnings Bar', font: 'Inter', color: '#E2E8F0', hi: '#34D399', bg: '#0F172A', words: 4 },
  { id: 'biz_enterprise', name: 'Enterprise Pro', font: 'Work Sans', color: '#FFFFFF', hi: '#0EA5E9', bg: 'rgba(8,47,73,0.85)', radius: '6px', words: 4 }
];
businessStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Business', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, border: s.border, wordsPerScreen: s.words
})));

// 10. ADVERTISEMENT (10 templates)
const adStyles = [
  { id: 'ad_sale_flash', name: 'Flash Sale Red', font: 'Impact', color: '#FFFFFF', hi: '#FEF08A', bg: '#DC2626', radius: '4px', textTransform: 'uppercase', words: 2 },
  { id: 'ad_cta_yellow', name: 'Yellow Conversion Pill', font: 'Montserrat', color: '#000000', hi: '#DC2626', bg: '#FACC15', radius: '999px', weight: '900', words: 3 },
  { id: 'ad_discount_pop', name: 'Discount Burst', font: 'Bebas Neue', color: '#FFFFFF', hi: '#22C55E', stroke: 2, fontSize: 46, words: 2 },
  { id: 'ad_urgency', name: 'Limited Time Urgency', font: 'Rubik', color: '#FEF2F2', hi: '#EF4444', bg: 'rgba(0,0,0,0.9)', border: '2px solid #EF4444', words: 3 },
  { id: 'ad_black_friday', name: 'Black Friday Neon', font: 'Anton', color: '#FFE600', hi: '#00FFCC', bg: '#000000', words: 2 },
  { id: 'ad_promo_ribbon', name: 'Promo Ribbon', font: 'Poppins', color: '#FFFFFF', hi: '#FDE047', bg: '#7C3AED', radius: '8px', words: 3 },
  { id: 'ad_ecommerce', name: 'Shop Now Badge', font: 'Inter', color: '#0F172A', hi: '#2563EB', bg: '#FFFFFF', radius: '999px', words: 3 },
  { id: 'ad_guarantee', name: '100% Risk Free', font: 'Montserrat', color: '#FFFFFF', hi: '#10B981', bg: '#064E3B', words: 3 },
  { id: 'ad_deal_alert', name: 'Deal Alert Stamp', font: 'Oswald', color: '#FFFFFF', hi: '#F97316', stroke: 3, textTransform: 'uppercase', words: 2 },
  { id: 'ad_luxury_ad', name: 'Luxury Campaign', font: 'Playfair Display', color: '#FEF08A', hi: '#FFFFFF', bg: 'rgba(0,0,0,0.85)', letter: '2px', words: 3 }
];
adStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Advertisement', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, strokeWidth: s.stroke || 0, border: s.border, textTransform: s.textTransform,
  fontWeight: s.weight || '800', fontSize: s.fontSize || 38, wordsPerScreen: s.words, letterSpacing: s.letter || '0px'
})));

// 11. NEWS (10 templates)
const newsStyles = [
  { id: 'news_breaking', name: 'Breaking News Ticker', font: 'Oswald', color: '#FFFFFF', hi: '#FACC15', bg: '#DC2626', textTransform: 'uppercase', words: 4 },
  { id: 'news_lower_third', name: 'Anchor Lower Third', font: 'Inter', color: '#FFFFFF', hi: '#38BDF8', bg: 'rgba(15,23,42,0.95)', border: '3px solid #0284C7', words: 4 },
  { id: 'news_press', name: 'Press Briefing', font: 'Roboto', color: '#FFFFFF', hi: '#FDE047', bg: '#1E3A8A', words: 4 },
  { id: 'news_headline', name: 'Headline Flash', font: 'Bebas Neue', color: '#000000', hi: '#B91C1C', bg: '#F8FAFC', words: 3, fontSize: 44 },
  { id: 'news_investigative', name: 'Deep Report', font: 'Georgia', color: '#E2E8F0', hi: '#EF4444', bg: '#09090B', words: 4 },
  { id: 'news_cnn_strap', name: 'Global Strap Bar', font: 'Helvetica', color: '#FFFFFF', hi: '#FACC15', bg: '#B91C1C', words: 4 },
  { id: 'news_alert_yellow', name: 'Urgent Bulletin', font: 'Impact', color: '#000000', hi: '#DC2626', bg: '#FDE047', words: 3 },
  { id: 'news_financial', name: 'Market Wire', font: 'Space Mono', color: '#4ADE80', hi: '#FFFFFF', bg: '#022C22', words: 4 },
  { id: 'news_interview', name: 'Live Correspondent', font: 'Plus Jakarta Sans', color: '#F8FAFC', hi: '#60A5FA', bg: 'rgba(30,41,59,0.9)', words: 4 },
  { id: 'news_capitol', name: 'Chamber Stream', font: 'Cinzel', color: '#FFFFFF', hi: '#CBD5E1', bg: 'rgba(0,0,0,0.85)', words: 4 }
];
newsStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'News', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  border: s.border, textTransform: s.textTransform, wordsPerScreen: s.words, fontSize: s.fontSize || 38
})));

// 12. EDUCATIONAL (10 templates)
const eduStyles = [
  { id: 'edu_chalkboard', name: 'Chalkboard White', font: 'Caveat', color: '#FFFFFF', hi: '#FEF08A', fontSize: 42, shadow: '0 2px 8px rgba(0,0,0,0.8)', words: 3 },
  { id: 'edu_highlighter', name: 'Yellow Highlighter', font: 'Inter', color: '#0F172A', hi: '#000000', bg: '#FEF08A', radius: '4px', weight: '700', words: 3 },
  { id: 'edu_syllabus', name: 'Syllabus Note', font: 'Poppins', color: '#FFFFFF', hi: '#38BDF8', bg: 'rgba(30,58,138,0.7)', radius: '8px', words: 4 },
  { id: 'edu_fact_box', name: 'Did You Know Box', font: 'Rubik', color: '#FFFFFF', hi: '#F43F5E', bg: 'rgba(15,23,42,0.85)', border: '2px solid #F43F5E', words: 3 },
  { id: 'edu_science', name: 'Lab Formula', font: 'JetBrains Mono', color: '#6EE7B7', hi: '#A7F3D0', bg: 'rgba(6,78,59,0.8)', words: 3 },
  { id: 'edu_history', name: 'Historical Archive', font: 'Lora', color: '#FEF3C7', hi: '#D97706', fontStyle: 'italic', words: 4 },
  { id: 'edu_tutorial', name: 'Step by Step Tag', font: 'Montserrat', color: '#FFFFFF', hi: '#F59E0B', bg: '#1E293B', radius: '6px', words: 3 },
  { id: 'edu_math_matrix', name: 'Matrix Clean', font: 'Space Grotesk', color: '#A5B4FC', hi: '#FFFFFF', bg: '#1E1B4B', words: 4 },
  { id: 'edu_flashcard', name: 'Study Flashcard', font: 'Plus Jakarta Sans', color: '#1E293B', hi: '#2563EB', bg: '#FFFFFF', radius: '12px', words: 3 },
  { id: 'edu_quiz_time', name: 'Quiz Question', font: 'Bebas Neue', color: '#FEF08A', hi: '#38BDF8', stroke: 2, words: 3 }
];
eduStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Educational', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, border: s.border, fontSize: s.fontSize || 38, fontStyle: s.fontStyle,
  strokeWidth: s.stroke || 0, wordsPerScreen: s.words
})));

// 13. REAL ESTATE (10 templates)
const reStyles = [
  { id: 're_modern_villa', name: 'Architectural Sans', font: 'Montserrat', color: '#FFFFFF', hi: '#CBD5E1', letter: '3px', textTransform: 'uppercase', words: 3 },
  { id: 're_luxury_estate', name: 'Beverly Hills Gold', font: 'Playfair Display', color: '#FEF08A', hi: '#F59E0B', bg: 'rgba(0,0,0,0.8)', words: 3 },
  { id: 're_tour_tag', name: 'Property Tour Badge', font: 'Inter', color: '#0F172A', hi: '#0284C7', bg: '#FFFFFF', radius: '999px', words: 3 },
  { id: 're_floorplan', name: 'Floorplan Slate', font: 'Space Grotesk', color: '#E2E8F0', hi: '#38BDF8', bg: 'rgba(15,23,42,0.85)', words: 4 },
  { id: 're_penthouse', name: 'Sky Penthouse', font: 'Cinzel', color: '#FFFFFF', hi: '#FACC15', letter: '2px', words: 3 },
  { id: 're_open_house', name: 'Open House Ribbon', font: 'Oswald', color: '#FFFFFF', hi: '#FEF08A', bg: '#065F46', words: 3 },
  { id: 're_minimal_loft', name: 'Industrial Loft', font: 'Roboto Condensed', color: '#E5E7EB', hi: '#9CA3AF', words: 4 },
  { id: 're_amenities', name: 'Amenities Highlight', font: 'Poppins', color: '#FFFFFF', hi: '#60A5FA', bg: 'rgba(30,58,138,0.7)', radius: '8px', words: 3 },
  { id: 're_suburban', name: 'Neighborhood Guide', font: 'Outfit', color: '#FFFFFF', hi: '#22C55E', words: 4 },
  { id: 're_realtor_signature', name: 'Broker Signature', font: 'Bodoni MT', color: '#FFFFFF', hi: '#D4AF37', words: 3 }
];
reStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Real Estate', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, letterSpacing: s.letter, textTransform: s.textTransform, wordsPerScreen: s.words
})));

// 14. FOOD (10 templates)
const foodStyles = [
  { id: 'food_spicy', name: 'Spicy Chili Red', font: 'Impact', color: '#FFFFFF', hi: '#FEF08A', bg: '#DC2626', radius: '6px', words: 2 },
  { id: 'food_gourmet', name: 'Michelin Star Script', font: 'Playfair Display', color: '#FEF08A', hi: '#FFFFFF', fontStyle: 'italic', words: 3 },
  { id: 'food_fresh', name: 'Farm Fresh Green', font: 'Poppins', color: '#ECFDF5', hi: '#34D399', bg: 'rgba(6,78,59,0.8)', radius: '999px', words: 3 },
  { id: 'food_street', name: 'Street Food Bang', font: 'Bebas Neue', color: '#FFFFFF', hi: '#F97316', stroke: 3, textTransform: 'uppercase', words: 2 },
  { id: 'food_sweet', name: 'Pastry Pastel', font: 'Quicksand', color: '#831843', hi: '#DB2777', bg: '#FCE7F3', radius: '12px', words: 3 },
  { id: 'food_bbq', name: 'Smoked BBQ Grill', font: 'Anton', color: '#F97316', hi: '#FEF08A', stroke: 2, words: 2 },
  { id: 'food_recipe', name: 'Recipe Ingredient Card', font: 'Inter', color: '#0F172A', hi: '#16A34A', bg: '#FFFFFF', radius: '8px', words: 3 },
  { id: 'food_artisan', name: 'Artisan Bakery', font: 'Lora', color: '#FEF3C7', hi: '#B45309', words: 3 },
  { id: 'food_coffee', name: 'Espresso Roast', font: 'Montserrat', color: '#FDE68A', hi: '#D97706', bg: '#451A03', radius: '6px', words: 3 },
  { id: 'food_sushi', name: 'Omakase Minimal', font: 'Cinzel', color: '#FFFFFF', hi: '#EF4444', letter: '2px', words: 3 }
];
foodStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Food', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, strokeWidth: s.stroke || 0, fontStyle: s.fontStyle, wordsPerScreen: s.words, letterSpacing: s.letter
})));

// 15. TRAVEL (10 templates)
const travelStyles = [
  { id: 'trv_wanderlust', name: 'Wanderlust Stamp', font: 'Montserrat', color: '#FFFFFF', hi: '#38BDF8', letter: '2px', textTransform: 'uppercase', words: 3 },
  { id: 'trv_sunset', name: 'Golden Hour Sunset', font: 'Playfair Display', color: '#FEF08A', hi: '#F97316', shadow: '0 4px 16px rgba(249,115,22,0.6)', words: 3 },
  { id: 'trv_passport', name: 'Passport Stamp', font: 'Courier New', color: '#1E293B', hi: '#DC2626', bg: '#FEF3C7', border: '2px dashed #92400E', words: 3 },
  { id: 'trv_alpine', name: 'Alpine Summit', font: 'Cinzel', color: '#F0F9FF', hi: '#0284C7', words: 3 },
  { id: 'trv_tropical', name: 'Tropical Paradise', font: 'Rubik', color: '#A7F3D0', hi: '#FDE047', stroke: 2, words: 2 },
  { id: 'trv_backpacker', name: 'Trail Marker', font: 'Inter', color: '#FFFFFF', hi: '#EAB308', bg: 'rgba(20,83,45,0.85)', radius: '6px', words: 3 },
  { id: 'trv_citybreak', name: 'Metropolis Glow', font: 'Space Grotesk', color: '#FFFFFF', hi: '#A855F7', shadow: '0 0 16px #A855F7', words: 3 },
  { id: 'trv_ocean', name: 'Deep Azure Ocean', font: 'Poppins', color: '#E0F2FE', hi: '#38BDF8', bg: 'rgba(12,74,110,0.8)', radius: '999px', words: 3 },
  { id: 'trv_safari', name: 'Savannah Bronze', font: 'Oswald', color: '#FED7AA', hi: '#C2410C', stroke: 2, words: 3 },
  { id: 'trv_boarding', name: 'Flight Gate Callout', font: 'Roboto Mono', color: '#FACC15', hi: '#000000', bg: '#1E293B', words: 3 }
];
travelStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Travel', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  borderRadius: s.radius, strokeWidth: s.stroke || 0, border: s.border, letterSpacing: s.letter,
  textTransform: s.textTransform, wordsPerScreen: s.words
})));

// 16. GAMING (10 templates)
const gameStyles = [
  { id: 'game_cyberpunk', name: 'Cyberpunk 2077 Glitch', font: 'Orbitron', color: '#00F0FF', hi: '#FFE600', stroke: 1, textTransform: 'uppercase', words: 2 },
  { id: 'game_8bit', name: '8-Bit Retro Arcade', font: 'Press Start 2P', color: '#4ADE80', hi: '#FDE047', bg: '#000000', words: 2, fontSize: 30 },
  { id: 'game_esports', name: 'Esports Championship', font: 'Anton', color: '#FFFFFF', hi: '#EF4444', stroke: 3, textTransform: 'uppercase', words: 2 },
  { id: 'game_level_up', name: 'Level Up Gold', font: 'Montserrat', color: '#FEF08A', hi: '#F59E0B', shadow: '0 0 20px #F59E0B', words: 2 },
  { id: 'game_neon_hud', name: 'Sci-Fi HUD Holo', font: 'Share Tech Mono', color: '#38BDF8', hi: '#F43F5E', bg: 'rgba(2,132,199,0.2)', border: '1px solid #38BDF8', words: 3 },
  { id: 'game_frag', name: 'Killfeed Red', font: 'Impact', color: '#FFFFFF', hi: '#DC2626', bg: 'rgba(0,0,0,0.85)', words: 2 },
  { id: 'game_rpg', name: 'Quest Legend', font: 'Cinzel', color: '#FDE68A', hi: '#F59E0B', words: 3 },
  { id: 'game_streamer_neon', name: 'Twitch Glow Pink', font: 'Rubik', color: '#FFFFFF', hi: '#EC4899', shadow: '0 0 16px #EC4899', words: 2 },
  { id: 'game_overdrive', name: 'Speedrun Overdrive', font: 'Bebas Neue', color: '#FACC15', hi: '#38BDF8', stroke: 2, words: 2 },
  { id: 'game_respawn', name: 'Respawn Matrix', font: 'VT323', color: '#22C55E', hi: '#86EFAC', fontSize: 46, words: 3 }
];
gameStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Gaming', {
  fontFamily: s.font + ', monospace', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  border: s.border, strokeWidth: s.stroke || 0, fontSize: s.fontSize || 38, textTransform: s.textTransform, wordsPerScreen: s.words
})));

// 17. MOTIVATIONAL (10 templates)
const motiveStyles = [
  { id: 'mot_iron', name: 'Iron Will Gym', font: 'Anton', color: '#FFFFFF', hi: '#EF4444', stroke: 3, textTransform: 'uppercase', words: 2 },
  { id: 'mot_champion', name: 'Champion Gold Trophy', font: 'Montserrat', color: '#FEF08A', hi: '#F59E0B', weight: '900', words: 2 },
  { id: 'mot_relentless', name: 'Relentless Grind', font: 'Bebas Neue', color: '#FFFFFF', hi: '#FDE047', stroke: 2, fontSize: 46, words: 2 },
  { id: 'mot_deep_focus', name: 'Deep Focus White', font: 'Inter', color: '#F8FAFC', hi: '#38BDF8', bg: 'rgba(15,23,42,0.9)', radius: '999px', words: 3 },
  { id: 'mot_rise', name: 'Rise Above Ashes', font: 'Impact', color: '#F97316', hi: '#FDE047', stroke: 2, words: 2 },
  { id: 'mot_stoic', name: 'Stoic Marcus Aurelius', font: 'Cinzel', color: '#E2E8F0', hi: '#94A3B8', letter: '3px', words: 3 },
  { id: 'mot_beast_mode', name: 'Beast Mode Savage', font: 'Rubik', color: '#FFFFFF', hi: '#22C55E', stroke: 3, textTransform: 'uppercase', words: 2 },
  { id: 'mot_legacy', name: 'Build A Legacy', font: 'Playfair Display', color: '#FEF3C7', hi: '#D97706', words: 3 },
  { id: 'mot_limitless', name: 'No Excuses Red', font: 'Oswald', color: '#FFFFFF', hi: '#DC2626', bg: '#000000', words: 2 },
  { id: 'mot_discipline', name: 'Discipline Equals Freedom', font: 'Space Grotesk', color: '#FFFFFF', hi: '#3B82F6', words: 3 }
];
motiveStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Motivational', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, strokeWidth: s.stroke || 0,
  backgroundColor: s.bg, borderRadius: s.radius, letterSpacing: s.letter, textTransform: s.textTransform, wordsPerScreen: s.words
})));

// 18. MUSIC (10 templates)
const musicStyles = [
  { id: 'mus_karaoke_glow', name: 'Karaoke Beat Glow', font: 'Poppins', color: '#FFFFFF', hi: '#EC4899', animation: 'karaoke', words: 3 },
  { id: 'mus_vinyl', name: 'Retro Vinyl Groove', font: 'Playfair Display', color: '#FEF08A', hi: '#F59E0B', fontStyle: 'italic', words: 4 },
  { id: 'mus_bass_drop', name: 'Bass Drop Shake', font: 'Impact', color: '#22D3EE', hi: '#F43F5E', stroke: 2, words: 2 },
  { id: 'mus_lofi', name: 'Lofi Chill Tape', font: 'Space Mono', color: '#FED7AA', hi: '#F472B6', bg: 'rgba(40,20,30,0.7)', words: 4 },
  { id: 'mus_synthwave', name: 'Synthwave Sunset', font: 'Orbitron', color: '#F43F5E', hi: '#38BDF8', shadow: '0 0 16px #F43F5E', words: 2 },
  { id: 'mus_acoustic', name: 'Acoustic Guitar Warm', font: 'Lora', color: '#FEF3C7', hi: '#B45309', words: 4 },
  { id: 'mus_hiphop', name: 'Street Hip Hop Stamp', font: 'Anton', color: '#FFFFFF', hi: '#FACC15', stroke: 3, textTransform: 'uppercase', words: 2 },
  { id: 'mus_edm', name: 'Festival Laser Pop', font: 'Montserrat', color: '#A7F3D0', hi: '#00FFCC', shadow: '0 0 20px #00FFCC', words: 2 },
  { id: 'mus_lyric_sheet', name: 'Handwritten Lyrics', font: 'Caveat', color: '#FFFFFF', hi: '#FDE047', fontSize: 44, words: 3 },
  { id: 'mus_disco', name: 'Studio 54 Disco', font: 'Bebas Neue', color: '#F43F5E', hi: '#FEF08A', words: 3 }
];
musicStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Music', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, animation: s.animation || 'word-pop',
  strokeWidth: s.stroke || 0, backgroundColor: s.bg, fontStyle: s.fontStyle, wordsPerScreen: s.words
})));

// 19. STORYTELLING (10 templates)
const storyStyles = [
  { id: 'sty_novel', name: 'Novel Paperback', font: 'Merriweather', color: '#FFFFFF', hi: '#FDE047', words: 4 },
  { id: 'sty_once_upon', name: 'Once Upon A Time', font: 'Cinzel Decorative', color: '#FEF08A', hi: '#F59E0B', words: 3 },
  { id: 'sty_chapter', name: 'Chapter Title Card', font: 'Cinzel', color: '#FFFFFF', hi: '#94A3B8', letter: '3px', bg: 'rgba(0,0,0,0.85)', words: 3 },
  { id: 'sty_memoir', name: 'Memoir Warm Sepia', font: 'Lora', color: '#FEF3C7', hi: '#D97706', fontStyle: 'italic', words: 4 },
  { id: 'sty_mystery', name: 'Dark Mystery Whisper', font: 'Playfair Display', color: '#94A3B8', hi: '#EF4444', words: 4 },
  { id: 'sty_diary', name: 'Secret Diary Entry', font: 'Caveat', color: '#F1F5F9', hi: '#38BDF8', fontSize: 42, words: 3 },
  { id: 'sty_parable', name: 'Ancient Parable', font: 'Cormorant Garamond', color: '#FDE68A', hi: '#F59E0B', words: 4 },
  { id: 'sty_thriller', name: 'True Crime Dossier', font: 'Special Elite', color: '#FFFFFF', hi: '#DC2626', bg: '#000000', words: 3 },
  { id: 'sty_biography', name: 'Biography Standard', font: 'Georgia', color: '#F8FAFC', hi: '#60A5FA', words: 4 },
  { id: 'sty_fable', name: 'Enchanted Woods', font: 'Outfit', color: '#A7F3D0', hi: '#34D399', words: 3 }
];
storyStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Storytelling', {
  fontFamily: s.font + ', serif', textColor: s.color, highlightColor: s.hi, backgroundColor: s.bg,
  fontStyle: s.fontStyle, letterSpacing: s.letter, wordsPerScreen: s.words
})));

// 20. MODERN & CLEAN (10 templates)
const modernCleanStyles = [
  { id: 'mod_glass', name: 'Frosted Glassmorphism', font: 'Inter', color: '#FFFFFF', hi: '#38BDF8', bg: 'rgba(255,255,255,0.15)', boxBlur: 12, radius: '16px', words: 3 },
  { id: 'mod_ios', name: 'Cupertino Pill', font: '-apple-system', color: '#FFFFFF', hi: '#007AFF', bg: 'rgba(0,0,0,0.7)', radius: '999px', words: 3 },
  { id: 'mod_gradient_flow', name: 'Gradient Sunset Flow', font: 'Outfit', color: '#FFFFFF', hi: '#F43F5E', secondary: '#F59E0B', words: 3 },
  { id: 'mod_pure_white', name: 'Pure White Clean', font: 'Plus Jakarta Sans', color: '#FFFFFF', hi: '#CBD5E1', shadow: '0 4px 12px rgba(0,0,0,0.7)', words: 4 },
  { id: 'mod_slate_card', name: 'Slate Soft Card', font: 'Inter', color: '#F8FAFC', hi: '#60A5FA', bg: 'rgba(30,41,59,0.85)', radius: '12px', words: 4 },
  { id: 'mod_neon_mint', name: 'Neon Mint Accent', font: 'Space Grotesk', color: '#FFFFFF', hi: '#10B981', words: 3 },
  { id: 'mod_rounded_bubble', name: 'Rounded Speech Bubble', font: 'Poppins', color: '#0F172A', hi: '#2563EB', bg: '#FFFFFF', radius: '20px', words: 3 },
  { id: 'mod_swiss', name: 'Swiss Typography Grid', font: 'Helvetica Neue', color: '#FFFFFF', hi: '#EF4444', letter: '1px', textTransform: 'uppercase', words: 3 },
  { id: 'mod_aurora', name: 'Aurora Borealis Glow', font: 'Montserrat', color: '#E0F2FE', hi: '#22D3EE', shadow: '0 0 18px rgba(34,211,238,0.7)', words: 3 },
  { id: 'mod_minimalist_pill', name: 'Dark Capsule', font: 'DM Sans', color: '#FFFFFF', hi: '#FDE047', bg: 'rgba(15,23,42,0.9)', radius: '999px', border: '1px solid rgba(255,255,255,0.1)', words: 3 }
];
modernCleanStyles.forEach(s => templates.push(createTemplate(s.id, s.name, 'Modern & Clean', {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, secondaryColor: s.secondary,
  backgroundColor: s.bg, borderRadius: s.radius, boxBlur: s.boxBlur, border: s.border, wordsPerScreen: s.words
})));

// Now, expand each category with additional creative variations to ensure we have over 200 distinct templates!
// (20 categories * 10 = 200 templates already created above. Let's add 15 more high-impact specialty templates)
const specialtyStyles = [
  { id: 'spec_hormozi_glow', name: 'Alex Hormozi 2.0 SuperGlow', cat: 'Viral', font: 'Montserrat', color: '#FFFFFF', hi: '#22C55E', stroke: 4, weight: '900', textTransform: 'uppercase', shadow: '0 0 20px rgba(34,197,94,0.8)', words: 1 },
  { id: 'spec_beast_flame', name: 'MrBeast Viral Explosion', cat: 'Creator', font: 'Impact', color: '#FFFFFF', hi: '#FFDD00', stroke: 3, shadow: '0 6px 0 #DC2626', words: 2 },
  { id: 'spec_gadzhi_dark', name: 'Monk Mode Aesthetic', cat: 'Luxury', font: 'Cinzel', color: '#FFFFFF', hi: '#CA8A04', letter: '3px', textTransform: 'uppercase', words: 3 },
  { id: 'spec_podcast_dual', name: 'Lex Fridman Subtitle Dual', cat: 'Podcast', font: 'Inter', color: '#94A3B8', hi: '#FFFFFF', bg: 'rgba(0,0,0,0.85)', radius: '8px', words: 4 },
  { id: 'spec_cinema_golden', name: 'Hollywood Gold Standard', cat: 'Cinematic', font: 'Playfair Display', color: '#FEF08A', hi: '#EAB308', letter: '2px', words: 3 },
  { id: 'spec_tech_tok', name: 'DevTok Neon Code', cat: 'Gaming', font: 'JetBrains Mono', color: '#6EE7B7', hi: '#38BDF8', bg: '#022C22', words: 3 },
  { id: 'spec_flash_red', name: 'Urgent Red Alert CTA', cat: 'Advertisement', font: 'Rubik', color: '#FFFFFF', hi: '#FEF08A', bg: '#DC2626', textTransform: 'uppercase', words: 2 },
  { id: 'spec_clean_pill', name: 'Minimal White Pill', cat: 'Minimal', font: 'Inter', color: '#0F172A', hi: '#2563EB', bg: '#FFFFFF', radius: '999px', words: 3 },
  { id: 'spec_bold_punch', name: 'Heavy Black & Gold', cat: 'Bold', font: 'Anton', color: '#FACC15', hi: '#FFFFFF', stroke: 3, strokeColor: '#000000', words: 2 },
  { id: 'spec_edu_marker', name: 'Whiteboard Marker', cat: 'Educational', font: 'Caveat', color: '#1E293B', hi: '#2563EB', bg: '#FEF9C3', radius: '8px', words: 3 },
  { id: 'spec_re_lux_bar', name: 'Penthouse View Bar', cat: 'Real Estate', font: 'Montserrat', color: '#FFFFFF', hi: '#94A3B8', letter: '3px', bg: 'rgba(0,0,0,0.7)', words: 3 },
  { id: 'spec_food_yum', name: 'Street Food Yummy', cat: 'Food', font: 'Rubik', color: '#FFFFFF', hi: '#EA580C', bg: '#FEF08A', radius: '8px', words: 2 },
  { id: 'spec_trv_drift', name: 'Backpacker Compass', cat: 'Travel', font: 'Space Grotesk', color: '#FFFFFF', hi: '#38BDF8', bg: 'rgba(15,23,42,0.8)', words: 3 },
  { id: 'spec_motive_grind', name: '5 AM Club Grind', cat: 'Motivational', font: 'Impact', color: '#FFFFFF', hi: '#EF4444', stroke: 2, words: 2 },
  { id: 'spec_mod_glass_pill', name: 'Aero Glass Glow', cat: 'Modern & Clean', font: 'Outfit', color: '#FFFFFF', hi: '#A855F7', bg: 'rgba(255,255,255,0.1)', boxBlur: 16, radius: '999px', words: 3 }
];
specialtyStyles.forEach(s => templates.push(createTemplate(s.id, s.name, s.cat, {
  fontFamily: s.font + ', sans-serif', textColor: s.color, highlightColor: s.hi, strokeWidth: s.stroke || 0,
  strokeColor: s.strokeColor || '#000000', backgroundColor: s.bg, borderRadius: s.radius, letterSpacing: s.letter,
  textTransform: s.textTransform, wordsPerScreen: s.words, shadow: s.shadow, boxBlur: s.boxBlur
})));

console.log(`Initialized ClipForge AI Caption Templates Catalog: ${templates.length} templates across ${categories.length} categories.`);

module.exports = {
  categories,
  templates,
  getTemplateById: (id) => templates.find(t => t.id === id) || templates[0],
  getTemplatesByCategory: (cat) => templates.filter(t => t.category.toLowerCase() === cat.toLowerCase()),
  getRecommendedTemplate: (genre) => {
    const genreMap = {
      'social': 'viral_hormozi',
      'reel': 'viral_yellow',
      'podcast': 'pod_lex',
      'cinematic': 'cine_silver',
      'advertisement': 'ad_sale_flash',
      'product': 'mod_glass',
      'luxury': 'lux_gold',
      'educational': 'edu_highlighter',
      'gaming': 'game_cyberpunk',
      'motivational': 'mot_iron',
      'storytelling': 'sty_novel',
      'food': 'food_spicy',
      'travel': 'trv_sunset',
      'real estate': 're_modern_villa'
    };
    const key = (genre || '').toLowerCase();
    const match = Object.keys(genreMap).find(k => key.includes(k));
    const targetId = match ? genreMap[match] : 'viral_hormozi';
    return templates.find(t => t.id === targetId) || templates[0];
  }
};
