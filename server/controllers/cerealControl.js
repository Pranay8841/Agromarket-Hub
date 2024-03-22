const fs = require("fs");
const Cereal = require("../models/cereal");

async function handleCerealCreation(req, res) {
  try {
    const { grainName, description, price, quantityAvailable } = req.body;

    const newCereal = new Cereal({
      grainName: grainName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveCereal = await newCereal.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New cereal created:- ${saveCereal.grainName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating cereal:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleCerealUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedCereal = await Cereal.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedCereal) {
      return res.status(404).json({ message: "Cereal not found" });
    }

    console.log(updatedCereal);
    res.status(200).json({
      updatedCereal,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleCerealDelete(req, res) {
  try {
    const id = req.params.id;
    await Cereal.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Cereal delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetCereal(req, res) {
  try {
    const id = req.params.id;
    const cereal = await Cereal.findOne({
      _id: id,
    });

    if (!cereal) {
      return res.status(404).json({ message: "No Cereal found for this user" });
    }

    res.status(200).json({ message: "Cereal found", cereal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleCerealCreation,
  handleCerealUpdate,
  handleCerealDelete,
  handleGetCereal,
};
