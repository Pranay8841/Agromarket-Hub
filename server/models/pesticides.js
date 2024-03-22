const { Schema, model } = require("mongoose");

const pesticidesSchema = new Schema(
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
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pesticides = model("pesticides", pesticidesSchema);

module.exports = Pesticides;
