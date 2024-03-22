const fs = require("fs");
const Milk = require("../models/milk");

async function handleMilkCreation(req, res) {
  try {
    const { sourceName, description, price, quantityAvailable } = req.body;

    const newMilk = new Milk({
      sourceName: sourceName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveMilk = await newMilk.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New Milk created:- ${saveMilk.grainName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating Milk:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleMilkUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedMilk = await Milk.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedMilk) {
      return res.status(404).json({ message: "Milk not found" });
    }

    console.log(updatedMilk);
    res.status(200).json({
      updatedMilk,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleMilkDelete(req, res) {
  try {
    const id = req.params.id;
    await Milk.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Milk delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetMilk(req, res) {
  try {
    const id = req.params.id;
    const Milk = await Milk.findOne({
      _id: id,
    });

    if (!Milk) {
      return res.status(404).json({ message: "No Milk found for this user" });
    }

    res.status(200).json({ message: "Milk found", Milk });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleMilkCreation,
  handleMilkUpdate,
  handleMilkDelete,
  handleGetMilk,
};
