import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/navbar";
import Footer from '../components/footer';

const loginUrl = "http://ls.bizbybot.com/api/auth/login";

export default function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [showpassword, setShowpassword]=useState('');

  function handleSubmit(event) {
    event.preventDefault(); 
  
    axios.post(loginUrl , {email,password})
    .then(response=>{
      console.log("Successful login :", response.data);
      localStorage.setItem('Token', response.data.data.access_token);
      localStorage.setItem('User', JSON.stringify(response.data.data));
      toast.success('Successfully logged in!')
      setTimeout(()=>navigate('/jobs'),500)
    })
    .catch((error) => {
        toast.error(error.response.data.message);
    });
  
  }

  return (
    <div>
      <Navbar/> 
      <div className="fade auth-modal-main-div show" id="loginModal" tabIndex="-1" role="dialog" style={{ display: "block", paddingLeft: "0px" }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0">
            <div className="modal-body">
              {/* <button className="modal-close-btn" onClick={() => navigate("/")}>
                <img src="http://ls.bizbybot.com/front/images/icons/modal-close.svg" alt="Close" />
              </button> */}

              <form id="loginForm" onSubmit={handleSubmit}>
                <div className="auth-main-inputes-div">
                  <p className="main-heading">Login</p>
                  <p className="sub-heading">Welcome back! Let’s start.</p>

                  <div className="each-animatted-input-div">
                    <input type="email" id="login_email" name="email" placeholder="Email Address" 
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                  </div>

                  <div className="each-animatted-input-div">
                    <input type={showpassword?"text":"password"} id="login_password" className="pe-5" name="password" placeholder="Password" 
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <img src="http://ls.bizbybot.com/front/images/icons/eye-icon.svg" alt="open eye" className="inputEyeIcon" 
                      // onClick={()=>setShowpassword(prev=>!prev)}
                      onMouseDown={() => setShowpassword(true)}
                      onMouseUp={() => setShowpassword(false)}
                      onMouseLeave={() => setShowpassword(false)}
                      onTouchStart={() => setShowpassword(true)}  // Mobile 
                      onTouchEnd={() => setShowpassword(false)}   
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

              {/* <p className="bottom-para">
                Not a user yet? <Link to="/signup">Sign Up</Link>
              </p> */}
              <button type="submit" className="btn profile-back-btn mx-auto" style={{marginTop:'25px'}} onClick={()=>navigate('/jobs')} >
                        <img src="http://ls.bizbybot.com/front/images/icons/back-arrow.svg" alt="Back"/>
                        Home</button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
