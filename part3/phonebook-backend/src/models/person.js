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
  name: {
    type: String,
    minLength: 3,
    reuqired: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => /^\d{2,3}-\d+$/.test(v),
    },
  },
});

personSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("person", personSchema);
