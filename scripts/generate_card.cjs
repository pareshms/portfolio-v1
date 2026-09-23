const sharp = require('sharp');
const fs = require('fs');

async function buildCard() {
  const W = 2048, H = 2048;

  // 1. Prepare circular avatar (diameter 500)
  const avatarSize = 500;
  const avatarCrop = await sharp('public/assets/paresh.jpeg')
    .extract({ left: 11, top: 120, width: 1100, height: 1100 })
    .resize(avatarSize, avatarSize)
    .toBuffer();

  const circleMask = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}"><circle cx="${avatarSize/2}" cy="${avatarSize/2}" r="${avatarSize/2}" fill="white"/></svg>`
  );

  const circularAvatar = await sharp(avatarCrop)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Prepare metallic logo (diameter 660)
  const logoSize = 660;
  const logoCrop = await sharp('public/assets/logo.jpg')
    .extract({ left: 188, top: 6, width: 640, height: 640 })
    .resize(logoSize, logoSize)
    .toBuffer();

  const logoMask = Buffer.from(
    `<svg width="${logoSize}" height="${logoSize}"><circle cx="${logoSize/2}" cy="${logoSize/2}" r="${logoSize/2}" fill="white"/></svg>`
  );

  const circularLogo = await sharp(logoCrop)
    .composite([{ input: logoMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3. Prepare signature (scaled to width 720, height ~235)
  const sigW = 720;
  const sigH = Math.round(720 * (168 / 515));
  const resizedSig = await sharp('public/assets/signature_clean.png')
    .resize(sigW, sigH)
    .png()
    .toBuffer();

  // 4. Background and vector overlays via SVG
  // Front UV is U: 0..0.499 (0..1022px, center 512), V: 0..0.755 (0..1546px, center 777)
  // Back UV is U: 0.501..1.0 (1026..2048px, center 1536), V: 0..0.757 (0..1550px, center 777)
  const svgOverlay = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="frontBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="60%" stop-color="#f8fafc"/>
        <stop offset="100%" stop-color="#f1f5f9"/>
      </linearGradient>
      <linearGradient id="backBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#080b12"/>
        <stop offset="40%" stop-color="#0b1120"/>
        <stop offset="100%" stop-color="#05070a"/>
      </linearGradient>
      <linearGradient id="metalRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#60a5fa"/>
        <stop offset="25%" stop-color="#cbd5e1"/>
        <stop offset="50%" stop-color="#3b82f6"/>
        <stop offset="75%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#2563eb"/>
      </linearGradient>
      <linearGradient id="logoRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8"/>
        <stop offset="50%" stop-color="#1d4ed8"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
    </defs>
    
    <!-- FRONT BACKGROUND (X: 0..1024, Y: 0..1550) -->
    <rect x="0" y="0" width="1024" height="1550" fill="url(#frontBg)"/>
    
    <!-- Front Subtle Decorative Frame -->
    <rect x="40" y="35" width="944" height="1470" rx="44" fill="none" stroke="#cbd5e1" stroke-width="3"/>
    <rect x="55" y="50" width="914" height="1440" rx="34" fill="none" stroke="#2563eb" stroke-opacity="0.25" stroke-width="2"/>
    
    <!-- Avatar Outer Rings: Center (512, 450), radius 250 + rim -->
    <circle cx="512" cy="450" r="256" fill="none" stroke="url(#metalRim)" stroke-width="8"/>
    <circle cx="512" cy="450" r="264" fill="none" stroke="#38bdf8" stroke-opacity="0.4" stroke-width="2.5"/>
    
    <!-- Front Text Elements: Title -->
    <text x="512" y="1030" text-anchor="middle" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="42" font-weight="900" letter-spacing="12" fill="#090d16">AI &amp; ML BUILDER</text>
    
    <!-- Front Motto Divider -->
    <line x1="150" y1="1100" x2="290" y2="1100" stroke="#94a3b8" stroke-width="2.5"/>
    <text x="512" y="1108" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="8" fill="#1e293b">BUILD  ·  LEARN  ·  INNOVATE</text>
    <line x1="734" y1="1100" x2="874" y2="1100" stroke="#94a3b8" stroke-width="2.5"/>
    
    <!-- Institution / Badge -->
    <text x="512" y="1190" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="23" font-weight="800" letter-spacing="5.5" fill="#0f172a">SAPTHAGIRI NPS UNIVERSITY</text>
    <text x="512" y="1225" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="19" font-weight="600" letter-spacing="4" fill="#334155">BENGALURU, KARNATAKA</text>
    
    <!-- Bottom Verified Pill -->
    <rect x="280" y="1308" width="464" height="62" rx="31" fill="#f8fafc" stroke="#94a3b8" stroke-width="2.5"/>
    <circle cx="324" cy="1339" r="9" fill="#10b981"/>
    <text x="526" y="1347" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="20" font-weight="800" letter-spacing="4.5" fill="#0f172a">OFFICIAL IDENTIFICATION</text>
    
    
    <!-- BACK BACKGROUND (X: 1024..2048, Y: 0..1550) -->
    <rect x="1024" y="0" width="1024" height="1550" fill="url(#backBg)"/>
    
    <!-- Back Outer Frame -->
    <rect x="1064" y="35" width="944" height="1470" rx="44" fill="none" stroke="#1e293b" stroke-width="2.5"/>
    <rect x="1079" y="50" width="914" height="1440" rx="34" fill="none" stroke="#38bdf8" stroke-opacity="0.25" stroke-width="2"/>
    
    <!-- Logo Glow / Ring: Center (1536, 520) -->
    <circle cx="1536" cy="520" r="338" fill="none" stroke="url(#logoRim)" stroke-width="7"/>
    <circle cx="1536" cy="520" r="350" fill="none" stroke="#38bdf8" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="14 7"/>
    
    <!-- Back Text -->
    <text x="1536" y="960" text-anchor="middle" font-family="'Montserrat', 'Arial Black', sans-serif" font-size="58" font-weight="900" letter-spacing="10" fill="#ffffff">PARESH M S</text>
    <text x="1536" y="1035" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="8" fill="#60a5fa">AI &amp; ML BUILDER</text>
    
    <!-- Back Tagline -->
    <line x1="1230" y1="1105" x2="1350" y2="1105" stroke="#475569" stroke-width="2"/>
    <text x="1536" y="1113" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="6" fill="#cbd5e1">TURNING IDEAS INTO SYSTEMS</text>
    <line x1="1722" y1="1105" x2="1842" y2="1105" stroke="#475569" stroke-width="2"/>
    
    <!-- Back Card Bottom Badge -->
    <rect x="1310" y="1310" width="452" height="60" rx="30" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
    <circle cx="1350" cy="1340" r="8" fill="#38bdf8"/>
    <text x="1546" y="1347" text-anchor="middle" font-family="'Inter', Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="4" fill="#93c5fd">PORTFOLIO · 2026 EDITION</text>
  </svg>
  `;

  // 5. Composite everything onto a 2048x2048 canvas
  await sharp({
    create: {
      width: W,
      height: H,
      channels: 3,
      background: { r: 10, g: 14, b: 24 }
    }
  })
  .composite([
    { input: Buffer.from(svgOverlay), top: 0, left: 0 },
    // Front Avatar: center X = 512, Y = 450 -> left = 512 - 250 = 262, top = 450 - 250 = 200
    { input: circularAvatar, top: 200, left: 262 },
    // Front Signature: center X = 512, Y = 840 -> left = 512 - (720/2) = 152, top = 735
    { input: resizedSig, top: 735, left: 152 },
    // Back Logo: center X = 1536, Y = 520 -> left = 1536 - 330 = 1206, top = 520 - 330 = 190
    { input: circularLogo, top: 190, left: 1206 }
  ])
  .png()
  .toFile('public/assets/id_card.png');

  // Also write to id_card.jpg at 98% quality
  await sharp('public/assets/id_card.png')
    .jpeg({ quality: 98, chromaSubsampling: '4:4:4' })
    .toFile('public/assets/id_card.jpg');

  console.log('Successfully generated public/assets/id_card.png and id_card.jpg (2048x2048)');
}

buildCard().catch(err => {
  console.error(err);
  process.exit(1);
});
