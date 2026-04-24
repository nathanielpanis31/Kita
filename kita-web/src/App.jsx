import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Login from "./page/login-register/login.jsx"
import Register from './page/login-register/register.jsx'
import SideBar from "./layouts/side-bar/side-bar.jsx"
import Dashboard from "./page/dashboard/dashboard.jsx"
import Transaction from "./page/transaction/transaction.jsx"
import Budget from "./page/budget/budget.jsx"
import Reports from "./page/report/report.jsx"

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes - no sidebar */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private routes - with sidebar */}
                <Route path="/*" element={
                    <main className="mainContent">
                        <SideBar />
                        <div className="contentArea">
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/transaction" element={<Transaction />} />
                                <Route path="/budget" element={<Budget />} />
                                <Route path="/reports" element={<Reports />} />
                            </Routes>
                        </div>
                    </main>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App