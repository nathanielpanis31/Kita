const BudgetModel = require('../models/budget')

const addBudget = (req, res) => {
    const { category, budgetLimit, month, year, isPermanent } = req.body
    const userId = req.userId

    BudgetModel.create({ userId, category, budgetLimit, month, year, isPermanent })
    .then(budget => res.json(budget))
    .catch(err => res.json(err))
}

const getBudgets = (req, res) => {
    const { month, year } = req.query
    const userId = req.userId

    // Find budgets that are either permanent OR match the specific month and year
    BudgetModel.find({ 
        userId: userId,
        $or: [
            { isPermanent: true },
            { month: month, year: year }
        ]
    })
    .then(budgets => res.json(budgets))
    .catch(err => res.json(err))
}

const deleteBudget = (req, res) => {
    const { id } = req.params

    BudgetModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

const editBudget = (req, res) => {
    const { id } = req.params
    const { budgetLimit } = req.body

    BudgetModel.findByIdAndUpdate(id, { budgetLimit }, { new: true })
    .then(budget => res.json(budget))
    .catch(err => res.json(err))
}

module.exports = { addBudget, getBudgets, deleteBudget, editBudget }
