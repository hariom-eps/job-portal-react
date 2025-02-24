import React from 'react'

import Navbar from "../../components/navbar";
import Footer from '../../components/footer';
import Newsletter from '../../components/newsletter';
import '../../css/style.css'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router';
import { useEffect , useState} from 'react';
import axios from 'axios'
import { InputMask } from '@react-input/mask';

export default function Applyjob() {
    const { jobID } = useParams();
    const [jobs, setJobs] = useState([]);
    const [formData, setFormData]=useState({
        phone:'',
        address:'',
        city: '',
        state: '',
        pincode: '',
        file: null,
    })
    
    const username = JSON.parse(localStorage.getItem('User'))?.first_name;
    const email = JSON.parse(localStorage.getItem('User'))?.email;
    const token=localStorage.getItem('Token');
    console.log("User Name: ", username);
    console.log("User Email: ", email);
    
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value,
        }));
    };
    
    useEffect(() => {   
        axios.get(`http://ls.bizbybot.com/api/jobs/${jobID}/details`)
          .then(response => {
            const jobData = response.data.data || [];
            setJobs(jobData);  
            const createdBy = jobData.created_by || 'Unknown';
            console.log('Created by:', createdBy);
          })
          .catch(error => {
            toast.error(error); 
          });
      }, [jobID]);

      const applyForJob = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('state', formData.state);
        formDataToSend.append('pincode', formData.pincode);
        formDataToSend.append('file', formData.file);

        formDataToSend.append('name', username);  
        formDataToSend.append('email', email);   

        axios.post(`http://ls.bizbybot.com/api/jobs/${jobID}/apply`, formDataToSend, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                toast.success("Successfully applied for the job!");
            } else {
                toast.warn(`Unexpected response: ${response.status} - ${response.statusText}`);
            }
            console.log("Server Response:", response.data);
        })
        .catch(error => {
            console.error("Error applying for job:", error);
        
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Response Status:", error.response.status);
                console.error("Error Response Headers:", error.response.headers);
        
                if (error.response.status === 400) {
                    toast.error(error.response.data?.message || "Bad request. Please check your input.");
                } else if (error.response.status === 401) {
                    toast.error("Unauthorized. Please log in again.");
                } else if (error.response.status === 403) {
                    toast.error("Forbidden. You do not have permission to apply for this job.");
                } else if (error.response.status === 404) {
                    toast.error("Job not found. It may have been removed.");
                } else if (error.response.status === 500) {
                    toast.error("Server error. Please try again later.");
                } else {
                    toast.error(`Unexpected error: ${error.response.status} - ${error.response.statusText}`);
                }
            } else if (error.request) {
                console.error("No response received:", error.request);
                toast.error("No response from the server. Please check your internet connection.");
            } else {
                console.error("Request setup error:", error.message);
                toast.error("Something went wrong. Please try again.");
            }
        });}

    
  return (
    <div>
      <Navbar/>
      <section className="main-hero-section2">
        <img src="http://ls.bizbybot.com/front/images/hero-image5.png" alt="Hero Image" className="img-fluid hero-bg-image"/>
        <div className="container hero-content-area">
            <h1 className="hero-head">Job Application</h1>
        </div>
      </section>

      <section className="apply-job-main-section single-job-main-section">
        <div className="container">
            <div className="row">
                <div className="col-md-8 right-padding">
                    <div className="apply-job-heading-div p-0 border-0">
                        <p>Job Application Form</p>
                    </div>

                    <div className="common-description-area-start">
                        <p className="my-pro-applied-for-heading">
                            You are applying for
                            <a href="javascript:void(0)">
                                {jobs?.title}
                            </a>
                        </p>
                        <div className="all-details">
                            <span><img src="http://ls.bizbybot.com/front/images/icons/company.svg" alt="company"/>{jobs?.company?.name}</span>
                            <span><img src="http://ls.bizbybot.com/front/images/icons/time-period.svg" alt="TIme"/>{jobs?.experience_min}-{jobs?.experience_max } Years
                                Years</span>
                            <span><img src="http://ls.bizbybot.com/front/images/icons/access-time.svg" alt="Job Type"/> {jobs?.job_types}</span>
                            <span><img src="http://ls.bizbybot.com/front/images/icons/gross-sale.svg" alt="Sale"/>{jobs?.salary_min?.toLocaleString()} - {jobs?.salary_max?.toLocaleString()}

                                per
                                year</span>
                        </div>
                    </div>
                    <form method="post" enctype="multipart/form-data" onSubmit={applyForJob}>
                        <p className="sub-heading-para">Tell us about yourself</p>
                        <div className="pe-0 pe-lg-5 me-0 me-lg-5">

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="name" value={username} id="fname" required="" placeholder='Name' fdprocessedid="pq9xx"/>
                                        <span className="text-danger error-text" id="name-error"></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="each-animatted-input-div">
                                        <input type="email" name="email" value={email} id="email" required="" placeholder='Email Address' fdprocessedid="7albnj"/>
                                        <span className="text-danger error-text" id="email-error"></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="each-animatted-input-div">
                                        <InputMask  type="tel" name="phone" value={formData.phone} 
                                        mask="(___)-(___)-____" replacement={{ _: /\d/ }} 
                                        id="contact_phone" onChange={handleChange} required="" inputmode="text" placeholder='Phone Number' fdprocessedid="qs4yt"/>
                                        <span className="text-danger error-text" id="phone-error"></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-12">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required="" placeholder='Address' />
                                        <span className="text-danger error-text" id="address-error"></span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required="" placeholder='City' />
                                        <span className="text-danger error-text" id="city-error"></span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} required="" placeholder='State' />
                                        <span className="text-danger error-text" id="state-error"></span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="pincode" id="pincode"  value={formData.pincode} onChange={handleChange} required="" placeholder='Pincode' />
                                        <span className="text-danger error-text" id="pincode-error"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="sub-heading-para">Upload your resume</p>
                        <div className="pe-0 pe-lg-5 me-0 me-lg-5">
                            <label for="resumeUpload" className="upload-resume-div">
                                <input type="file" accept=".doc, .docx, .pdf" name="file" id="resumeUpload" onChange={handleChange} placeholder="Click here to upload your resume" hidden=""/>
                                <p className="file-name">Click here to upload your resume</p>
                                <label for="resumeUpload">UPLOAD RESUME</label>
                            </label>
                            <p className="suggetion">(*Allowed file extensions are docx, doc, pdf)</p>
                            <span className="text-danger error-text" id="file-error"></span>
                        </div>

                        <button className="btn submit-application-btn" fdprocessedid="oh2ocf">SUBMIT THE APPLICATION</button>
                    </form>

                </div>

                
            </div>
        </div>
    </section>

    <Newsletter/>
    <Footer/>
      
    </div>
  )
}
