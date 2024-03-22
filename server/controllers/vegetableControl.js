const fs = require("fs");
const Vegetable = require("../models/vegetable");

async function handleVegetableCreation(req, res) {
  try {
    const { vegetableName, description, price, quantityAvailable } = req.body;

    const newVegetable = new Vegetable({
      vegetableName: vegetableName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveVegetable = await newVegetable.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New Vegetable created:- ${saveVegetable.grainName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating Vegetable:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleVegetableUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedVegetable = await Vegetable.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedVegetable) {
      return res.status(404).json({ message: "Vegetable not found" });
    }

    console.log(updatedVegetable);
    res.status(200).json({
      updatedVegetable,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleVegetableDelete(req, res) {
  try {
    const id = req.params.id;
    await Vegetable.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Vegetable delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetVegetable(req, res) {
  try {
    const id = req.params.id;
    const Vegetable = await Vegetable.findOne({
      _id: id,
    });

    if (!Vegetable) {
      return res.status(404).json({ message: "No Vegetable found for this user" });
    }

    res.status(200).json({ message: "Vegetable found", Vegetable });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleVegetableCreation,
  handleVegetableUpdate,
  handleVegetableDelete,
  handleGetVegetable,
};
