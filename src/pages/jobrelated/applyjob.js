import React from 'react'

import Navbar from "../../components/navbar";
import Footer from '../../components/footer';
import Newsletter from '../../components/newsletter';
import '../../css/style.css'
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router';
import { useEffect , useState} from 'react';
import axios from 'axios'
import { InputMask } from '@react-input/mask';


export default function Applyjob() {
    const { jobID } = useParams();
    const navigate=useNavigate();
    const [jobs, setJobs] = useState([]);
    const [errors, setErrors] = useState({});
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
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone Number is required.";
        }
        if (!formData.address.trim()) {
            newErrors.address = "Address is required.";
        }
        if (!formData.city.trim()) {
            newErrors.city = "City is required.";
        }
        if (!formData.state.trim()) {
            newErrors.state = "State is required.";
        }
        if (!formData.pincode.trim()) {
            newErrors.pincode = "Pincode is required.";
        }
        if (!formData.file) {
            newErrors.file = "Resume file is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

        if (!validateForm()) {
            return;
        }
        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });
    
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
                navigate('/applied-successfully');
            } else {
                toast.warn(`Unexpected response: ${response.status} - ${response.statusText}`);
            }
            console.log("Server Response:", response.data);
        })
        .catch(error => {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        });
        
    }

    
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
                            <Link to={`/jobs/${jobID}`}>
                                {jobs?.title}
                            </Link>
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
                                        <input type="text" name="name" value={username} id="fname" required="" placeholder='Name' />
                                        <span className="text-danger error-text" id="name-error"></span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="each-animatted-input-div">
                                        <input type="email" name="email" value={email} id="email" required="" placeholder='Email Address'/>
                                        
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="each-animatted-input-div">
                                        <InputMask  type="tel" name="phone" value={formData.phone} 
                                        mask="(___)-(___)-____" replacement={{ _: /\d/ }} 
                                        id="contact_phone" onChange={handleChange} required="" inputmode="text" placeholder='Phone Number' />
                                        <span className="text-danger error-text">{errors.phone}</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                </div>
                                <div className="col-md-12">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} required="" placeholder='Address' />
                                        <span className="text-danger error-text">{errors.address}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} required="" placeholder='City' />
                                        <span className="text-danger error-text">{errors.city}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} required="" placeholder='State' />
                                        <span className="text-danger error-text">{errors.state}</span>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="each-animatted-input-div">
                                        <input type="text" name="pincode" id="pincode"  value={formData.pincode} onChange={handleChange} required="" placeholder='Pincode' />
                                        <span className="text-danger error-text">{errors.pincode}</span>
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
                            <span className="text-danger error-text">{errors.file}</span>
                        </div>
                        <button className="btn submit-application-btn">SUBMIT THE APPLICATION</button>
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
