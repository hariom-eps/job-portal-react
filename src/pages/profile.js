import React, { useEffect, useState } from "react";
import "../css/style.css";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../components/navbar";
import UserFooter from "../components/userfooter";
import { apiUrl } from "../helper";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/api/auth/user`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`}})
      .then((response) => setUser(response.data))
      .catch((error) => toast.error("Error fetching user data:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <section className="my-profile-main-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <p className="heading-para">Profile</p>
              <div className="profile-image-div">
                <div className="inner-div second">
                  <img
                    id="profile-img"
                    src="http://ls.bizbybot.com/front/images/icons/default-profile-user-icon.svg"
                    className="img-fluid"
                    alt="User"
                  />
                </div>
              </div>

              {/* <div className="profile-main-inputes-div">
                <div className="each-animatted-input-div">
                  <p><strong >First Name:</strong><span style={{color: "#597698" }}> {user ? user.data.first_name : "n/a"}</span></p>
                </div>
                <div className="each-animatted-input-div">
                  <p><strong>Last Name:</strong><span style={{color: "#597698" }}> {user && user.data.last_name ? user.last_name : "n/a"}</span></p>
                </div>
                <div className="each-animatted-input-div">
                  <p><strong>Email Address:</strong><span style={{color: "#597698" }}> {user ? user.data.email : "n/a"}</span></p>
                </div>
                <div className="each-animatted-input-div">
                  <p><strong>Phone Number:</strong><span style={{color: "#597698" }}> {user && user.data.phone_number ? user.phone_number : "n/a"}</span></p>
                </div>
              </div> */}
              <div className="profile-main-inputes-div">
                <div className="alert alert-danger alert-dismissible fade show mt-2" role="alert" id="alertEPDiv" style={{display: "none"}}>
                    <strong id="alertEPMessage"></strong>
                    <button type="button" className="btn-close" aria-label="Close" onClick="hideMessage('#alertEPDiv')"></button>
                </div>

                <div className="alert alert-success alert-dismissible fade show mt-2" role="alert" id="alertEPSuccessDiv" style={{display: "none"}}>
                    <strong id="alertEPSuccessMessage"></strong>
                    <button type="button" className="btn-close" aria-label="Close" onClick="hideMessage('#alertEPSuccessDiv')"></button>
                </div>

                <div className="each-animatted-input-div">
                    <input type="text" id="fname" name="first_name" placeholder={user ? user.data.first_name : 'n/a'} value=""/>
                </div>
                <div className="each-animatted-input-div">
                    <input type="text" id="lname" name="last_name" placeholder={user && user.data.last_name ? user.last_name : 'Last Name (n/a)'} value=""/>
                </div>
                <div className="each-animatted-input-div">
                    <input type="email" id="email" placeholder={user ? user.data.email : 'n/a'} value="" readonly/>
                </div>
                <div className="each-animatted-input-div">
                    <input type="tel" id="contact_phone" name="phone_number" placeholder={user && user.data.phone_number ? user.phone_number : 'Phone number (n/a)'} value="" inputmode="text"/>
                </div>
            </div>

              <button
                type="button"
                className="btn profile-back-btn mx-auto"
                onClick={() => window.history.back()}
              >
                <img
                  src="http://ls.bizbybot.com/front/images/icons/back-arrow.svg"
                  alt="Back"
                />
                Back
              </button>
            </div>
          </div>
        </div>
      </section>
      <UserFooter />
    </div>
  );
}
