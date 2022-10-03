const mongoose = require("mongoose");
const validator = require("validator");

const ObjectId = mongoose.Schema.Types.ObjectId;

const foodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      unique: true,
      maxLength: 100,
      trim: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    categories: [
      {
        name: {
          type: String,
        },
        id: { type: ObjectId, ref: "Category" },
      },
    ],
    createdBy: {
      name: {
        type: String,
      },
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
    info: String,
    images: {
      type: [String],
      validator: [validator.isURL, "Please provide a valid url"],
    },
    reviews: [
      {
        id: {
          type: ObjectId,
          ref: "Review",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// categories: [{ name: String, id: { type: ObjectId, ref: "Category" } }],

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
