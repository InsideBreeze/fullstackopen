const mongoose = require("mongoose");

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    "usages: node mongoose.js <password> or node mongoose.js <password> <name> <number> "
  );
  process.exit(1);
}

const url = `mongodb+srv://zephyr:${process.argv[2]}@cluster0.hci3l4e.mongodb.net/?retryWrites=true&w=majority`;

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
// model
const Person = mongoose.model("person", personSchema);

if (process.argv.length == 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then((result) => {
    console.log(`added ${result.name} ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}
