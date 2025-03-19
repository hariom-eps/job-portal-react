import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import Newsletter from "../../components/newsletter";
import Footer from "../../components/footer";
import OwlCarousel from "react-owl-carousel3";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { apiUrl } from "../../helper";
import Category from "../../components/category";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TopCategory() {
  const { categoryID } = useParams();  
  const [categoryData, setCategoryData] = useState(null);
  const userId = JSON.parse(localStorage.getItem("User"))?.id;
  const [jobs, setJobs] = useState([]);  
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);  
  const token = localStorage.getItem("Token"); 

  console.log("Category ID (String):", categoryID);
  const categoryIDNumber = Number(categoryID);
  console.log("Category ID (Number):", categoryIDNumber);

  const isJobApplied = (jobId) => {
    return appliedJobs.some((appliedJob) => appliedJob.job_id === jobId);
  };

  useEffect(() => {
    axios
      .get(
        `${apiUrl}/api/industry-categories/${categoryID}/view`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log("Fetched Category Data:", response.data);
        setCategoryData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, [categoryID, token]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/jobs/latest`)
      .then((response) => {
        const allJobs = response.data.data || [];
        console.log("All Jobs:", allJobs);  

        const filtered = allJobs.filter(
          (job) => job.job_category === categoryIDNumber
        );
        console.log("Filtered Jobs (Matching categoryID):", filtered);  

        setJobs(allJobs);
        setFilteredJobs(filtered);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, [categoryID]);

  return (
    <div>
      <Navbar />
      <section className="main-hero-section2">
        <img
          src="http://ls.bizbybot.com/front/images/hero-image5.png"
          alt="Hero Image"
          className="img-fluid hero-bg-image"
        />
        <div className="container hero-content-area">
          <h1 className="hero-head">
          {categoryData?.name ? (
            categoryData.name
          ) : (
            <Skeleton width={100} height={20} />
          )}

          </h1>
          <p className="sub-hero-para">Top Category</p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="card-carousel-main-section">
        <div className="container position-relative">
          <p className="common-slider-heading">
            Total Results ({filteredJobs.length})
          </p>
          {filteredJobs.length > 0 ? (
            <OwlCarousel
              className="slider owl-theme"
              loop={false}
              margin={20}
              dots={false}
              nav
              navText={[
                `<span className="material-symbols-outlined"><</span>`,
                `<span className="material-symbols-outlined">></span>`,
              ]}
              responsive={{
                0: { items: 1, margin: 20 },
                768: { items: 2, margin: 20 },
                1200: { items: 4, margin: 20 },
              }}
            >
              {filteredJobs.map((job) => (
                <div key={job.id} className="each-job-card">
                  <h3>
                    <a href={`/jobs/${job.id}`}>{job.title}</a>
                  </h3>
                  <ul>
                    <li>
                      <img
                        src="http://ls.bizbybot.com/front/images/icons/company.svg"
                        className="img-fluid"
                        alt="Company Name"
                      />
                      {job.company_info?.name || "N/A"}
                    </li>
                    <li>
                      <img
                        src="http://ls.bizbybot.com/front/images/icons/time-period.svg"
                        className="img-fluid"
                        alt="Year"
                      />
                      {job.experience_min && job.experience_max
                        ? `${job.experience_min} - ${job.experience_max} Years`
                        : "Experience Not Specified"}
                    </li>
                    <li>
                      <img
                        src="http://ls.bizbybot.com/front/images/icons/gross-sale.svg"
                        className="img-fluid"
                        alt="Sale"
                      />
                      {job.salary_min && job.salary_max
                        ? `${(job.salary_min / 1000).toFixed(0)}K - ${(
                            job.salary_max / 1000
                          ).toFixed(0)}K ${job.salary_currency} per year`
                        : "Salary Not Specified"}
                    </li>
                    <li>
                      <img
                        src="http://ls.bizbybot.com/front/images/icons/job-type.svg"
                        className="img-fluid"
                        alt="Job Type"
                      />
                      {job.job_types || "Not Specified"}
                    </li>
                    <li>
                      <img
                        src="http://ls.bizbybot.com/front/images/icons/location.svg"
                        className="img-fluid"
                        alt="Location"
                      />
                      {job.location || "Not Specified"}
                    </li>
                  </ul>
                  <div className="job-type-apply-main-div">
                    <p className="job-type-label">{job.job_types}</p>
                    {job.created_by === userId ? (
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn search-submit-btn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        &nbsp; VIEW
                      </Link>
                    ) : isJobApplied(job.id) ? (
                      <Link
                        to={`/jobs/${job.id}`}
                        className="btn search-submit-btn"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        &nbsp; VIEW
                      </Link>
                    ) : (
                      <Link to={`/jobs/${job.id}`} className="apply-now-btn">
                        APPLY NOW
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <div className="no-result-area">
              <h3>There are no jobs to be displayed here.</h3>
            </div>
          )}
        </div>
      </section>
      <Category/>
      <Newsletter />
      <Footer />
    </div>
  );
}
