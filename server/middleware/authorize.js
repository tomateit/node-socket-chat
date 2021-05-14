const authorize = (req, res, next) => {
    if (!req.cookies.Auth) {
        return res.redirect("/");
    }
    next();
};

module.exports.authorize = authorize;