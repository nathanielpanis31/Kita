import "../template/components-css/side-bar.css"

function SideBar() {

    return (
            
        <div class="sideBar">
            <div class="sideBarHeadings">
                <h2>Title</h2>
            </div>
            
                <ul class="btnNavigation">
                    <li><a href="../page/dashboard.jsx">Dashborad</a></li>
                    <li><a href="../page/transaction.jsx">Transaction</a></li>
                    <li><a href="../page/budget.jsx">Budget</a></li>
                    <li><a href="../page/report.jsx">Reports</a></li>
                </ul>
        </div>

    );
}

export default SideBar