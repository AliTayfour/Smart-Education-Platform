import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css'; // Import your CSS file with styling
import { useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();
    const excludedPages = ["/login", "/register", "/profile", "/ChangePassword", "/ForgotPassword"]

    const isExcludedPage = excludedPages.includes(location.pathname);
    if (isExcludedPage) {
        return null;
    }
    return (
        <footer className="footer" >
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h2 className="footer-heading">Your<br /> Educational Platform</h2>
                        <p>A place to learn and grow together.</p>
                    </div>
                    <div className="footer-section">
                        <h3 className="footer-heading">Quick Links</h3>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/courses">Sections</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3 className="footer-heading">Contact Us</h3>
                        <p>

                            Damascus, Syria <br />
                            <a href="ali.bassam.tayfour@gmail.com">ali.bassam.tayfour@gmail.com</a> <br />
                            +963 0959501194
                        </p>
                    </div>
                    <div className="footer-section">
                        <h3 className="footer-heading">Connect With Us</h3>
                        <div className="social-links">
                            <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i className="fab fa-twitter"></i></a>
                            <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i className="fab fa-linkedin"></i></a>
                            <a href="https://alitayfour.github.io/Smart-Education-Platform/"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="copyright">© {new Date().getFullYear()} Your Educational Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
