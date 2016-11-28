/* globals require module */

const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');

// let app = express();

// app.set("view engine", "pug");

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(session({ secret: 'purple unicorn' }));

// app.use("/static", express.static("public"));


module.exports = function({ data }) {
    let app = express();

    app.set("view engine", "pug");

    app.use("/static", express.static("public"));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({ secret: "purple unicorn" }));
    require("./passport")({ app, data });
    return app;
};