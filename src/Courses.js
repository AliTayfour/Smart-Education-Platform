import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import './style/Courses.css';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import axios from 'axios';
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [showFilters, setShowFilters] = useState(false); // State for showing/hiding filters
    const [sortBy, setSortBy] = useState("name"); // Default sort by course name
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/Courses/")
            .then((response) => {
                setCourses(response.data);
            })
            .catch((error) => {
                console.error("Error fetching course data:", error);
            });
    }, []);

    // Organize courses by department
    const coursesByDepartment = courses.reduce((acc, course) => {
        acc[course.department] = [...(acc[course.department] || []), course];
        return acc;
    }, {});

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    // Function to sort courses based on selected filter
    const sortCourses = (courses) => {
        if (sortBy === "name") {
            return courses.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "priceLowToHigh") {
            return courses.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortBy === "priceHighToLow") {
            return courses.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        }
        // Default: return unsorted courses
        return courses;
    };

    function formatPrice(price) {
        if (price === "0.00") {
            return "Free";
        } else {
            return `$${price}`;
        }
    }

    const toggleFilters = () => {
        setShowFilters(!showFilters); // Toggle show/hide filters
    };

    return (
        <div className="hero-slider-section">
            <div className="breadcrumb-section">
                <div className="breadcrumb-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3 className="breadcrumb-title">
                                    Start your learning <br /> journey with<br />
                                    <span><i className="fas fa-graduation-cap"></i></span> Smart Lear
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="filter-toggle" onClick={toggleFilters}>
                <i className="fas fa-filter"></i> Filter
            </div>
            {/* Filter Dropdown */}
            {showFilters && (
                <div className="filter-dropdown">
                    <ul>
                        <li>
                            <label>
                                Sort by :
                                <select value={sortBy} onChange={handleSortByChange}>
                                    <option value="name">Name</option>
                                    <option value="priceLowToHigh">Price: Low to High</option>
                                    <option value="priceHighToLow">Price: High to Low</option>
                                </select>
                            </label>
                        </li>
                    </ul>
                </div>
            )}
            {/* Title Section */}
            <div className="title">
                <p>Each course takes you to the professional level. Try it for yourself</p>
            </div>
            {/* Courses Section */}
            {Object.entries(coursesByDepartment).map(([department, courses]) => (
                <div key={department} className="blog-default-slider-section section-top-gap-100 section-fluid">
                    <div className="section-title-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="section-content-gap">
                                        <div className="secton-content">
                                            <h3 className="section-title">{department} Department</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="blog-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="blog-default-slider default-slider-nav-arrow">
                                        <Swiper
                                            navigation={{ nextEl: '.swiper-button-next-' + department, prevEl: '.swiper-button-prev-' + department }}
                                            slidesPerView={3}
                                            spaceBetween={30}
                                            loop={true}
                                            autoplay={false}
                                            preloadImages={false}
                                            className={"hero-slider-active swiper-container-" + department}
                                        >
                                            {sortCourses(courses).map((course, index) => {
                                                const course_id = course.id; // تعريف متغير course_id هنا
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div className="blog-default-single-item blog-color--golden">
                                                            <div className="image-box">
                                                                <LazyLoad offset={100}>
                                                                    <Link to={`/courses/${course_id}`}> <img className="img-fluid" src={course.image} alt="" /></Link>
                                                                </LazyLoad>

                                                            </div>
                                                            <div className="content">
                                                                <h6 className="title"><Link to={`/courses/${course_id}`}>{course.name}</Link></h6>
                                                                <p>{course.description}</p>
                                                                <div className="inner">
                                                                    <Link to={`/courses/${course_id}`} className="read-more-btn icon-space-left">Read More <span><i className="ion-ios-arrow-thin-right"></i></span></Link>
                                                                    <div className="post-meta">
                                                                        <span className="price">{formatPrice(course.price)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                        <div className={"swiper-button-prev swiper-button-prev-" + department}></div>
                                        <div className={"swiper-button-next swiper-button-next-" + department}></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}