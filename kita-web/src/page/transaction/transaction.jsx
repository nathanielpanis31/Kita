import { useState, useEffect } from "react"
import axios from "axios"
import Button from "../../components/buttons/button.jsx"
import TransactionModal from "../../components/modal/TransactionModal.jsx"
import "./transaction.css"


function Transaction() {
    const [showModal, setShowModal] = useState(false)
    const [transactions, setTransactions] = useState([])
    const [filter, setFilter] = useState('all')
    const userFullName = localStorage.getItem('userFullName') || 'User'

    const fetchTransactions = () => {
        axios.get('http://localhost:3001/api/get')
        .then(result => {
            setTransactions(result.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    const filteredTransactions = transactions.filter(transaction => {
        if (filter === 'all') return true
        return transaction.type === filter
    })

    const handleDelete = (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this transaction?")
        if (!confirmed) return

        axios.delete(`http://localhost:3001/api/delete/${id}`)
        .then(() => {
            fetchTransactions()
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="transaction-page">

            {showModal && (
                <TransactionModal
                    onClose={() => setShowModal(false)}
                    onTransactionAdded={fetchTransactions}
                />
            )}

            <div className="transaction-heading">
                <div className="left-heading">
                    <h1>Transactions</h1>
                    <p>Good Day {userFullName}!</p>
                </div>
                <div className="right-heading">
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

            {filteredTransactions.map(transaction => (
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
                            <button className="delete-btn" onClick={() => handleDelete(transaction._id)}>✕</button>
                        </div>
                    </div>
                </div>
            ))}

                </div>
            </div>

        </div>
    )
}

export default Transaction