const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "public", "achievements");
const outDir = path.join(srcDir, "thumbs");
fs.mkdirSync(outDir, { recursive: true });

const files = [
  "ach1.jpg",
  "ach2.jpg",
  "ach3.jpg",
  "ach4.jpg",
  "ach5.jpg",
  "ach6.jpg",
  "DSC_0430.JPG",
  "DSC_0609.JPG",
  "DSC_0618.JPG",
  "DSC_0653.JPG",
  "DSC_0664.JPG",
];

(async () => {
  for (const file of files) {
    const src = path.join(srcDir, file);
    const outName = file.replace(/\.(jpg|JPG)$/, ".jpg").toLowerCase();
    const out = path.join(outDir, outName);
    const before = fs.statSync(src).size;
    await sharp(src)
      .rotate() // respect EXIF orientation (raw camera files often need this)
      .resize({ width: 640, height: 640, fit: "cover", position: "attention" })
      .jpeg({ quality: 72, mozjpeg: true })
      .toFile(out);
    const after = fs.statSync(out).size;
    console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> ${outName}: ${(after / 1024).toFixed(0)}KB`);
  }
})();
