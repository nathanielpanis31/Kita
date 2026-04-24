const express = require('express')
const router = express.Router()

const {addBudget, getBudgets, deleteBudget, editBudget} = require ('../controllers/budgetController')

router.post('/add', addBudget)
router.get('/get', getBudgets)
router.delete('/delete/:id', deleteBudget)
router.put('/edit/:id', editBudget)

module.exports = router