import "./side-bar.css"
import { Link } from 'react-router-dom'

function SideBar() {
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
    </div>
  )
}

export default SideBar