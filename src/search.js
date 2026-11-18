const { chromium } = require("playwright");
const { parseTweet } = require("./Twitter/parseTweet");

async function main() {
  console.log("1. Launch browser");

  const browser = await chromium.launch({
    headless: false
  });

  console.log("2. Create context");

  const context = await browser.newContext({
    storageState: "storageState.json"
  });

  console.log("3. Create page");

  const page = await context.newPage();

  const query = "chatgpt filter:images";

  const url =
    "https://x.com/search?q=" +
    encodeURIComponent(query) +
    "&src=typed_query";

  console.log(`Searching: ${query}`);
  console.log(`URL: ${url}`);

  console.log("4. About to navigate");

  await page.goto(url);
  await page.screenshot({
    path: "search-result.png",
    fullPage: true
  });
  console.log(await page.title());
  console.log(await page.url());


  console.log("5. Navigation complete");

  await page.waitForSelector("article", {
    timeout: 30000
  });

  console.log("6. Looking for articles"); 

const tweets = await page.locator("article").all();

const results = [];

for (const tweet of tweets.slice(0, 10)) {
  const parsedTweet = await parseTweet(tweet);

  results.push(parsedTweet);
}

console.log(JSON.stringify(results, null, 2));

  await browser.close();
}

main().catch(error => {
  console.error("ERROR:");
  console.error(error);
}); 