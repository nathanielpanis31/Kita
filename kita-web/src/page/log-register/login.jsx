import "./login-register.css";
import { Link } from "react-router-dom";

function Login() {
    return(
        <>

            <div className="loginRegisterHeader">
                <h1>kita.</h1>

                <div className="signup">
                    <p>no account?</p>
                    <a href="./register.jsx" className="signup-btn">Sign up</a>
                </div>
            </div>

            <div className="login">
                <div className="login-card">
                    <div className="loginCardHeadings">
                        <h4>welcome back</h4>
                        <h2>Sign in to kita</h2>
                    </div>
                    
                    <div className="inputs">
                        <div className="username">
                            <label>Username</label> <br />
                            <input type="text" placeholder="Enter your username"  className="usernameInput" required/>
                        </div>

                        <div className="password">
                            <label>Password</label><br />
                            <input type="password" placeholder="Enter your password" className="passwordInput" required/>
                        </div>
                    </div>

                    <div className="remember-forgot">
                        <div className="rememberme">
                            <input type="checkbox" id="remember" />
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
                    
                </div>
            </div>

        </>
    )
}

export default Login;