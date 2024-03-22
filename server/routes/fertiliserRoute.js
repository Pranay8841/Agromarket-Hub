const { Router } = require("express");
const multer = require("multer");
const {
  handleFertiliserCreation,
  handleFertiliserUpdate,
  handleFertiliserDelete,
  handleGetFertiliser,
} = require("../controllers/fertiliserControl");

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

router.get("/:id", handleGetFertiliser);
router.post("/create", upload, handleFertiliserCreation);
router.put("/update/:id", handleFertiliserUpdate);
router.delete("/delete/:id", handleFertiliserDelete);

module.exports = router;
