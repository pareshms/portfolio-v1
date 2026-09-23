const sharp = require('sharp');
const path = require('path');

async function createOgImage() {
  const width = 1200;
  const height = 630;
  
  // Load and resize portrait
  const portraitBuffer = await sharp(path.join(__dirname, '../public/assets/paresh.jpeg'))
    .resize(320, 320, { fit: 'cover' })
    .composite([{
      input: Buffer.from('<svg><circle cx="160" cy="160" r="160" fill="white"/></svg>'),
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();

  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow1" cx="20%" cy="30%" r="60%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="80%" cy="70%" r="50%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="titleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#93c5fd"/>
        </linearGradient>
        <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>

      <!-- Background glow -->
      <rect width="${width}" height="${height}" fill="url(#glow1)"/>
      <rect width="${width}" height="${height}" fill="url(#glow2)"/>

      <!-- Border outline -->
      <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>

      <!-- Top Mini Tag -->
      <g transform="translate(540, 140)">
        <rect x="0" y="0" width="280" height="36" rx="18" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.4)" stroke-width="1"/>
        <circle cx="22" cy="18" r="5" fill="#34d399"/>
        <text x="38" y="23" font-family="'Segoe UI', Inter, sans-serif" font-size="13" font-weight="700" fill="#93c5fd" letter-spacing="2">OFFICIAL PORTFOLIO</text>
      </g>

      <!-- Main Name -->
      <text x="540" y="235" font-family="'Segoe UI', Inter, sans-serif" font-size="64" font-weight="900" fill="url(#titleGrad)" letter-spacing="1">PARESH M S</text>

      <!-- Subtitle Role -->
      <text x="540" y="290" font-family="'Segoe UI', Inter, sans-serif" font-size="24" font-weight="700" fill="#60a5fa" letter-spacing="3">AI &amp; ML BUILDER · FULL-STACK</text>

      <!-- Description line -->
      <text x="540" y="345" font-family="'Segoe UI', Inter, sans-serif" font-size="18" font-weight="400" fill="rgba(255,255,255,0.7)">CSE (AI &amp; ML) · Sapthagiri NPS University</text>
      <text x="540" y="375" font-family="'Segoe UI', Inter, sans-serif" font-size="17" font-weight="400" fill="rgba(255,255,255,0.5)">Building intelligent systems, AI products &amp; practical engineering.</text>

      <!-- Tech Pills -->
      <g transform="translate(540, 420)">
        <rect x="0" y="0" width="100" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)"/>
        <text x="50" y="22" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="13" font-weight="600" fill="#ffffff">AI &amp; ML</text>

        <rect x="112" y="0" width="95" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)"/>
        <text x="159" y="22" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="13" font-weight="600" fill="#ffffff">Python</text>

        <rect x="219" y="0" width="125" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)"/>
        <text x="281" y="22" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="13" font-weight="600" fill="#ffffff">Full-Stack</text>

        <rect x="356" y="0" width="90" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)"/>
        <text x="401" y="22" text-anchor="middle" font-family="'Segoe UI', Inter, sans-serif" font-size="13" font-weight="600" fill="#ffffff">React</text>
      </g>

      <!-- Bottom Domain and Location -->
      <g transform="translate(540, 500)">
        <text x="0" y="20" font-family="'Segoe UI', Inter, sans-serif" font-size="16" font-weight="600" fill="#38bdf8">🔗 pareshms.vercel.app</text>
        <text x="240" y="20" font-family="'Segoe UI', Inter, sans-serif" font-size="16" font-weight="400" fill="rgba(255,255,255,0.45)">📍 Bengaluru, Karnataka, India</text>
      </g>

      <!-- Photo Frame -->
      <circle cx="270" cy="315" r="168" fill="none" stroke="url(#badgeGrad)" stroke-width="4"/>
      <circle cx="270" cy="315" r="176" fill="none" stroke="rgba(59,130,246,0.25)" stroke-width="1" stroke-dasharray="6 6"/>
    </svg>
  `);

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 5, g: 8, b: 18, alpha: 1 }
    }
  })
  .composite([
    { input: portraitBuffer, top: 155, left: 110 },
    { input: svgOverlay, top: 0, left: 0 }
  ])
  .png()
  .toFile(path.join(__dirname, '../public/og-image.png'));

  console.log('og-image.png created successfully in public/og-image.png');
}

createOgImage().catch(console.error);
