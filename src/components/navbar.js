import React, { useState, useEffect } from "react";
import Logo from "../images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/style.css";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios from "axios";
import { apiUrl } from "../helper";

const userdetails = `${apiUrl}/api/auth/user`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("Token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(userdetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch((error) => console.log("Error fetching user data:", error));
  }, []);

  const togglenavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
    // console.log('hi')
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("User");
    toast.success("Successfully Logged out !");
    setTimeout(() => navigate("/"), 500);
  };

  const navbarClass =
    ["/post-job","/posted-job","/applied-jobs","/applied-successfully","/profile","/resetpassword","/login","/signup","/forgotpassword",]
    .includes(location.pathname) || scrolled? "nav-main-section2": "";

  return (
    <>
      <nav className={`navbar navbar-main navbar-expand-md ${navbarClass}`}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        />
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid"
              width="60"
              height="60"
            />
          </Link>

          <div className="mob-bar-and-pro-img-div">
            <div
              className="navbar-toggler mob-nav-bar-btn "
              style={{ display: "flex" }}
              type="button"
            >
              <div
                className={`nav-item nav-pro-li ${!isLoggedIn ? "d-none" : ""}`}
                onClick={toggleDropdown}
              >
                <div className="nav-pro-img">
                  <img
                    src="http://ls.bizbybot.com/front/images/icons/default-user-icon.svg"
                    alt="Profile Image"
                  />
                </div>
                <div className="nav-user-name">
                  {/* {user ? user.data.first_name : "Loading.."} */}
                </div>
                <div
                  className={`nav-dropdown-main-div2 ${
                    isDropdownOpen ? "show" : ""
                  }`}
                >
                  <div className="nav-dropdown-inner-div2">
                    <ul>
                      <li>
                        <p>Hi, {user ? user.data.first_name : "Loading.."}</p>
                      </li>
                      <li>
                        <Link to={"/applied-jobs"}>
                          <img
                            src="http://ls.bizbybot.com/front/images/icons/nav-jov-appiled.svg"
                            alt="Job Applied"
                          />
                          Jobs Applied
                        </Link>
                      </li>
                      <li>
                        <Link to={"/posted-job"}>
                          <img
                            src="http://ls.bizbybot.com/front/images/icons/nav-posted-jobs.svg"
                            alt="Job Applied"
                          />
                          Jobs Posted
                        </Link>
                      </li>
                      <li>
                        <Link to={"/profile"}>
                          <img
                            src="http://ls.bizbybot.com/front/images/icons/edit-profile.svg"
                            alt="Change Password"
                          />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link onClick={handleLogout}>
                          <img
                            src="http://ls.bizbybot.com/front/images/icons/logout.svg"
                            alt="Logout"
                          />
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <svg
                width="30"
                height="30"
                style={{ marginTop: "5px" }}
                viewBox="0 0 24 24"
                fill="none"
                onClick={togglenavbar}
              >
                <path
                  d="M13 21V17H22V21H13ZM9 7V3H22V7L9 7ZM3 14V10L22 10V14L3 14Z"
                  fill="#fff"
                />
              </svg>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                {/* <li className={`nav-item ${location.pathname === "/signup" || "/login" ? "d-none" : ""} `}>  */}
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith("/jobs") ? "active" : ""
                  }`}
                  to="/jobs"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith("/events") ? "active" : ""
                  }`}
                  to="/events"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname.startsWith("/courses") ? "active" : ""
                  }`}
                  to="/courses"
                >
                  Courses
                </Link>
              </li>
              <div className="nav-item">
                {/* changed from li to div temp  */}
                {!isLoggedIn ? (
                  <button
                    className={`nav-link login-btn ${
                      location.pathname === "/login" ? "d-none" : ""
                    }`}
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    onClick={() => navigate("/login")}
                  >
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                      <path
                        d="M9.42 6.9373C9.3428 7.01357 9.28151 7.1044 9.23968 7.20453C9.19785 7.30467 9.1763 7.41211 9.1763 7.52063C9.1763 7.62915 9.19785 7.73659 9.23968 7.83673C9.28151 7.93686 9.3428 8.02769 9.42 8.10396L11.0033 9.6873H3.33667C2.87834 9.6873 2.50334 10.0623 2.50334 10.5206C2.50334 10.979 2.87834 11.354 3.33667 11.354H11.0033L9.42 12.9373C9.3428 13.0136 9.28151 13.1044 9.23968 13.2045C9.19785 13.3047 9.1763 13.4121 9.1763 13.5206C9.1763 13.6292 9.19785 13.7366 9.23968 13.8367C9.28151 13.9369 9.3428 14.0277 9.42 14.104C9.745 14.429 10.2617 14.429 10.5867 14.104L13.5783 11.1123C13.6556 11.0352 13.7169 10.9436 13.7587 10.8428C13.8005 10.742 13.822 10.6339 13.822 10.5248C13.822 10.4157 13.8005 10.3076 13.7587 10.2068C13.7169 10.106 13.6556 10.0144 13.5783 9.9373L10.5867 6.9373C10.5104 6.8601 10.4196 6.7988 10.3194 6.75697C10.2193 6.71514 10.1119 6.6936 10.0033 6.6936C9.89482 6.6936 9.78738 6.71514 9.68724 6.75697C9.58711 6.7988 9.49627 6.8601 9.42 6.9373ZM17.5033 16.354H11.67C11.2117 16.354 10.8367 16.729 10.8367 17.1873C10.8367 17.6456 11.2117 18.0206 11.67 18.0206H17.5033C18.42 18.0206 19.17 17.2706 19.17 16.354V4.6873C19.17 3.77063 18.42 3.02063 17.5033 3.02063H11.67C11.2117 3.02063 10.8367 3.39563 10.8367 3.85396C10.8367 4.3123 11.2117 4.6873 11.67 4.6873H17.5033V16.354Z"
                        fill="#212121"
                      />
                    </svg>
                    Login
                  </button>
                ) : (
                  <li className="nav-item nav-dropdown">
                    <a
                      className="nav-link"
                      href=""
                      onClick={() => navigate("/post-job")}
                    >
                      Post Now
                      {/* <img
                          src="http://ls.bizbybot.com/front/images/icons/nav-arrow.svg"
                          alt="arrow"
                        /> */}
                    </a>
                    {/* <div className="nav-dropdown-div">
                        <div className="nav-dropdown-inner-div">
                          <Link to={'/post-job'}>Post a Job</Link>
                          <Link to={'/post-an-event'}>Post an Event</Link>
                          <Link to={'/post-a-course'}>Post a Course</Link>
                        </div>
                      </div> */}
                  </li>
                )}
              </div>
              <li className="nav-item">
                {!isLoggedIn ? (
                  <button
                    className={`nav-link signup-btn ${
                      location.pathname === "/signup" ? "d-none" : ""
                    }`}
                    onClick={() => navigate("/signup")}
                    data-bs-toggle="modal"
                    data-bs-target="#signupModal"
                  >
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                      <path
                        d="M8.45076 8.85398C10.2917 8.85398 11.7841 7.3616 11.7841 5.52065C11.7841 3.6797 10.2917 2.18732 8.45076 2.18732C6.60982 2.18732 5.11743 3.6797 5.11743 5.52065C5.11743 7.3616 6.60982 8.85398 8.45076 8.85398Z"
                        stroke="black"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M17.6174 8.85398H15.9508M15.9508 8.85398H14.2841M15.9508 8.85398V7.18732M15.9508 8.85398V10.5207M15.1149 15.5207C15.1174 15.384 15.1174 15.2448 15.1174 15.104C15.1174 13.0332 12.1324 11.354 8.45077 11.354C4.7691 11.354 1.7841 13.0332 1.7841 15.104C1.7841 17.1748 1.7841 18.854 8.45077 18.854C10.3099 18.854 11.6508 18.7232 12.6174 18.4898"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sign Up
                  </button>
                ) : (
                  <div className="nav-item nav-pro-li">
                    <div className="nav-pro-img">
                      <img
                        src="http://ls.bizbybot.com/front/images/icons/default-user-icon.svg"
                        alt="Profile Image"
                      />
                    </div>
                    <div className="nav-user-name">
                      {user ? user.data.first_name : "Loading.."}
                      <img
                        src="http://ls.bizbybot.com/front/images/icons/nav-dropdown.svg"
                        alt="Arrow"
                        className="img-fluid"
                      />
                    </div>

                    <div className="nav-dropdown-main-div">
                      <div className="nav-dropdown-inner-div">
                        <ul>
                          <li>
                            <p>
                              Hi, {user ? user.data.first_name : "Loading.."}
                            </p>
                          </li>
                          <li>
                            <Link to={"/applied-jobs"}>
                              <img
                                src="http://ls.bizbybot.com/front/images/icons/nav-jov-appiled.svg"
                                alt="Job Applied"
                              />
                              Jobs Applied
                            </Link>
                          </li>
                          <li>
                            <Link to={"/posted-job"}>
                              <img
                                src="http://ls.bizbybot.com/front/images/icons/nav-posted-jobs.svg"
                                alt="Job Applied"
                              />
                              Jobs Posted
                            </Link>
                          </li>
                          <li>
                            <Link to={"/profile"}>
                              <img
                                src="http://ls.bizbybot.com/front/images/icons/edit-profile.svg"
                                alt="Change Password"
                              />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link onClick={handleLogout}>
                              <img
                                src="http://ls.bizbybot.com/front/images/icons/logout.svg"
                                alt="Logout"
                              />
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav
        className={`mob-navbar ${isNavbarVisible ? "show-navbar" : ""}`}
        id="mobNavbar"
      >
        <div className="mob-navbar-top">
          <Link to="/jobs" className="navbar-brand p-0">
            <img
              src="http://ls.bizbybot.com/front/images/logo/logo.png"
              className="img-fluid"
              alt="Logo"
            />
          </Link>
          <img
            src="http://ls.bizbybot.com/front/images/icons/nav-close.svg"
            alt="Close"
            onClick={togglenavbar}
            id="closeNavbar"
          />
        </div>

        <ul className="navbar-nav mob-navbar-ul">
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/events" className="nav-link">
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/courses" className="nav-link">
              Courses
            </Link>
          </li>
          <li className="nav-item nav-item-extra">
            {isLoggedIn && (
              <>
                <Link
                  to={"/post-job"}
                  data-bs-toggle="collapse"
                  className="nav-link"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapse3"
                >
                  Post Now
                  <i className="fas">
                    <img
                      src="http://ls.bizbybot.com/front/images/icons/mob-dropdown-arrow.svg"
                      alt="Arrow"
                      className="fas"
                      width="20"
                      height="13"
                      loading="lazy"
                    />
                  </i>
                </Link>
              </>
            )}
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="mob-nav-btns">
            <Link onClick={handleLogout} className="mob-login-btn">
              <img
                src="http://ls.bizbybot.com/front/images/icons/logout.svg"
                alt="Logout"
              />
              Logout
            </Link>
          </div>
        ) : (
          <></>
        )}
      </nav>
    </>
  );
}
