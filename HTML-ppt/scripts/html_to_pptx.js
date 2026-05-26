#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

function usage() {
  console.log('Usage: html_to_pptx.js <input.html> [output.pptx]');
  console.log('Example: html_to_pptx.js ./deck.html ./deck.pptx');
}

const args = process.argv.slice(2);
if (args.length < 1 || args.includes('--help') || args.includes('-h')) {
  usage();
  process.exit(args.length ? 0 : 1);
}

const inputHtml = path.resolve(args[0]);
if (!fs.existsSync(inputHtml)) {
  console.error(`[error] input not found: ${inputHtml}`);
  process.exit(1);
}

const outputPptx = path.resolve(
  args[1] || inputHtml.replace(/\.html?$/i, '') + '.pptx'
);
const tempDir = path.resolve(path.dirname(outputPptx), '.tmp_web_ppt_swiss');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
for (const entry of fs.readdirSync(tempDir)) {
  if (/^slide-\d+\.png$/i.test(entry)) {
    fs.unlinkSync(path.join(tempDir, entry));
  }
}

function findExecutableFallback() {
  const explicit = process.env.PLAYWRIGHT_EXECUTABLE_PATH;
  if (explicit && fs.existsSync(explicit)) return explicit;

  const cacheRoot = path.join(os.homedir(), 'Library', 'Caches', 'ms-playwright');
  if (!fs.existsSync(cacheRoot)) return null;

  const candidates = fs
    .readdirSync(cacheRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith('chromium-'))
    .map((entry) =>
      path.join(
        cacheRoot,
        entry.name,
        'chrome-mac-arm64',
        'Google Chrome for Testing.app',
        'Contents',
        'MacOS',
        'Google Chrome for Testing'
      )
    )
    .filter((candidate) => fs.existsSync(candidate))
    .sort();

  return candidates.at(-1) || null;
}

(async () => {
  const { chromium } = require('playwright');
  const PptxGenJS = require('pptxgenjs');

  const executablePath = findExecutableFallback();
  const browser = await chromium.launch(
    executablePath
      ? { headless: true, executablePath }
      : { headless: true }
  );
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto('file://' + inputHtml, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    // Force stable render mode before counting / exporting.
    if (window.__setLowPowerMode) {
      window.__setLowPowerMode(true, { persist: false });
    } else {
      document.body.classList.add('low-power');
    }
    document.getAnimations?.().forEach((animation) => animation.cancel());
  });
  await page.waitForTimeout(120);
  const total = await page.evaluate(() => {
    const slides = document.querySelectorAll('#deck .slide');
    return slides ? slides.length : 0;
  });

  if (!total) {
    await browser.close();
    throw new Error('No slides found under #deck .slide');
  }

  for (let i = 1; i <= total; i++) {
    await page.evaluate((n) => {
      if (window.__setLowPowerMode) {
        window.__setLowPowerMode(true, { persist: false });
      } else {
        document.body.classList.add('low-power');
      }
      if (window.__deckGo) {
        window.__deckGo(n - 1);
        return;
      }
      const deck = document.getElementById('deck');
      if (deck) deck.style.transform = `translateX(${- (n - 1) * 100}vw)`;
    }, i);

    await page.waitForTimeout(180);
    const imagePath = path.join(tempDir, `slide-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: imagePath, fullPage: false });
  }

  await browser.close();

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'HTML-ppt skill';
  pptx.subject = 'HTML to PPTX';
  pptx.title = path.basename(outputPptx, '.pptx');

  for (let i = 1; i <= total; i++) {
    const s = pptx.addSlide();
    const imagePath = path.join(tempDir, `slide-${String(i).padStart(2, '0')}.png`);
    s.addImage({ path: imagePath, x: 0, y: 0, w: 13.333, h: 7.5 });
  }

  await pptx.writeFile({ fileName: outputPptx });

  console.log(`[ok] html:  ${inputHtml}`);
  console.log(`[ok] pptx:  ${outputPptx}`);
  console.log(`[ok] slides: ${total}`);
})();
