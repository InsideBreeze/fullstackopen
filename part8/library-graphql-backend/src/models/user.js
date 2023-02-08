const uniqueValidator = require("mongoose-unique-validator");
const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favouriteGenre: String,
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
