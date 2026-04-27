const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

const {addBudget, getBudgets, deleteBudget, editBudget} = require ('../controllers/budgetController')

router.post('/add', verifyToken, addBudget)
router.get('/get', verifyToken, getBudgets)
router.delete('/delete/:id', verifyToken, deleteBudget)
router.put('/edit/:id', verifyToken, editBudget)

module.exports = router