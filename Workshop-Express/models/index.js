/* globals module require global __dirname */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    let models = {};

    fs.readdirSync("./")
        .filter(x => x.includes("-model"))
        .forEach(file => {
            let modelsModule =
                require(path.join(__dirname, file));

            Object.keys(modelsModule)
                .forEach(key => {
                    models[key] = modelsModule[key];
                });
        });

    return models;
};