module.exports = function({ data, io }) {
    return {
        getAll(req, res) {
            const user = req.user;
            data.getAllSuperheroes()
                .then(superheroes => {
                    io.sockets.emit('hi', { hello: 'everyone' });
                    res.render("superheroes-list", {
                        result: { superheroes, user }
                    });
                });
        },
        getById(req, res) {
            const user = req.user;
            data.getSuperheroById(req.params.id)
                .then(sh => {
                    if (sh === null) {
                        return res.status(404)
                            .redirect("/error");
                    }
                    let superhero;
                    if (req.isAuthenticated()) {
                        superhero = sh;
                    } else {
                        superhero = {
                            name: sh.name,
                            image: sh.image,
                            secretIdentity: sh.secretIdentity,
                            alignment: sh.alignment
                        };
                    }
                    return res.render("superheroes-details", {
                        result: { superhero, user }
                    });
                });
        },
        getCreateForm(req, res) {
            const user = req.user;
            res.status(200).render("superhero-create", {
                result: { user }
            });
        },
        create(req, res) {
            let username = req.user.username;
            let body = req.body;
            data.createSuperhero(body.name, body.secretIdentity, body.city, body.alignment, body.story, body.image, body.powers, body.fractions)
                .then((superhero) => {
                    io.sockets.emit('newSuperhero', {
                        message: `${superhero.name} has joined the Universe!`,
                        superheroId: `${superhero._id}`,
                        creator: `${username}`
                    });

                    return res.status(201).redirect("/superheroes");
                }).catch(err => {
                    console.log(err);
                    if (err.superheroId) {
                        io.sockets.emit("superheroAlreadyExists", {
                            message: `${err.message}`,
                            superheroId: `${err.superheroId}`
                        });
                    }
                });
        }
    };
};