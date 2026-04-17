import "./login-register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {

        const [userName, setUserName] = useState()
        const [registerPassword, setPassword] = useState()
        const navigate = useNavigate()
    
        const handleSubmit = (e) => {
            e.preventDefault()
            axios.post('http://localhost:3001/login',{userName, registerPassword})
            .then(result => {
                console.log(result)
                if(result.data === "Success") {
                    navigate('/dashboard')
                }

            })
            .catch(err => console.log(err))

        }
    
    return(
        <>

            <div className="loginRegisterHeader">
                <h1>kita.</h1>

                <div className="signup">
                    <p>no account?</p>
                    <Link to="/register" className="signup-btn">Sign up</Link>
                </div>
            </div>

            <div className="login">
                <div className="login-card">
                    <div className="loginCardHeadings">
                        <h4>WELCOME BACK</h4>
                        <h2>Sign in to kita</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                    <div className="register-input">
                        <div className="register-userName">
                            <label htmlFor="userName">USER NAME</label><br />
                            <input type="text" name="userName" placeholder="Enter username" onChange={(e) => setUserName(e.target.value)} required />
                        </div>

                        <div className="register-password">
                            <label htmlFor="registerPassword">PASSWORD</label><br />
                            <input type="password" name="registerPassword" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <div className="rememberme">
                            <input type="checkbox" id="remember" name="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        
                        <div className="forgot-password">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>

                    <div className="button">
                        <button type="submit" className="signin">Sign in</button>
                        <hr />
                        <button className="google">Signin with google</button>
                    </div>
                    </form>
                    
                </div>
            </div>
            

        </>
    )
}

export default Login;