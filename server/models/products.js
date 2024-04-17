const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    status: {
        type: String,
        enum: ["Available", "Sold Out", "Draft"],
        default: "Draft",
    },
    quantityAvailable: { 
        type: Number, 
        default: 0 
    },
    benefits: {
        type: String,
    },
    customerEngaged:[
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    isProcessed: {
        type: Boolean,
        default: false,
    },
    isShipped: {
        type: Boolean,
        default: false,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("Product", productsSchema)