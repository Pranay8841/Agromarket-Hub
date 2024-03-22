const fs = require("fs");
const Fruit = require("../models/fruit");

async function handleFruitCreation(req, res) {
  try {
    const { fruitName, description, price, quantityAvailable, color } =
      req.body;

    const newFruit = new Fruit({
      fruitName: fruitName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      color: color,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveFruit = await newFruit.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New Fruit created:- ${saveFruit.fruitName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating Fruit:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleFruitUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedFruit = await Fruit.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedFruit) {
      return res.status(404).json({ message: "Fruit not found" });
    }

    console.log(updatedFruit);
    res.status(200).json({
      updatedFruit,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleFruitDelete(req, res) {
  try {
    const id = req.params.id;
    await Fruit.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Fruit delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetFruit(req, res) {
  try {
    const id = req.params.id;
    const Fruit = await Fruit.findOne({
      _id: id,
    });

    if (!Fruit) {
      return res.status(404).json({ message: "No Fruit found for this user" });
    }

    res.status(200).json({ message: "Fruit found", Fruit });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleFruitCreation,
  handleFruitUpdate,
  handleFruitDelete,
  handleGetFruit,
};
