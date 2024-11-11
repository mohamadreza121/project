// seed.js
const mongoose = require('mongoose');
const Hero = require('./server/model/hero');
const Item = require('./server/model/item');

// Connect to MongoDB
mongoose.connect("mongodb+srv://mohamadreza121:Mohamad5070m$@cluster0.brspu.mongodb.net/dota")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Add sample heroes and items
const seedData = async () => {
  try {
    // Create a sample hero
    await Hero.create({
      name: "Invoker",
      role: "Mage",
      abilities: ["Quas", "Wex", "Exort"],
      description: "Invoker is a powerful mage with a range of abilities."
    });

    // Create a sample item
    await Item.create({
      name: "Blink Dagger",
      type: "Mobility",
      cost: 2250,
      description: "Allows the hero to teleport a short distance."
    });

    console.log("Sample data added successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

// Run the seed function
seedData();
