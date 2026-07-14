const mongoose = require("mongoose");

// Connect to MongoDB database
const connectDB = async () => {
  try {
    // Connect using the URI from .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected...");
  } catch (error) {
    // Display connection error
    console.error("Database Connection Failed");
    console.error(error.message);

    // Stop the server if the database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;