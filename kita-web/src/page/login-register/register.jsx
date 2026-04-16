import { useState } from "react";
import "./login-register.css";
import { Link } from "react-router-dom";
import axios from 'axios'

function Register() {

    const [fullName, setFullName] = useState()
    const [userName, setUserName] = useState()
    const [registerPassword, setPassword] = useState()
    const [registerConfirmPassword, setConfirmPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register',{fullName, userName, registerPassword, registerConfirmPassword})
        .then(result => console.log(result))
        .catch(err => console.log(err))

    }

    return (
        <>
        <div className="loginRegisterHeader">
            <h1>kita.</h1>

            <div className="signup">
                <p>already have an account?</p>
                <Link to="/login" className="signup-btn">Sign in</Link>
            </div>
        </div>

        
        <div className="register">
            <div className="register-card">
                <h4>GET STARTED</h4>
                <h2>Create your account</h2>

                <form onSubmit={handleSubmit}>
                <div className="register-input">
                    <div className="full-name">
                        <label htmlFor="fullName">FULL NAME</label><br />
                        <input type="text" name="fullName" placeholder="Enter full name" onChange={(e) => setFullName(e.target.value)} required/>
                    </div>

                    <div className="register-userName">
                        <label htmlFor="userName">USER NAME</label><br />
                        <input type="text" name="userName" placeholder="Enter username" onChange={(e) => setUserName(e.target.value)} required />
                    </div>

                    <div className="register-password">
                        <label htmlFor="registerPassword">PASSWORD</label><br />
                        <input type="password" name="registerPassword" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>

                    <div className="terms-policy">
                        <input type="checkbox" id="terms" name="terms"/>
                        <label htmlFor="terms">I agree to the Terms and Privacy Policy</label>
                    </div>

                    <div className="register-button">
                        <button type="submit" className="signin">Sign up</button>
                        <hr />
                        <button className="register-google">Signin with google</button>
                    </div>
                </div>
                </form>

            </div>
        </div>
        </> 


    )
}
export default Register;