import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./style/Profile.css"
// import { useParams } from 'react-router-dom';

export default function Profile() {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState(null);
    const [userType, setUserType] = useState("");
    const user = JSON.parse(window.localStorage.getItem("user"));
    const userId = user ? user.id : null;
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/users/${userId}/`)
            .then((response) => {
                const userData = response.data;
                setFirstName(userData.first_name);
                setLastName(userData.last_name);
                setEmail(userData.email);
                setGender(userData.gender);
                setUserType(userData.user_type);
                setImage(userData.image);
            })
            .catch((error) => console.error('Error fetching user data:', error));
    }, [userId]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (email === "" || gender === "") {
            // Handle missing required fields
            console.error("Email and gender are required.");
        } else {
            const formData = new FormData();
            formData.append("first_name", firstname);
            formData.append("last_name", lastname);
            formData.append("email", email);
            formData.append("gender", gender);
            formData.append("user_type", userType);
            if (image instanceof File) {
                formData.append("image", image);
            }


            await axios.put(`http://127.0.0.1:8000/updata/${userId}/`, formData)
                .then((response) => {
                    console.log(response.data);
                    window.location.pathname = "/";
                })
                .catch((error) => {
                    console.log(error.response.status);

                });
        }
    };


    return (
        <div className='profile'>
            <div className="profile-container">
                <h2>Profile</h2>

                <div className="profile-header">
                    <Link to="/" className="profile-register-btn">Back</Link>
                </div>
                <form className="profile-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Display user image */}
                    <div className="form-field">
                        <label htmlFor="image-upload" className="image-upload-label">
                            {image ? (
                                <img src={typeof image === 'object' ? URL.createObjectURL(image) : image} alt="Uploaded" className="uploaded-image" />
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

                    {/* Hidden file input */}
                    {/* Input fields */}
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


                    <div className="form-field">
                        <label>Gender:</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>

                    <p>Do you want to change your password? <Link to="/change-password">Click here</Link></p>

                    <button type="submit" className="submit-btn">Save Changes</button>
                </form>

            </div>
        </div>
    );
}
