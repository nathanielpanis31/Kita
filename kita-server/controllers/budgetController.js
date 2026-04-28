const BudgetModel = require('../models/budget')

const validateBudget = (data) => {
    const { category, budgetLimit, month, year } = data;
    if (!category || !budgetLimit || !month || !year) {
        return "Category and Budget Limit are required";
    }
    if (budgetLimit <= 0) {
        return "Budget Limit must be greater than zero";
    }
    return null;
};

const addBudget = (req, res) => {
    const error = validateBudget(req.body);
    if (error) return res.status(400).json({ error });

    const { category, budgetLimit, month, year, isPermanent } = req.body
    const userId = req.userId

    BudgetModel.create({ userId, category, budgetLimit, month, year, isPermanent })
    .then(budget => res.status(201).json(budget))
    .catch(err => res.status(500).json({ error: "Failed to add budget" }))
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
    .catch(err => res.status(500).json({ error: "Failed to fetch budgets" }))
}

const deleteBudget = (req, res) => {
    const { id } = req.params

    BudgetModel.findByIdAndDelete(id)
    .then(result => {
        if (!result) return res.status(404).json({ error: "Budget not found" });
        res.json({ message: "Budget deleted successfully" });
    })
    .catch(err => res.status(500).json({ error: "Failed to delete budget" }))
}

const editBudget = (req, res) => {
    const { id } = req.params
    const { budgetLimit } = req.body

    if (!budgetLimit || budgetLimit <= 0) {
        return res.status(400).json({ error: "Budget Limit must be greater than zero" });
    }

    BudgetModel.findByIdAndUpdate(id, { budgetLimit }, { new: true })
    .then(budget => {
        if (!budget) return res.status(404).json({ error: "Budget not found" });
        res.json(budget);
    })
    .catch(err => res.status(500).json({ error: "Failed to update budget" }))
}

module.exports = { addBudget, getBudgets, deleteBudget, editBudget }
