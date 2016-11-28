/* globals require */

const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validators = require('mongoose-validators');


let schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.isLength(3, 35)]
    },
    superheroes: [{}]
});

schema.plugin(uniqueValidator);
mongoose.model("Power", schema);

module.exports = mongoose.model("Power");