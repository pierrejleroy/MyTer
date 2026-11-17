const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext({
    storageState: "storageState.json"
  });

  const page = await context.newPage();

  await page.goto("https://x.com/home");

  await page.waitForTimeout(10000);

  await browser.close();
}

main().catch(console.error);