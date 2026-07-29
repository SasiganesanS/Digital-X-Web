import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const sourceLogo = path.join(projectRoot, 'src/assets/Praskla_Digital_X_Logo_Trasnparent_Background.png');
const publicDir = path.join(projectRoot, 'public');

async function generateFavicons() {
  console.log('Generating adaptive favicons...');

  const size = 512;

  // 1. Light mode favicon (Transparent background with original logo)
  const logoBuffer = await sharp(sourceLogo)
    .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const faviconLight512 = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([{ input: logoBuffer, gravity: 'center' }])
  .png()
  .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-light.png'), faviconLight512);
  console.log('Created favicon-light.png');

  // 2. Dark mode favicon (White rounded square badge with centered logo)
  const radius = 88; // Clean rounded square (approx 16px corner radius scaling to 512px)
  const svgBadge = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="${size - 40}" height="${size - 40}" rx="${radius}" ry="${radius}" fill="#FFFFFF" />
  </svg>`;

  const badgeBuffer = await sharp(Buffer.from(svgBadge))
    .toFormat('png')
    .toBuffer();

  const logoForDarkBuffer = await sharp(sourceLogo)
    .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const faviconDark512 = await sharp(badgeBuffer)
    .composite([{ input: logoForDarkBuffer, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-dark.png'), faviconDark512);
  console.log('Created favicon-dark.png');

  // Also create light/dark 32x32, 48x48, 180x180, 192x192 copies for seamless browser compatibility
  await sharp(faviconLight512).resize(32, 32).toFile(path.join(publicDir, 'favicon-light-32x32.png'));
  await sharp(faviconDark512).resize(32, 32).toFile(path.join(publicDir, 'favicon-dark-32x32.png'));

  await sharp(faviconLight512).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon-light.png'));
  await sharp(faviconDark512).resize(180, 180).toFile(path.join(publicDir, 'apple-touch-icon-dark.png'));

  console.log('Favicon generation complete!');
}

generateFavicons().catch(console.error);
