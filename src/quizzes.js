import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./style/quizzes.css";

export default function QuizDetail() {
    const { id: quizId } = useParams(); // Quiz ID containing the time
    const [questions, setQuestions] = useState([]);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const  setSelectedAnswerId = useState(null);
    const [showQuestions, setShowQuestions] = useState(false);
    const [user, setUser] = useState(null); // State for user
    const setQuiz = useState(null); // State for quiz
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [userAnswers, setUserAnswers] = useState({});

    useEffect(() => {
        // Fetch user details from local storage
        const userString = window.localStorage.getItem("user");
        const userData = JSON.parse(userString);
        setUser(userData);

        // Fetch quiz details
        axios.get(`http://127.0.0.1:8000/quiz/${quizId}`)
            .then(response => {
                setQuiz(response.data);
                const timeInSeconds = calculateTimeInSeconds(response.data.time_limit);
                setTimeLeft({ hours: Math.floor(timeInSeconds / 3600), minutes: Math.floor((timeInSeconds % 3600) / 60), seconds: timeInSeconds % 60 });
            })
            .catch(error => {
                console.error('Error fetching quiz details:', error);
            });

        // Fetch questions for the quiz
        axios.get(`http://127.0.0.1:8000/question/?quiz_id=${quizId}`)
            .then(response => {
                setQuestions(response.data);
            })
            .catch(error => {
                console.error('Error fetching questions:', error);
            });

    }, [setQuiz, quizId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime.seconds > 0) {
                    return { ...prevTime, seconds: prevTime.seconds - 1 };
                } else if (prevTime.minutes > 0) {
                    return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
                } else if (prevTime.hours > 0) {
                    return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
                } else {
                    clearInterval(timer);
                    return prevTime;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Function to calculate time in seconds from HH:MM format
    const calculateTimeInSeconds = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60;
    };

    const handleQuestionSelect = (questionId) => {
        setSelectedQuestion(questionId);
        axios.get(`http://127.0.0.1:8000/answer/?question_id=${questionId}`)
            .then(response => {
                setAnswers(response.data);
            })
            .catch(error => {
                console.error('Error fetching answers:', error);
            });
    };

    const handleAnswerReset = () => {
        setSelectedAnswerId(null);
    };

    const handleAnswerChange = (questionId, selectedAnswerId) => {
        setSelectedAnswerId(selectedAnswerId);
        setUserAnswers(prevState => ({
            ...prevState,
            [questionId]: selectedAnswerId
        }));
    };

    // const handleSubmit = () => {
    //     // يمكنك استخدام userAnswers هنا لإرسال الإجابات إلى الخادم أو معالجتها بأي شكل من الأشكال
    // };


    const formatTime = (time) => {
        if (!time || typeof time.hours === 'undefined' || typeof time.minutes === 'undefined' || typeof time.seconds === 'undefined') {
            return '00:00:00';
        }

        let formattedTime = '';
        if (time.hours > 0) {
            formattedTime += `${time.hours}:`;
        }

        formattedTime += `${time.minutes < 10 ? '0' : ''}${time.minutes}:`;
        formattedTime += `${time.seconds < 10 ? '0' : ''}${time.seconds}`;

        return formattedTime;
    };

    return (
        <div className="quiz-detail-container">
            <div className="quiz-header">
                <div className="user-info">
                    {user && (
                        <table className="user-details">
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>{`${user.first_name} ${user.last_name}`}</td>
                                </tr>
                                <tr>
                                    <td>Email:</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Time Left:</td>
                                    <td>{formatTime(timeLeft)}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="quiz-sidebar">
                    <h2>Quizzes<button className="quiz-button" onClick={() => setShowQuestions(!showQuestions)}>{showQuestions ? '-' : '+'}</button></h2>
                    {showQuestions && (
                        <ul className="quiz-list">
                            {questions.map((question, index) => (
                                <li key={index}>
                                    <button onClick={() => handleQuestionSelect(question.id)}>Question {index + 1}</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="quiz-main-content">
                {selectedQuestion && (
                    <div className="quiz-table-container">
                        <table className="quiz-table">
                            <tbody>
                                {questions.map((question, index) => (
                                    question.id === selectedQuestion && (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td colSpan="2"><strong>Question {index + 1} :</strong> <br />{` ${question.text}`}</td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2"><strong>Answer:</strong></td>
                                            </tr>
                                            {answers.map((answer, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name={`answer_${question.id}`}
                                                            value={answer.id}
                                                            checked={userAnswers[question.id] === answer.id}
                                                            onChange={() => handleAnswerChange(question.id, answer.id)} />
                                                    </td>
                                                    <td>{answer.text}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    )
                                ))}
                                <tr>
                                    <td colSpan="2">
                                        <div className="buttons-container">
                                            <button className="submit-button">Submit</button>
                                            <button className="reset-button" onClick={handleAnswerReset}>Reset</button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
