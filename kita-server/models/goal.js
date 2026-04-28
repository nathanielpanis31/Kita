const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }, // fixed: tpye → type
    name: String,
    targetAmount: Number,
    currentAmount: Number,  // fixed: cuurentAmount → currentAmount
    deadline: Date,         // fixed: deadile → deadline
    status: {
        type: String,
        default: 'active'
    }
}, { timestamps: true })

const GoalModel = mongoose.model("goals", GoalSchema)
module.exports = GoalModel