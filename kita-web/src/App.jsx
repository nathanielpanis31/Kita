import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideBar from "./layouts/side-bar/side-bar.jsx"
import Dashboard from "./page/dashboard/dashboard.jsx"
import Transaction from "./page/transaction/transaction.jsx"
import Budget from "./page/budget/budget.jsx"
import Reports from "./page/report/report.jsx"

function App() {
    return (
        <BrowserRouter>
        <main className="mainContent">
            <SideBar></SideBar>
            
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/transaction" element={<Transaction />} />
                    <Route path="/budget" element={<Budget />} />
                    <Route path="/reports" element={<Reports />} />
                </Routes>
            </main>
        </BrowserRouter>
    )
}

export default App