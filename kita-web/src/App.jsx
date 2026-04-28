import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from "./page/login-register/login.jsx"
import Register from './page/login-register/register.jsx'
import SideBar from "./layouts/side-bar/side-bar.jsx"
import Dashboard from "./page/dashboard/dashboard.jsx"
import Transaction from "./page/transaction/transaction.jsx"
import Budget from "./page/budget/budget.jsx"
import Reports from "./page/report/report.jsx"
import Goals from "./page/goals/goals.jsx" 
import ProtectedRoute from './components/protectedroute/ProtectedRoute.jsx'
import { DateProvider } from './context/DateContext.jsx'

function App() {
    return (
        <DateProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes - no sidebar */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Private routes - wrapped in ProtectedRoute */}
                    <Route path="/*" element={
                        <ProtectedRoute>
                            <main className="mainContent">
                                <SideBar />
                                <div className="contentArea">
                                    <Routes>
                                        <Route path="/" element={<Dashboard />} />
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/transaction" element={<Transaction />} />
                                        <Route path="/budget" element={<Budget />} />
                                        <Route path="/reports" element={<Reports />} />
                                        <Route path="/goals" element={<Goals />} />
                                    </Routes>
                                </div>
                            </main>
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </DateProvider>
    )
}

export default App