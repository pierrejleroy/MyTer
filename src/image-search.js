const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext({
    storageState: "storageState.json"
  });

  const page = await context.newPage();

  await page.goto(
    "https://x.com/search?q=chatgpt%20filter%3Aimages&src=typed_query",
    {
      waitUntil: "networkidle"
    }
  );

  await page.waitForTimeout(5000);

  const images = await page.locator("article img").evaluateAll(
    elements =>
      elements.map(img => img.src)
  );

  console.log(images);

  await browser.close();
}

main().catch(console.error);