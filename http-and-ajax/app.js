/* globals console, require */
"use strict";

const listMoviesUrl = `https://www.eurofootball.bg/fixtures.php`;

// const genres = ["fantasy", "horror", "comedy", "action", "sci-fi"];

const request = require("request");

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

var options = {
    url: listMoviesUrl,
    headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.5",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Cookie": "__cfduid=dc1082c1172539f543c9f68455255e2e01479733822; PHPSESSID=8i40e9q0onvv88utqbr55lk7g0; _ga=GA1.2.178593899.1479733828; _gat=1; events_order=0; time_limit=24",
        "Host": "www.eurofootball.bg",
        "Referer": "https://www.eurofootball.bg/",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:49.0) Gecko/20100101 Firefox/49.0.3 Waterfox/49.0.3"
    }
};

request(options, (err, res, body) => {

    $("body").html(body);
    console.log($(".module-content"));
});