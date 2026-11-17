const { chromium } = require("playwright");

async function main() {
  console.log("Launching browser...");

  const browser = await chromium.launch({
    headless: false
  });

  const page = await browser.newPage();

  console.log("Opening X...");

  await page.goto("https://x.com");

  console.log("Page title:");
  console.log(await page.title());

  await page.waitForTimeout(10000);

  await browser.close();

  console.log("Done.");
}

main().catch(error => {
  console.error(error);
});
