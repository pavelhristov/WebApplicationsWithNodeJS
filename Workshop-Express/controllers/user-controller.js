'use strict';

module.exports = function({ data }) {
    return {
        getHome(req, res) {
            const user = req.user;
            res.status(200).render("home", {
                result: { user }
            });
        },
        getLogin(req, res) {
            const user = req.user;
            res.status(200).render("user-login", {
                result: { user }
            });
        },
        getProfile(req, res) {
            if (!req.isAuthenticated()) {
                res.status(401).redirect('/unauthorized');
            } else {
                const user = req.user;
                res.status(200).render("user-profile", {
                    result: { user }
                });
            }
        },
        getUnauthorized(req, res) {
            const user = req.user;
            res.render("unauthorised", {
                result: { user }
            });
        },
        getRegister(req, res) {
            const user = req.user;
            res.status(200).render("user-register", {
                result: { user }
            });
        }
    };
};