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

  await page.goto(url, {
    waitUntil: "networkidle"
  });

  await page.waitForTimeout(5000);

  const tweets = await page.locator("article").all();

  console.log(`Found ${tweets.length} tweets`);

  for (let i = 0; i < Math.min(tweets.length, 10); i++) {
    const text = await tweets[i].textContent();

    console.log("");
    console.log("====================");
    console.log(text);
  }

  await browser.close();
}

main().catch(console.error);