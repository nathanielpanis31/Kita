import { useState, useEffect } from "react"
import Button from "../../components/buttons/button.jsx"
import BudgetModal from "../../components/modal/BudgetModal.jsx"
import "./budget.css"
import api from '../../api/axios'
import { useDate } from "../../context/DateContext"

function Budget() {
    const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, monthOptions } = useDate()
    const [showModal, setShowModal] = useState(false)
    const [budgets, setBudgets] = useState([])
    const [transactions, setTransactions] = useState([])
    const userFullName = localStorage.getItem('userFullName') || 'User'
    const [editingId, setEditingId] = useState(null)
    const [newLimit, setNewLimit] = useState('')

    const month = selectedMonth + 1
    const year = selectedYear

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
    }, [selectedMonth, selectedYear])

    // calculate how much spent per category this month
    const getSpentAmount = (category) => {
        return transactions
            .filter(t => {
                const tDate = new Date(t.date)
                return t.category.toLowerCase() === category.toLowerCase() &&
                      t.type === 'expense' &&
                      tDate.getMonth() === selectedMonth &&
                      tDate.getFullYear() === selectedYear
            })
            .reduce((total, t) => total + Number(t.amount), 0)
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
                    <select
                        className="month-select"
                        style={{ marginRight: '10px' }}
                        onChange={(e) => {
                            const selected = monthOptions[e.target.value]
                            setSelectedMonth(selected.month)
                            setSelectedYear(selected.year)
                        }}
                        value={monthOptions.findIndex(opt => opt.month === selectedMonth && opt.year === selectedYear)}
                    >
                        {monthOptions.map((option, index) => (
                            <option key={index} value={index}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <Button className="primary" onClick={() => setShowModal(true)}>
                        + Add Budget
                    </Button>
                </div>
            </div>

            <div className="budget-body">
                {budgets.length === 0 ? (
                    <p style={{ padding: '30px', color: 'var(--text2)' }}>
                        No budgets yet for this period. Click + Add Budget to start!
                    </p>
                ) : (
                    budgets.map(budget => {
                        const spent = getSpentAmount(budget.category)
                        const percentage = Math.min((spent / budget.budgetLimit) * 100, 100)
                        const isOverBudget = spent > budget.budgetLimit

                        return (
                            <div className="budget-card" key={budget._id}>
                                <div className="budget-card-header">
                                    <div className="category-tag">
                                        <p className="budget-category">{budget.category}</p>
                                        {budget.isPermanent && <span className="recurring-badge">RECURRING</span>}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <p className="budget-amounts">
                                            <span style={{ color: isOverBudget ? 'var(--red)' : 'var(--text)' }}>
                                                ₱{spent.toLocaleString()}
                                            </span>
                                            {' '} / ₱{budget.budgetLimit.toLocaleString()}
                                        </p>
                                        <div className="budget-actions">
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