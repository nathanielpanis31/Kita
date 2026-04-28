import { useState } from "react"
import api from '../../api/axios'
import "./GoalModal.css"

function GoalModal({ onClose, onGoalAdded }) {

    const [name, setName] = useState('')
    const [targetAmount, setTargetAmount] = useState('')
    const [deadline, setDeadline] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // this is the connection to your backend
        // POST /api/goal/add
        api.post('/goal/add', {
            name,
            targetAmount,
            deadline: deadline || null  // send null if no deadline
        })
        .then(result => {
            console.log(result)
            onGoalAdded()   // refreshes the goals list in parent
            onClose()       // closes the modal
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="goal-modal-overlay">
            <div className="goal-modal">
                <h2>New Savings Goal</h2>

                <form onSubmit={handleSubmit}>
                    <div className="goal-modal-inputs">

                        <div>
                            <label>GOAL NAME</label>
                            <input
                                type="text"
                                placeholder="e.g. Laptop Fund, Emergency Fund"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>TARGET AMOUNT (₱)</label>
                            <input
                                type="number"
                                placeholder="e.g. 50000"
                                onChange={(e) => setTargetAmount(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label>DEADLINE (optional)</label>
                            <input
                                type="date"
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="goal-modal-buttons">
                        <button 
                            type="button" 
                            className="goal-modal-cancel" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="goal-modal-submit"
                        >
                            Create Goal
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default GoalModal