import "./side-bar.css"
import { Link } from 'react-router-dom'

function SideBar() {
  const now = new Date();

  const options = { month: "long", year: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", options);

  return (
    <div className="sideBar">
      <div className="sideBarHeadings">  
        <h2>Title</h2>
      </div>

      <ul className="btnNavigation">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/transaction">Transaction</Link></li>
        <li><Link to="/budget">Budget</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>

      <div className="nav-footer">
        <hr />
        <div className="nav-card">
          <p>{formattedDate}</p>
          <p>Current period</p>
        </div>
      </div>
    </div>
  )
}

export default SideBar