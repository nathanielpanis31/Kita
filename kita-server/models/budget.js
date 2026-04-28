const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    category: String,
    budgetLimit: Number,
    month: Number,
    year: Number,
    isPermanent: { type: Boolean, default: false }
}, { timestamps: true })

const BudgetModel = mongoose.model("budgets", BudgetSchema)
module.exports = BudgetModel