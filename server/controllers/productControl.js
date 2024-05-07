const Product = require("../models/products");
const Category = require("../models/productCategory");
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.createProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log("Request Body", req.body);

        let {
            productName,
            productDescription,
            price,
            tag: _tag,
            category,
            status,
            quantityAvailable,
        } = req.body;

        // console.log(req.body)

        const thumbnail = req.files.thumbnailImage;
        // console.log("Thumb")

        console.log("_tag:", _tag);

        const tag = JSON.parse(_tag);
        console.log("Tag for Product", tag);

        if (
            !productName ||
            !productDescription ||
            !price ||
            !tag.length ||
            !thumbnail ||
            !category ||
            !quantityAvailable
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Mandatory",
            })
        };

        if (!status || status === undefined) {
            status = "Draft"
        }

        const dealerDetails = await User.findById(userId, {
            accountType: "Dealer",
        });

        if (!dealerDetails) {
            return res.status(404).json({
                success: false,
                message: "Dealer Details Not Found",
            })
        };

        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found",
            })
        };

        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        )

        console.log("Thumbnail Image", thumbnailImage);

        const newProduct = await Product.create({
            productName,
            productDescription,
            dealer: dealerDetails._id,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            quantityAvailable,
        });

        await User.findByIdAndUpdate(
            {
                _id: dealerDetails._id,
            },
            {
                $push: {
                    products: newProduct._id,
                }
            },
            {
                new: true,
            }
        )

        const categoryDetails2 = await Category.findByIdAndUpdate(
            {
                _id: category,
            },
            {
                $push: {
                    products: newProduct._id,
                }
            },
            {
                new: true,
            },
        );

        console.log("Category Details 2", categoryDetails2);

        res.status(200).json({
            success: true,
            data: newProduct,
            message: "Product Created Successfully",
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to create Product",
            error: error.message,
        })
    }
}

exports.editProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const updates = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                error: "Product not found"
            })
        }

        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            product.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag") {
                    product[key] = JSON.parse(updates[key])
                } else {
                    product[key] = updates[key]
                }
            }
        }

        await product.save();

        const updatedProduct = await Product.findOne({
            _id: productId,
        })
            .populate({
                path: "dealer",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .exec()

        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Error Occured While Editing Product",
            error: error.message,
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find(
            {
                status: "Available",
            },
            {
                productName: true,
                price: true,
                thumbnail: true,
                dealer: true,
                quantityAvailable: true,
                customerEngaged: true,
            }
        ).populate("dealer").exec();

        return res.status(200).json({
            success: true,
            data: allProducts,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: `Can't Fetch Product Data`,
            error: error.message,
        })
    }
}

exports.getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;
        const productDetails = await Product.findOne({
            _id: productId,
        })
            .populate({
                path: "dealer",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .exec();

        if (!productDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${productId}`,
            })
        }

        return res.status(200).json({
            success: true,
            data: productDetails,
            message: "Able to Get Product Details"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getFullProductDetails = async (req, res) => {
    try {
        const { productId } = req.body
        // const userId = req.user.id
        const productDetails = await Product.findOne({
            _id: productId,
        })
            .populate({
                path: "dealer",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .exec()

        if (!productDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${productId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        return res.status(200).json({
            success: true,
            data: {
                productDetails,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get a list of Products for a given Dealer
exports.getDealerProducts = async (req, res) => {
    try {
        // Get the Dealer ID from the authenticated user or request body
        const dealerId = req.user.id

        // Find all Products belonging to the Dealer
        const dealerProducts = await Product.find({
            dealer: dealerId,
        }).sort({ createdAt: -1 })

        // Return the dealer's products
        res.status(200).json({
            success: true,
            data: dealerProducts,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve dealer products",
            error: error.message,
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        const customerEngaged = product.customerEngaged
        for(const productId of customerEngaged){
            await User.findByIdAndUpdate(productId, {
                $pull: {
                    products:productId,
                }
            })
        }

        await Product.findByIdAndDelete(productId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Error Occured While Deleting The Product",
            error: error.message,
        })
    }
}