
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    date: String,
    symbol: String,
    open: Number,
    close: Number,
    low: Number,
    high: Number,
    volume: Number,
    gain: Number
});

const Stock = module.exports = mongoose.model('stock', schema, 'stock-archive');
