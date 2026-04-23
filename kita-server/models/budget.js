const mongoose = require('mongoose')

const BudgetSchema = new mongoose.Schema({
    category: String,
    budgetLimit: Number,
    month: Number,
    year: Number,
}, { timestamps: true })

const BudgetModel = mongoose.model("budgets", BudgetSchema)
module.exports = BudgetModel