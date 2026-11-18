const path = require("path");
const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    channel: "chrome",
    headless: false
  });

  const context = await browser.newContext({
     userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36"
  });

  const page = await context.newPage();

  console.log("Opening X login page...");

  await page.goto("https://x.com/home");

  console.log("");
  console.log("====================================");
  console.log("LOGIN MANUALLY IN THE BROWSER");
  console.log("THEN PRESS ENTER IN THIS TERMINAL");
  console.log("====================================");
  console.log("");

  process.stdin.resume();

  await new Promise(resolve => {
    process.stdin.once("data", resolve);
  });

  const storagePath = path.join(process.cwd(), "storageState.json");

  await context.storageState({
    path: storagePath
  });

  console.log(`Session saved to ${storagePath}`);

  await browser.close();
}

main().catch(console.error);