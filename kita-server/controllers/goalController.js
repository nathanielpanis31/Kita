const GoalModel = require('../models/goal')
const TransactionModel = require('../models/transaction')  // ← import this

// create New Goal
const addGoal = (req, res) => {
    const { name, targetAmount, deadline } = req.body
    const userId = req.userId

    GoalModel.create({
        userId,
        name,
        targetAmount,
        currentAmount: 0,
        deadline
    })
    .then(goal => res.json(goal))
    .catch(err => res.json(err))
}

// Get all goals for this user
const getGoals = (req, res) => {
    const userId = req.userId

    GoalModel.find({ userId: userId })
    .then(goals => res.json(goals))
    .catch(err => res.json(err))
}

// Delete Goal
const deleteGoal = (req, res) => {
    const { id } = req.params

    GoalModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

// Complete Goal - creates a transaction and marks goal complete
const completeGoal = (req, res) => {
    const { id } = req.params
    const userId = req.userId

    // step 1 - find the goal first
    GoalModel.findById(id)
    .then(goal => {
        if (!goal) return res.json({ message: "Goal not found" })

        // step 2 - create an expense transaction
        return TransactionModel.create({
            userId,
            label: `${goal.name} - Goal Completed`,
            amount: goal.targetAmount,
            type: 'expense',
            category: 'Savings Goal',
            date: new Date()
        })
        .then(() => {
            // step 3 - mark goal as completed
            return GoalModel.findByIdAndUpdate(
                id,
                { 
                    status: 'completed',
                    currentAmount: goal.targetAmount  // fill it to 100%
                },
                { new: true }
            )
        })
    })
    .then(updatedGoal => res.json(updatedGoal))
    .catch(err => res.json(err))
}

module.exports = { addGoal, getGoals, deleteGoal, completeGoal }