const sharp = require("sharp");
const path = require("path");

const src = path.join(__dirname, "..", "public", "shubh-gupta.jpg"); // 900x1125, face near top
const out = path.join(__dirname, "..", "src", "app", "icon.png");

(async () => {
  // Square crop from the top of the 4:5 portrait — the face sits high up
  // in that crop already, so a top-anchored 900x900 square keeps it
  // centered without needing separate face-detection logic.
  await sharp(src)
    .extract({ left: 0, top: 0, width: 900, height: 900 })
    .resize(256, 256)
    .png()
    .toFile(out);
  console.log("done");
})();
