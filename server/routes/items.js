const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemcontroller');

// List all items
router.get('/', itemController.listItems);

// Display form to add a new item
router.get('/add', (req, res) => {
  res.render('dota/add', { title: 'Add New Item', type: 'item' });
});

// Handle adding a new item
router.post('/add', itemController.addItem);

// Display form to edit an existing item
router.get('/edit/:id', itemController.renderEditItemForm);

// Handle editing an existing item
router.post('/edit/:id', itemController.editItem);

// Delete an item
router.get('/delete/:id', itemController.deleteItem);

module.exports = router;
