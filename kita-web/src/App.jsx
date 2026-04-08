import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SideBar from "./components/side-bar.jsx"
import Dashboard from "./page/dashboard.jsx"
import Transaction from "./page/transaction.jsx"
import Budget from "./page/budget.jsx"
import Reports from "./page/report.jsx"

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