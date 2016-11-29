module.exports = function(data) {
    return {
        getAll(req, res) {
            const user = req.user;
            data.getAllSuperheroes()
                .then(superheroes => {
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
            console.log(req.body);
            let body = req.body;
            data.createSuperhero(body.name, body.secretIdentity, body.city, body.alignment, body.story, body.image, body.powers, body.fractions)
                .then(() => {
                    res.redirect("/superheroes");
                }).catch(err => {
                    console.log(err);
                });
        }
    };
};