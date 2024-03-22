const { Schema, model } = require("mongoose");

const cerealSchema = new Schema(
  {
    grainName: {
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

const Cereal = model("cereal", cerealSchema);

module.exports = Cereal;
