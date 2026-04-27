const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    label: String,
    amount: Number,
    type: String,
    category: String,
    date: Date,
}, { timestamps: true })

const TransactionModel = mongoose.model("transactions", TransactionSchema)
module.exports = TransactionModel