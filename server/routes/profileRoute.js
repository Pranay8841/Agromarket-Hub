const express = require("express")
const router = express.Router()

const { auth, isDealer } = require("../middlewares/authentication")

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getMyOrders,
    dealerDashboard,
} = require("../controllers/profileControl")

// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getMyOrders", auth, getMyOrders)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/dealerDashboard", auth, isDealer, dealerDashboard)

module.exports = router