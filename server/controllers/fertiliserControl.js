const fs = require("fs");
const Fertilisers = require("../models/fertiliser");

async function handleFertiliserCreation(req, res) {
  try {
    const { productName, description, price, quantityAvailable } = req.body;

    const newFertiliser = new Fertiliser({
      productName: productName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveFertiliser = await Fertilisers.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New Fertiliser created:- ${saveFertiliser.productName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating Fertiliser:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleFertiliserUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedFertiliser = await Fertilisers.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedFertiliser) {
      return res.status(404).json({ message: "Fertiliser not found" });
    }

    console.log(updatedFertiliser);
    res.status(200).json({
      Fertiliser: updatedFertiliser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleFertiliserDelete(req, res) {
  try {
    const id = req.params.id;
    await Fertilisers.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Fertiliser delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetFertiliser(req, res) {
  try {
    const id = req.params.id;
    const Fertiliser = await Fertilisers.findOne({
      _id: id,
    });

    if (!Fertiliser) {
      return res.status(404).json({ message: "No Fertiliser found for this user" });
    }

    res.status(200).json({ message: "Fertiliser found", Fertiliser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleFertiliserCreation,
  handleFertiliserUpdate,
  handleFertiliserDelete,
  handleGetFertiliser,
};
