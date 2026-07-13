const app = require("./app");
const connectDB = require("./db/connectDB.js");
const config = require("./config/Appconfig.js");

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error("Server failed to start");
  }
};

startServer();