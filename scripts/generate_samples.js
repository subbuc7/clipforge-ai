const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const samplesDir = path.join(__dirname, '../public/assets');
if (!fs.existsSync(samplesDir)) {
  fs.mkdirSync(samplesDir, { recursive: true });
}

console.log('Generating realistic sample footage...');

// Sample 1: Raw Talking Head / Podcast Footage with pauses and repetitive takes
const podcastAudio = path.join(samplesDir, 'podcast_raw.wav');
const podcastVideo = path.join(samplesDir, 'podcast_sample.mp4');

const podcastSpeech = 
  "Hello everyone. Uh, let me start again. " +
  "Welcome back to the show. Today, we are breaking down the biggest secret to building viral video content in 2026. " +
  "Um, you know, most people think you need expensive gear. But honestly? That is completely wrong. " +
  "The real hook happens in the first three seconds. If you grab attention immediately, your retention skyrockets. " +
  "So stop overthinking your setup, start editing with intention, and follow for more insights.";

try {
  execSync(`espeak -v en-us -s 150 -w "${podcastAudio}" "${podcastSpeech}"`, { stdio: 'inherit' });
  
  // Create video track with color bars/gradients and timer, mux with speech audio
  const cmd = `ffmpeg -y -f lavfi -i testsrc=duration=22:size=1920x1080:rate=30 \
    -i "${podcastAudio}" \
    -vf "drawtext=text='RAW PODCAST FOOTAGE (4K SOURCE)':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=100:box=1:boxcolor=black@0.6,drawtext=text='TIME\\: %{pts\\:hms}':fontcolor=yellow:fontsize=36:x=(w-text_w)/2:y=180" \
    -c:v libx264 -preset ultrafast -pix_fmt yuv420p \
    -c:a aac -b:a 128k -shortest "${podcastVideo}"`;
    
  execSync(cmd, { stdio: 'inherit' });
  console.log('Generated podcast_sample.mp4 successfully');
} catch (err) {
  console.error('Error creating podcast sample:', err.message);
}

// Sample 2: Raw Product Showcase
const productAudio = path.join(samplesDir, 'product_raw.wav');
const productVideo = path.join(samplesDir, 'product_sample.mp4');

const productSpeech = 
  "This is ClipForge AI. The future of autonomous video creation. " +
  "Upload your raw footage. Detect scenes, silence, and viral hooks automatically. " +
  "Apply over two hundred professional caption styles. " +
  "Translate to eleven languages, and export ready to post vertical reels in seconds.";

try {
  execSync(`espeak -v en-us -s 155 -w "${productAudio}" "${productSpeech}"`, { stdio: 'inherit' });
  
  const cmd = `ffmpeg -y -f lavfi -i smptebars=duration=16:size=1920x1080:rate=30 \
    -i "${productAudio}" \
    -vf "drawtext=text='PRODUCT KEYNOTE - CLIPFORGE AI':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=120:box=1:boxcolor=black@0.7,drawtext=text='4K CINEMATIC RAW CAPTURE':fontcolor=cyan:fontsize=32:x=(w-text_w)/2:y=190" \
    -c:v libx264 -preset ultrafast -pix_fmt yuv420p \
    -c:a aac -b:a 128k -shortest "${productVideo}"`;
    
  execSync(cmd, { stdio: 'inherit' });
  console.log('Generated product_sample.mp4 successfully');
} catch (err) {
  console.error('Error creating product sample:', err.message);
}
