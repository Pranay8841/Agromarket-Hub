const { Router } = require("express");
const multer = require("multer");
const {
  handleCerealCreation,
  handleCerealDelete,
  handleCerealUpdate,
  handleGetCereal,
} = require("../controllers/cerealControl");

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

router.get("/:id", handleGetCereal);
router.post("/create", upload, handleCerealCreation);
router.put("/update/:id", handleCerealUpdate);
router.delete("/delete/:id", handleCerealDelete);

module.exports = router;
