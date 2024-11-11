const express = require('express');
const router = express.Router();
const heroController = require('../controllers/herocontroller');
const itemController = require('../controllers/itemcontroller');

// Import the models
const Hero = require('../model/hero');
const Item = require('../model/item');

// Home Page Route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Heroes List Page Route - Use the controller to get heroes data
router.get('/heroes', heroController.listHeroes);

// Items List Page Route - Use the controller to get items data
router.get('/items', itemController.listItems);

// Search Route
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query; // Get the query from request
    const searchRegex = new RegExp(query, 'i'); // Create a case-insensitive regex

    // Search for heroes and items
    const heroes = await Hero.find({ name: searchRegex });
    const items = await Item.find({ name: searchRegex });

    // Render the search results page
    res.render('searchResults', {
      title: `Search results for "${query}"`,
      query,
      heroes,
      items,
    });
  } catch (error) {
    console.error('Error processing search:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
