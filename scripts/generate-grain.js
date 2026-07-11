// One-off generator for a static, tileable, monochrome film-grain noise PNG.
// Run once at authoring time: `node scripts/generate-grain.js`
// Output: public/grain.png (256x256, 8-bit grayscale, pure random static noise).
// This is NOT run at request-time or per-frame — it is pre-rendered once and
// the resulting file is served as a static asset, tiled via CSS background-repeat.

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const SIZE = 256;

// --- minimal PNG encoder (grayscale, 8-bit, no filtering) ---

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function buildPng(width, height, grayscalePixels) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 0; // color type: grayscale
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = chunk("IHDR", ihdrData);

  // raw scanlines, each prefixed with filter-type byte 0 (None)
  const raw = Buffer.alloc((width + 1) * height);
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // filter type: none
    for (let x = 0; x < width; x++) {
      raw[offset++] = grayscalePixels[y * width + x];
    }
  }
  const compressed = zlib.deflateSync(raw, { level: 9 });
  const idat = chunk("IDAT", compressed);

  const iend = chunk("IEND", Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

// Generate seamless-tileable static noise.
// Base gray 128, subtle variance so that when composited at low opacity with
// mix-blend-mode: soft-light it reads as fine film grain, not colored static.
function generateNoise(size) {
  const pixels = new Uint8Array(size * size);
  for (let i = 0; i < pixels.length; i++) {
    // uniform random noise across a moderate band; the low CSS opacity
    // (4-6%) is what makes this read as "subtle" — the source tile itself
    // uses full contrast so it stays sharp (non-blurry) at that opacity.
    pixels[i] = Math.floor(Math.random() * 256);
  }
  return pixels;
}

const pixels = generateNoise(SIZE);
const png = buildPng(SIZE, SIZE, pixels);

const outDir = path.join(__dirname, "..", "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "grain.png");
fs.writeFileSync(outPath, png);

console.log(`Wrote ${outPath} (${png.length} bytes, ${SIZE}x${SIZE})`);
