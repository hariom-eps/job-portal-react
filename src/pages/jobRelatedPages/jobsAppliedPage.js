import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import '../../css/style.css'

import Navbar from "../../components/homeNavbar";
import Jobheader from "../../components/jobNavbar";
import { Link } from 'react-router';
import axios from 'axios';

import { apiUrl } from '../../helperURL';
import { assetUrl } from '../../helperASSET';

export default function AppliedJobsPage() {
  const [appliedJobs,setAppliedJobs]=useState('');
  const token=localStorage.getItem('Token');
  const [joblength,setJobLength]=useState(0);

  useEffect(()=>{
    axios.get(`${apiUrl}/api/jobs/applies`,{
      headers:{Authorization: `Bearer ${token}`},})
      .then((response) => {
        const jobData = response.data.data || [];
        setJobLength(response.data.data.length)
        setAppliedJobs(jobData); 
      })
      .catch((error) => console.error("Error fetching user applied jobs data:", error));
  },[]);

  return (
    <div>
      <Navbar/>
      <section className="applied-job-main-section">
        <div className="container">
          <Jobheader />
          <div className="row mt-5">
            <div className="col-lg-8">
              <p className="applied-job-heading">
                Jobs Applied ({joblength})
              </p>
              {appliedJobs.length > 0 ? (
               appliedJobs.map((appliedJob) => (
              <div className="each-applied-job"  id={`jobid-${appliedJob.id}`} key={appliedJob.id}>
                <div className="heading-div">
                  <h3>{appliedJob.job.title}</h3>
                  <label>{appliedJob.job.job_types.join(', ') || "N/A"}</label>
                </div>
                <div className="all-details">
                  <span className="gapfortiles">
                    <img
                      src={`${assetUrl}/front/images/icons/company.svg`}
                      alt="company"
                    />
                    <span>{appliedJob.job.company_info.name || "Company Name"}</span>
                  </span>
                  <span className="gapfortiles">
                    <img
                      src={`${assetUrl}/front/images/icons/time-period.svg`}
                      alt="TIme"
                    />
                    {appliedJob.job.experience_min} - {appliedJob.job.experience_max || "Max Experience"} Years
                  </span>
                  <span className="gapfortiles">
                    <img
                      src={`${assetUrl}/front/images/icons/gross-sale.svg`}
                      alt="Sale"
                    />
                    {appliedJob.job.salary_min ? `${(appliedJob.job.salary_min / 1000).toFixed(0)}K` : "Salary"} - 
                    {appliedJob.job.salary_max ? `${(appliedJob.job.salary_max / 1000).toFixed(0)}K` : "Salary"}
                    &nbsp;{appliedJob.job.salary_currency}&nbsp;per year
                  </span>
                  <span className="gapfortiles">
                    <img
                      src={`${assetUrl}/front/images/icons/job-type.svg`}
                      alt="Job Type"
                    />
                    {appliedJob.job.job_types.join(', ') || "Job type"}
                  </span>
                  <span className="gapfortiles">
                    <img
                      src={`${assetUrl}/front/images/icons/location.svg`}
                      alt="Job Location"
                    />
                    {appliedJob.job.location || "Job Location"}
                  </span>
                </div>
                <div className="button-with-applied-date posted-job-btns-div">
                  <div className="view-job-btn">
                    <Link to={`/jobs/${appliedJob.job.id}`}>
                      View Job Description
                    </Link>
                    <div className="d-flex flex-column">
                      <span>Applied on {new Date(appliedJob.created_at).toLocaleDateString('en-GB') || "DD/MM"}</span>
                    </div>
                  </div>
                 
                </div>
              </div>
              ))
              ) : (
                <div className="">
                <div className="">
                      <div className="no-result-area">
                          <h3>No Jobs applied yet</h3>
                      </div>
                  </div>
                <div className="col-lg-4"></div>
                </div>
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
