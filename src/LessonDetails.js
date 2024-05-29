import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./style/LessonDetails.css"
import { createBrowserHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default function LessonDetails() {
    const [lesson, setLesson] = useState(null);
    const [sections, setSections] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [comments, setComments] = useState([]);

    const [openSectionId, setOpenSectionId] = useState(null); // State to track which section is open
    const [searchQuery, setSearchQuery] = useState("");
    const { pathname } = window.location;
    const pathParts = pathname.split('/'); // تقسيم عنوان URL باستخدام "/"
    const course_id = pathParts[pathParts.indexOf('courses') + 1]; // الحصول على الـ ID بعد "courses"
    const lesson_id = pathParts[pathParts.indexOf('lessons') + 1]; // الحصول على الـ ID بعد "lessons"

    const history = createBrowserHistory();

    useEffect(() => {
        // Fetch lesson details using the courseId
        axios.get(`http://127.0.0.1:8000/lessons/${lesson_id}`)
            .then(response => {
                setLesson(response.data);
            })
            .catch(error => {
                console.error("Error fetching lesson details:", error);
            });
        axios.get(`http://127.0.0.1:8000/Comments/?lesson=${lesson_id}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error("Error fetching comments details:", error);
            });
        // Fetch sections related to the course
        axios.get(`http://127.0.0.1:8000/Section/?course=${course_id}`)
            .then(response => {
                setSections(response.data);
            })
            .catch(error => {
                console.error("Error fetching sections details:", error);
            });

        // Fetch assignments related to the course
        axios.get(`http://127.0.0.1:8000/assignments/?course=${course_id}`)
            .then(response => {
                setAssignments(response.data);
            })
            .catch(error => {
                console.error("Error fetching assignments details:", error);
            });
    }, [course_id, lesson_id]); // Depend on lessonId only

    if (!lesson) {
        return <div>Loading...</div>;
    }
    const handleLessonClick = (lessonId) => {
        const selectedLesson = sections.reduce((acc, section) => {
            const foundLesson = section.lessons.find(lesson => lesson.id === lessonId);
            return foundLesson ? foundLesson : acc;
        }, null);

        setLesson(selectedLesson);
        history.push(`/courses/${course_id}/lessons/${lessonId}`);
    };
    const toggleSection = (sectionId) => {
        setOpenSectionId(prevOpenSectionId => prevOpenSectionId === sectionId ? null : sectionId);
    };
    const searchLesson = (query) => {
        setSearchQuery(query);
    };
    // const filteredLessons = sections.flatMap(section => section.lessons)
    //     .filter(lesson => {
    //         const lowerCaseQuery = searchQuery.toLowerCase();
    //         if (isNaN(searchQuery)) {
    //             return lesson.title.toLowerCase().includes(lowerCaseQuery);
    //         }
    //         else {
    //             return lesson.order.toString().includes(lowerCaseQuery);
    //         }
    //     });
    // const totalComments = comments.length;
    /////github//////////////////////////////////////
    const handlePlayClick = () => {
        const video = document.querySelector('video');
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    };
    return (
        <div>
            <div className="breadcrumb-section breadcrumb-bg-color--golden">
                <div className="breadcrumb-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="breadcrumb-title">{`Lesson ${lesson.order}`}</h3>
                                <div className="breadcrumb-nav breadcrumb-nav-color--black breadcrumb-nav-hover-color--golden">
                                    <nav aria-label="breadcrumb">
                                        <ul>
                                            <li><a href="/">Home</a></li>
                                            <li><a href="/Courses">Courses</a></li>
                                            <li className="active" aria-current="page">Lessons</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog-section">
                <div className="container">
                    <div className="row flex-column-reverse flex-lg-row">
                        <div className="col-lg-3">
                            <div className="sidebar-section">
                                <div className="sidebar-single-widget">
                                    <h6 className="sidebar-title">Search</h6>
                                    <div className="default-search-style d-flex">
                                        <input
                                            className="default-search-style-input-box"
                                            type="search"
                                            placeholder="Search lesson..."
                                            onChange={(e) => searchLesson(e.target.value)}
                                            required
                                        />
                                        <button className="default-search-style-input-btn" type="submit"><i className="fa fa-search"></i></button>
                                    </div>
                                </div>
                                <div className="sidebar-single-widget">
                                    <h6 className="sidebar-title">Sections</h6>
                                    <div className="sidebar-content">
                                        <ul className="sidebar-menu">
                                            {/* عرض جميع الأقسام */}
                                            {sections.map(section => (
                                                <li key={section.id}>
                                                    <button className="section-button" onClick={() => toggleSection(section.id)}>
                                                        {section.name}
                                                        {openSectionId === section.id ? <i className="fa fa-minus"></i> : <i className="fa fa-plus"></i>}
                                                    </button>
                                                    {/* Display lessons of the opened section */}
                                                    {openSectionId === section.id && (
                                                        <ul className="lesson-list">
                                                            {section.lessons.filter(lesson => lesson.title.toLowerCase().includes(searchQuery.toLowerCase())).map(filteredLesson => (
                                                                <li key={filteredLesson.id}>
                                                                    <a href="https://alitayfour.github.io/Smart-Education-Platform/" onClick={() => handleLessonClick(filteredLesson.id)}>{filteredLesson.title}</a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                                <div className="sidebar-single-widget">
                                    <h6 className="sidebar-title">Assignment</h6>
                                    <div className="sidebar-content">

                                        <ul className="assignment-list">
                                            {/* عرض جميع الواجبات */}
                                            {assignments.map(assignment => (
                                                <li key={assignment.id}> <Link to={`/assignment/${assignment.id}`}>{assignment.title}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="blog-single-wrapper">
                                {lesson.content_type === 'image' && (
                                    <div className="blog-single-img">
                                        <img className="img-fluid" src={lesson.content_image} alt="" />
                                    </div>
                                )}
                                {lesson.content_type === 'text' && (
                                    <p>{lesson.content_text}</p>
                                )}
                                {lesson.content_type === 'video' && (
                                    <div className="video-wrapper">
                                        <video controls>
                                            <source src={lesson.content_video} type="video/mp4" />
                                            Your browser does not support the video element.
                                        </video>
                                        <div className="play-button" onClick={handlePlayClick}>▶</div>
                                    </div>

                                )}
                                {lesson.content_type === 'audio' && (
                                    <audio controls>
                                        <source src={lesson.content_audio} type="audio/mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                )}

                                <ul className="post-meta">
                                    <li className="date"><h5>date of publication :  {lesson.created_at.split('T')[0]}</h5></li>
                                </ul>


                                <h4 className="post-title">title</h4>
                                <div className="para-content">

                                    <blockquote className="blockquote-content">
                                        {lesson.title}
                                    </blockquote>

                                </div>



                                <div>

                                    <div className="comment-area">
                                        <div className="comment-box">
                                            {comments.length === 0 ? (
                                                <h4 className="title mb-4">لا يوجد تعليقات</h4>
                                            ) : (
                                                <h4 className="title mb-4">{comments.length} Comments</h4>
                                            )}

                                            <ul className="comment">
                                                {comments.map((comment, index) => (
                                                    <li className="comment-list" key={index}>
                                                        <div className="comment-wrapper">
                                                            <div className="comment-img">
                                                                {comment.user.image ? (
                                                                    <img src={comment.user.image} alt="User Avatar" />
                                                                ) : (
                                                                    <FontAwesomeIcon icon={faUser} />
                                                                )}
                                                            </div>

                                                            <div className="comment-content">
                                                                <div className="comment-content-top">
                                                                    <div className="comment-content-left">
                                                                        <h6 className="comment-name">{comment.user.first_name} {comment.user.last_name}</h6>
                                                                    </div>
                                                                </div>
                                                                <div className="para-content">
                                                                    <p>{comment.content}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="comment-form" >
                                            <div className="coment-form-text-top mt-30">
                                                <h4 className="title mb-3 mt-3">Leave a Reply</h4>
                                                <p>Your email address will not be published. Required fields are marked *</p>
                                            </div>

                                            <form action="#" method="post">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="default-form-box mb-20">
                                                            <label htmlFor="comment-name">Your name <span>*</span></label>
                                                            <input id="comment-name" type="text" placeholder="Enter your name" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="default-form-box mb-20">
                                                            <label htmlFor="comment-email">Your Email <span>*</span></label>
                                                            <input id="comment-email" type="email" placeholder="Enter your email"
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="default-form-box mb-20">
                                                            <label htmlFor="comment-review-text">Your review <span>*</span></label>
                                                            <textarea id="comment-review-text" placeholder="Write a review"
                                                                required></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-md btn-golden" type="submit">Post Comment</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >

            </div >

        </div >

    );
}
