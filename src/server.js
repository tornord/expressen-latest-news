const express = require("express");
var Feed = require("rss-to-json");
var cors = require("cors");

const app = express();
app.use(cors());

var urls = [
	"http://expressen.se/rss/nyheter",
	"http://gt.se/rss/nyheter",
	"http://kvp.se/rss/nyheter",
	"http://expressen.se/rss/sport",
	"http://expressen.se/rss/noje",
	"http://expressen.se/rss/debatt",
	"http://expressen.se/rss/ledare",
	"http://expressen.se/rss/kultur",
	// "http://expressen.se/rss/ekonomi",
	"http://expressen.se/rss/halsa",
	// "http://expressen.se/rss/levabo",
	"http://expressen.se/rss/motor",
	"http://expressen.se/rss/res"
	// "http://expressen.se/rss/dokument"
];

/**
 * fetch returns a rss load Promise.
 * @param {*} url rss url
 */
const fetch = (url) => new Promise((resolve, reject) => Feed.load(url, (err, rss) => (err ? reject(err) : resolve(rss))));

app.get("/", async function(req, res) {
	var rsss = await Promise.all(urls.map((d) => fetch(d)));
	var dict = {};
	rsss.forEach((d) => d.items.forEach((e) => (dict[e.guid._] = e)));
	var unique = Object.values(dict);
	unique.sort((d1, d2) => new Date(d2.pubDate).getTime() - new Date(d1.pubDate).getTime());
	res.json(unique.slice(0, 10));
});

app.listen(3001);
