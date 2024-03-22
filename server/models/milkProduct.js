const { Schema, model } = require("mongoose");

const milkProductSchema = new Schema(
  {
    productName: {
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
    type: {
      type: String,
      required: true,
    },
    shelfLife: {
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

const MilkProduct = model("milkProduct", milkProductSchema);

module.exports = MilkProduct;
