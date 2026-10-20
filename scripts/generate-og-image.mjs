// Renders public/og-image.png, the preview shown when the site link is shared (WhatsApp, Facebook…).
import { readFileSync } from 'node:fs'
import sharp from 'sharp'

const logo = readFileSync('public/logo.svg', 'utf8')
  .replace('<svg ', '<svg x="96" y="96" width="120" height="120" ')

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#faf7f2"/>
      <stop offset="1" stop-color="#d1fae5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1080" cy="560" r="260" fill="#a7f3d0" opacity="0.45"/>
  ${logo}
  <text x="240" y="178" font-family="Georgia, serif" font-size="64" font-weight="700" fill="#0f172a">Listar</text>
  <text x="96" y="350" font-family="Georgia, serif" font-size="68" font-weight="700" fill="#0f172a">A lista de compras da casa,</text>
  <text x="96" y="436" font-family="Georgia, serif" font-size="68" font-weight="700" font-style="italic" fill="#047857">sempre à mão.</text>
  <text x="96" y="530" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#475569">Partilhada com a família · Gratuita e sem anúncios</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png')
console.log('public/og-image.png generated')
