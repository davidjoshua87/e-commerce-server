'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


module.exports = mongoose.model('Category', schema({
    name: String,
})
)