const { Router } = require("express");
const multer = require("multer");
const {
  handleMilkProductCreation,
  handleMilkProductUpdate,
  handleMilkProductDelete,
  handleGetMilkProduct,
} = require("../controllers/milkProductControl");

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

router.get("/:id", handleGetMilkProduct);
router.post("/create", upload, handleMilkProductCreation);
router.put("/update/:id", handleMilkProductUpdate);
router.delete("/delete/:id", handleMilkProductDelete);

module.exports = router;
