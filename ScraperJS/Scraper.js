const scraperjs = require("scraperjs");
const fs = require("fs");

var title = "";
var content = "";

async function ScrapeBBC() {
  let endpoint = "https://www.bbc.com";

  let general_scraper = await scraperjs.StaticScraper.create(
    "https://www.bbc.com/news/technology"
  )
    .scrape(function ($) {
      // Extract URLs
      return $(
        "a.gs-c-promo-heading.gs-o-faux-block-link__overlay-link.gel-pica-bold.nw-o-link-split__anchor"
      )
        .map(function () {
          return [[$(this).text(), $(this).attr("href")]];
        })
        .get();
    })
    .then(function (news) {
      // Choose random news
      len = news.length;

      chosen_news = news[Math.floor(Math.random() * len)];
      title = chosen_news[0];

      if (chosen_news[1][0] == "/") {
        chosen_news[1] = endpoint + chosen_news[1];
      }

      return chosen_news;
    })
    .then(async function (chosen_news) {
      // Extract title from  news
      single_page_scrapper = await scraperjs.StaticScraper.create(
        chosen_news[1]
      )
        .scrape(function ($) {
          return $("div.ssrcss-uf6wea-RichTextComponentWrapper.e1xue1i87")
            .map(function () {
              return $(this).text();
            })
            .get();
        })
        .then(function (news_content) {
          news_full_text = "";

          news_content.forEach((element) => {
            news_full_text = news_full_text + element + "\n\n";
          });

          content = news_full_text;
        });
    });

  // console.log("Rapid")
  return [title, content];
}

module.exports = { ScrapeBBC };
