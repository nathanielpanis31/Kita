import { useState, useEffect } from "react"
import Button from "../../components/buttons/button.jsx"
import BudgetModal from "../../components/modal/BudgetModal.jsx"
import "./budget.css"
import api from '../../api/axios'

function Budget() {
    const [showModal, setShowModal] = useState(false)
    const [budgets, setBudgets] = useState([])
    const [transactions, setTransactions] = useState([])
    const userFullName = localStorage.getItem('userFullName') || 'User'
    const [editingId, setEditingId] = useState(null)
    const [newLimit, setNewLimit] = useState('')

    const now = new Date()
    const month = now.getMonth() + 1
    const year = now.getFullYear()

    const fetchBudgets = () => {
        api.get(`/budget/get?month=${month}&year=${year}`)
        .then(result => setBudgets(result.data))
        .catch(err => console.log(err))
    }

    const fetchTransactions = () => {
        api.get('/get')
        .then(result => setTransactions(result.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchBudgets()
        fetchTransactions()
    }, [])

    // calculate how much spent per category this month
    const getSpentAmount = (category) => {
        return transactions
            .filter(t => {
                const tDate = new Date(t.date)
                return t.category.toLowerCase() === category.toLowerCase() &&  // add .toLowerCase()
                      t.type === 'expense' &&
                      tDate.getMonth() + 1 === month &&
                      tDate.getFullYear() === year
            })
            .reduce((total, t) => total + Number(t.amount), 0)  // add Number()
    }

    const handleDeleteBudget = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this budget?")
        if (!confirmed) return

        api.delete(`/budget/delete/${id}`)
        .then(() => fetchBudgets())
        .catch(err => console.log(err))
    }
    
    const handleEdit = (id) => {
        api.put(`/budget/edit/${id}`, { budgetLimit: newLimit })
        .then(() => {
            fetchBudgets()
            setEditingId(null)
            setNewLimit('')
        })
        .catch(err => console.log(err))
    }    

    return (
        <div className="budget-page">

            {showModal && (
                <BudgetModal
                    onClose={() => setShowModal(false)}
                    onBudgetAdded={fetchBudgets}
                />
            )}

            <div className="budget-heading">
                <div className="left-heading">
                    <h1>Budget</h1>
                    <p>Good Day {userFullName}!</p>
                </div>
                <div className="right-heading">
                    <Button className="primary" onClick={() => setShowModal(true)}>
                        + Add Budget
                    </Button>
                </div>
            </div>

            <div className="budget-body">
                {budgets.length === 0 ? (
                    <p style={{ padding: '30px', color: 'var(--text2)' }}>
                        No budgets yet. Click + Add Budget to start!
                    </p>
                ) : (
                    budgets.map(budget => {
                        const spent = getSpentAmount(budget.category)
                        const percentage = Math.min((spent / budget.budgetLimit) * 100, 100)
                        const isOverBudget = spent > budget.budgetLimit

                        return (
                            <div className="budget-card" key={budget._id}>
                                <div className="budget-card-header">
                                    <p className="budget-category">{budget.category}</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <p className="budget-amounts">
                                            <span style={{ color: isOverBudget ? 'var(--red)' : 'var(--text)' }}>
                                                ₱{spent.toLocaleString()}
                                            </span>
                                            {' '} / ₱{budget.budgetLimit.toLocaleString()}
                                        </p>
                                        <button 
                                            className="edit-btn" 
                                            onClick={() => {
                                                setEditingId(budget._id)
                                                setNewLimit(budget.budgetLimit)
                                            }}
                                        >
                                            ✎
                                        </button>
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDeleteBudget(budget._id)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>

                                {/* EDIT INPUT - only shows when editing */}
                                {editingId === budget._id && (
                                    <div className="edit-limit">
                                        <input
                                            type="number"
                                            value={newLimit}
                                            onChange={(e) => setNewLimit(e.target.value)}
                                            placeholder="New budget limit"
                                        />
                                        <div className="edit-buttons">
                                            <button 
                                                className="edit-save-btn"
                                                onClick={() => handleEdit(budget._id)}
                                            >
                                                Save
                                            </button>
                                            <button 
                                                className="edit-cancel-btn"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="progress-bar-container">
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: isOverBudget ? 'var(--red)' : percentage > 75 ? 'var(--amber)' : 'var(--accent)'
                                        }}
                                    />
                                </div>

                                <p className="budget-remaining">
                                    {isOverBudget
                                        ? `₱${(spent - budget.budgetLimit).toLocaleString()} over budget`
                                        : `₱${(budget.budgetLimit - spent).toLocaleString()} remaining`
                                    }
                                </p>
                            </div>
                        )
                    })
                )}
            </div>

        </div>
    )
}

export default Budget