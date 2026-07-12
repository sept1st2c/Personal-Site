const sharp = require("sharp");
const path = require("path");

const src = "C:\\Users\\3shub\\Desktop\\all in 1\\me\\career con\\DSC_0493.JPG";
const out = path.join(__dirname, "..", "public", "shubh-gupta.jpg");

(async () => {
  const rotated = sharp(src).rotate();
  const meta = await rotated.metadata();
  console.log("source size", meta.width, meta.height);

  // Manual crop: face is centered around x=2820 in the 6000-wide original
  // (auto "attention" crop grabbed the bright window/pillar instead of the
  // face). Take the full height (keeps hair-to-shoulders framing) and a
  // 4:5-ratio-wide slice centered on the face.
  const height = meta.height;
  const width = Math.round(height * 0.8); // 4:5
  const faceCenterX = 2820;
  let left = Math.round(faceCenterX - width / 2);
  left = Math.max(0, Math.min(left, meta.width - width));

  await sharp(src)
    .rotate()
    .extract({ left, top: 0, width, height })
    .resize({ width: 900 })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);

  const outMeta = await sharp(out).metadata();
  console.log("done", outMeta.width, outMeta.height);
})();
