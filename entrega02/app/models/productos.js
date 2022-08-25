const mongoose = require('mongoose')

const prodsSchema = new mongoose.Schema({
    title:  String,
    price: Number,
    url:   String,
    date: Date
});

module.exports = mongoose.model('productos', prodsSchema);