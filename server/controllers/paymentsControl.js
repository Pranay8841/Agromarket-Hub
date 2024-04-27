const { instance } = require("../config/razorpay")
const Product = require("../models/products")
const crypto = require('crypto')
const User = require("../models/user")
const mailSender = require("../utils/mailSender");
const mongoose = require('mongoose')
const { courseEnrollmentEmail } = require("../MailTemplates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../MailTemplates/paymentSuccessEmail")


// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    const { products } = req.body
    const userId = req.user.id
    if (products.length === 0) {
        return res.json({
            success: false,
            message: "Please Provide Product ID"
        })
    }

    let total_amount = 0

    for (const product_id of products) {
        let product
        try {
            // Find the course by its ID
            product = await Product.findById(product_id)

            // If the course is not found, return an error
            if (!product) {
                return res.status(200).json({
                    success: false,
                    message: "Could not find the Product"
                })
            }

            // // Check if the user is already enrolled in the course
            // const uid = new mongoose.Types.ObjectId(userId)
            // if (course.studentsEnroled.includes(uid)) {
            //     return res
            //         .status(200)
            //         .json({ success: false, message: "Student is already Enrolled" })
            // }

            // Add the price of the course to the total amount
            total_amount += product.price
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    const options = {
        amount: total_amount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        // Initiate the payment using Razorpay
        const paymentResponse = await instance.orders.create(options)
        console.log(paymentResponse)
        res.json({
            success: true,
            data: paymentResponse,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Could not initiate order."
        })
    }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const products = req.body?.products

    const userId = req.user.id

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !products ||
        !userId
    ) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex")

    if (expectedSignature === razorpay_signature) {
        await addOrder(products, userId, res);
        return res.status(200).json({
            success: true,
            message: "Payment Verified"
        })
    }

    return res.status(200).json({
        success: false,
        message: "Payment Failed"
    })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body

    const userId = req.user.id

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ 
            success: false, 
            message: "Please provide all the details" 
        })
    }

    try {
        const customer = await User.findById(userId)

        await mailSender(
            customer.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${customer.firstName} ${customer.lastName}`,
                amount / 100,
                orderId,
                paymentId
            )
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res.status(400).json({ 
                success: false, 
                message: "Could not send email" 
        })
    }
}

// Add order to the User order list
const addOrder = async (products, userId, res) => {
    if (!products || !userId) {
      return res.status(400).json({ 
        success: false, 
        message: "Please Provide Product ID and User ID" 
      })
    }
  
    for (const productId of products) {
      try {
        // Find the course and enroll the student in it
        console.log("Before adding product")
        const orderedProduct = await Product.findOneAndUpdate(
          { _id: productId },
          {$push: {
            customerEngaged: userId
          }},
          { new: true },
        )
  
        if (!orderedProduct) {
          return res.status(500).json({ 
                success: false, 
                error: "Course not found" 
            })
        }
        console.log("Ordered Product: ", orderedProduct)
  
        // Find the User and add the Product to their list of Ordered Products
        const orderedUser = await User.findByIdAndUpdate(
          userId,
          {
            $push: {
              products: productId,
            },
          },
          { new: true }
        )
  
        console.log("Enrolled student: ", orderedUser)
        // Send an email notification to the enrolled student
        const emailResponse = await mailSender(
          orderedUser.email,
          `Successfully Enrolled into ${orderedProduct.productName}`,
          courseEnrollmentEmail(
            orderedProduct.productName,
            `${orderedUser.firstName} ${orderedUser.lastName}`
          )
        )
  
        console.log("Email sent successfully: ", emailResponse.response)
      } catch (error) {
        console.log(error)
        return res.status(400).json({ 
            success: false, 
            error: error.message 
        })
      }
    }
  }