const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

    // this came from controllers folder file               controllers foler directory
const { addTransaction, getTransactions, deleteTransaction, editTransaction } = require('../controllers/transactionController')

// the get and post depends on what on the controllers logic
// the /add is a new name you put its not from other files or other variables the n the addTransaction came from other files
router.post('/add', verifyToken, addTransaction)
router.get('/get', verifyToken, getTransactions)
router.delete('/delete/:id', verifyToken, deleteTransaction)
router.put('/edit/:id', verifyToken, editTransaction)


module.exports = router