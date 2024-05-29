// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "./style/Login.css"
import LazyLoad from 'react-lazyload';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);
        if (email === "" || password.length < 8) {
       } else {
            try {
                const response = await axios.post("http://127.0.0.1:8000/login/", {
                    email: email,
                    password: password
                });

                if (response.status === 200) {
                    const { user, token } = response.data;
                    if (user && token) {
                        localStorage.setItem("user", JSON.stringify(user));
                        localStorage.setItem("token", token);
                        window.location.pathname = "/";
                    }
                }
            } catch (error) {
                console.error(error.response);
            }
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <React.Fragment>

            <div className="login">
                <div className="login-container">
                    <div className="left-section">
                        <LazyLoad offset={100}>
                            <img src={require("./Assets/Wavy_Gen-01_Single-07.jpg")} alt="Form" />
                        </LazyLoad>
                    </div>
                    <div className="right-section">
                        <form className="login-form" onSubmit={Submit} >
                            <h1>Welcome back</h1>
                            <div className="form-field">
                                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-field">
                                <FontAwesomeIcon icon={faLock} className="icon" />
                                <input type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="icon" onClick={togglePasswordVisibility} />
                            </div>
                            {password.length < 8 && accept && (<p className='error'>Password must be more than 8 characters</p>)}
                            <div className='class'>
                                <p style={{ textAlign: 'right' }} ><Link to="/forgot-password">Forgot password ?</Link></p>
                            </div>
                            <button type="submit" className="button">Login</button>
                        </form>
                        <p>Don't have an account? <Link to="/register">Click here</Link></p>
                    </div>
                </div>
            </div>
        </React.Fragment>

    );
}
