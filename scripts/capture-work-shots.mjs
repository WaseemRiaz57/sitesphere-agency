// Refreshes the dental demo screenshots used in the "Work" section.
// Usage: npm run build && npm run start, then: node scripts/capture-work-shots.mjs [baseUrl]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();

const shots = [
  { file: "public/work/dental-desktop.jpg", viewport: { width: 1440, height: 900 }, scale: 1 },
  { file: "public/work/dental-mobile.jpg", viewport: { width: 390, height: 844 }, scale: 2 },
];

for (const shot of shots) {
  const page = await browser.newPage({ viewport: shot.viewport, deviceScaleFactor: shot.scale });
  await page.goto(`${base}/demo/dental`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: shot.file, type: "jpeg", quality: 82 });
  console.log(`saved ${shot.file}`);
}

await browser.close();
