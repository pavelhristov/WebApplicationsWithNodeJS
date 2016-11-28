/* globals require */

const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validators = require('mongoose-validators');


let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.isLength(2, 30)]
    },
    alignment: {
        type: String,
        required: true,
        enum: ["good", "evil", "neutral"]
    },
    planets: [{}],
    superheroes: [{}]
});

schema.plugin(uniqueValidator);
mongoose.model("Fraction", schema);

module.exports = mongoose.model("Fraction");