const Router = require('express').Router();
const { authenticate } = require("../middleware/authenticate");
const { authorize } = require("../middleware/authorize");


Router.get('/', authenticate, (req, res) => {
    if (req.cookies.Auth) {
        return res.redirect("/myspace")
    }
    res.render('index.hbs', {style: "index", subtitle: "Main page",  user: req.user})

});

Router.get('/myspace', authenticate, authorize,  (req, res) => {
    res.render('myspace.hbs', {style: "index", subtitle: "Messages", user: req.user})

});


Router.get('/help', (req, res) => {
    res.render('help.hbs', {style: "index", subtitle: "Help page"})

});


Router.post('/login', (req,res) => {
    res.cookie("Auth", req.body.username)
    console.log("Authentication request")
    console.log(req.body)
    res.redirect("/myspace")
})

module.exports = Router;