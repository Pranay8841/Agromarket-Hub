const { Router } = require("express");
const multer = require("multer");
const {
  handleFruitCreation,
  handleFruitUpdate,
  handleFruitDelete,
  handleGetFruit,
} = require("../controllers/fruitControl");

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

router.get("/:id", handleGetFruit);
router.post("/create", upload, handleFruitCreation);
router.put("/update/:id", handleFruitUpdate);
router.delete("/delete/:id", handleFruitDelete);

module.exports = router;
