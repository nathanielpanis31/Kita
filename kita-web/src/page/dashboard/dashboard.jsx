import "./dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/buttons/button.jsx";
import Card from "../../components/cards/card.jsx";
import TransactionModal from "../../components/modal/TransactionModal.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const COLORS = ['#7c6bff', '#2de08a', '#ff5f7e', '#ffb347', '#2dd4bf']

const now = new Date();
const options = { month: "long", year: "numeric" };
const formattedDate = now.toLocaleDateString("en-US", options);

function Dashboard() {
    const [showModal, setShowModal] = useState(false)
    const [transactions, setTransactions] = useState([])

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

    // calculate total balance
    const totalBalance = transactions.reduce((total, transaction) => {
        if (transaction.type === 'income') {
            return total + transaction.amount
        } else {
            return total - transaction.amount
        }
    }, 0)

    // calculate this month income and expenses
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const thisMonthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date)
        return transactionDate.getMonth() === currentMonth &&
               transactionDate.getFullYear() === currentYear
    })

    const totalIncome = thisMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((total, t) => total + t.amount, 0)

    const totalExpenses = thisMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((total, t) => total + t.amount, 0)

    // get 5 most recent transactions
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)

    // build pie chart data from categories
    const categoryData = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            const existing = acc.find(item => item.name === t.category)
            if (existing) {
                existing.value += t.amount
            } else {
                acc.push({ name: t.category, value: t.amount })
            }
            return acc
        }, [])

    return (
        <div className="dashboard">

            {showModal && (
                <TransactionModal
                    onClose={() => setShowModal(false)}
                    onTransactionAdded={fetchTransactions}
                />
            )}

            {/* Dashboard Heading */}
            <div className="dashboard-heading">
                <div className="left-heading">
                    <h1>Dashboard</h1>
                    <p>Good Day!</p>
                </div>
                <div className="right-heading">
                    <Button className="secondary">This month</Button>
                    <Button className="primary" onClick={() => setShowModal(true)}>
                        + Add Transaction
                    </Button>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="dashboard-body">

                <Card title="Total Balance">
                    <p className="balance-amount">₱{totalBalance.toLocaleString()}</p>
                    <p className="caption">All time net</p>
                </Card>

                <Card title={`INCOME - ${formattedDate}`}>
                    <p className="income-amount">₱{totalIncome.toLocaleString()}</p>
                    <p className="caption">{thisMonthTransactions.filter(t => t.type === 'income').length} Transactions</p>
                </Card>

                <Card title={`EXPENSES - ${formattedDate}`}>
                    <p className="expenses-amount">₱{totalExpenses.toLocaleString()}</p>
                    <p className="caption">{thisMonthTransactions.filter(t => t.type === 'expense').length} Transactions</p>
                </Card>

                {/* RECENT TRANSACTIONS */}
                <div className="transaction">
                    <div className="recentTransaction-header">
                        <h2>Recent Transactions</h2>
                        <Button className="view-all">View all</Button>
                    </div><hr />

                    {recentTransactions.length === 0 ? (
                        <p style={{ padding: '20px', color: 'var(--text2)' }}>No transactions yet</p>
                    ) : (
                        recentTransactions.map(transaction => (
                            <div className="transaction-inputs" key={transaction._id}>
                                <div className="label-amount">
                                    <div className="transact-label">
                                        <p className="label">{transaction.label}</p>
                                        <p className="date">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                                    </div>
                                    <p className="amount" style={{ color: transaction.type === 'income' ? 'var(--green)' : 'var(--red)' }}>
                                        {transaction.type === 'income' ? '+' : '-'}₱{transaction.amount.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* PIE CHART */}
                <div className="spending-category">
                    <h2>Spending Categories</h2>
                    <hr />

                    {categoryData.length === 0 ? (
                        <p style={{ padding: '20px', color: 'var(--text2)' }}>No expenses yet</p>
                    ) : (
                        <PieChart width={300} height={300}>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1a1a24',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    borderRadius: '10px',
                                    color: '#f0eff8'
                                }}
                                formatter={(value) => [`₱${value.toLocaleString()}`, '']}
                            />
                            <Legend
                                verticalAlign="bottom"
                                iconType="circle"
                                iconSize={8}
                                formatter={(value) => (
                                    <span style={{ color: '#9896b0', fontSize: '13px' }}>
                                        {value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    )}
                </div>

                <div className="budget-status">
                    <h2>Budget Status</h2><hr />
                </div>

            </div>
        </div>
    )
}

export default Dashboard