import "./side-bar.css"
import { Link, useNavigate } from 'react-router-dom'  // ← remove Outlet, add useNavigate

function SideBar() {
  const now = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", options);
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="sideBar">
      <div className="sideBarHeadings">  
        <h1>kita.</h1>
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
        <button onClick={handleLogout} className="logout-btn">Logout</button>  {/* ← add this */}
      </div>
    </div>
  )
}

export default SideBar