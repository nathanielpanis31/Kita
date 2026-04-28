import { useState, useEffect } from "react"
import Button from "../../components/buttons/button.jsx"
import GoalModal from "../../components/modal/GoalModal.jsx"
import ConfirmModal from "../../components/modal/ConfirmModal.jsx"
import "./goals.css"
import api from '../../api/axios'

function Goals() {
    const [showModal, setShowModal] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [confirmConfig, setConfirmConfig] = useState({ type: 'danger', title: '', message: '', action: null })
    const [goals, setGoals] = useState([])
    const [transactions, setTransactions] = useState([])
    const userFullName = localStorage.getItem('userFullName') || 'User'

    const fetchGoals = () => {
        api.get('/goal/get')
        .then(result => setGoals(result.data))
        .catch(err => console.log(err))
    }

    const fetchTransactions = () => {
        api.get('/get')
        .then(result => setTransactions(result.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchGoals()
        fetchTransactions()
    }, [])

    // calculate total balance from ALL transactions
    const totalBalance = transactions.reduce((total, transaction) => {
        if (transaction.type === 'income') {
            return total + Number(transaction.amount)
        } else {
            return total - Number(transaction.amount)
        }
    }, 0)

    const handleCompleteClick = (id) => {
        setConfirmConfig({
            type: 'primary',
            title: 'Complete Goal',
            message: 'Are you sure you want to complete this goal? The target amount will be deducted from your total balance.',
            confirmText: 'Complete',
            onConfirm: () => {
                api.put(`/goal/complete/${id}`)
                .then(() => {
                    fetchGoals()
                    fetchTransactions()
                    setShowConfirm(false)
                })
                .catch(err => console.log(err))
            }
        })
        setShowConfirm(true)
    }

    const handleDeleteClick = (id) => {
        setConfirmConfig({
            type: 'danger',
            title: 'Delete Goal',
            message: 'Are you sure you want to delete this goal? This action cannot be undone.',
            confirmText: 'Delete',
            onConfirm: () => {
                api.delete(`/goal/delete/${id}`)
                .then(() => {
                    fetchGoals()
                    setShowConfirm(false)
                })
                .catch(err => console.log(err))
            }
        })
        setShowConfirm(true)
    }

    const getDaysLeft = (deadline) => {
        if (!deadline) return null
        const today = new Date()
        const end = new Date(deadline)
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24))
        return diff
    }

    return (
        <div className="goals-page">

            {showModal && (
                <GoalModal
                    onClose={() => setShowModal(false)}
                    onGoalAdded={fetchGoals}
                />
            )}

            {showConfirm && (
                <ConfirmModal 
                    title={confirmConfig.title}
                    message={confirmConfig.message}
                    onConfirm={confirmConfig.onConfirm}
                    onCancel={() => setShowConfirm(false)}
                    confirmText={confirmConfig.confirmText}
                    type={confirmConfig.type}
                />
            )}

            <div className="goals-heading">
                <div className="left-heading">
                    <h1>Savings Goals</h1>
                    <p>Good Day {userFullName}!</p>
                </div>
                <div className="right-heading">
                    {/* TOTAL BALANCE DISPLAY */}
                    <div className="goals-balance">
                        <p className="goals-balance-label">CURRENT BALANCE</p>
                        <p className="goals-balance-amount">
                            ₱{totalBalance.toLocaleString()}
                        </p>
                    </div>
                    <Button className="primary" onClick={() => setShowModal(true)}>
                        + New Goal
                    </Button>
                </div>
            </div>

            <div className="goals-body">
                {goals.length === 0 ? (
                    <p style={{ padding: '30px', color: 'var(--text2)' }}>
                        No goals yet. Click + New Goal to start!
                    </p>
                ) : (
                    goals.map(goal => {
                        // check if balance can afford this goal
                        const canAfford = totalBalance >= goal.targetAmount
                        const isCompleted = goal.status === 'completed'
                        const daysLeft = getDaysLeft(goal.deadline)

                        return (
                            <div
                                className={`goal-card ${isCompleted ? 'goal-completed' : ''}`}
                                key={goal._id}
                            >
                                {/* CARD HEADER */}
                                <div className="goal-card-header">
                                    <div className="goal-title-group">
                                        <p className="goal-name">{goal.name}</p>
                                        {isCompleted && (
                                            <span className="goal-badge">✓ Completed</span>
                                        )}
                                        {/* show affordable badge if not completed */}
                                        {!isCompleted && canAfford && (
                                            <span className="goal-badge-afford">
                                                ✓ You can afford this
                                            </span>
                                        )}
                                        {!isCompleted && !canAfford && (
                                            <span className="goal-badge-cant">
                                                ✗ Not enough balance
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteClick(goal._id)}
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* TARGET AMOUNT */}
                                <div className="goal-amounts">
                                    <span className="goal-target-label">Target: </span>
                                    <span className="goal-current">
                                        ₱{goal.targetAmount.toLocaleString()}
                                    </span>
                                </div>

                                {/* BALANCE VS GOAL */}
                                <div className="goal-balance-row">
                                    <p className="goal-balance-text">
                                        Your balance: 
                                        <span style={{ 
                                            color: canAfford 
                                                ? 'var(--green)' 
                                                : 'var(--red)',
                                            fontWeight: 'bold',
                                            marginLeft: '5px'
                                        }}>
                                            ₱{totalBalance.toLocaleString()}
                                        </span>
                                    </p>
                                </div>

                                {/* DEADLINE */}
                                {daysLeft !== null && (
                                    <p className="goal-deadline" style={{
                                        color: daysLeft < 7
                                            ? 'var(--red)'
                                            : 'var(--text2)'
                                    }}>
                                        {daysLeft > 0
                                            ? `${daysLeft} days left`
                                            : 'Deadline passed'
                                        }
                                    </p>
                                )}

                                {/* COMPLETE BUTTON */}
                                {!isCompleted && (
                                    <button
                                        className={`complete-btn ${canAfford ? 'complete-btn-active' : 'complete-btn-disabled'}`}
                                        onClick={() => canAfford && handleCompleteClick(goal._id)}
                                        disabled={!canAfford}
                                    >
                                        {canAfford 
                                            ? 'Complete Goal' 
                                            : `Need ₱${(goal.targetAmount - totalBalance).toLocaleString()} more`
                                        }
                                    </button>
                                )}

                            </div>
                        )
                    })
                )}
            </div>

        </div>
    )
}

export default Goals