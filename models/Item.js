'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

module.exports = mongoose.model('Item', schema({
    name: String,
    imageUrl: String,
    price: Number,
    stock: Number,
    category: {
        type: schema.Types.ObjectId,
        ref: 'Category'
    },
}))