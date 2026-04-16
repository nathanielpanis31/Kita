import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import Login from "./page/login-register/login.jsx"
import Register from './page/login-register/register.jsx'
import SideBar from "./layouts/side-bar/side-bar.jsx"
import Dashboard from "./page/dashboard/dashboard.jsx"
import Transaction from "./page/transaction/transaction.jsx"
import Budget from "./page/budget/budget.jsx"
import Reports from "./page/report/report.jsx"



function App() {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App