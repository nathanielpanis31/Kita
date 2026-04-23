const BudgetModel = require('../models/budget')

const addBudget = (req, res) => {
    const { category, budgetLimit, month, year } = req.body

    BudgetModel.create({ category, budgetLimit, month, year })
    .then(budget => res.json(budget))
    .catch(err => res.json(err))
}

const getBudgets = (req, res) => {
    const { month, year } = req.query

    BudgetModel.find({ month: month, year: year })
    .then(budgets => res.json(budgets))
    .catch(err => res.json(err))
}

const deleteBudget = (req, res) => {
    const { id } = req.params

    BudgetModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

module.exports = { addBudget, getBudgets, deleteBudget }