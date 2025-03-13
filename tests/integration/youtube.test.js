const path = require('path');
const puppeteer = require('puppeteer');
const assert = require('assert');

(async () => {
  const extensionPath = path.resolve(__dirname, '../../');

  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  });

  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/watch?v=gxeQFavk1P8', { waitUntil: 'networkidle2' });

  const logs = [];
  page.on('console', msg => {
    console.log('PAGE LOG:', msg.text());
    logs.push(msg.text());
  });

  await new Promise(resolve => setTimeout(resolve, 50000)); 


  const foundLog = logs.some(log => log.includes('Lejátszási minőség beállítva:'));
  assert.ok(foundLog, 'Optimalizációs log nem található a konzolon');

  await browser.close();
  console.log('Integrációs teszt sikeres.');
})();
