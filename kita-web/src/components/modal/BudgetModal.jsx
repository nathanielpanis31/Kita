import "./BudgetModal.css"
import { useState } from "react"
import api from '../../api/axios' 
import { useDate } from "../../context/DateContext"

function BudgetModal({ onClose, onBudgetAdded }) {
    const { selectedMonth, selectedYear } = useDate()
    const [category, setCategory] = useState('')
    const [budgetLimit, setBudgetLimit] = useState('')
    const [isPermanent, setIsPermanent] = useState(false)

    const month = selectedMonth + 1
    const year = selectedYear

    const handleSubmit = (e) => {
        e.preventDefault()
        api.post('/budget/add', {
            category,
            budgetLimit,
            month,
            year,
            isPermanent
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

                    <div>
                        <label>CATEGORY</label>
                        <input
                            type="text"
                            placeholder="e.g. Food, Transport, Bills"
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>BUDGET LIMIT (₱)</label>
                        <input
                            type="number"
                            placeholder="e.g. 3000"
                            onChange={(e) => setBudgetLimit(e.target.value)}
                            required
                        />
                    </div>

                    <div className="checkbox-group">
                        <input
                            type="checkbox"
                            id="isPermanent"
                            checked={isPermanent}
                            onChange={(e) => setIsPermanent(e.target.checked)}
                        />
                        <label htmlFor="isPermanent">
                            Permanent Budget (Shows in all months)
                        </label>
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