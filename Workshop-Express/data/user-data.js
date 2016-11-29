module.exports = function(models) {
    let User = models.User,
        encrypt = require('../utils/encrypt');

    return {
        findUserById(id) {
            return new Promise((resolve, reject) => {
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserByUsername(username) {
            return new Promise((resolve, reject) => {
                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        createUser(username, displayname, password) {
            const salt = encrypt.generateSalt();

            let user = new User({
                username,
                displayname,
                //password,
                salt: salt,
                passHash: encrypt.hashPassword(salt, password || encrypt.genenerateRandomPassword()),
            });

            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        findUserByCredentials(username, password) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, password }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
    };
};