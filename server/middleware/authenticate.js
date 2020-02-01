const User = require("../models/User");

const authenticate = (req, res, next) => {
    // if (!req.cookies.Auth) {
    //     return next()
    // }
    res.cookie("Auth", 100100)
    
    const user = User.findByToken(req.cookies.Auth);
    req.user = user;
    return next();
}

module.exports.authenticate = authenticate;