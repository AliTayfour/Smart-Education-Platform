import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "./style/Login.css";
import LazyLoad from 'react-lazyload';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentForm, setCurrentForm] = useState('forgotPassword');
    const [userData, setUserData] = useState(null);

    const handleSendCode = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://127.0.0.1:8000/users/`);
            const userData = response.data.find(user => user.email === email);
            if (userData) {
                setUserData(userData);
                setCurrentForm('resetPassword');
            } else {
                setErrorMessage("Email not found. Please enter a valid email.");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setErrorMessage("Error fetching user data. Please try again later.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!userData || newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match or user data not found.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("password", newPassword);

            await axios.put(`http://127.0.0.1:8000/change-password/${userData.id}/`, formData);
            console.log("Password changed successfully!");
            window.location.pathname = "/login";
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage("Error changing password. Please try again later.");
        }
    };

    const togglePasswordVisibility = (type) => {
        if (type === "new") setShowNewPassword(!showNewPassword);
        else if (type === "confirm") setShowConfirmPassword(!showConfirmPassword);
    };

    const handleBack = () => {
        if (currentForm === 'resetPassword') setCurrentForm('forgotPassword');
    };

    return (
        <div className="login">
            <div className="login-container">
                <div className="left-section">
                    <LazyLoad offset={100}>
                        <img src={require("./Assets/Wavy_Gen-01_Single-07.jpg")} alt="Form" />
                    </LazyLoad>
                </div>
                <div className="right-section">
                    <form className="login-form" onSubmit={currentForm === 'forgotPassword' ? handleSendCode : handleResetPassword}>
                        <h1>{currentForm === 'forgotPassword' ? 'Enter Your Email' : 'Reset Password'}</h1>
                        {currentForm === 'forgotPassword' ? (
                            <>
                                <div className="form-field">
                                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                                    <input type="email" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="button-container">
                                    <Link to="/login" className="back-link">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        <span>Back</span>
                                    </Link>
                                    <button type="submit" className="button">Send</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="form-field">
                                    <FontAwesomeIcon icon={faLock} className="icon" />
                                    <input type={showNewPassword ? "text" : "password"} id="newPassword" name="newPassword" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                                    <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} className="toggle-password" onClick={() => togglePasswordVisibility("new")} />
                                </div>
                                <div className="form-field">
                                    <FontAwesomeIcon icon={faLock} className="icon" />
                                    <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="toggle-password" onClick={() => togglePasswordVisibility("confirm")} />
                                </div>
                                <div className="button-container">
                                    <Link onClick={handleBack} className="back-link">
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        <span>Back</span>
                                    </Link>
                                    <button type="submit" className="button">Reset Password</button>
                                </div>
                            </>
                        )}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
