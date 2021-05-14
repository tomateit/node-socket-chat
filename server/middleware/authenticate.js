// const User = require("../models/User");

const authenticate = (req, res, next) => {

    if (req.cookies.Auth) {
        //TODO Decypher username from session
        req.user = {username: req.cookies.Auth};
    }
    return next();
};

module.exports.authenticate = authenticate;