import "../template/page-css/dashboard.css"

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
          <button type="button" className="month">This month</button>
          <button type="button" className="add-transaction"> + Add Transaction</button>
        </div>  

      </div> 

      {/* Dashboard Content */}
      <div className="dashboard-body">
        <h1>This is the dashboard content.</h1>
      </div>
    </div>

  )
}
export default Dashboard