const Item = require('../model/item');

// List all items
exports.listItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ name: 1 }); // Sort items alphabetically by name
    console.log(items);
    res.render('items', { title: 'Items', type: 'item', items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Render form to add a new item
exports.renderAddItemForm = (req, res) => {
  res.render('dota/add', { title: 'Add New Item', type: 'item' });
};

// Add a new item
exports.addItem = async (req, res) => {
  try {
    const { name, type, cost, description } = req.body;
    const item = new Item({
      name,
      type,
      cost,
      description,
    });
    await item.save();
    res.redirect('/items');
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Render form to edit an existing item
exports.renderEditItemForm = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item not found');
    res.render('dota/edit', { title: 'Edit Item', type: 'item', item });
  } catch (error) {
    console.error('Error fetching item for editing:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Edit an existing item
exports.editItem = async (req, res) => {
  try {
    const { name, type, cost, description } = req.body;
    const updatedItem = {
      name,
      type,
      cost,
      description,
    };
    await Item.findByIdAndUpdate(req.params.id, updatedItem);
    res.redirect('/items');
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect('/items');
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).send('Internal Server Error');
  }
};
