// Import the required modules
const express = require("express")
const router = express.Router()

const {
    createProduct,
    editProduct,
    getAllProducts,
    getProductDetails,
    deleteProduct,
} = require("../controllers/productControl")

const {
    createCategory,
    showAllCategories,
    CategoryPageDetails,
} = require("../controllers/categoryControl")

const {
    auth,
    isAdmin,
    isFarmer,
    isDealer,
    isShopkeeper,
} = require("../middlewares/authentication")

router.post("/createProduct", auth, isDealer, createProduct);

router.get("/getAllProducts", getAllProducts);

router.post("/getProductDetails", getProductDetails);

router.post("/editProduct", auth, isDealer, editProduct);

router.delete("/deleteProduct", deleteProduct);

router.post("/createCategory", auth, isAdmin, createCategory);

router.get("/showAllCategories", showAllCategories);

router.post("/getCategoryPageDetails", CategoryPageDetails);

module.exports = router;