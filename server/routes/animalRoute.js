const { Router } = require("express");
const multer = require("multer");
const {
  handleAnimalCreation,
  handleAnimalDelete,
  handleAnimalUpdate,
  handleGetAnimal,
} = require("../controllers/animalControl");

const path = require("path");

const router = Router();

// Set up Multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/products/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

// Set up Multer upload instance
const upload = multer({ storage: storage }).single("imageURL");

router.get("/:id", handleGetAnimal);
router.post("/create", upload, handleAnimalCreation);
router.put("/update/:id", handleAnimalUpdate);
router.delete("/delete/:id", handleAnimalDelete);

module.exports = router;
