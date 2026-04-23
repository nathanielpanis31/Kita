import { useState } from "react";
import "./login-register.css";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register() {
    const [fullName, setFullName] = useState('')
    const [userName, setUserName] = useState('')
    const [registerPassword, setPassword] = useState('')
    const [registerConfirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/register', { 
            fullName, 
            userName, 
            registerPassword, 
            registerConfirmPassword 
        })
        .then(result => {
            console.log(result)
            navigate('/login')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="auth-container">
            <header className="loginRegisterHeader">
                <h1>kita.</h1>
                <div className="signup">
                    <p>Already have an account?</p>
                    <Link to="/login" className="signup-btn">Sign in</Link>
                </div>
            </header>

            <main className="auth-page">
                <div className="auth-card">
                    <div className="auth-header">
                        <h4>Get Started</h4>
                        <h2>Create your account</h2>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">FULL NAME</label>
                            <input 
                                type="text" 
                                id="fullName"
                                placeholder="Enter your full name" 
                                onChange={(e) => setFullName(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="userName">USERNAME</label>
                            <input 
                                type="text" 
                                id="userName"
                                placeholder="Choose a username" 
                                onChange={(e) => setUserName(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registerPassword">PASSWORD</label>
                            <input 
                                type="password" 
                                id="registerPassword"
                                placeholder="Create a password" 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="terms-policy">
                            <input type="checkbox" id="terms" required />
                            <label htmlFor="terms">
                                I agree to the <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                            </label>
                        </div>

                        <div className="auth-buttons">
                            <button type="submit" className="btn-primary">Create account</button>
                            <div className="auth-divider">
                                <span>OR</span>
                            </div>
                            <button type="button" className="btn-secondary">
                                <svg width="18" height="18" viewBox="0 0 18 18">
                                    <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91a8.78 8.78 0 0 0 2.69-6.62z"/>
                                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.8.54-1.83.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.95v2.33A9 9 0 0 0 9 18z"/>
                                    <path fill="#FBBC05" d="M3.96 10.71a5.4 5.4 0 0 1 0-3.42V4.96H.95a9 9 0 0 0 0 8.08l3.01-2.33z"/>
                                    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.96 8.96 0 0 0 9 0 9 9 0 0 0 .95 4.96l3.01 2.33c.71-2.13 2.7-3.71 5.04-3.71z"/>
                                </svg>
                                Sign up with Google
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Register;