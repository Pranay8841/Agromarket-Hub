const { Router } = require("express");
const multer = require("multer");
const {
  handleMilkCreation,
  handleMilkUpdate,
  handleMilkDelete,
  handleGetMilk,
} = require("../controllers/milkControl");

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

router.get("/:id", handleGetMilk);
router.post("/create", upload, handleMilkCreation);
router.put("/update/:id", handleMilkUpdate);
router.delete("/delete/:id", handleMilkDelete);

module.exports = router;
