import "./dashboard.css";
import Button from "../../components/buttons/button.jsx";
import Card from "../../components/cards/card.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'

const spendingData = [
  { name: 'Food', value: 4000 },
  { name: 'Transport', value: 3000 },
  { name: 'Shopping', value: 2000 },
  { name: 'Bills', value: 1500 },
  { name: 'Others', value: 500 },
]

const COLORS = ['#7c6bff', '#2de08a', '#ff5f7e', '#ffb347', '#2dd4bf']

  const now = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", options);

function Dashboard() {
  return (

    <div className="dashboard">

      {/* Dashboard Heading */}
      <div className="dashboard-heading">
        <div className="left-heading">
          <h1>Dashboard</h1>
          <p>Good Day!</p>
        </div>

        <div className="right-heading">
          <Button className="secondary">This month</Button>
          <Button className="primary"> + Add Transaction</Button>
        </div>  
      </div> 

      {/* Dashboard Content */}
      <div className="dashboard-body">

        <Card title="Total Balance">
          <p className="balance-amount">₱22,000.00</p>
          <p className="caption">All time net</p>
        </Card>

        <Card title={`INCOME - ${formattedDate}`} variant="income">
          <p className="income-amount">₱33,000.00</p>
          <p className="caption">2 Transaction</p>
        </Card>

        <Card title={`EXPENSES - ${formattedDate}`} variant="expenses">
          <p className="expenses-amount">₱44,000.00</p>
          <p className="caption">2 Transaction</p>
        </Card>

        <div className="transaction">
          <h2>Recent Transactions</h2><hr />
          <div className="transaction-inputs">
            <div className="label-amount">
              <div className="transact-label">
                <p className="label">jollibee</p>
                <p className="date">April 2026</p>
              </div>
              <p className="amount">₱500.00</p>
            </div>
          </div>
        </div>

        {/* SAMPLE CHART */}
        <div className="spending-category">
          <h2>Spending Categories</h2><hr />
          <PieChart width={400} height={300}>
            <Pie
              data={spendingData}
              cx={200}
              cy={130}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
            >
              {spendingData.map((entry, index) => (
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
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ color: '#9896b0', fontSize: '13px' }}>{value}</span>
              )}
            />
          </PieChart>
        </div>

        <div className="budget-status">
            <h2>Budget Status</h2><hr />
          </div>

      </div>

    </div>

  )
}

export default Dashboard