var scraperjs = require("scraperjs");

var endpoint = "https://www.bbc.com";

// Extragere URL catre stiri
var general_scraper = scraperjs.StaticScraper.create(
  "https://www.bbc.com/news/technology"
).scrape(function ($) {
  return $(
    "a.gs-c-promo-heading.gs-o-faux-block-link__overlay-link.gel-pica-bold.nw-o-link-split__anchor"
  )
    .map(function () {
      return [[$(this).text(), $(this).attr("href")]];
    })
    .get();
});

// Alegere stire random
general_scraper.then(function (news) {
  len = news.length;

  chosen_news = news[Math.floor(Math.random() * len)];

  if (chosen_news[1][0] == "/") {
    chosen_news[1] = endpoint + chosen_news[1];
  }

  return chosen_news;
});

// Extragerea textului din stire
general_scraper.then(function (chosen_news) {
  console.log("Title is > " + chosen_news[0] + " <");
  console.log("URL is > " + chosen_news[1] + " <");

  single_page_scrapper = scraperjs.StaticScraper.create(chosen_news[1]).scrape(
    function ($) {
      return $("div.ssrcss-uf6wea-RichTextComponentWrapper.e1xue1i87")
        .map(function () {
          return $(this).text();
        })
        .get();
    }
  );

  // Asamblarea secventelor de text
  single_page_scrapper.then(function (news_content) {
    news_full_text = "";

    news_content.forEach((element) => {
      // console.log(element);
        news_full_text = news_full_text + element + "\n\n";
    });

    console.log("\nText is \n" + news_full_text);
  });
});
