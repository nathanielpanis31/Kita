const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    label: String,
    amount: Number,
    type: String,
    category: String,
    date: Date,
}, { timestamps: true })

const TransactionModel = mongoose.model("transactions", TransactionSchema)
module.exports = TransactionModel