const { Router } = require("express");
const multer = require("multer");
const {
  handleSeedCreation,
  handleSeedUpdate,
  handleSeedDelete,
  handleGetSeed,
} = require("../controllers/seedControl");

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

router.get("/:id", handleGetSeed);
router.post("/create", upload, handleSeedCreation);
router.put("/update/:id", handleSeedUpdate);
router.delete("/delete/:id", handleSeedDelete);

module.exports = router;
