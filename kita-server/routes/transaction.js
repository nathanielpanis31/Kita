const express = require('express')
const router = express.Router()

    // this came from controllers folder file               controllers foler directory
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transactionController')

// the get and post depends on what on the controllers logic
// the /add is a new name you put its not from other files or other variables the n the addTransaction came from other files
router.post('/add', addTransaction)
router.get('/get', getTransactions)
router.delete('/delete/:id', deleteTransaction)

module.exports = router