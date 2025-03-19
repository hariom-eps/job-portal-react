import React, { useEffect, useState } from "react";
import "../css/style.css";
import axios from "axios";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router";

import Navbar from "../components/navbar";
import UserFooter from "../components/userfooter";
import { apiUrl } from "../helper";
import { InputMask } from "@react-input/mask";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = React.useState(true);
  const [firstname,setFirstName]=useState("");
  const [lastName, setLastName] = useState("");
  const [email,setEmail]=useState("");
  const [phoneNumber, setPhoneNumber]=useState("");
  const [showSubmit, setShowSubmit] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) setLoading(false);
  }, [user]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/auth/user`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`}})
      .then((response) => setUser(response.data))
      .catch((error) => console.log("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    if (user) {
      setFirstName(user?.data?.first_name || "");
      setLastName(user?.data?.last_name || "");
      setEmail(user?.data?.email || "");
      setPhoneNumber(user?.data?.phone_number || "");
      setLoading(false);
    }
  }, [user]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
 
    axios
      .post(
        `${apiUrl}/api/auth/user`,
        { first_name: firstname,
          last_name: lastName,
          phone_number: phoneNumber,
          email: email},
        { headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`,},}
      ).then((response) => {
        if (response.status === 200) {
          toast.success("Profile updated successfully!");
          setShowSubmit(false);
          setTimeout(() => {
            navigate("/");
          }, 500);
        }})
      .catch((error) => {
        console.log("Error updating profile:", error);
      });
  };
  
  return (
    <div>
      <Navbar />
      <section className="my-profile-main-section">
        <div className="container">
          <div className="row">
            <form className="col-md-6 offset-md-3">
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
                <input
                  type="text"
                  id="fname"
                  name="first_name"
                  placeholder="First Name"
                  value={firstname} 
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setShowSubmit(true);
                  }}
                />
                <label for="fname" class="">First Name</label>
                {loading && <Skeleton width={100} height={20} />}
              </div>

              <div className="each-animatted-input-div">
                <input
                  type="text"
                  id="lname"
                  name="last_name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setShowSubmit(true);
                  }}
                />
                <label for="lname">Last Name (Optional)</label>
                {loading && <Skeleton width={120} height={20} />}
                
              </div>

              <div className="each-animatted-input-div">
                <input
                  type="email"
                  id="email"
                  placeholder='Email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setShowSubmit(true);
                  }}                
                />
                <label for="email">Email Address</label>
                {loading && <Skeleton width={180} height={20} />}
              </div>

              <div className="each-animatted-input-div">
              <InputMask
                              type="tel"
                              name="phone_number"
                              mask="(___)-(___)-____"
                              replacement={{ _: /\d/ }}
                              id="contact_phone"
                              inputMode="text"
                              placeholder=" Contact Phone No."
                              value={phoneNumber}
                              onChange={(e) => {
                                setPhoneNumber(e.target.value);
                                setShowSubmit(true);
                              }} />
                              <label for="contact_phone">Phone Number (Optional)</label>
                {loading && <Skeleton width={150} height={20} />}
              </div>

              {showSubmit && (
                <button className="fade-in-button submit-btn visible" onClick={handleSubmit}>
                  Update your profile
                </button>
              )}

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
            </form>
          </div>
        </div>
      </section>
      <UserFooter />
    </div>
  );
}
