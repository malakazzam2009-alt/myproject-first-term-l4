const mongoose = require("mongoose");
const config = require("../config/Appconfig");

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;