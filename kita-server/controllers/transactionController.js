const TransactionModel = require('../models/transaction')

const validateTransaction = (data) => {
    const { label, amount, type, category, date } = data;
    if (!label || !amount || !type || !category || !date) {
        return "All fields are required";
    }
    if (amount <= 0) {
        return "Amount must be greater than zero";
    }
    if (new Date(date) > new Date()) {
        return "Transaction date cannot be in the future";
    }
    return null;
};

const addTransaction = (req, res) => {
    const error = validateTransaction(req.body);
    if (error) return res.status(400).json({ error });

    const { label, amount, type, category, date } = req.body
    const userId = req.userId

    TransactionModel.create({ userId, label, amount, type, category, date })
    .then(transaction => res.status(201).json(transaction))
    .catch(err => res.status(500).json({ error: "Failed to add transaction" }))
}

const getTransactions = (req, res) => {
    const userId = req.userId
    TransactionModel.find({userId: userId})
    .then(transactions => res.json(transactions))
    .catch(err => res.status(500).json({ error: "Failed to fetch transactions" }))
}

const deleteTransaction = (req, res) => {
    const { id } = req.params

    TransactionModel.findByIdAndDelete(id)
    .then(result => {
        if (!result) return res.status(404).json({ error: "Transaction not found" });
        res.json({ message: "Transaction deleted successfully" });
    })
    .catch(err => res.status(500).json({ error: "Failed to delete transaction" }))
}

const editTransaction = (req, res) => {
    const { id } = req.params
    const error = validateTransaction(req.body);
    if (error) return res.status(400).json({ error });

    const { label, amount, type, category, date } = req.body

    TransactionModel.findByIdAndUpdate(
        id,
        { label, amount, type, category, date },
        { new: true }
    )
    .then(transaction => {
        if (!transaction) return res.status(404).json({ error: "Transaction not found" });
        res.json(transaction);
    })
    .catch(err => res.status(500).json({ error: "Failed to update transaction" }))
}

module.exports = { addTransaction, getTransactions, deleteTransaction, editTransaction }
