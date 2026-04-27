import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')

    // if there's no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />
    }

    // if there IS a token, show the page normally
    return children
}

export default ProtectedRoute