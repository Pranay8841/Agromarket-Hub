const { Schema, model } = require("mongoose");

const vegetableSchema = new Schema(
  {
    vegetableName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    quantityAvailable: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vegetable = model("vegetable", vegetableSchema);

module.exports = Vegetable;
