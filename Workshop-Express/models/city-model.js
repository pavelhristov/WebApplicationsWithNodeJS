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
    // country: {
    //     type: String,
    //     required: true
    // }
});

schema.plugin(uniqueValidator);
mongoose.model("City", schema);

module.exports = mongoose.model("City");