// Register.js
import  React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./style/Register.css"
export default function Register() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState('');
    const [image, setImage] = useState(null);
    const [userType, setUserType] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [accept, setAccept] = useState(false);
    const [emailError, setEmailError] = useState("");

    // const handleImageChange = (event) => {
    //     const selectedImage = event.target.files[0];
    //     if (selectedImage) {
    //         const reader = new FileReader();
    //         reader.onload = () => {
    //             setImage(reader.result);
    //         };
    //         reader.readAsDataURL(selectedImage);
    //     }
    // };
    async function handleSubmit(e) {
        e.preventDefault();
        setAccept(true);
        if (email === "" || password.length < 8) {
            console.log("Error")
        } else {
            try {
                const formData = new FormData();
                formData.append("image", image);
                formData.append("first_name", firstname);
                formData.append("last_name", lastname);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("gender", gender);
                formData.append("user_type", userType);
    
                const response = await axios.post("http://127.0.0.1:8000/register/", formData);
                console.log(response.data);
                if (response.status === 201) {
                    const loggedInUser = response.data.user;
                    console.log(loggedInUser)
                    if (loggedInUser) {
                        window.localStorage.setItem("user", JSON.stringify(loggedInUser));
                        window.location.pathname = "/";
                    }
                }
            } catch(error) {
                setEmailError(error.response);
            }
        }
    }
    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <React.Fragment>
            <div className='register'>
                <div className="register-container">
                    <form className="register-form" onSubmit={handleSubmit} encType="multipart/form-data">
                        <legend>Register</legend>
                        <div className="form-field">
                            <label htmlFor="image-upload" className="image-upload-label">
                                {image ? (
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />
                                    ) : (
                                    <div className="upload-placeholder">
                                        <FontAwesomeIcon icon={faUser} className="icon" />
                                    </div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={(e) => { setImage(e.target.files[0]) }} />
                        </div>
                        <div className="form-field">
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="form-field">
                            <FontAwesomeIcon icon={faUser} className="icon" />
                            <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className="form-field">
                            <FontAwesomeIcon icon={faEnvelope} className="icon" />
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        {emailError === 422 && (<p style={{ color: "red" }} className='error'>User With this email address already exists</p>)}

                        <div className="form-field">
                            <FontAwesomeIcon icon={faLock} className="icon" />
                            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="icon" onClick={togglePasswordVisibility} />
                        </div>
                        {password.length < 8 && accept && (<p style={{ color: "red" }} className='error'>Password must be more than 8 characters</p>)}

                        <div className="form-field gender-field">
                            <label htmlFor="gender-select" className="gender-label">Gender:</label>
                            <div className="gender-select-container">
                                <select id="gender-select" value={gender} onChange={(e) => setGender(e.target.value)} >
                                    <option value="">Select</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                                <FontAwesomeIcon icon={faUser} className="gender-icon" />
                            </div>
                        </div>
                        <div className="form-field">
                            <label htmlFor="user-type-select" className="user-type-label">User:</label>
                            <div className="user-type-select-container">
                                <select id="user-type-select" value={userType} onChange={(e) => setUserType(e.target.value)} >
                                    <option value="">Select</option>
                                    <option value="student">student</option>
                                    <option value="teacher">teacher</option>
                                </select>
                                <FontAwesomeIcon icon={faUser} className="user-type-icon" />
                            </div>
                        </div>
                        <button type="submit" className="register-button">Register</button>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </form >
                </div>
            </div>
        </React.Fragment>

    );
}
