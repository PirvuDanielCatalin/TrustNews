const fs = require("fs");
const util = require("util");
const prompt = require("prompt-sync")();

const bigchaindb_utils = require("./BigchainDBSingleNode/Create&Transfer.js");
const bigchaindb_check = require("./BigchainDBSingleNode/CheckTransaction.js");
const scraperjs = require("./ScraperJS/Scraper.js");
const zokrates_create = require("./ZoKratesCLI/GenerateProof.js");
const zokrates_verify = require("./ZoKratesCLI/VerifyProof.js");
const utilities = require("./Utilities/General.js");

var news_platforms = [
  { name: "CNN", prime_nr: "3" },
  { name: "BBC", prime_nr: "5" },
  { name: "The Economist", prime_nr: "7" },
  { name: "The Wall Street Journal", prime_nr: "11" },
  { name: "World Health Organization", prime_nr: "17" },
];

async function Extract() {
  // Choose news platform
  product_of_prime_nrs = 1;
  news_platforms.map((elem) => {
    product_of_prime_nrs *= elem.prime_nr;
  });

  len = news_platforms.length;
  news_platform = news_platforms[Math.floor(Math.random() * len)];

  // !!! Important for demo
  // !!! Force the source to be BBC
  news_platform = { name: "BBC", prime_nr: "5" };

  //////////////
  // ScrapeJS //
  //////////////
  var scrape = null;
  switch (news_platform.name) {
    case "CNN":
      scrape = await scraperjs.ScrapeCNN();
      break;
    case "BBC":
      scrape = await scraperjs.ScrapeBBC();
      break;
    case "The Economist":
      scrape = await scraperjs.ScrapeTheEconomist();
      break;
    case "The Wall Street Journal":
      scrape = await scraperjs.ScrapeTheWallStreetJournal();
      break;
    case "World Health Organization":
      scrape = await scraperjs.ScrapeWorldHealthOrganization();
      break;
    default:
      return -1;
  }

  ////////////////////////
  // ScrapeJS / Results //
  ////////////////////////
  news_title = scrape[0];
  news_content = scrape[1];

  //////////////
  // ZoKrates //
  //////////////
  witness = news_platform.prime_nr + " " + product_of_prime_nrs;
  var generate_proof = zokrates_create.GenerateProof(witness);
  // var verify_proof = zokrates_verify.VerifyProof(generate_proof);

  ////////////////
  // BigchainDB //
  ////////////////
  var extractor_keys = fs.readFileSync(
    "BigchainDBSingleNode/Keys/node1_keys.json",
    "utf8"
  );
  extractor_keys = JSON.parse(extractor_keys);

  var create_transaction = await bigchaindb_utils.CreateNews(
    news_title,
    news_content,
    generate_proof,
    extractor_keys.publicKey,
    extractor_keys.privateKey
  );

  let check_request = await bigchaindb_check.CheckTransaction(
    create_transaction.id
  );

  utilities.sleep(5000);
}

function Main() {
  five_minutes_time_interval = 5 * 60 * 1000;
  thirty_seconds_time_interval = 30 * 1000;

  var menu_text =
    "\n> The extractor has started\n" +
    "\n> Every 5 minutes a new transaction will be made on blockchain\n" +
    "\n> To stop the program press Ctrl + C\n";

  console.log(menu_text);

  var interval = setInterval(function () {
    Extract();
  }, thirty_seconds_time_interval);

  return 0;
}

Main();
