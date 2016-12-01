/* globals module require */

const express = require("express");

module.exports = function({ app, data, io }) {
    const controller = require("../controllers/superhero-controller")({ data, io }),
        auth = require('../middlewares/auth-middleware');

    let router = new express.Router();

    router
        .get("/", controller.getAll)
        .get("/create", auth.isAuthenticated, controller.getCreateForm)
        .post("/create", auth.isAuthenticated, controller.create)
        .get("/:id", controller.getById);

    app.use("/superheroes", router);
};