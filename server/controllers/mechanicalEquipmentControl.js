const fs = require("fs");
const MechanicalEquipment = require("../models/mechanicalEquipment");

async function handleMechanicalEquipmentCreation(req, res) {
  try {
    const { productName, description, price, quantityAvailable, size, weight } =
      req.body;

    const newMechanicalEquipment = new MechanicalEquipment({
      productName: productName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      size: size,
      weight: weight,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveMechanicalEquipment = await newMechanicalEquipment.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New MechanicalEquipment created:- ${
          saveMechanicalEquipment.productName
        } Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating MechanicalEquipment:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleMechanicalEquipmentUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedMechanicalEquipment =
      await MechanicalEquipment.findByIdAndUpdate(
        { _id: id },
        { $set: updateDetails },
        { new: true }
      );

    if (!updatedMechanicalEquipment) {
      return res.status(404).json({ message: "MechanicalEquipment not found" });
    }

    console.log(updatedMechanicalEquipment);
    res.status(200).json({
      updatedMechanicalEquipment,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleMechanicalEquipmentDelete(req, res) {
  try {
    const id = req.params.id;
    await MechanicalEquipment.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("MechanicalEquipment delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetMechanicalEquipment(req, res) {
  try {
    const id = req.params.id;
    const MechanicalEquipment = await MechanicalEquipment.findOne({
      _id: id,
    });

    if (!MechanicalEquipment) {
      return res
        .status(404)
        .json({ message: "No MechanicalEquipment found for this user" });
    }

    res
      .status(200)
      .json({ message: "MechanicalEquipment found", MechanicalEquipment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleGetMechanicalEquipment,
  handleMechanicalEquipmentCreation,
  handleMechanicalEquipmentUpdate,
  handleMechanicalEquipmentDelete,
};
