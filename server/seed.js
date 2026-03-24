const mongoose = require("mongoose");
const Food = require("./models/Food");
const foods = require("./data/food.json");

mongoose.connect("mongodb://localhost:27017/FoodApp")
  .then(async () => {
    await Food.deleteMany(); // optional (clears old data)
    await Food.insertMany(foods);
    console.log("All Foods Added Successfully!");
    process.exit();
  })
  .catch(err => console.log(err));
