const path = require("path");
const { chromium } = require("playwright");

async function main() {
  const browser = await chromium.launch({
    headless: false
  });

  const context = await browser.newContext();

  const page = await context.newPage();

  console.log("Opening X login page...");

  await page.goto("https://x.com/i/flow/login");

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