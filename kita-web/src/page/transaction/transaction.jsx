import { useState, useEffect } from "react"
import Button from "../../components/buttons/button.jsx"
import TransactionModal from "../../components/modal/TransactionModal.jsx"
import "./transaction.css"
import api from '../../api/axios'
import { useDate } from "../../context/DateContext"

function Transaction() {
    const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, monthOptions } = useDate()
    const [showModal, setShowModal] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [filter, setFilter] = useState('all')
    const [transactionToEdit, setTransactionToEdit] = useState(null)
    const userFullName = localStorage.getItem('userFullName') || 'User'

    const fetchTransactions = () => {
        api.get('/get')
        .then(result => {
            setTransactions(result.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date)
        const matchesDate = transactionDate.getMonth() === selectedMonth && 
                           transactionDate.getFullYear() === selectedYear
        
        if (!matchesDate) return false
        if (filter === 'all') return true
        return transaction.type === filter
    })

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this transaction?")
        if (!confirmed) return

        api.delete(`/delete/${id}`)
        .then(() => {
            fetchTransactions()
        })
        .catch(err => console.log(err))
    }

    const handleEdit = (transaction) => {
        setTransactionToEdit(transaction)
        setShowModal(true)
    }

    const closeSubModal = () => {
        setShowModal(false)
        setTransactionToEdit(null)
    }

    return (
        <div className="transaction-page">

            {showModal && (
                <TransactionModal
                    onClose={closeSubModal}
                    onTransactionAdded={fetchTransactions}
                    transactionToEdit={transactionToEdit}
                />
            )}

            <div className="transaction-heading">
                <div className="left-heading">
                    <h1>Transactions</h1>
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
                        + Add Transaction
                    </Button>
                </div>
            </div>

            <div className="transaction-body">
                <div className="transaction-history">
                    <div className="history-header">
                        <Button className="all" onClick={() => setFilter('all')}>All</Button>
                        <Button className="all" onClick={() => setFilter('income')}>Income</Button>
                        <Button className="all" onClick={() => setFilter('expense')}>Expense</Button>
                    </div><hr />

            {filteredTransactions.length === 0 ? (
                <p style={{ padding: '20px', color: 'var(--text2)', textAlign: 'center' }}>No transactions found for this period</p>
            ) : (
                filteredTransactions.map(transaction => (
                    <div className="transaction-inputs" key={transaction._id}>
                        <div className="label-amount">
                            <div className="transact-label">
                                <p className="label">{transaction.label}</p>
                                <p className="date">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                            </div>
                            <div className="amount-delete">
                                <p className="amount" style={{ color: transaction.type === 'income' ? 'var(--green)' : 'var(--red)' }}>
                                    {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount}
                                </p>
                                <div className="action-buttons">
                                    <button className="edit-btn" onClick={() => handleEdit(transaction)}>✎</button>
                                    <button className="delete-btn" onClick={() => handleDelete(transaction._id)}>✕</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

                </div>
            </div>

        </div>
    )
}

export default Transaction