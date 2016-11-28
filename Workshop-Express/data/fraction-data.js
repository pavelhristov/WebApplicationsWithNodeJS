module.exports = function(models) {
    let {
        Fraction
    } = models;

    return {
        getAllFractions() {
            return new Promise((resolve, reject) => {
                Fraction.find((err, fractions) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(fractions);
                });
            });
        },
        createFraction(name, superheroes) {
            let fraction = new Fraction({ name, superheroes });

            return new Promise((resolve, reject) => {
                fraction.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(fraction);
                });
            });
        }
    };
};