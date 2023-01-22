const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_DB_URL;

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("failed", error);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("person", personSchema);
