/* globals require, console */
'use strict';

const mongoose = require('mongoose');

const protocol = 'mongodb:/';
const server = 'localhost:27017';
const databaseName = 'TelerikFriends';

const connectionString = `${protocol}/${server}/${databaseName}`;

mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('error', (err) => {
    console.log('Connection failed!\n' + err);
});

db.on('open', () => {
    console.log('Connection successfully established!');
});

const modelSchema = mongoose.Schema({
    model: String,
    releaseDate: Date,
    priceInDollars: Number,
    displaySizeInInches: Number
});
const modelName = 'Laptop';

const Laptop = mongoose.model(modelName, modelSchema);

const asus = new Laptop({
    model: 'Asus G752',
    releaseDate: new Date(2016, 10, 29),
    priceInDollars: '100',
    displaySizeInInches: 17.3
});

asus.save((err, entry, numAffected) => {
    console.log(err);
    console.log(entry);
    console.log(numAffected);
});

db.close();