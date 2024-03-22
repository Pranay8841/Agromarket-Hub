const { Router } = require("express");
const multer = require("multer");
const {
  handleVegetableCreation,
  handleVegetableUpdate,
  handleVegetableDelete,
  handleGetVegetable,
} = require("../controllers/vegetableControl");

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

router.get("/:id", handleGetVegetable);
router.post("/create", upload, handleVegetableCreation);
router.put("/update/:id", handleVegetableUpdate);
router.delete("/delete/:id", handleVegetableDelete);

module.exports = router;
