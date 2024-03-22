const { Router } = require("express");
const multer = require("multer");
const {
  handlePesticidesCreation,
  handlePesticidesUpdate,
  handlePesticidesDelete,
  handleGetPesticides,
} = require("../controllers/pesticidesControl");

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

router.get("/:id", handleGetPesticides);
router.post("/create", upload, handlePesticidesCreation);
router.put("/update/:id", handlePesticidesUpdate);
router.delete("/delete/:id", handlePesticidesDelete);

module.exports = router;
