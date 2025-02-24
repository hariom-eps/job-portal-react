import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router';
import toast from "react-hot-toast";
import axios from 'axios';

import Navbar from "../components/navbar";
import Footer from '../components/footer';
import { Nav } from 'react-bootstrap';

export default function Forgotpasswordpage() {
    const navigate=useNavigate();
    const [email,setEmail]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();

    axios.post('http://ls.bizbybot.com/api/auth/password/forgot', { email })
      .then((response) => {
        if (response.status === 200) {
            toast.success('Password reset email sent successfully!');
          setEmail('')}
      })
      .catch((error) => {
        toast.error(error.response.data.message);
    });
} 

  return (
    <div>
    <Navbar/>
      <div className="fade auth-modal-main-div show" id="forgetPasswordModal" tabindex="-1" aria-labelledby="forgetPasswordModalLabel" aria-modal="true" role="dialog" style={{display: 'block'}}>
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-0">
                <div className="modal-body">
                    

                    <form className="auth-main-inputes-div" onSubmit={handleSubmit}>
                        <input type="hidden" name="_token" value=" " autocomplete="off"/>                    
                        <p className="main-heading">Forgot Password?</p>
                        <p className="sub-heading">Please submit the email address to get the link for resetting the
                            password of your
                            account</p>

                        <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert" id="alertFGDiv" style={{display: 'none'}}>
                            <strong id="alertFGMessage"></strong>
                            <button type="button" className="btn-close" aria-label="Close" onclick="hideMessage('#alertFGDiv')"></button>
                        </div>

                        <div className="each-animatted-input-div">
                            <input type="email" id="fg_email" name="email" placeholder="Email Address" fdprocessedid="uhzj8d"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn submit-btn" fdprocessedid="gabfo">
                            <span id="FGBtnSpan">Get the Reset Password Link</span>
                            <div className="d-flex justify-content-center d-none" id="FGLoader">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </button>
                    </form>

                        <p className="bottom-para">Back to {" "}
                        <Link to={"/login"} data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#loginModal">
                            Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div> 
        <Footer/>
    </div>
  )
}
