const Router = require("express").Router();
const { authenticate } = require("../middleware/authenticate");
const { authorize } = require("../middleware/authorize");


Router.get("/", authenticate, (req, res) => {
    res.render("index.html", {user: req.user});
});

// Router.get("/myspace", authenticate, authorize,  (req, res) => {
//     res.render("myspace.html", {style: "index", subtitle: "Messages", user: req.user});

// });


Router.get("/help", (req, res) => {
    return res.render("help.html");
});

Router.post("/login", (req,res) => {
    res.cookie("Auth", req.body.username);
    console.log("Authentication request");
    console.log(req.body);
    // return res.redirect("/myspace");
    return res.redirect("/");
});

module.exports = Router;