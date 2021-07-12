const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type:Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },  
    rating: {
        type: Number,
    required: true
    },
    
    registerDate: {
        type: Date,
        required: true,
        default: new Date()
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;