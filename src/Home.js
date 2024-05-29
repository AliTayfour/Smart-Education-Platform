import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';
import './style/Home.css'; // Assuming you have your custom styles here
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Home() {
    const [showScrollButton, setShowScrollButton] = useState(false);
    const userExists = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollButton(window.pageYOffset > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // const user = localStorage.getItem('user');

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Array of slide images
    const slideImages = [
        require("./Assets/education-day-composition-with-graduation-cap.webp"),
        require("./Assets/2150319873.jpg"),
        require("./Assets/c++.jpg")
    ];

    // Array of slide content
    const slideContent = [
        {
            subtitle: "Discover Our Latest Course Collection!",
            link: !userExists ? "/login" : "/"
        },
        {
            subtitle: (
                <div>
                    <p>Explore the Newest Courses in</p>
                    <p>Various Fields such as Technology</p>
                    <p>Business Languages and More!</p>
                </div>
            ),
            link: "product-details-default.html"
        },
        {
            subtitle: "Start Now and Explore All Available Courses!",
            link: "product-details-default.html"
        }
    ];


    return (
        <div className="hero-slider-section">
            <Swiper
                navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                slidesPerView={1}
                effect="fade"
                speed={1500}
                watchSlidesProgress={true}
                loop={true}
                autoplay={{ delay: 3000 }}
                preloadImages={false}
                className="hero-slider-active swiper-container"
            >
                {slideContent.map((content, index) => (
                    <SwiperSlide key={index}>
                        <div className="hero-single-slider-item swiper-slide">
                            <div className="hero-slider-bg">
                                <LazyLoad offset={100}>
                                    <img src={slideImages[index]} alt="" />
                                </LazyLoad>
                            </div>
                            <div className="hero-slider-wrapper">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-auto">
                                            <div className="hero-slider-content">
                                                <h4 className="slide-subtitle">{content.subtitle}</h4>
                                                <Link to={content.link} className="btn btn-lg btn-outline-golden"
                                                >Start Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                <div className="swiper-pagination active-color-golden"></div>
                <div className="swiper-button-prev d-none d-lg-block"></div>
                <div className="swiper-button-next d-none d-lg-block"></div>
            </Swiper>

            <section className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 order-1 order-lg-2">
                            <LazyLoad offset={100}>

                                <img src={require("./Assets/hero-bg.jpg")} className="img-fluid" alt="" />
                            </LazyLoad>

                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                            <h3>Welcome to SmartLearn, Your Gateway to Mastery</h3>
                            <p className="fst-italic">
                                SmartLearn is your premier destination for mastering programming, languages, and design. Our platform offers comprehensive courses tailored to your needs, providing you with the skills and knowledge necessary to succeed in today's digital world.
                            </p>
                            <ul>
                                <li><i className="ri-check-double-line"></i> Unlock your potential with expert guidance and interactive learning.</li>
                                <li><i className="ri-check-double-line"></i> Gain practical skills through hands-on projects and real-world applications.</li>
                                <li><i className="ri-check-double-line"></i> Join a vibrant community of learners and collaborate with industry-leading instructors.</li>
                            </ul>
                            <p>
                                Take the first step towards achieving your goals and unlock endless possibilities with SmartLearn, your smart choice for online education.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            <section id="cta" class="cta">
                <div class="container" >

                    <div class="text-center">
                        <h3>Call To Action</h3>
                        <p> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <a class="cta-btn" href="https://alitayfour.github.io/Smart-Education-Platform/">Call To Action</a>
                    </div>

                </div>
            </section>

            <section id="team" class="team">
                <div class="container">

                    <div class="section-title">
                        <p>Check our Team</p>
                    </div>

                    <div class="row">

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                            <div class="member">
                                <div class="member-img">
                                    <img src={require("./Assets/testimonials-1.jpg")} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-twitter"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-facebook"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-instagram"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>Walter White</h4>
                                    <span>Chief Executive Officer</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                            <div class="member" >
                                <div class="member-img">
                                    <img src={require("./Assets/testimonials-2.jpg")} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-twitter"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-facebook"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-instagram"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>Sarah Jhonson</h4>
                                    <span>Product Manager</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                            <div class="member" >
                                <div class="member-img">
                                    <img src={require("./Assets/testimonials-3.jpg")} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-twitter"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-facebook"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-instagram"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>William Anderson</h4>
                                    <span>CTO</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
                            <div class="member">
                                <div class="member-img">
                                    <img src={require("./Assets/testimonials-4.jpg")} class="img-fluid" alt="" />
                                    <div class="social">
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-twitter"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-facebook"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-instagram"></i></a>
                                        <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i class="bi bi-linkedin"></i></a>
                                    </div>
                                </div>
                                <div class="member-info">
                                    <h4>Amanda Jepson</h4>
                                    <span>Accountant</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>



            {showScrollButton && (
                <button className="scroll-to-top" onClick={handleScrollToTop}>
                    <div className="arrow-icon"></div>
                </button>
            )}

        </div>
    );
}
