const express = require('express')
const router = express.Router()

const {addBudget, getBudgets, deleteBudget} = require ('../controllers/budgetController')

router.post('/add', addBudget)
router.get('/get', getBudgets)
router.delete('/delete/:id', deleteBudget)

module.exports = router