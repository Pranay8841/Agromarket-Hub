const fs = require("fs");
const MilkProduct = require("../models/milkProduct");

async function handleMilkProductCreation(req, res) {
  try {
    const {
      productName,
      description,
      price,
      quantityAvailable,
      type,
      shelfLife,
    } = req.body;

    const newMilkProduct = new MilkProduct({
      productName: productName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      type: type,
      shelfLife: shelfLife,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveMilkProduct = await newMilkProduct.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New MilkProduct created:- ${
          saveMilkProduct.grainName
        } Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating MilkProduct:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleMilkProductUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedMilkProduct = await MilkProduct.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedMilkProduct) {
      return res.status(404).json({ message: "MilkProduct not found" });
    }

    console.log(updatedMilkProduct);
    res.status(200).json({
      updatedMilkProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleMilkProductDelete(req, res) {
  try {
    const id = req.params.id;
    await MilkProduct.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("MilkProduct delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetMilkProduct(req, res) {
  try {
    const id = req.params.id;
    const MilkProduct = await MilkProduct.findOne({
      _id: id,
    });

    if (!MilkProduct) {
      return res
        .status(404)
        .json({ message: "No MilkProduct found for this user" });
    }

    res.status(200).json({ message: "MilkProduct found", MilkProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleMilkProductCreation,
  handleMilkProductUpdate,
  handleMilkProductDelete,
  handleGetMilkProduct,
};
