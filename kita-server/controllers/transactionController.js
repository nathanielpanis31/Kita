const TransactionModel = require('../models/transaction')

const addTransaction = (req, res) => {
    const { label, amount, type, category, date } = req.body
    const userId = req.userId

    TransactionModel.create({ userId, label, amount, type, category, date })
    .then(transaction => res.json(transaction))
    .catch(err => res.json(err))
}

const getTransactions = (req, res) => {
    const userId = req.userId
    TransactionModel.find({userId: userId})
    .then(transactions => res.json(transactions))
    .catch(err => res.json(err))
}

const deleteTransaction = (req, res) => {
    const { id } = req.params

    TransactionModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
}

const editTransaction = (req, res) => {
    const { id } = req.params
    const { label, amount, type, category, date } = req.body

    TransactionModel.findByIdAndUpdate(
        id,
        { label, amount, type, category, date },
        { new: true }
    )
    .then(transaction => res.json(transaction))
    .catch(err => res.json(err))
}

module.exports = { addTransaction, getTransactions, deleteTransaction, editTransaction }
