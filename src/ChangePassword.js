import React, { useState } from 'react';
import axios from 'axios';
import "./style/ChangePassword.css";
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [accept, setAccept] = useState(false);


    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setAccept(true);

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match. Please try again.");
        } if (newPassword.length < 8) {
            setErrorMessage("Password must be more than 8 characters");
        } else {
            try {
                const formData = new FormData();
                formData.append("password", newPassword);
                const user = JSON.parse(window.localStorage.getItem("user"));
                const userId = user ? user.id : null;
                await axios.put(`http://127.0.0.1:8000/change-password/${userId}/`, formData);
                console.log("Password changed successfully!");
                setErrorMessage("");
            } catch (error) {
                console.error('Error changing password:', error);
                setErrorMessage("Error changing password. Please try again later.");
            }
        }
    };


    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className='ChangePassword'>
            <div className="ChangePassword-container">
                <h2>Change Password</h2>
                <div className="profile-header">
                    <Link to="/profile" className="profile-register-btn">Back</Link>
                </div>
                <form className="change-password-form" onSubmit={handlePasswordChange}>
                    <div className="form-field">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Password"
                            name="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showNewPassword ? faEyeSlash : faEye}
                            className="toggle-password"
                            onClick={toggleNewPasswordVisibility}
                        />

                    </div>
                    <div className="form-field">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            className="toggle-password"
                            onClick={toggleConfirmPasswordVisibility}
                        />
                    </div>
                    {errorMessage && accept && <div id="error-message" className="error-message">{errorMessage}</div>}
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
}
