/**
 * Builds favicon.ico from public/images/logo/maxxxx-01.png
 * Run: node scripts/generate-favicon.cjs
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const src = path.join(root, "public/images/logo/maxxxx-01.png");
const sizes = [16, 32, 48];
const tmpDir = path.join(__dirname, ".favicon-tmp");

async function main() {
  const { default: pngToIco } = await import("png-to-ico");

  fs.mkdirSync(tmpDir, { recursive: true });
  const pngPaths = [];
  for (const size of sizes) {
    const out = path.join(tmpDir, `favicon-${size}.png`);
    await sharp(src)
      .resize(size, size, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(out);
    pngPaths.push(out);
  }

  const ico = await pngToIco(pngPaths);
  const appIco = path.join(root, "src/app/favicon.ico");
  const publicIco = path.join(root, "public/favicon.ico");

  fs.writeFileSync(appIco, ico);
  fs.writeFileSync(publicIco, ico);
  console.log(`Wrote ${appIco} and ${publicIco} (${ico.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
