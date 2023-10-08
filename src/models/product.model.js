const mongoose = require ("mongoose");

const productCollection = 'products'

const productSchema = new mongoose.Schema({

    name: {type:String, required: true},
    price: {type: Number, required: true},
    description: {type:String, required: true},
    code:  {type: Number, required:true},
    stock:  {type: Number, required:true},
    category: {type:String, required:true}
})

const productModel = mongoose.model(productCollection,productSchema)
module.exports = {productModel}