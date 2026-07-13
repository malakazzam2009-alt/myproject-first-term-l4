const app = require("./app");
const connectDB = require("./db/db");
const config = require("./config/Appconfig.js");

connectDB();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});