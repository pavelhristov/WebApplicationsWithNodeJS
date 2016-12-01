'use strict';

const passport = require('passport');

module.exports = function({ data }) {
    return {
        loginLocal(req, res, next) {
            const auth = passport.authenticate('local', function(error, user) {
                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    res.json({
                        success: false,
                        message: 'Invalid name or password!'
                    });
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    res.redirect('/profile');
                });
            });

            auth(req, res, next);
        },
        logout(req, res) {
            req.logout();
            req.session.destroy();
            res.redirect('/home');
        },
        register(req, res) {
            const newUser = {
                username: req.body.username,
                displayname: req.body.displayname,
                password: req.body.password
            };

            data.createUser(newUser.username, newUser.displayname, newUser.password)
                .then(dbUser => {
                    let user = {
                        username: dbUser.username,
                        displayname: dbUser.displayname
                    };
                    res.status(201)
                        .render("user-profile", {
                            result: { user }
                        });
                })
                .catch(error => res.status(500).json(error));
        }
    }
};