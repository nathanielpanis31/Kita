import "./BudgetModal.css"
import { useState } from "react"
import api from '../../api/axios' 
import { useDate } from "../../context/DateContext"

function BudgetModal({ onClose, onBudgetAdded }) {
    const { selectedMonth, selectedYear } = useDate()
    const [category, setCategory] = useState('')
    const [budgetLimit, setBudgetLimit] = useState('')
    const [isPermanent, setIsPermanent] = useState(false)
    const [error, setError] = useState('')

    const month = selectedMonth + 1
    const year = selectedYear

    const validate = () => {
        if (!category.trim() || !budgetLimit) {
            return "Category and Budget Limit are required";
        }
        if (Number(budgetLimit) <= 0) {
            return "Budget Limit must be greater than zero";
        }
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        api.post('/budget/add', {
            category,
            budgetLimit: Number(budgetLimit),
            month,
            year,
            isPermanent
        })
        .then(result => {
            onBudgetAdded()
            onClose()
        })
        .catch(err => {
            setError(err.response?.data?.error || "Failed to add budget");
        })
    }

    return (
        <div className="budget-modal-overlay">
            <div className="budget-modal">
                <h2>Add Budget</h2>
                
                {error && <p className="error-message" style={{ color: 'var(--red)', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}

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