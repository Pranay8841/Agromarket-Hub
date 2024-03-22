const fs = require("fs");
const Machines = require("../models/machines");

async function handleMachineCreation(req, res) {
  try {
    const {
      productName,
      description,
      manufacturer,
      price,
      quantityAvailable,
      modelNumber,
      weight,
      imageURL,
    } = req.body;

    const newMachine = new Machines({
      productName: productName,
      description: description,
      manufacturer: manufacturer,
      price: price,
      quantityAvailable: quantityAvailable,
      modelNumber: modelNumber,
      weight: weight,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveMachine = await newMachine.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New machine created:- ${saveMachine.productName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      error: "Server Error",
    });
  }
}

async function handleMachineUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedMachine = await Machines.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedMachine) {
      return res.status(404).json({ message: "Machine not found" });
    }

    console.log(updatedMachine);
    res.status(200).json({
      machine: updatedMachine,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleMahineDelete(req, res) {
  try {
    const id = req.params.id;
    await Machines.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Machine delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetMachine(req, res) {
  try {
    const id = req.params.id;
    const machine = await Machines.findOne({
      _id: id,
    });

    if (!machine) {
      return res
        .status(404)
        .json({ message: "No machine found for this user" });
    }

    res.status(200).json({ message: "Machine found", machine });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleMachineCreation,
  handleMachineUpdate,
  handleMahineDelete,
  handleGetMachine,
};
