const { Router } = require("express");
const multer = require("multer");
const {
  handleGetMechanicalEquipment,
  handleMechanicalEquipmentCreation,
  handleMechanicalEquipmentUpdate,
  handleMechanicalEquipmentDelete,
} = require("../controllers/mechanicalEquipmentControl");

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

router.get("/:id", handleGetMechanicalEquipment);
router.post("/create", upload, handleMechanicalEquipmentCreation);
router.put("/update/:id", handleMechanicalEquipmentUpdate);
router.delete("/delete/:id", handleMechanicalEquipmentDelete);

module.exports = router;
