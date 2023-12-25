const mongoose = require("mongoose");

const app = require("./app");

const { MONGO_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log("Error connecting to the database:", e.message);
    process.exit(1);
  });
