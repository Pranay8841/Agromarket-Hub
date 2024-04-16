// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifyPayment, sendPaymentSuccessEmail } = require("../controllers/paymentsControl")
const { auth, isFarmer} = require("../middlewares/authentication")
router.post("/capturePayment", auth, isFarmer, capturePayment)
router.post("/verifyPayment",auth, isFarmer, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, isFarmer, sendPaymentSuccessEmail);

module.exports = router