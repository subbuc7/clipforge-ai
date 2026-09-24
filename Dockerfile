# ClipForge AI - Production Docker Image
FROM node:20-bookworm-slim

# Install system dependencies: FFmpeg and eSpeak for speech synthesis
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    espeak \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Create required upload and render directories
RUN mkdir -p uploads renders public/assets/audio_extracted public/assets/generated_audio public/assets/thumbnails public/assets/thumbs

# Expose server port
EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "server.js"]
