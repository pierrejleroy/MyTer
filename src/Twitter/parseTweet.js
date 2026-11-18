async function parseTweet(tweet) {
  let author = null;
  let handle = null;
  let tweetId = null;
  let tweetUrl = null;
  let text = null;
  let images = [];
  let videos = [];

  try {
    // Récupération des liens
    const urls = await tweet.locator("a").evaluateAll((links) =>
      links.map((link) => link.getAttribute("href"))
    );

    const statusLink = urls.find(
      (url) => url && url.includes("/status/")
    );

    if (statusLink) {
      tweetUrl = `https://x.com${statusLink}`;

      const match = statusLink.match(
        /^\/([^/]+)\/status\/(\d+)/
      );

      if (match) {
        handle = match[1];
        tweetId = match[2];
      }
    }
  } catch (err) {
    console.error("Error parsing tweet URL", err);
  }

  try {
    // Cherche le nom affiché
    const nameElement = tweet.locator(
      'div[class*="font-bold"]'
    ).first();

    if ((await nameElement.count()) > 0) {
      author = (await nameElement.textContent())?.trim();
    }
  } catch (err) {
    console.error("Error parsing author", err);
  }

  try {
    // Cherche le texte du tweet
    const textBlocks = await tweet
      .locator('[dir="auto"]')
      .allTextContents();

    text = textBlocks
      .map((x) => x.trim())
      .filter(Boolean)
      .join("\n");
  } catch (err) {
    console.error("Error parsing text", err);
  }

  try {
    // Images médias uniquement
    images = await tweet.locator("img").evaluateAll((imgs) =>
      imgs
        .map((img) => img.src)
        .filter(
          (src) =>
            src &&
            src.includes("pbs.twimg.com/media")
        )
    );
  } catch (err) {
    console.error("Error parsing images", err);
  }

  try {
    videos = await tweet.locator("video").evaluateAll((videos) =>
      videos
        .map((video) => video.src)
        .filter(Boolean)
    );
  } catch (err) {
    console.error("Error parsing videos", err);
  }

  return {
    tweetId,
    tweetUrl,
    author,
    handle,
    text,
    images,
    videos
  };
}

module.exports = {
  parseTweet
};
