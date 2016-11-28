/* globals require */

const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validators = require('mongoose-validators');


let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.isLength(5, 30)]
    },
    displayname: {
        type: String,
        required: true,
        unique: true,
        validate: [validators.isLength(5, 30)]
    },
    password: {
        type: String,
        required: true
    }
});

schema.plugin(uniqueValidator);
mongoose.model("User", schema);

module.exports = mongoose.model("User");