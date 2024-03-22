const fs = require("fs");
const Seed = require("../models/seed");

async function handleSeedCreation(req, res) {
  try {
    const { seedName, description, price, quantityAvailable } = req.body;

    const newSeed = new Seed({
      seedName: seedName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveSeed = await newSeed.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New Seed created:- ${saveSeed.grainName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating Seed:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleSeedUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedSeed = await Seed.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedSeed) {
      return res.status(404).json({ message: "Seed not found" });
    }

    console.log(updatedSeed);
    res.status(200).json({
      updatedSeed,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleSeedDelete(req, res) {
  try {
    const id = req.params.id;
    await Seed.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Seed delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetSeed(req, res) {
  try {
    const id = req.params.id;
    const Seed = await Seed.findOne({
      _id: id,
    });

    if (!Seed) {
      return res.status(404).json({ message: "No Seed found for this user" });
    }

    res.status(200).json({ message: "Seed found", Seed });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleSeedCreation,
  handleSeedUpdate,
  handleSeedDelete,
  handleGetSeed,
};
