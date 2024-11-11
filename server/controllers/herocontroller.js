const Hero = require('../model/hero');

// List all heroes
exports.listHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find().sort({ name: 1 }); // Sort heroes alphabetically by name
    res.render('heroes', { title: 'Heroes', type: 'hero', heroes });
  } catch (error) {
    console.error('Error fetching heroes:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Render form to add a new hero
exports.renderAddHeroForm = (req, res) => {
  res.render('dota/add', { title: 'Add New Hero', type: 'hero' });
};

// Add a new hero
exports.addHero = async (req, res) => {
  try {
    const { name, role, abilities, description, aliases, lore } = req.body;
    const hero = new Hero({
      name,
      role,
      abilities: abilities.split(',').map((ability) => ability.trim()), // Convert comma-separated abilities to an array
      description,
      aliases: aliases ? aliases.split(',').map((alias) => alias.trim()) : [], // Optional field for aliases
      lore,
    });
    await hero.save();
    res.redirect('/heroes');
  } catch (error) {
    console.error('Error adding hero:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Render form to edit an existing hero
exports.renderEditHeroForm = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).send('Hero not found');
    res.render('dota/edit', { title: 'Edit Hero', type: 'hero', data: hero });
  } catch (error) {
    console.error('Error fetching hero for editing:', error);
    res.status(500).send('Internal Server Error');
  }
};


// Edit an existing hero
exports.editHero = async (req, res) => {
  try {
    const { name, role, abilities, description, aliases, lore } = req.body;
    const updatedHero = {
      name,
      role,
      abilities: abilities.split(',').map((ability) => ability.trim()), // Convert comma-separated abilities to an array
      description,
      aliases: aliases ? aliases.split(',').map((alias) => alias.trim()) : [],
      lore,
    };
    await Hero.findByIdAndUpdate(req.params.id, updatedHero);
    res.redirect('/heroes');
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(500).send('Internal Server Error');
  }
};

// Delete a hero
exports.deleteHero = async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.redirect('/heroes');
  } catch (error) {
    console.error('Error deleting hero:', error);
    res.status(500).send('Internal Server Error');
  }
};

// View hero details
exports.heroDetails = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).send('Hero not found');
    res.render('heroDetails', { title: hero.name, hero: hero.toObject() });
  } catch (error) {
    console.error('Error fetching hero details:', error);
    res.status(500).send('Internal Server Error');
  }
};


