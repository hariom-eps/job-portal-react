import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Navbar from "../../components/homeNavbar";
import Newsletter from "../../components/newsLetterDisplay";
import Footer from "../../components/footer";
import "../../css/style.css";
import { apiUrl } from "../../helperURL";
import { assetUrl } from "../../helperASSET";

export default function Jobdescription() {
  const { jobID } = useParams();
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const userId = JSON.parse(localStorage.getItem("User"))?.id;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/jobs/${jobID}/details`)
      .then((response) => {
        const jobData = response.data.data || [];
        setJobs(jobData);
        const createdBy = jobData.created_by || "Unknown";
      })
      .catch((error) => {
        toast.error(error);
      });

    axios
      .get(`${apiUrl}/api/jobs/applies`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const jobData = response.data.data || [];
        setAppliedJobs(jobData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [jobID]);

  const isJobApplied = appliedJobs.some((job) => job.job_id == jobID);

  return (
    <div>
      <Navbar />
      <section className="main-hero-section2">
        <img
          src={`${assetUrl}/front/images/hero-image4.png`}
          alt="Hero Image"
          className="img-fluid hero-bg-image"
        />
        <div className="container hero-content-area">
          <h1 className="hero-head">Job Information</h1>
        </div>
      </section>

      <section className="my-profile-main-section single-job-main-section pb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-8 right-padding">
              <div className="single-job-heading-div p-0 border-0">
                <p>
                  {jobs?.title ? (
                    jobs.title
                  ) : (
                    <Skeleton width={150} height={20} />
                  )}
                  <span className="label-span">
                    &nbsp;&nbsp;&nbsp;( Posted{" "}
                    {moment(jobs?.created_at).fromNow()} )
                  </span>
                </p>
                {!isJobApplied ? (
                  <>
                    <div
                      className={jobs.created_by === userId ? " " : "d-none"}
                    >
                      <div
                        style={{
                          paddingTop: "17px",
                          marginLeft: "0px",
                          color: "grey",
                          fontSize: "2 rem",
                        }}
                      >
                        Created by you
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      paddingTop: "15px",
                      marginLeft: "0px",
                      color: "grey",
                      fontSize: "2 rem",
                      color: "#008000",
                    }}
                  >
                    Already Applied
                  </div>
                )}
              </div>

              <div className="common-description-area-start">
                <div className="all-details">
                  <span>
                    <img
                      src={`${assetUrl}/front/images/icons/company.svg`}
                      alt="company"
                    />
                    {jobs?.company?.name ? (
                      jobs.company.name
                    ) : (
                      <Skeleton width={60} height={20} />
                    )}
                  </span>
                  <span>
                    <img
                      src={`${assetUrl}/front/images/icons/time-period.svg`}
                      alt="Time"
                    />
                    {jobs?.experience_min && jobs?.experience_max ? (
                      `${jobs.experience_min} - ${jobs.experience_max}`
                    ) : (
                      <Skeleton width={100} height={20} />
                    )}{" "}
                    Years
                  </span>
                  <span>
                    <img
                      src={`${assetUrl}/front/images/icons/access-time.svg`}
                      alt="Job Type"
                    />
                    {jobs?.job_types?.length > 0 ? (
                      jobs.job_types.join(", ")
                    ) : (
                      <Skeleton width={50} height={20} />
                    )}
                  </span>
                  <span>
                    <img
                      src={`${assetUrl}/front/images/icons/gross-sale.svg`}
                      alt="Sale"
                    />
                    {jobs?.salary_min !== undefined &&
                    jobs?.salary_max !== undefined ? (
                      `${(jobs.salary_min / 1000).toFixed(0)}K - ${(
                        jobs.salary_max / 1000
                      ).toFixed(0)}K`
                    ) : (
                      <Skeleton width={80} height={20} />
                    )}
                    &nbsp;{jobs.salary_currency}&nbsp;per year
                  </span>
                </div>

                <div className="job-details-list">
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <label>Job Title:</label>
                    </div>
                    <div className="col-8 col-sm-9">
                      <p>
                        {jobs?.title || <Skeleton width={80} height={20} />}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <label>Job Type:</label>
                    </div>
                    <div className="col-8 col-sm-9">
                      <p>
                        {jobs?.job_types?.[0] || (
                          <Skeleton width={80} height={20} />
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <label>Experience:</label>
                    </div>
                    <div className="col-8 col-sm-9">
                      <p>
                        {jobs?.experience_min || (
                          <Skeleton width={10} height={20} />
                        )}{" "}
                        - {jobs?.experience_max} years
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <label>Location:</label>
                    </div>
                    <div className="col-8 col-sm-9">
                      <p>
                        {jobs?.location || <Skeleton width={80} height={20} />}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <label>Industry Type:</label>
                    </div>
                    <div className="col-8 col-sm-9">
                      <p>
                        {jobs?.industry_types?.[0] || (
                          <Skeleton width={80} height={20} />
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 col-sm-3">
                      <label>Workplace Type:</label>
                    </div>
                    <div className="col-8 col-sm-9">
                      <p>
                        {jobs?.workplace_types?.[0] || (
                          <Skeleton width={80} height={20} />
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="all-brif-details">
                  <p className="sub-heading-para">Job Description</p>
                  <div className="long-short-para">
                    {jobs?.descriptions ? (
                      <p
                        dangerouslySetInnerHTML={{ __html: jobs.descriptions }}
                      />
                    ) : (
                      <Skeleton width={280} height={180} />
                    )}
                  </div>

                  <p className="sub-heading-para">Qualifications</p>
                  <div className="long-short-para">
                    <ul>
                      {jobs?.qualifications ? (
                        jobs.qualifications
                          .split("</li>")
                          .filter((item) => item.trim())
                          .map((item, index) => (
                            <li
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: item.replace("<li>", ""),
                              }}
                            />
                          ))
                      ) : (
                        <Skeleton width={100} height={20} count={3} />
                      )}
                    </ul>
                  </div>

                  <p className="sub-heading-para">Skills</p>
                  <ul className="list">
                    {jobs?.skills?.length > 0 ? (
                      jobs.skills.map((skill, index) => (
                        <li
                          key={index}
                          dangerouslySetInnerHTML={{ __html: skill }}
                        />
                      ))
                    ) : (
                      <Skeleton width={100} height={20} count={3} />
                    )}
                  </ul>

                  <p className="sub-heading-para">About Company</p>
                  <div className="long-short-para">
                    {jobs?.company?.about_company ? (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: jobs.company.about_company,
                        }}
                      />
                    ) : (
                      <Skeleton width={280} height={120} />
                    )}
                  </div>

                  <div className="job-details-list">
                    <div className="row">
                      <div className="col-4 col-sm-3">
                        <label>Company:</label>
                      </div>
                      <div className="col-8 col-sm-9">
                        <p>
                          {jobs?.company?.name ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: jobs.company.name,
                              }}
                            />
                          ) : (
                            <Skeleton width={80} height={20} />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3">
                        <label>Address:</label>
                      </div>
                      <div className="col-8 col-sm-9">
                        <p>
                          {jobs?.company?.address_line_1 ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: jobs.company.address_line_1,
                              }}
                            />
                          ) : (
                            <Skeleton width={80} height={20} />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3">
                        <label>Contact Person:</label>
                      </div>
                      <div className="col-8 col-sm-9">
                        <p>
                          {jobs?.company?.contact_person ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: jobs.company.contact_person,
                              }}
                            />
                          ) : (
                            <Skeleton width={80} height={20} />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3">
                        <label>Email:</label>
                      </div>
                      <div className="col-8 col-sm-9">
                        <p>
                          {jobs?.company?.contact_email ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: jobs.company.contact_email,
                              }}
                            />
                          ) : (
                            <Skeleton width={80} height={20} />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3">
                        <label>Contact:</label>
                      </div>
                      <div className="col-8 col-sm-9">
                        <p>
                          {jobs?.company?.contact_phone ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: jobs.company.contact_phone,
                              }}
                            />
                          ) : (
                            <Skeleton width={80} height={20} />
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4 col-sm-3">
                        <label>Website:</label>
                      </div>
                      <div className="col-8 col-sm-9">
                        <p>
                          {jobs?.company?.website ? (
                            <span
                              dangerouslySetInnerHTML={{
                                __html: jobs.company.website,
                              }}
                            />
                          ) : (
                            <Skeleton width={80} height={20} />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  {!isJobApplied ? (
                    <>
                      <button
                        className={
                          jobs.created_by === userId
                            ? "d-none"
                            : "back-large-btn"
                        }
                        onClick={() => navigate(`/jobs/apply/${jobID}`)}
                      >
                        Apply Now
                      </button>
                      <div
                        className={jobs.created_by === userId ? " " : "d-none"}
                      >
                        <button
                          className="back-large-btn"
                          onClick={() => navigate(`/jobs`)}
                        >
                          Go back to previous page
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      className="back-large-btn"
                      onClick={() => navigate(`/jobs`)}
                    >
                      Go back to previous page
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
