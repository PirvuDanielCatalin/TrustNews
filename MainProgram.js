const fs = require("fs");
const util = require("util");

const bigchaindb = require("./BigchainDBSingleNode/Create&Transfer.js");
const scraperjs = require("./ScraperJS/Scraper.js");

async function Main() {
  // ScrapeJS
  var scrape = await scraperjs.ScrapeBBC();

  news_title = scrape[0];
  news_content = scrape[1];

  // ZoKrates

  // BigchainDB
  var extractor_keys = fs.readFileSync(
    "BigchainDBSingleNode/Keys/node1_keys.json",
    "utf8"
  );
  extractor_keys = JSON.parse(extractor_keys);

  var proof = "Something";

  var create_transaction = bigchaindb.CreateNews(
    news_title,
    news_content,
    proof,
    extractor_keys.publicKey,
    extractor_keys.privateKey
  );
}

// Calls
Main();

// Utilities
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
