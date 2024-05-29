import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./style/AssignmentDetails.css";
import { Link } from 'react-router-dom';

export default function AssignmentDetails() {
    const [assignment, setAssignment] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadComplete, setUploadComplete] = useState(false);
    const { id } = useParams();
    const user = JSON.parse(window.localStorage.getItem("user"));
    const userId = user ? user.id : null;
    // const token = window.localStorage.getItem("token");

    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/assignments/${id}`);
                setAssignment(response.data);
            } catch (error) {
                console.error("Error fetching assignment details:", error);
            }
        };

        fetchAssignmentDetails();
    }, [id]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("content", file);
            formData.append("user", userId);
            formData.append("assignment", id);

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
                    setUploadProgress(progress);
                },
            };

            const response = await axios.post(`http://127.0.0.1:8000/Answer/`, formData, config);
            console.log(response.data);
            setUploadComplete(true);

            // Reset file state after successful upload
            setFile(null);

            // Hide the upload success message after 5 seconds
            setTimeout(() => {
                setUploadComplete(false);
            }, 5000);
        } catch (error) {
            console.log("Error submitting file:", error);
        }
    };

    if (!assignment) {
        return <div>Loading...</div>;
    }

    // Check if due date has passed
    const currentDate = new Date();
    const dueDate = new Date(assignment.due_date);
    const isPastDue = currentDate > dueDate;



    return (
        <div className="assignment-details-container">
            <header className="assignment-header">
                <h1>{assignment.title}</h1>
                {isPastDue && <p className="past-due-message">The deadline for this assignment has passed</p>}
                <p className="assignment-info">Due Date: {new Date(assignment.due_date).toLocaleDateString()} {new Date(assignment.due_date).toLocaleTimeString()}</p>
                <p className="assignment-info">Max Score: {assignment.max_score}</p>
            </header>

            <div className="assignment-content">
                <h3>Description</h3>
                <span className="assignment-description">{assignment.description}</span>
                <br />
                <br />

                {assignment.content && (
                    <div>
                        <h3>File</h3>
                        <a className="file-display" href={assignment.content} download>
                            Download Assignment File
                        </a>
                    </div>
                )}

                <br />
                <br />
                <h3>answer</h3>


                <div className="file-upload">

                    <div className="file-box">
                        <label htmlFor="file" className="file-label">
                            <i className="fas fa-cloud-upload-alt"></i> Choose a {assignment.content_type === "text/plain" ? "Text" : "Word"} file to upload
                        </label>
                        <input
                            type="file"
                            id="file"
                            className="input-file"
                            onChange={handleFileChange}
                        />
                        {/* Rest of the code remains the same */}
                        {file && (
                            <div className="file-info">
                                <span>{file.name}</span>
                                {uploadProgress > 0 && !uploadComplete && (
                                    <div className="progress-bar">
                                        <div className="progress" style={{ width: `${uploadProgress}%` }}>{uploadProgress}%</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <button className="back-button">
                        <Link to="/courses" className="back-link"><i className="fas fa-arrow-left"></i> Back</Link>
                    </button>
                    <button onClick={handleSubmit} disabled={!file || isPastDue}><i className="fas fa-upload"></i> Submit File</button>
                    {uploadComplete && <p className="upload-success">File uploaded successfully!</p>}
                </div>
            </div>
        </div>
    );
}
