/* globals require */

const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validators = require('mongoose-validators');

let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: [validators.isLength(3, 60)]
    },
    secretIdentity: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.isLength(3, 20)]
    },
    city: {
        type: String,
        required: true
    },
    alignment: {
        type: String,
        required: true,
        enum: ["good", "evil", "neutral"]
    },
    story: {
        type: String,
        required: true,
        validate: [validators.isLength(1)]
    },
    image: {
        type: String,
        validate: [validators.isURL()]
    },
    powers: [{}],
    fractions: [{}]
});

schema.plugin(uniqueValidator);
mongoose.model("Superhero", schema);

module.exports = mongoose.model("Superhero");