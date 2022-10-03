const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
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
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
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
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

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

userSchema.methods.changePasswordAfter = function (jwtTime) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTime < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
