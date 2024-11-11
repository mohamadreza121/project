const express = require('express');
const router = express.Router();
const heroController = require('../controllers/herocontroller');

// List all heroes
router.get('/', heroController.listHeroes);

// Display form to add a new hero
router.get('/add', heroController.renderAddHeroForm);

// Handle adding a new hero
router.post('/add', heroController.addHero);

// Display form to edit an existing hero
router.get('/edit/:id', heroController.renderEditHeroForm);

// Handle editing an existing hero
router.post('/edit/:id', heroController.editHero);

// Delete a hero
router.get('/delete/:id', heroController.deleteHero);

// View individual hero details
router.get('/:id', heroController.heroDetails);

module.exports = router;
