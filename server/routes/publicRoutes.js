const Router = require('express').Router();

Router.get('/', (req, res) => {
    res.render('index.hbs', {style: "index", subtitle: "Main page"})

});

Router.get('/help', (req, res) => {
    res.render('help.hbs', {style: "index", subtitle: "Help page"})

});

module.exports = Router;