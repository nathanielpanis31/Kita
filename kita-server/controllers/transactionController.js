const TransactionModel = require('../models/transaction')

const addTransaction = (req, res) => {
    const { label, amount, type, category, date } = req.body

    TransactionModel.create({ label, amount, type, category, date })
    .then(transaction => res.json(transaction))
    .catch(err => res.json(err))
}

const getTransactions = (req, res) => {
    TransactionModel.find()
    .then(transactions => res.json(transactions))
    .catch(err => res.json(err))
}

module.exports = { addTransaction, getTransactions }