import "./BudgetModal.css"
import { useState } from "react"
import api from '../../api/axios' 

function BudgetModal({ onClose, onBudgetAdded }) {

    const [category, setCategory] = useState('')
    const [budgetLimit, setBudgetLimit] = useState('')

    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const handleSubmit = (e) => {
        e.preventDefault()
        api.post('/budget/add', {
            category,
            budgetLimit,
            month,
            year
        })
        .then(result => {
            console.log(result)
            onBudgetAdded()
            onClose()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="budget-modal-overlay">
            <div className="budget-modal">
                <h2>Add Budget</h2>

                <form onSubmit={handleSubmit}>
                <div className="budget-modal-inputs">

        <input
            type="text"
            placeholder="e.g. Food, Transport, Bills"
            onChange={(e) => setCategory(e.target.value)}
            required
        />

                    <div>
                        <label>BUDGET LIMIT (₱)</label><br />
                        <input
                            type="number"
                            placeholder="e.g. 3000"
                            onChange={(e) => setBudgetLimit(e.target.value)}
                            required
                        />
                    </div>

                </div>

                <div className="budget-modal-buttons">
                    <button type="button" className="budget-modal-cancel" onClick={onClose}>Cancel</button>
                    <button type="submit" className="budget-modal-submit">Add Budget</button>
                </div>
                </form>

            </div>
        </div>
    )
}

export default BudgetModal