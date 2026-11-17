const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext({
    storageState: "storageState.json"
  });

  const page = await context.newPage();

  const query = "chatgpt filter:images";

  const url =
    "https://x.com/search?q=" +
    encodeURIComponent(query) +
    "&src=typed_query";

  console.log(`Searching: ${query}`);

  await page.goto(url, {
    waitUntil: "networkidle"
  });

  await page.waitForTimeout(5000);

  const count = await page.locator("article").count();

  console.log(`Found ${count} tweets`);

  await browser.close();
}

main().catch(console.error);