const { Schema, model } = require("mongoose");

const fruitSchema = new Schema(
  {
    fruitName: {
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
    color: {
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

const Fruit = model("fruit", fruitSchema);

module.exports = Fruit;
