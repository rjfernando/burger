const express = require('express');

const router = express.Router();

const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
    burger.selectAll((data) => {
        var hbsObject = {
            burgers: data
        };
        res.render('index', hbsObject);
    });
});

router.post('/', (req, res) => {
    burger.insertOne([
        'burger_name'
    ], [
        req.body.burger_name
    ], (data) => {
        res.redirect('/');
    });
});

router.put('/:id', (req, res) => {
    var condition = 'id = ' + req.params.id;
    burger.updateOne({
            devoured: true
        }, condition, (data) => {
            res.redirect('/');
    });   
});

//exports the routes for server.js to use
module.exports = router;