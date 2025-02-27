import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import Navbar from "../components/navbar";
import Footer from '../components/footer';
import { apiUrl } from "../helper";

const loginUrl = `${apiUrl}/api/auth/register`;

export default function Signuppage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();

  // validate inputs
  const validateForm = () => {  
    let errors = {};
    
    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission ico no val

    axios.post(loginUrl, { first_name: name, email, password })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Registration successful!');
          setTimeout(() => navigate('/jobs'), 2000);
        }
      })
      .catch((error) => {
        console.error("Registration Error:", error.response);
        if (error.response) {
          toast.error(error.response.data.message);
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="fade auth-modal-main-div show" id="signupModal" tabIndex="-1" role="dialog" style={{ display: "block" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0">
            <div className="modal-body">
              <form className="auth-main-inputes-div" onSubmit={handleSubmit}>
                <p className="main-heading">Sign Up</p>
                <p className="sub-heading">Let’s get started with awesome energy!</p>

                <div className="each-animatted-input-div">
                  <input type="text" id="fullName" name="first_name" placeholder="Name" 
                    onChange={(e) => setName(e.target.value)} />
                  <span className="text-danger error-text" id="name-error">{errors.name}</span>
                </div>

                <div className="each-animatted-input-div">
                  <input type="email" id="signup_email" name="email" placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} />
                  <span className="text-danger error-text" id="email-error">{errors.email}</span>
                </div>

                <div className="each-animatted-input-div">
                  <input type="password" id="signup_password" className="pe-5" name="password" placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} />
                  <img src="http://ls.bizbybot.com/front/images/icons/eye-icon.svg" alt="open eye" className="inputEyeIcon" />
                  <span className="text-danger error-text" id="password-error">{errors.password}</span>
                </div>

                <button type="submit" className="btn submit-btn">
                  <span>Sign Up</span>
                </button>

                <div className="or-seperator">
                  <hr /> Or <hr />
                </div>

                <button className="btn google-btn" onClick={() => navigate("/google-log-in")}>
                  <img src="http://ls.bizbybot.com/front/images/icons/google-icon.svg" alt="Google" />
                  Sign Up with Google
                </button>
              </form>

              <p className="agreement-para">
                By signing up, you agree to our <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy</a>.
              </p>

              <button type="submit" className="btn profile-back-btn mx-auto" style={{ marginTop: '25px' }} onClick={() => navigate('/jobs')} >
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
