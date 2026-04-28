import "./side-bar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ConfirmModal from "../../components/modal/ConfirmModal.jsx"

function SideBar() {
  const now = new Date();
  const options = { month: "long", year: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", options);
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userFullName')
    navigate('/login')
}

  return (
    <div className="sideBar">
      {showLogoutConfirm && (
        <ConfirmModal 
          title="Logout"
          message="Are you sure you want to log out?"
          confirmText="Logout"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
          type="danger"
        />
      )}
      <div className="sideBarHeadings">  
        <h1>kita.</h1>
      </div>

      <ul className="btnNavigation">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/transaction">Transaction</Link></li>
        <li><Link to="/budget">Budget</Link></li>
        <li><Link to="/goals">Goals</Link></li> 
        <li><Link to="/reports">Reports</Link></li>
      </ul>

      <div className="nav-footer">
        <hr />
        <div className="nav-card">
          <p>{formattedDate}</p>
          <p>Current period</p>
        </div>
        <button onClick={() => setShowLogoutConfirm(true)} className="logout-btn">Logout</button>
      </div>
    </div>
  )
}

export default SideBar