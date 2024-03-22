const { Mongoose } = require("mongoose");
const Category = require("../models/productCategory");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const CategorysDetails = await Category.create({
            name: name,
            description: description,
        });

        console.log(CategorysDetails);

        return res.status(200).json({
            success: true,
            message: "Categorys Created Successfully",
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: true,
            message: "Error Occured While Creating Category",
        });
    }
};

exports.showAllCategories = async (req, res) => {
    try {
        console.log("INSIDE SHOW ALL CATEGORIES");

        const allCategorys = await Category.find({});

        res.status(200).json({
            success: true,
            data: allCategorys,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Error Occured While showing All Categories",
        });
    }
};

exports.CategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        console.log("Printing Category Id: ", categoryId);

        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "products",
                match: {
                    status: "Available",
                },
            }).exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        // Handle the case when there are no products
        if (selectedCategory.products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Products found for the selected category.",
            })
        }

        // Get top-selling courses across all categories
        const allCategories = await Category.find()
            .populate({
                path: "products",
                match: { status: "Available" },
                populate: {
                    path: "dealer",
                },
            })
            .exec()

        const allProducts = allCategories.flatMap((category) => category.products)
        const mostSellingProducts = allProducts
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)

        // console.log("mostSellingCourses COURSE", mostSellingCourses)
        res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                mostSellingProducts,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error Occured While Fetching Category Page Details",
            error: error.message,
        })
    }
}