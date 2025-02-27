import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/style.css";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { apiUrl } from "../helper";

const loginUrl = `${apiUrl}/api/auth/login`;

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post(loginUrl, { email, password })
      .then(response => {
        console.log("Successful login :", response.data);
        localStorage.setItem("Token", response.data.data.access_token);
        localStorage.setItem("User", JSON.stringify(response.data.data));
        toast.success("Successfully logged in!");
        setTimeout(() => navigate("/jobs"), 500);
      })
      .catch((error) => {
          setError("Credentials do not match!");
        // toast.error(error.response?.data?.message || "Login failed.");
      });
  }

  return (
    <div>
      <Navbar />
      <div className="fade auth-modal-main-div show" id="loginModal" tabIndex="-1" role="dialog" style={{ display: "block", paddingLeft: "0px" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0">
            <div className="modal-body">
              <form id="loginForm" onSubmit={handleSubmit}>
                <div className="auth-main-inputes-div">
                  <p className="main-heading">Login</p>
                  <p className="sub-heading">Welcome back! Let’s start.</p>
                  {error && (  
                    <div
                      className="alert alert-danger alert-dismissible fade show mt-2"
                      role="alert"
                    >
                      <strong>{error}</strong>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setError(null)} 
                      ></button>
                    </div>
                  )}
                  <div className="each-animatted-input-div">
                    <input
                      id="login_email"
                      name="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: "" });
                      }}
                    />
                    <span className="text-danger error-text">{errors.email}</span>
                  </div>

                  <div className="each-animatted-input-div">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="login_password"
                      className="pe-5"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" });
                      }}
                    />
                    <span className="text-danger error-text">{errors.password}</span>
                    <img
                      src="http://ls.bizbybot.com/front/images/icons/eye-icon.svg"
                      alt="open eye"
                      className="inputEyeIcon"
                      onMouseDown={() => setShowPassword(true)}
                      onMouseUp={() => setShowPassword(false)}
                      onMouseLeave={() => setShowPassword(false)}
                      onTouchStart={() => setShowPassword(true)} // Mobile 
                      onTouchEnd={() => setShowPassword(false)}
                    />
                  </div>

                  <button type="submit" className="btn submit-btn">
                    <span>Login</span>
                  </button>

                  <Link to="/forgotpassword" className="forgot-password-text">
                    Forgot Password?
                  </Link>

                  <div className="or-seperator">
                    <hr />
                    Or
                    <hr />
                  </div>

                  <Link to={'/google-login'} className="btn google-btn">
                    <img src="http://ls.bizbybot.com/front/images/icons/google-icon.svg" alt="Google" />
                    Sign In with Google
                  </Link>
                </div>
              </form>
              <button type="submit" className="btn profile-back-btn mx-auto" style={{ marginTop: "25px" }} onClick={() => navigate('/jobs')}>
                <img src="http://ls.bizbybot.com/front/images/icons/back-arrow.svg" alt="Back" />
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
