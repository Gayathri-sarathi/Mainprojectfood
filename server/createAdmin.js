const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/yourdbname");

async function createAdmin() {
  const admin = new User({
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin"
  });

  await admin.save();
  console.log("Admin created successfully!");
  process.exit();
}

createAdmin();
