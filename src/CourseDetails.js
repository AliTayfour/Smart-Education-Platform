import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './style/CourseDetails.css';

export default function CourseDetails() {
    const [course, setCourse] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [sections, setSections] = useState([]);
    const [quizzes, setquizzes] = useState([]);
    const { id: course_id } = useParams(); // تعريف المتغير course_id بشكل صحيح هنا
    const [openIndex, setOpenIndex] = useState(null);
    const [openQuizIndex, setOpenQuizIndex] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/Courses/${course_id}`)
            .then((response) => {
                setCourse(response.data);
            })
            .catch((error) => {
                console.error("Error fetching Courses details:", error);
            });

        axios.get(`http://127.0.0.1:8000/CourseReviews/?course=${course_id}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching CourseReviews reviews:", error);
            });

        axios.get(`http://127.0.0.1:8000/Section/?course=${course_id}`)
            .then((response) => {
                setSections(response.data);
            })
            .catch((error) => {
                console.error("Error fetching sections:", error);
            });
        axios.get(`http://127.0.0.1:8000/quiz/?course=${course_id}`)
            .then((response) => {
                setquizzes(response.data);
            })
            .catch((error) => {
                console.error("Error fetching quizzes:", error);
            });
    }, [course_id]);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    const handleQuizToggle = () => {
        setOpenQuizIndex(openQuizIndex !== null ? null : !null);
    };

    if (!course || !sections) {
        return <div>Loading...</div>;
    }

    const priceDisplay = course.price === "0.00" ? 'Free' : `$${course.price}`;
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'filled-star' : 'empty-star'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div>
            <section className="course-details">
                <div className="container">
                    <div className="content">
                        <h2>{course.name}</h2>
                        <ul className="details-list">
                            <li><span className="icon ri-user-line"></span> Teacher : {course.instructor.first_name} {course.instructor.last_name}</li>
                            <li><span className="icon ri-calendar-line"></span> Creation Date : {new Date(course.creation_date).toLocaleDateString()}</li>
                            <li><span className="icon ri-price-tag-2-line"></span> Price : {priceDisplay}</li>
                        </ul>
                        <button className="start-learning-btn">Start learning now</button>
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 order-lg-2">
                        <img src={course.image} className="course-image" alt={course.name} />
                    </div>
                </div>
            </section>
            <section className="about-description">
                <div className="container">
                    <div className="row">
                        <div className="about-content">
                            <h3>What will you learn in this course ? </h3>
                            <ul className='description'>
                                <li> {course.description}</li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
            <section className="about-course">
                <div className="container">
                    <div className="row">
                        <div className="content">
                            <h3>Who is this course for ? </h3>
                            {course.department === "Programming" &&
                                <ul className='description'>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For those seeking a solid start in programming regardless of their previous experience.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For those who have attempted to learn programming before and felt challenged, unable to continue.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For university students struggling to grasp programming concepts and unable to solve problems individually.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For parents and teachers aiming to understand the basics of programming to assist their children in dealing with computational.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For children eager to explore the world of programming from the age of seven and above.
                                    </li>
                                </ul>
                            }
                            {course.department === "Languages" &&
                                <ul className='description'>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For those seeking a solid start in languages regardless of their previous experience.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For those who have attempted language learning before and felt challenged, unable to persevere.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For university students struggling with grasping language concepts and unable to communicate effectively.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For parents or educators looking to learn languages to assist their children in understanding basic language principles.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For children eager to learn languages from the age of seven and above.
                                    </li>
                                </ul>
                            }
                            {course.department === "Design" &&
                                <ul className='description'>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For those aspiring to build a solid foundation in design, regardless of their prior experience.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For individuals who have attempted design before and found it challenging, unable to continue.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For university students struggling to grasp design principles and unable to execute projects independently.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For parents or educators looking to learn design to assist their children in understanding basic design concepts and principles.
                                    </li>
                                    <li>
                                        <i className="ri-check-double-line"></i>
                                        For children eager to explore the world of design from the age of seven and above.
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <section className="reviews-section">
                <div className="container">
                    <h3>Course Reviews</h3>
                    <div className="reviews-container">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-box">
                                <div className="review-header">
                                    <img src={review.course.instructor.image} alt={`${review.course.instructor.first_name}'s Avatar`} className="user-avatar" />
                                    <div className="user-info">
                                        <h4>{review.course.instructor.first_name} {review.course.instructor.last_name}</h4>
                                        <div className="rating">Rating: {renderStars(review.rating)}</div>
                                    </div>
                                </div>
                                <p className="comment">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="about-section">
                <div className="container">
                    <div className="row">
                        <div className="section-content">
                            <h3>sections</h3>
                            <p>Explore lesson details by clicking on the plus sign, and you can also try the <span className="highlight">first five hours of the course for free</span>.</p>
                            {sections.map((section, index) => (
                                <div key={index} className="section-box">
                                    <div className="section-header">
                                        <div className="user-info">
                                            <h4>section {index + 1} : {section.name}</h4>
                                        </div>
                                        <button onClick={() => handleToggle(index)}>
                                            {openIndex === index ? '-' : '+'}
                                        </button>
                                    </div>
                                    {openIndex === index && (
                                        <div>
                                            <h5>Lessons:</h5>
                                            <ul>
                                                {section.lessons.map((lesson, lessonIndex) => {
                                                    const lesson_id = lesson.id; // تعريف متغير lesson_id هنا
                                                    return (
                                                        <li key={lessonIndex}>
                                                            <span className="icon ri-file-text-line"></span>
                                                            {lesson.title}
                                                            <Link to={`/courses/${course_id}/lessons/${lesson_id}`} className="view-btn">View </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                            <h5>Assignments:</h5>
                                            <ul>
                                                {section.assignments.map((assignment, assignmentIndex) => {
                                                    const assignment_id = assignment.id; // تعريف متغير assignment_id هنا
                                                    return (
                                                        <li key={assignmentIndex}>
                                                            <span className="icon ri-task-line"></span>
                                                            {assignment.title}
                                                            <Link to={`/assignment/${assignment_id}`} className="view-btn">View</Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </section>
            <section className="about-section">
                <div className="container">
                    <div className="row">
                        <div className="section-content">
                            <h3>Quizzes</h3>
                            <p>Explore quizzes by clicking on the plus sign.</p>
                            <div className="section-box">
                                <div className="section-header">
                                    <div className="user-info">
                                        <h4>Quizzes :</h4>
                                    </div>
                                    <button onClick={() => handleQuizToggle()}>
                                        {openQuizIndex !== null ? '-' : '+'}
                                    </button>
                                </div>
                                {openQuizIndex !== null && (
                                    <div>
                                        <ul>
                                            {quizzes.map((quiz, quizIndex) => {
                                                const quiz_id = quiz.id;
                                                return (
                                                    <li key={quizIndex}>
                                                        <span className="icon ri-file-text-line"></span>
                                                        {quiz.title}
                                                        <Link to={`/courses/${course_id}/quizzes/${quiz_id}`} className="view-btn">View</Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
