import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../style/Navbar.css";
import { useLocation } from 'react-router-dom';
export default function Header() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [, setUserInfo] = useState(null);

    const location = useLocation();
    const excludedPages = ["/login", "/register", "/change-password", "/forgot-password", "/profile",];
    const isExcludedPage = excludedPages.includes(location.pathname);

    useEffect(() => {
        let prevScrollpos = window.pageYOffset;

        const handleScroll = () => {
            const headerSection = document.querySelector(".header-section");
            if (headerSection) {
                const currentScrollPos = window.pageYOffset;
                if (prevScrollpos > currentScrollPos) {
                    headerSection.classList.remove("slide-up");
                    headerSection.classList.add("slide-down");
                } else {
                    headerSection.classList.remove("slide-down");
                    headerSection.classList.add("slide-up");
                }
                prevScrollpos = currentScrollPos;
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isExcludedPage) {
        return null;
    }
    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
    };


    const handleLogout = () => {
        setUserInfo(window.localStorage.clear("user"))
    }
    const user = JSON.parse(window.localStorage.getItem("user"));
    const scrollToAboutSection = () => {
        const aboutSection = document.querySelector(".about");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <header className="header-section d-none d-xl-block">
            <div className="header-wrapper">
                <div className="header-bottom">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 d-flex align-items-center justify-content-between">
                                <div className="header-logo">
                                    <div className="logo">
                                        <Link to="/"> <img className="menu-banner-img"
                                            src={require("../Assets/3d-rendering-bent-pencil-font-letter-s-pen-tool-created-clipping-path-included-jpeg-easy-composite.png")} alt="" /></Link>
                                    </div>
                                </div>
                                <div className="main-menu menu-color--black menu-hover-color--golden">
                                    <nav>
                                        <ul>
                                            <li className="has-dropdown">
                                                <Link className="active main-menu-link" to="/">Home
                                                </Link>

                                            </li>
                                            <li className="has-dropdown has-megaitem">
                                                <Link to="/product-details-default.html">Sections <i
                                                    className="fa fa-angle-down"></i></Link>

                                                <div className="mega-menu">
                                                    <ul className="mega-menu-inner">
                                                        <li className="mega-menu-item">
                                                            <Link to="#" className="mega-menu-item-title">Programming</Link>
                                                            <ul className="mega-menu-sub">
                                                                <li><Link to="shop-grid-sidebar-left.html">C++
                                                                </Link>
                                                                </li>
                                                                <li><Link to="shop-grid-sidebar-right.html">C#
                                                                </Link></li>
                                                                <li><Link to="shop-full-width.html">Python</Link></li>
                                                                <li><Link to="shop-list-sidebar-left.html">React js
                                                                </Link></li>
                                                                <li><Link to="shop-list-sidebar-right.html">Vue js
                                                                </Link></li>
                                                            </ul>
                                                        </li>

                                                        <li className="mega-menu-item">
                                                            <Link to="#" className="mega-menu-item-title">Languages</Link>
                                                            <ul className="mega-menu-sub">
                                                                <li><Link to="cart.html">English</Link></li>
                                                                <li><Link to="empty-cart.html">Arabic</Link></li>
                                                                {/* <li><Link to="wishlist.html">Wishlist</Link></li>
                                                                    <li><Link to="compare.html">Compare</Link></li>
                                                                    <li><Link to="checkout.html">Checkout</Link></li>
                                                                    <li><Link to="login.html">Login</Link></li>
                                                                    <li><Link to="my-account.html">My Account</Link></li> */}
                                                            </ul>
                                                        </li>

                                                        <li className="mega-menu-item">
                                                            <Link to="#" className="mega-menu-item-title">Design</Link>
                                                            <ul className="mega-menu-sub">
                                                                <li><Link to="product-details-default.html">3D Max
                                                                </Link></li>
                                                                <li><Link to="product-details-variable.html">llustrator
                                                                </Link></li>
                                                                <li><Link to="product-details-affiliate.html">After effects
                                                                </Link></li>
                                                                <li><Link to="product-details-group.html"> InDesign </Link>
                                                                </li>
                                                                {/* <li><Link to="product-details-single-slide.html">Product
                                                                        Slider</Link></li> */}
                                                            </ul>
                                                        </li>

                                                    </ul>
                                                    <div className="menu-banner">
                                                        <Link to="#" className="menu-banner-link">
                                                            <img className="menu-banner-img"
                                                                src={require("../Assets/360_F_217635309_2xq6WZCveyhJNNoDHVAtjn6EFGHTcHrU.jpg")} alt="" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </li>

                                            <li className="has-dropdown">
                                                <Link to="#">Pages <i className="fa fa-angle-down"></i></Link>

                                                <ul className="sub-menu">
                                                    <li><Link to="faq.html">Frequently Questions</Link></li>
                                                    <li><Link to="privacy-policy.html">Privacy Policy</Link></li>
                                                    <li><Link to="404.html">404 Page</Link></li>

                                                    <li><Link to="404.html">Notifications</Link></li>
                                                    <li><Link to="404.html">Messages</Link></li>

                                                </ul>
                                            </li>
                                            <li><Link to="/Courses">Courses</Link></li>
                                            <li>
                                                <Link onClick={scrollToAboutSection} >About Us</Link>
                                            </li>
                                            {user && (<li>
                                                <Link to={`/profile`}>Profile</Link>
                                            </li>)}


                                        </ul>
                                    </nav>
                                </div>

                                {user ? (
                                    <ul className="action-color--black action-hover-color--golden flex-container">
                                        <li><Link onClick={handleSearchToggle}><i className="icon-magnifier"></i></Link></li>
                                        <li><button to="/login" onClick={handleLogout} className="btn btn-lg btn-golden" >Logout</button ></li>
                                    </ul>
                                ) : (
                                    <ul className="action-color--black action-hover-color--golden flex-container">
                                        <li><Link onClick={handleSearchToggle}><i className="icon-magnifier"></i></Link></li>
                                        <li><Link to="/login" className="btn btn-lg btn-golden">Login</Link></li>
                                        <li><Link to="/register" className="btn btn-lg btn-golden">SignUp</Link></li>
                                    </ul>
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`search-modal ${isSearchOpen ? 'open' : ''}`}>
                <button type="button" className="close" onClick={handleSearchToggle}>×</button>
                <form>
                    <input type="search" placeholder="type keyword(s) here" />
                    <button type="submit" className="btn btn-lg btn-golden">Search</button>
                </form>

            </div>

        </header>



    );
}
