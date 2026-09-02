import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:3000/";
const outDir = process.argv[3] || ".impeccable/review/scroll";
const width = parseInt(process.argv[4] || "1440", 10);
const height = parseInt(process.argv[5] || "900", 10);
const steps = parseInt(process.argv[6] || "8", 10);

fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(600);

const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
const maxScroll = scrollHeight - height;

for (let i = 0; i <= steps; i++) {
  const y = Math.round((maxScroll * i) / steps);
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}/step-${String(i).padStart(2, "0")}-y${y}.png` });
}

await browser.close();
console.log("scrollHeight", scrollHeight, "maxScroll", maxScroll);
