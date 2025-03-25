  import React from "react";
  import { useEffect } from "react";
  import { useState } from "react";
  import Herobgone from "../images/HeroBackground1.jpg";
  import { Link } from "react-router-dom";
  import "../css/style.css";
  import axios from "axios";
  import OwlCarousel from 'react-owl-carousel3';
  import 'owl.carousel/dist/assets/owl.carousel.css';
  import 'owl.carousel/dist/assets/owl.theme.default.css';
  import "react-loading-skeleton/dist/skeleton.css";

  import Signup from "../components/signupDisplay";
  import Footer from "../components/footer";
  import Newsletter from "../components/newsLetterDisplay";
  import NavbarTop from "../components/homeNavbar";
  import { toast } from "react-hot-toast";
  import Category from "../components/jobCategories";
  import { useNavigate } from "react-router-dom";

  import { apiUrl } from "../helperURL";
  import { assetUrl } from "../helperASSET";

  export default function Home() {

    const [jobs, setJobs] = useState([]);
    const [joblength,setJobLength]=useState('0');
    const [isActive, setIsActive] = useState(false);
    const [selectedJobType, setSelectedJobType] = useState('');
    const [jobTypes, setJobTypes] = useState([]);
    const [appliedJobs,setAppliedJobs]=useState([]);
    const token = localStorage.getItem("Token");
    const userId = JSON.parse(localStorage.getItem("User"))?.id;
    const navigate=useNavigate();

    const [filters, setFilters] = useState({ 
      keyword: "",
      jobType: "",
      location: "",
    });
    const [showFilteredJobs, setShowFilteredJobs] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const handleClick = () => {
      setIsActive(!isActive);
    };
    
    const handleJobTypeSelect = (jobType) => {
      setSelectedJobType(jobType.name); 
      setFilters({ ...filters, jobType: jobType.name.toLowerCase() }); // Update
      setIsActive(false);
    };
  
    const handleSelectedJobTypeChange = (event) => {
      const inputValue = event.target.value;
      setSelectedJobType(inputValue);
      setFilters({ ...filters, jobType: inputValue.toLowerCase() });
    };

    const handleSearch = () => {
      const filteredResults = jobs.filter((job) => {
        const matchesKeyword =
          !filters.keyword ||
          job.title?.toString().toLowerCase().includes(filters.keyword.toLowerCase()) ||
          job.skills?.some((skill) => skill?.toString().toLowerCase().includes(filters.keyword.toLowerCase()));
    
        const matchesJobType = !filters.jobType || (job.job_types && job.job_types.length > 0 && job.job_types.some((jobType) =>
          jobType?.toString().toLowerCase() === filters.jobType.toLowerCase()
        ));
    
        const matchesLocation =
          !filters.location ||
          job.location?.toString().toLowerCase().includes(filters.location.toLowerCase());
    
        return matchesKeyword && matchesJobType && matchesLocation;
      });
    
      setFilteredJobs(filteredResults);
      setShowFilteredJobs(true);
    };
    
    const handleClearFilters = () => {
      setFilters({ keyword: "", jobType: "", location: "" });
      setFilteredJobs([]);
      setSelectedJobType("");
      setShowFilteredJobs(false);
    };
      
    useEffect(() => {   
      axios.get(`${apiUrl}/api/jobs/latest`)
        .then(response => {
          setJobs(response.data.data || []);  
          setJobLength(response.data.data.length || 0); 
        })
        .catch(error => {
          console.error("Error fetching jobs:", error);  
          toast.error(error); 
        });
    }, []); 

    useEffect(() => {
      axios
        .get(`${apiUrl}/api/job-types`)
        .then((response) => {
          if (response.data && response.data.data) {
            setJobTypes(response.data.data);
          } else {
            console.error("Unexpected response format:", response);
            setJobTypes([]);
            toast.error("Unexpected response format.");
          }
        })
        .catch((error) => {
          console.error("Error fetching job types:", error);
          const message = error.response?.data?.message || error.message || "An error occurred fetching job types.";
          setJobTypes([]);
          toast.error(message);
        });
    }, []);

    useEffect(() => {
      if (token) {
          axios.get(`${apiUrl}/api/jobs/applies`, {
              headers: { Authorization: `Bearer ${token}` }
          })
              .then((response) => {
                  const jobData = response.data.data || [];
                  setAppliedJobs(jobData);
              })
              .catch((error) => {
                  console.log(error);
              });
      }
  }, []);

  const isJobApplied = (jobId) => {
    return appliedJobs.some((appliedJob) => appliedJob.job_id === jobId);
};
  
    return (
      <div>
        <NavbarTop />

        {/* Hero section  */}
        <section className="main-hero-section">
          <img src={Herobgone} alt="Hero Image" className="img-fluid hero-bg-image" />
          <div className="container hero-content-area">
            <h1 className="hero-head">Matching talent with opportunity</h1>
            <p className="hero-para">
              Discover and apply for the latest job opportunities
            </p>
          </div>
        </section>

        {/* Search section  */}
        <section className="main-search-section">
          <div className="container">
            <form method="get" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <div className="search-form-div-main">
                <div className="search-area-each-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none">
                    <path
                      d="M21.8364 21.1692L17.4934 16.8262M17.4934 16.8262C18.2363 16.0834 18.8256 15.2014 19.2277 14.2308C19.6297 13.2602 19.8367 12.2198 19.8367 11.1692C19.8367 10.1186 19.6297 9.07833 19.2277 8.1077C18.8256 7.13707 18.2363 6.25513 17.4934 5.51224C16.7506 4.76936 15.8686 4.18006 14.898 3.77802C13.9274 3.37597 12.8871 3.16904 11.8364 3.16904C10.7858 3.16904 9.74553 3.37597 8.7749 3.77802C7.80427 4.18006 6.92234 4.76936 6.17945 5.51224C4.67912 7.01257 3.83624 9.04746 3.83624 11.1692C3.83624 13.291 4.67912 15.3259 6.17945 16.8262C7.67978 18.3266 9.71466 19.1694 11.8364 19.1694C13.9582 19.1694 15.9931 18.3266 17.4934 16.8262Z"
                      stroke="#666666"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    type="text"
                    name="search_keyword"
                    placeholder="Keyword, Skills, Job Title"
                    value={filters.keyword}
                    onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
                  />
                </div>
                <div className={`select-menu ${isActive ? 'active' : ''}` }>
                  <div className="select-btn">
                    <input
                      type="text"
                      className="sBtn-text"
                      name="job_type"
                      placeholder="Job Type"
                      readOnly
                      value={selectedJobType}
                      onChange={handleSelectedJobTypeChange}
                      onClick={handleClick}/>
                    <i onClick={handleClick}>
                      <img
                        src={`${assetUrl}/front/images/icons/select-drop-arrow.svg`}
                        alt="Chevron"
                      />
                    </i>
                  </div>
                  <ul className="options" >
                  {jobTypes.map((jobType) => (
                    <li key={jobType.id} className="option" onClick={() => handleJobTypeSelect(jobType)}>
                      <span className="option-text">{jobType.name}</span>
                    </li>
                  ))}
                  </ul>
                </div>
                <div className="search-area-each-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M12.8365 2.09781C15.053 2.09781 17.1786 2.97829 18.7459 4.54556C20.3132 6.11283 21.1937 8.2385 21.1937 10.455C21.1937 13.9864 18.7122 17.835 13.8137 22.0418C13.5413 22.2758 13.194 22.4043 12.8349 22.404C12.4758 22.4037 12.1288 22.2746 11.8568 22.0401L11.5328 21.759C6.85108 17.6618 4.47937 13.9075 4.47937 10.455C4.47937 8.2385 5.35985 6.11283 6.92712 4.54556C8.49439 2.97829 10.6201 2.09781 12.8365 2.09781ZM12.8365 3.38352C10.9611 3.38352 9.16241 4.12855 7.83626 5.4547C6.51011 6.78085 5.76508 8.57949 5.76508 10.455C5.76508 13.4567 7.94908 16.9152 12.3771 20.7895L12.6968 21.0664C12.7357 21.0998 12.7852 21.1182 12.8365 21.1182C12.8878 21.1182 12.9374 21.0998 12.9762 21.0664C17.6185 17.079 19.9079 13.5278 19.9079 10.455C19.9079 9.52632 19.725 8.60678 19.3697 7.74883C19.0143 6.89089 18.4934 6.11134 17.8368 5.4547C17.1801 4.79805 16.4006 4.27718 15.5426 3.9218C14.6847 3.56643 13.7651 3.38352 12.8365 3.38352ZM12.8365 7.24067C13.689 7.24067 14.5066 7.57931 15.1094 8.18211C15.7122 8.7849 16.0508 9.60247 16.0508 10.455C16.0508 11.3074 15.7122 12.125 15.1094 12.7278C14.5066 13.3306 13.689 13.6692 12.8365 13.6692C11.984 13.6692 11.1665 13.3306 10.5637 12.7278C9.96087 12.125 9.62223 11.3074 9.62223 10.455C9.62223 9.60247 9.96087 8.7849 10.5637 8.18211C11.1665 7.57931 11.984 7.24067 12.8365 7.24067ZM12.8365 8.52638C12.325 8.52638 11.8345 8.72957 11.4728 9.09125C11.1111 9.45292 10.9079 9.94346 10.9079 10.455C10.9079 10.9664 11.1111 11.457 11.4728 11.8187C11.8345 12.1803 12.325 12.3835 12.8365 12.3835C13.348 12.3835 13.8385 12.1803 14.2002 11.8187C14.5619 11.457 14.7651 10.9664 14.7651 10.455C14.7651 9.94346 14.5619 9.45292 14.2002 9.09125C13.8385 8.72957 13.348 8.52638 12.8365 8.52638Z"
                      fill="#666666"
                    />
                  </svg>
                  <input
                    type="text"
                    name="location"
                    placeholder="Anywhere"
                    value={filters.location}  
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn search-submit-btn">
                  SEARCH
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="card-carousel-main-section">
          {!showFilteredJobs && (
            <div className="container position-relative">
              <p className="common-slider-heading">
                Latest Jobs (
                  {joblength})
              </p>
              <div>
                {jobs.length > 0 ? (
                  <OwlCarousel
                  className="slider owl-theme"
                  loop={false}
                  margin={20}
                  dots={false}
                  nav
                  navText={[
                    `<span class="material-symbols-outlined">arrow_back</span>`,  
                    `<span class="material-symbols-outlined">arrow_forward</span>`,  
                  ]}
                  responsive={{
                    0: {
                      items: 1,
                      margin: 20,
                    },
                    768: {
                      items: 2,
                      margin: 20,
                    },
                    1200: {
                      items: 4,
                      margin: 20,
                    },
                  }}
                >
                    {jobs.map((job) => (
                      <div key={job.id} className="each-job-card">
                        <h3>
                          <a href={`${apiUrl}/jobs/${job.id}`}>{job.title}</a>
                        </h3>
                        <ul>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/company.svg`} className="img-fluid" alt="Company Name" />
                            {job.company_info?.name || "N/A"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/time-period.svg`} className="img-fluid" alt="Year" />
                            {job.experience_min && job.experience_max
                              ? `${job.experience_min} - ${job.experience_max} Years`
                              : "Experience Not Specified"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/gross-sale.svg`} className="img-fluid" alt="Sale" />
                            {job.salary_min && job.salary_max
                              ? `${(job.salary_min / 1000).toFixed(0)}K - ${(job.salary_max / 1000).toFixed(0)}K ${job.salary_currency} per year`
                              : "Salary Not Specified"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/job-type.svg`} className="img-fluid" alt="Job Type" />
                            {job.job_types || "Not Specified"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/location.svg`} className="img-fluid" alt="Location" />
                            {job.location || "Not Specified"}
                          </li>
                        </ul>
                        <div className="job-type-apply-main-div">
                          <p className="job-type-label">{job.job_types}</p>
                          {job.created_by === userId ? (
                          <Link to={`/jobs/${job.id}`} className="btn search-submit-btn">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                              </svg>&nbsp;
                              VIEW
                          </Link>
                          ) : isJobApplied(job.id) ? (
                            <Link to={`/jobs/${job.id}`} className="btn search-submit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>&nbsp;
                            VIEW
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
                    <h3>There are no Latest Jobs to be displayed here.</h3>
                  </div>
                )}
              </div>
            </div>
          )}

          {showFilteredJobs && (
            <div className="container position-relative">
              <p className="common-slider-heading">
                <span className="d-flex align-items-center gap-3">Search Results
                  <span className="clear-search" onClick={handleClearFilters}> Clear ×</span>
                </span>
              </p>
              <div>
                {filteredJobs.length > 0 ? (
                  <OwlCarousel className="slider owl-theme" loop={false} margin={20} dots={false} navText={['‹', '›']} nav responsive={{
                    0: {
                      items: 1, 
                      margin: 20,
                    },
                    768: {
                      items: 2,
                      margin: 20,
                    },
                    1200: {
                      items: 4, 
                      margin: 20,
                    },
                  }}>
                    {filteredJobs.map((job) => (
                      <div key={job.id} className="each-job-card">
                        <h3>
                          <a href={`${apiUrl}/jobs/${job.id}`}>{job.title}</a>
                        </h3>
                        <ul>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/company.svg`} className="img-fluid" alt="Company Name" />
                            {job.company_info?.name || "N/A"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/time-period.svg`} className="img-fluid" alt="Year" />
                            {job.experience_min && job.experience_max
                              ? `${job.experience_min}-${job.experience_max} Years`
                              : "Experience Not Specified"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/gross-sale.svg`} className="img-fluid" alt="Sale" />
                            {job.salary_min && job.salary_max
                              ? `${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()} ${job.salary_currency} per year`
                              : "Salary Not Specified"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/job-type.svg`} className="img-fluid" alt="Job Type" />
                            {job.job_types || "Not Specified"}
                          </li>
                          <li>
                            <img src={`${assetUrl}/front/images/icons/location.svg`} className="img-fluid" alt="Location" />
                            {job.location || "Not Specified"}
                          </li>
                        </ul>
                        <div className="job-type-apply-main-div">
                          <p className="job-type-label">{job.job_types}</p>
                          {job.created_by === userId ? (
                          <Link to={`/jobs/${job.id}`} className="btn search-submit-btn">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                              </svg>&nbsp;
                              VIEW
                          </Link>
                          ) : isJobApplied(job.id) ? (
                            <Link to={`/jobs/${job.id}`} className="btn search-submit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>&nbsp;
                            VIEW
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
                    <h3>No job found for the searched criteria</h3>
                    <p>Please try with a different keyword, type or location</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <br />
        <br />
                  
      <Category/>
      <Signup />
      <Newsletter />
      <Footer />
    </div>
  );
}
