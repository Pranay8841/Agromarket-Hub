const { Router } = require("express");
const multer = require("multer");
const {
  handleMachineCreation,
  handleMachineUpdate,
  handleMahineDelete,
  handleGetMachine,
} = require("../controllers/machinesControl");

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

router.get("/:id", handleGetMachine);
router.post("/create", upload, handleMachineCreation);
router.put("/update/:id", handleMachineUpdate);
router.delete("/delete/:id", handleMahineDelete);

module.exports = router;
