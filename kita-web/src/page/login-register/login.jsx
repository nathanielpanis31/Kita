import "./login-register.css";
import { Link } from "react-router-dom";

function Login() {
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

                    <form action="">
                    <div className="inputs">
                        <div className="username">
                            <label htmlFor="login-username">Username</label> <br />
                            <input type="text" name="login-username" placeholder="Enter username"  className="usernameInput" required/>
                        </div>

                        <div className="password">
                            <label htmlFor="login-password">Password</label><br />
                            <input type="password" name="login-password" placeholder="Enter password" className="passwordInput" required/>
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