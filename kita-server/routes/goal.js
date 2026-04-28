const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')

const { addGoal, getGoals, deleteGoal, completeGoal } = require('../controllers/goalController')

router.post('/add', verifyToken, addGoal)
router.get('/get', verifyToken, getGoals)
router.delete('/delete/:id', verifyToken, deleteGoal)
router.put('/complete/:id', verifyToken, completeGoal)

module.exports = router