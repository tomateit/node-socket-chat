const Router = require('express').Router();

Router.get('/', (req, res) => {
    res.render('index.hbs', {style: "index", subtitle: "Main page"})

});



module.exports = Router;