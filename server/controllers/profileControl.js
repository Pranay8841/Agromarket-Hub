const mongoose = require('mongoose')
const User = require("../models/user")
const Profile = require("../models/userProfile")
const Product =  require("../models/products")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const products = require('../models/products')

exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "",
            about = "",
            contactNumber = "",
            gender = "",
        } = req.body;

        const id = req.user.id;

        // find the profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })

        await user.save()

        // Update the profile fields
        profile.dateOfBirth = dateOfBirth
        profile.about = about
        profile.contactNumber = contactNumber
        profile.gender = gender

        // save the updated profile
        await profile.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id
        console.log(id)
        const user = await User.findById({ _id: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        // Delete Assosiated Profile with the User
        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.additionalDetails),
        })

        // for (const courseId of user.courses) {
        // 	await Course.findByIdAndUpdate(
        // 		courseId,
        // 		{ $pull: { studentsEnroled: id } },
        // 		{ new: true }
        // 	)
        // }

        // Now Delete User
        await User.findByIdAndDelete({ _id: id })
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })

        // await CourseProgress.deleteMany({ userId: id })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "User Cannot be deleted successfully"
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec()
        console.log(userDetails)
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: userDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path: "products",
        }).exec()

        userDetails = userDetails.toObject()
        console.log("User Details...", userDetails)

        // for (var i = 0; i < userDetails.products.length; i++) {

        //   // Add progress tracking logic here
        //   let orderStatus = "Pending"; // Initial status assuming the order is pending
        //   if (userDetails.products[i].isDelivered) {
        //     orderStatus = "Delivered";
        //   } else if (userDetails.products[i].isShipped) {
        //     orderStatus = "Shipped";
        //   } else if (userDetails.products[i].isProcessed) {
        //     orderStatus = "Processed";
        //   }
        //   userDetails.products[i].orderStatus = orderStatus;
        // }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: userDetails.products,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.dealerDashboard = async (req, res) => {
    try {
        const productDetails = await Product.find({ dealer: req.user.id })

        const productData = productDetails.map((product) => {
            const totalCustomerEngaged = product.customerEngaged.length
            const totalAmountGenerated = totalCustomerEngaged * product.price

            // Create a new object with the additional fields
            const productDataWithStats = {
                _id: product._id,
                productName: product.productName,
                productDescription: product.productDescription,
                // Include other course properties as needed
                totalCustomerEngaged,
                totalAmountGenerated,
            }

            return productDataWithStats
        })

        res.status(200).json({ 
            products: productData 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ 
            message: "Server Error" 
        })
    }
}