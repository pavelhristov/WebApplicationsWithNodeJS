/* globals module require */

const express = require("express");

module.exports = function(app, data) {
    let controller = require("../controllers/superhero-controller")(data);

    let router = new express.Router();

    router
        .get("/", controller.getAll)
        .get("/create", controller.getCreateForm)
        .post("/create", controller.create)
        .get("/:id", controller.getById);

    app.use("/superheroes", router);
};