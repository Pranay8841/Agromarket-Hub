const { Schema, model } = require("mongoose");

const mechanicalEquipmentSchema = new Schema(
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
    size: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MechanicalEquipment = model(
  "mechanicalEquipment",
  mechanicalEquipmentSchema
);
module.exports = MechanicalEquipment;
