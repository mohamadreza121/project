var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

// Import the Dota model
const Dota = require('../model/dota');

/* GET route for listing all Dota boost services - Read Operation */
router.get('/', async (req, res, next) => {
    try {
        const boostList = await Dota.find();
        res.render('Dota/list', {
            title: 'Dota Boost Services',
            BoostList: boostList
        });
    } catch (err) {
        console.error(err);
        res.render('Dota/list', {
            error: 'Error retrieving boost services from the server'
        });
    }
});

/* GET route for displaying the Add Boost Service page - Create Operation */
router.get('/add', async (req, res, next) => {
    try {
        res.render('Dota/add', {
            title: 'Add Boost Service'
        });
    } catch (err) {
        console.error(err);
        res.render('Dota/list', {
            error: 'Error displaying the add boost service page'
        });
    }
});

/* POST route for processing the Add Boost Service - Create Operation */
router.post('/add', async (req, res, next) => {
    try {
        const newBoost = new Dota({
            "username": req.body.username,
            "rank": req.body.rank,
            "serviceType": req.body.serviceType,
            "status": req.body.status || 'pending',
            "price": req.body.price
        });
        await newBoost.save();
        res.redirect('/dota');
    } catch (err) {
        console.error(err);
        res.render('Dota/list', {
            error: 'Error adding boost service'
        });
    }
});

/* GET route for displaying the Edit Boost Service page - Update Operation */
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const boostToEdit = await Dota.findById(id);
        res.render('Dota/edit', {
            title: 'Edit Boost Service',
            Boost: boostToEdit
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/* POST route for processing the Edit Boost Service - Update Operation */
router.post('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedBoost = {
            "username": req.body.username,
            "rank": req.body.rank,
            "serviceType": req.body.serviceType,
            "status": req.body.status,
            "price": req.body.price
        };
        await Dota.findByIdAndUpdate(id, updatedBoost);
        res.redirect('/dota');
    } catch (err) {
        console.error(err);
        res.render('Dota/list', {
            error: 'Error updating boost service'
        });
    }
});

/* GET route to delete a boost service - Delete Operation */
router.get('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await Dota.deleteOne({ _id: id });
        res.redirect('/dota');
    } catch (err) {
        console.error(err);
        res.render('Dota/list', {
            error: 'Error deleting boost service'
        });
    }
});

module.exports = router;
