const mongoose = require("mongoose");
const validator = require("validator");

const cagegorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      lowercase: true,
      unique: [true, "Name must be unique"],
      maxLength: 100,
      trim: true,
    },
    description: String,
    image: {
      type: String,
      validate: [validator.isURL, "Please provide a valid URL"],
      default: "https://via.placeholder.com/350x150",
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "deleted"],
        message:
          "{VALUE} is wrong. Field can be either active, inactive ot deleted",
      },
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", cagegorySchema);

module.exports = Category;
