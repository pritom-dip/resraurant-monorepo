const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is a required field"],
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 50,
  },
  mobile: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  photo: {
    type: String,
    default: "https://via.placeholder.com/350x150",
    validate: [validator.isURL, "Please provide a valid url"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 6,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
    validate: {
      validator: function (el) {
        // Only works on save
        return this.password === el;
      },
      message: "Password doesn't match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

//Check password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
