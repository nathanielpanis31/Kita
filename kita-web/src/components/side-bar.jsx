import "../template/components-css/side-bar.css"
import { Link } from 'react-router-dom'

function SideBar({children}) {

    return (
            
        <div className="sideBar">
            <div class="sideBarHeadings">
                <h2>Title</h2>
            </div>
            
                <ul className="btnNavigation">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/transaction">Transaction</Link></li>
                    <li><Link to="/budget">Budget</Link></li>
                    <li><Link to="/reports">Reports</Link></li>
                </ul>
        </div>

    );
}

export default SideBar