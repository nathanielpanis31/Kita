import "./dashboard.css";
import Button from "../../components/buttons/button.jsx";
import Card from "../../components/cards/card.jsx";

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
        <Card title="Total Balance" >
          <p className="balance-amount">₱22,000.00</p>
          <p className="caption">All time net</p>
        </Card>

        <Card title="INCOME - APRIL 2026" variant="income">
          <p className="income-amount">₱33,000.00</p>
          <p className="caption">2 Transaction</p>
        </Card>

        <Card title="EXPENSES - APRIL 2026" variant="expenses">
          <p className="expenses-amount">₱44,000.00</p>
          <p className="caption">2 Transaction</p>
        </Card>
      </div>

    </div>

  )
}
export default Dashboard