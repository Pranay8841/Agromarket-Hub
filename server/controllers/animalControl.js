const fs = require("fs");
const Animal = require("../models/animal");

async function handleAnimalCreation(req, res) {
  try {
    const { animalName, description, price, quantityAvailable, breed, age } =
      req.body;

    const newAnimal = new Animal({
      animalName: animalName,
      description: description,
      price: price,
      quantityAvailable: quantityAvailable,
      breed: breed,
      age: age,
      imageURL: `/uploads/products/${req.file.filename}`,
    });

    const saveAnimal = await newAnimal.save();
    try {
      await fs.promises.appendFile(
        "../log.txt",
        `New animal created:- ${saveAnimal.animalName} Date- ${Date()}\n`
      );
      console.log("Log appended successfully");
    } catch (error) {
      console.error("Error appending to log:", error);
    }

    return res.status(201).redirect("/");
  } catch (error) {
    console.error("Error creating animal:", error);
    return res.status(500).json({
      error: "Error machine user",
    });
  }
}

async function handleAnimalUpdate(req, res) {
  try {
    const id = req.params.id;
    const updateDetails = req.body;

    console.log(id);

    console.log(updateDetails);

    const updatedAnimal = await Animal.findByIdAndUpdate(
      { _id: id },
      { $set: updateDetails },
      { new: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }

    console.log(updatedAnimal);
    res.status(200).json({
      animal: updatedAnimal,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server side Error",
    });
  }
}

async function handleAnimalDelete(req, res) {
  try {
    const id = req.params.id;
    await Animal.findByIdAndDelete({
      _id: id,
    });

    res.status(204).json("Animal delete");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

async function handleGetAnimal(req, res) {
  try {
    const id = req.params.id;
    const animal = await Animal.findOne({
      _id: id,
    });

    if (!animal) {
      return res.status(404).json({ message: "No animal found for this user" });
    }

    res.status(200).json({ message: "Machine found", animal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleAnimalDelete,
  handleAnimalUpdate,
  handleGetAnimal,
  handleAnimalCreation,
};
