import "./report.css"
import { useState, useEffect } from "react"
import axios from "axios"
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    Legend, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts'

const COLORS = ['#7c6bff', '#2de08a', '#ff5f7e', '#ffb347', '#2dd4bf', '#f472b6']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function Report() {
    const [transactions, setTransactions] = useState([])
    const userFullName = localStorage.getItem('userFullName') || 'User'

    useEffect(() => {
        axios.get('http://localhost:3001/api/get')
        .then(result => setTransactions(result.data))
        .catch(err => console.log(err))
    }, [])

    // build income vs expenses data per month
    const monthlyData = MONTHS.map((month, index) => {
        const monthTransactions = transactions.filter(t => {
            const date = new Date(t.date)
            return date.getMonth() === index
        })

        const income = monthTransactions
            .filter(t => t.type === 'income')
            .reduce((total, t) => total + Number(t.amount), 0)

        const expenses = monthTransactions
            .filter(t => t.type === 'expense')
            .reduce((total, t) => total + Number(t.amount), 0)

        return { month, income, expenses }
    })

    // build category breakdown data
    const categoryData = transactions
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
        .sort((a, b) => b.value - a.value)

    return (
        <div className="report">

            <div className="report-heading">
                <div className="left-heading">
                    <h1>Reports</h1>
                    <p>Good Day {userFullName}!</p>
                </div>
            </div>

            <div className="report-body">

                {/* INCOME VS EXPENSES CHART */}
                <div className="income-expenses">
                    <div className="incomeExpenses-heading">
                        <h2>Income vs Expenses</h2><hr />
                    </div>
                    <div className="incomeExpenses">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <XAxis
                                    dataKey="month"
                                    stroke="#9896b0"
                                    fontSize={12}
                                />
                                <YAxis
                                    stroke="#9896b0"
                                    fontSize={12}
                                />
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
                                    formatter={(value) => (
                                        <span style={{ color: '#9896b0', fontSize: '13px' }}>
                                            {value}
                                        </span>
                                    )}
                                />
                                <Bar dataKey="income" fill="#2de08a" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="expenses" fill="#ff5f7e" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CATEGORY BREAKDOWN */}
                <div className="category-breakdown">
                    <div className="categoryBreakdown-headings">
                        <h2>Category Breakdown</h2><hr />
                    </div>
                    <div className="categoryBreakdown">

                        {categoryData.length === 0 ? (
                            <p style={{ color: 'var(--text2)' }}>No expenses yet</p>
                        ) : (
                            <>
                                <PieChart width={250} height={250}>
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
                                </PieChart>

                                {/* CATEGORY LIST */}
                                <div className="category-list">
                                    {categoryData.map((item, index) => (
                                        <div className="category-item" key={index}>
                                            <div className="category-item-left">
                                                <div className="category-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                <p>{item.name}</p>
                                            </div>
                                            <p className="category-item-amount">₱{item.value.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Report