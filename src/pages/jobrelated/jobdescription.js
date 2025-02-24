import React from 'react'

import Navbar from "../../components/navbar";
import Newsletter from "../../components/newsletter";
import Footer from "../../components/footer";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import toast  from 'react-hot-toast';

import '../../css/style.css'
import axios from 'axios';

export default function Jobdescription() {
    const { jobID } = useParams();
    const [jobs, setJobs] = useState([]);
    const navigate=useNavigate();
    const token = localStorage.getItem("Token");
    const userId = JSON.parse(localStorage.getItem('User'))?.id;
    console.log("User ID:", userId);

    console.log({jobID});

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
 
  return (
    <div>
      <Navbar/>
      <section className="main-hero-section2">
        <img src="http://ls.bizbybot.com/front/images/hero-image4.png" alt="Hero Image" className="img-fluid hero-bg-image"/>
        <div className="container hero-content-area">
            <h1 className="hero-head">Job Information</h1>
        </div>
        </section>

    <section className="my-profile-main-section single-job-main-section pb-0">
        <div className="container">

            
            <div className="row">
                <div className="col-md-8 right-padding">
                    
                    <div className="single-job-heading-div p-0 border-0">
    <p>{jobs?.title}
        <span className="label-span">
            (Posted X days ago)
        </span>
    </p>
</div>


<div className="common-description-area-start">
    <div className="all-details">
        <span>
            <img src="http://ls.bizbybot.com/front/images/icons/company.svg" alt="company"/>
            {jobs?.company?.name}
        </span>
        <span>
            <img src="http://ls.bizbybot.com/front/images/icons/time-period.svg" alt="TIme"/>
            {jobs?.experience_min}-{jobs?.experience_max } Years
        </span>
        <span>
            <img src="http://ls.bizbybot.com/front/images/icons/access-time.svg" alt="Job Type"/>
            {jobs?.job_types}
        </span>
        <span>
            <img src="http://ls.bizbybot.com/front/images/icons/gross-sale.svg" alt="Sale"/>
            {jobs?.salary_min}-{jobs?.salary_max}
            INR(₹) per year
        </span>
    </div>

    <div className="job-details-list">
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Job Title:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p>{jobs?.title || "Loading..."}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Job Type:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p>{jobs?.job_types?.[0] || "Loading..."}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Experience:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p>{jobs?.experience_min} - {jobs?.experience_max} years</p>
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Location:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p>{jobs?.location || "Loading..."}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Industry Type:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p>{jobs?.industry_types?.[0] || "Loading..."}</p>
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Workplace Type:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p>{jobs?.workplace_types?.[0] || "Loading..."}</p>
            </div>
        </div>
    </div>


    <div className="all-brif-details">
    <p className="sub-heading-para">Job Description</p>
    <div className="long-short-para">
        <p dangerouslySetInnerHTML={{
            __html: jobs?.descriptions || 'No description available.',
        }} />
        <ul>
            {jobs?.qualifications ? (
                jobs?.qualifications.split("</li>").map((item, index) => (
                    item && <li key={index} dangerouslySetInnerHTML={{ __html: item.replace("<li>", "") }} />
                ))
            ) : (
                <li>xx</li>
            )}
        </ul>
    </div>

    <p className="sub-heading-para">Qualifications</p>
    <div className="long-short-para">
        <ul>
            {jobs?.qualifications ? (
                jobs?.qualifications
                    .split("</li>")
                    .filter(item => item.trim())
                    .map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item.replace("<li>", "") }} />
                    ))
            ) : (
                <li>No qualifications available</li>
            )}
        </ul>
    </div>


    <p className="sub-heading-para">Skills</p>
    <ul className="list">
        {jobs?.skills?.map((skill, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: skill }} />
        ))}
    </ul>

    <p className="sub-heading-para">About Company</p>
    <div className="long-short-para">
        <p dangerouslySetInnerHTML={{
            __html: jobs?.company?.about_company || "Loading..."
        }} />
    </div>

    <div className="job-details-list">
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Company:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p dangerouslySetInnerHTML={{
                    __html: jobs?.company?.name || "Loading..."
                }} />
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Address:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p dangerouslySetInnerHTML={{
                    __html: jobs?.company?.address_line_1 || "Loading..."
                }} />
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Contact Person:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p dangerouslySetInnerHTML={{
                    __html: jobs?.company?.contact_person || "Loading..."
                }} />
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Email:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p dangerouslySetInnerHTML={{
                    __html: jobs?.company?.contact_email || "Loading..."
                }} />
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Contact:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p dangerouslySetInnerHTML={{
                    __html: jobs?.company?.contact_phone || "Loading..."
                }} />
            </div>
        </div>
        <div className="row">
            <div className="col-4 col-sm-3">
                <label>Website:</label>
            </div>
            <div className="col-8 col-sm-9">
                <p dangerouslySetInnerHTML={{
                    __html: jobs?.company?.website || "Loading..."
                }} />
            </div>
        </div>
    </div>

    <button className={jobs.created_by === userId ? 'd-none' : 'back-large-btn'}
        onClick={()=>navigate(`/jobs/apply/${jobID}`)}>Apply Now
    </button>
    <div className={jobs.created_by === userId ? ' ' : 'd-none'}>
        <button className="back-large-btn"
            onClick={()=>navigate(`/jobs`)}>Go back to previous page
        </button>
        <p style={{paddingBlock:'5px',marginLeft:'60px',color:'grey'}}>Created by you</p>
        </div>
    </div>


    </div>
    </div>
    <div className="col-md-4">
    </div>
    </div>
    </div>
    </section>
    <Newsletter/>
    <Footer/>
    </div>
  )
}
