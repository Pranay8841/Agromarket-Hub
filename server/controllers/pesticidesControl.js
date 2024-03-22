const fs = require("fs");
const Pesticides = require("../models/pesticides");

async function handlePesticidesCreation(req, res) {
  try {
    const { productName, description, price, quantityAvailable } = req.body;

    const newPesticides = new Pesticides({
      productName: productName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const savePesticides = await newPesticides.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New Pesticides created:- ${savePesticides.grainName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating Pesticides:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handlePesticidesUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedPesticides = await Pesticides.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedPesticides) {
      return res.status(404).json({ message: "Pesticides not found" });
    }

    console.log(updatedPesticides);
    res.status(200).json({
      updatedPesticides,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handlePesticidesDelete(req, res) {
  try {
    const id = req.params.id;
    await Pesticides.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Pesticides delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetPesticides(req, res) {
  try {
    const id = req.params.id;
    const Pesticides = await Pesticides.findOne({
      _id: id,
    });

    if (!Pesticides) {
      return res.status(404).json({ message: "No Pesticides found for this user" });
    }

    res.status(200).json({ message: "Pesticides found", Pesticides });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handlePesticidesCreation,
  handlePesticidesUpdate,
  handlePesticidesDelete,
  handleGetPesticides,
};
