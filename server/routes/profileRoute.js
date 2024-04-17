const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/authentication")

const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getMyOrders
} = require("../controllers/profileControl")

// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
router.get("/getMyOrders", auth, getMyOrders)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router