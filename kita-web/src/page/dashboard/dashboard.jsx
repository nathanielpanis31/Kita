import "./dashboard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/button.jsx";
import Card from "../../components/cards/card.jsx";
import TransactionModal from "../../components/modal/TransactionModal.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import api from '../../api/axios'

// Generate dynamic colors based on index to ensure we never run out
const getDynamicColor = (index) => {
    // Using HSL to get vibrant, well-distributed colors
    // We rotate the hue by 137.5 degrees (golden angle) for good distribution
    const hue = (index * 137.5) % 360;
    return `hsl(${hue}, 70%, 65%)`;
};

const now = new Date();

function Dashboard() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [transactions, setTransactions] = useState([])
    const userFullName = localStorage.getItem('userFullName') || 'User'
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth())
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())

    // generate last 12 months as options
    const monthOptions = []
    for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
        monthOptions.push({
            label: date.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
            month: date.getMonth(),
            year: date.getFullYear()
        })
    }

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

    const thisMonthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date)
        return transactionDate.getMonth() === selectedMonth &&
            transactionDate.getFullYear() === selectedYear
    })

    // total balance - change to use selected month only
    const totalBalance = thisMonthTransactions.reduce((total, transaction) => {
        if (transaction.type === 'income') {
            return total + Number(transaction.amount)
        } else {
            return total - Number(transaction.amount)
        }
    }, 0)

    const totalIncome = thisMonthTransactions
        .filter(t => t.type === 'income')
        .reduce((total, t) => total + Number(t.amount), 0)

    const totalExpenses = thisMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((total, t) => total + Number(t.amount), 0)

    // get 5 most recent transactions
    const recentTransactions = [...thisMonthTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 4)

    // build pie chart data from categories
    const categoryData = thisMonthTransactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
            const existing = acc.find(item => item.name === t.category)
            if (existing) {
                existing.value += Number(t.amount)
            } else {
                acc.push({ name: t.category, value: Number(t.amount) })
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
                    <p>Good Day {userFullName}!</p>
                </div>

            <div className="right-heading">
                <select
                    className="month-select"
                    onChange={(e) => {
                        const selected = monthOptions[e.target.value]
                        setSelectedMonth(selected.month)
                        setSelectedYear(selected.year)
                    }}
                    defaultValue={0}
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

            {/* Dashboard Content */}
            <div className="dashboard-body">

                <Card title="TOTAL BALANCE">
                    <p className="balance-amount">₱{totalBalance.toLocaleString()}</p>
                    <p className="caption">All time net</p>
                </Card>

                <Card title={`INCOME - ${monthOptions[0] ? new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ''}`}>
                    <p className="income-amount">₱{totalIncome.toLocaleString()}</p>
                    <p className="caption">{thisMonthTransactions.filter(t => t.type === 'income').length} Transactions</p>
                </Card>

                <Card title={`EXPENSES - ${monthOptions[0] ? new Date(selectedYear, selectedMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : ''}`}>
                    <p className="expenses-amount">₱{totalExpenses.toLocaleString()}</p>
                    <p className="caption">{thisMonthTransactions.filter(t => t.type === 'expense').length} Transactions</p>
                </Card>

                {/* RECENT TRANSACTIONS */}
                <div className="transaction">
                    <div className="recentTransaction-header">
                        <h2>Recent Transactions</h2>
                        <Button className="view-all" onClick={() => navigate('/transaction')}>View all</Button>
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
                                    <Cell key={index} fill={getDynamicColor(index)} />
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

<div className="spending-insights">
    <h2>Spending Insights</h2><hr />

    <div className="insights-body">

        {/* STATS */}
        <div className="insights-stats">
            <div className="insight-stat-card">
                <p className="insight-stat-label">BIGGEST EXPENSE</p>
                <p className="insight-stat-value">
                    {thisMonthTransactions.filter(t => t.type === 'expense').length === 0
                        ? 'No expenses yet'
                        : `₱${Math.max(...thisMonthTransactions
                            .filter(t => t.type === 'expense')
                            .map(t => Number(t.amount))).toLocaleString()}`
                    }
                </p>
            </div>

            <div className="insight-stat-card">
                <p className="insight-stat-label">TOP CATEGORY</p>
                <p className="insight-stat-value">
                    {categoryData.length === 0
                        ? 'No expenses yet'
                        : categoryData.reduce((max, cat) =>
                            cat.value > max.value ? cat : max
                          ).name
                    }
                </p>
            </div>

            <div className="insight-stat-card">
                <p className="insight-stat-label">SAVINGS RATE</p>
                <p className="insight-stat-value" style={{
                    color: totalIncome === 0 ? 'var(--text2)' :
                           ((totalIncome - totalExpenses) / totalIncome * 100) >= 0
                           ? 'var(--green)' : 'var(--red)'
                }}>
                    {totalIncome === 0
                        ? 'No income yet'
                        : `${Math.round((totalIncome - totalExpenses) / totalIncome * 100)}%`
                    }
                </p>
            </div>

            <div className="insight-stat-card">
                <p className="insight-stat-label">AVG DAILY SPEND</p>
                <p className="insight-stat-value">
                    {thisMonthTransactions.filter(t => t.type === 'expense').length === 0
                        ? 'No expenses yet'
                        : `₱${Math.round(totalExpenses / new Date().getDate()).toLocaleString()}`
                    }
                </p>
            </div>
        </div>

        {/* TIPS AND WARNINGS */}
        <div className="insights-tips">
            {/* savings tip */}
            {totalIncome > 0 && (
                <div className={`insight-tip ${(totalIncome - totalExpenses) / totalIncome * 100 >= 20 ? 'tip-good' : 'tip-warning'}`}>
                    <span className="tip-icon">
                        {(totalIncome - totalExpenses) / totalIncome * 100 >= 20 ? '✓' : '!'}
                    </span>
                    <p>
                        {(totalIncome - totalExpenses) / totalIncome * 100 >= 20
                            ? `Great job! You're saving ${Math.round((totalIncome - totalExpenses) / totalIncome * 100)}% of your income this month.`
                            : `You're saving less than 20% of your income. Try to reduce expenses.`
                        }
                    </p>
                </div>
            )}

            {/* top category warning */}
            {categoryData.length > 0 && (
                <div className="insight-tip tip-info">
                    <span className="tip-icon">↑</span>
                    <p>Your biggest spending category is <strong>{categoryData.reduce((max, cat) => cat.value > max.value ? cat : max).name}</strong> at ₱{categoryData.reduce((max, cat) => cat.value > max.value ? cat : max).value.toLocaleString()}.</p>
                </div>
            )}

            {/* biggest single expense */}
            {thisMonthTransactions.filter(t => t.type === 'expense').length > 0 && (
                <div className="insight-tip tip-info">
                    <span className="tip-icon">₱</span>
                    <p>Your biggest single expense this month was <strong>
                        ₱{Math.max(...thisMonthTransactions
                            .filter(t => t.type === 'expense')
                            .map(t => Number(t.amount))).toLocaleString()}
                    </strong>.</p>
                </div>
            )}

            {/* over budget warning */}
            {totalExpenses > totalIncome && totalIncome > 0 && (
                <div className="insight-tip tip-danger">
                    <span className="tip-icon">!</span>
                    <p>You're spending more than you earn this month. You're over by ₱{(totalExpenses - totalIncome).toLocaleString()}.</p>
                </div>
            )}

            {/* no transactions yet */}
            {thisMonthTransactions.length === 0 && (
                <div className="insight-tip tip-info">
                    <span className="tip-icon">i</span>
                    <p>No transactions this month yet. Add some to see your insights!</p>
                </div>
            )}
        </div>

    </div>
</div>

            </div>
        </div>
    )
}

export default Dashboard