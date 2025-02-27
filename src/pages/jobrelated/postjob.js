import React, { Component, useRef } from "react";
import "../../css/style.css";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import $ from "jquery";
import "summernote/dist/summernote-lite.css";
import "summernote/dist/summernote-lite.js";
import { InputMask } from "@react-input/mask";

import Navbar from "../../components/navbar";
import Newsletter from "../../components/newsletter";
import Footer from "../../components/footer";
import Jobheader from "../../components/jobheader";
import { apiUrl } from "../../helper";
import { useNavigate } from "react-router";

export default function Postjob() {
  const [industryTypes, setIndustryTypes] = useState([]);
  const [jobSkills, setJobSkills] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [workplacetypes, setWorkplaceTypes] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  // Company 
  const [activeTab, setActiveTab] = useState("existing");
  const [companyData, setCompanyData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  // Error
  const [errors, setErrors] = useState({});
  // Form 
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    job_category: null,
    skills: [],
    industry_types: [],
    job_types: [],
    workplace_types: [],
    experience_min: "",
    experience_max: "",
    salary_min: "",
    salary_max: "",
    qualifications: "",
    name: "",
    website: "",
    company_about: "",
    contact_person: "",
    contact_email: "",
    phone: "",
    address_line_1: "",
    city: "",
    country: "",
    pincode: "",
    landmark: "",
    state: "",
    company_photos: [],
    company_id: "0",
    contract_year: "2",
    salary_currency: null,
  });

  const handleSalaryCurrencySelect = (currency) => {
    setFormData({ ...formData, salary_currency: currency });
    setActiveDropdown(null);
  };
  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setActiveDropdown(null);
  };
  const handleIndustryTypeSelect = (industry) => {
    setFormData({ ...formData, industry_types: [industry.id] });
    setActiveDropdown(null);
  };
  const handleJobTypeSelect = (jobType) => {
    setFormData({ ...formData, job_types: [jobType.id] });
    setActiveDropdown(null);
  };
  const handleWorkplaceTypeSelect = (workplaceType) => {
    setFormData({ ...formData, workplace_types: [workplaceType.id] });
    setActiveDropdown(null);
  };
  const handleJobCategorySelect = (category) => {
    setFormData({ ...formData, job_category: category.id });
    setActiveDropdown(null);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
    }));

    setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: !value.trim() ? `${e.target.placeholder} is required.` : "",
    }));
};

  

  useEffect(() => {
    axios
      .get("http://ls.bizbybot.com/api/industry-categories")
      .then(({ data }) =>
        setIndustryTypes(
          data?.data
            ? Object.entries(data.data).map(([id, name]) => ({ id, name }))
            : []
        )
      )
      .catch(() => {
        setIndustryTypes([]);
        toast.error("Error fetching industry categories.");
      });

    axios
      .get("http://ls.bizbybot.com/api/jobs/skills")
      .then(({ data }) =>
        setJobSkills(Array.isArray(data?.data) ? data.data : [])
      )
      .catch(() => {
        setJobSkills([]);
        toast.error("Error fetching job skills.");
      });
    axios
      .get("http://ls.bizbybot.com/api/jobs/industry-types")
      .then(({ data }) =>
        setIndustryTypes(Array.isArray(data?.data) ? data.data : [])
      )
      .catch(() => {
        setIndustryTypes([]);
        toast.error("Error fetching industry types.");
      });
    axios
      .get("http://ls.bizbybot.com/api/job-types")
      .then(({ data }) =>
        setJobTypes(Array.isArray(data?.data) ? data.data : [])
      )
      .catch(() => {
        setJobTypes([]);
        toast.error("Error fetching job types.");
      });
    axios
      .get("http://ls.bizbybot.com/api/jobs/workplace-types")
      .then(({ data }) =>
        setWorkplaceTypes(Array.isArray(data?.data) ? data.data : [])
      )
      .catch(() => {
        setWorkplaceTypes([]);
        toast.error("Error fetching workplace types.");
      });

      axios.get(`${apiUrl}/api/company`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` }
    })
        .then((response) => {
            const companyData = response.data.data;
            setCompanies(companyData);
            console.log("Company Data:", companyData);
        })
        .catch((error) => {
            console.error("Error fetching company data:", error);
            toast.error("Error fetching company data");
        });

        $("#jobDescriptionEditor").summernote({
          placeholder: "Type job description here...",
          tabsize: 2,
          height: 200,
          callbacks: {
            onChange: function (contents) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                description: contents,
              }));
        
              setErrors((prevErrors) => ({
                ...prevErrors,
                description: contents.trim() && contents !== "<p><br></p>" ? "" : "Job Description is required.",
              }));
            },
          },
        });
        
        $("#jobQualificationEditor").summernote({
          placeholder: "Type job qualifications here...",
          tabsize: 2,
          height: 200,
          callbacks: {
            onChange: function (contents) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                qualifications: contents,
              }));
        
              setErrors((prevErrors) => ({
                ...prevErrors,
                qualifications: contents.trim() && contents !== "<p><br></p>" ? "" : "Job Qualifications are required.",
              }));
            },
          },
        });
        
        $("#aboutCompanyEditor").summernote({
          placeholder: "Something about the company...",
          tabsize: 2,
          height: 200,
          callbacks: {
            onChange: function (contents) {
              setFormData((prevFormData) => ({
                ...prevFormData,
                aboutCompany: contents,
              }));
        
              setErrors((prevErrors) => ({
                ...prevErrors,
                aboutCompany: contents.trim() && contents !== "<p><br></p>" ? "" : "Company details are required.",
              }));
            },
          },
        });
        
    return () => {
      $("#jobDescriptionEditor").summernote("destroy");
      $("#jobQualificationEditor").summernote("destroy");
      $("#aboutCompanyEditor").summernote("destroy");
    };
  }, []);

  
  const handleCompanySelect = (companyId) => {
    setSelectedCompanyId(companyId); 
    setFormData(prev => ({
        ...prev,
        company_id: companyId,
        name: companies.find(company => company.id === companyId)?.name || "",
        website: companies.find(company => company.id === companyId)?.website || "",
    }));
};
const handleExperienceChange = (e) => {
  const { name, value } = e.target;
  let numValue = Number(value);

  if (name === "experience_max" && numValue < formData.experience_min) {
    return; 
  }

 
  setFormData((prevData) => ({
    ...prevData,
    [name]: numValue,
  }));


  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};
const handleSalaryChange = (e) => {
  const { name, value } = e.target;
  let numValue = Number(value);

  if (name === "salary_max" && numValue < formData.salary_min) {
    return; 
  }

  
  setFormData((prevData) => ({
    ...prevData,
    [name]: numValue,
  }));

   
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "",
  }));
};

const handleCurrencySelect = (currency) => {
  setFormData((prevData) => ({
    ...prevData,
    salary_currency: currency,
  }));

  setErrors((prevErrors) => ({
    ...prevErrors,
    salary_currency: "",
  }));

  setActiveDropdown(null);
};

const handleSubmit = (e) => {
  e.preventDefault();
  let newErrors = {};

    if (!formData.title.trim()) {
        newErrors.title = "Job Title is required.";
    }
    if (!formData.location?.trim()) {
      newErrors.location = "Job Location is required.";
    }
    if (!formData.description?.trim() || formData.description === "<p><br></p>") {
      newErrors.description = "Job Description is required.";
    }
    if (!formData.job_category){
      newErrors.job_category="Job Category is required.";
    }
    if (!formData.skills || formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required.";
    }
    if (!formData.industry_types || formData.industry_types.length === 0) {
      newErrors.industry_types = "Industry Type is required.";
    }
    if (!formData.job_types || formData.job_types.length === 0) {
      newErrors.job_types = "Job Type is required.";
    }
    if (!formData.workplace_types || formData.workplace_types.length === 0) {
      newErrors.workplace_types = "Workplace Type is required.";
    }
    if (!formData.experience_min) {
      newErrors.experience_min = "Minimum experience is required.";
    }
    if (!formData.experience_max) {
      newErrors.experience_max = "Maximum experience is required.";
    } else if (formData.experience_max < formData.experience_min) {
      newErrors.experience_max = "Max experience must be greater than Min.";
    }
    if (!formData.salary_currency) {
      newErrors.salary_currency = "Please select a salary currency.";
    }
    if (!formData.salary_min) {
      newErrors.salary_min = "Minimum salary is required.";
    }
    if (!formData.salary_max) {
      newErrors.salary_max = "Maximum salary is required.";
    } else if (formData.salary_max < formData.salary_min) {
      newErrors.salary_max = "Max salary must be greater than or equal to Min salary.";
    }
    if (!formData.qualifications?.trim() || formData.qualifications === "<p><br></p>") {
      newErrors.qualifications = "Qualifications are required.";
    }
    if (!selectedCompanyId) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        company: "Please select a company.",
      }));
    }


    
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return; 
    }

  const description = $("#jobDescriptionEditor").summernote("code");
  const qualifications = $("#jobQualificationEditor").summernote("code");
  const companyAbout = $("#aboutCompanyEditor").summernote("code");

  if (!qualifications.trim()) {
    newErrors.qualifications = "Qualifications are required.";
  }
  if (!companyAbout.trim()) {
    newErrors.companyAbout = "Company information is required.";
  }

  const postData = {
    ...formData,
    description: description,
    qualifications: qualifications,
    company_about: companyAbout,
  };

  if (activeTab === "existing") {
    if (!selectedCompanyId) {
      console.log("Please select a company.");
      return;
    }

    axios
      .post(
        "http://ls.bizbybot.com/api/jobs",
        { ...postData, company_id: selectedCompanyId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
      )
      .then((jobResponse) => {
        toast.success("Job posted successfully!");
        console.log("Job posted:", jobResponse.data);
        navigate("/posted-job")
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred.");
        }
      });

  } else {
    const companyData = {
      name: formData.name,
      website: formData.website,
      about_company: companyAbout,
      contact_person: formData.contact_person,
      contact_phone: formData.phone,
      contact_email: formData.contact_email,
      address_line_1: formData.address_line_1,
      pincode: formData.pincode,
      landmark: formData.landmark,
      city: formData.city,
      state: formData.state,
      country: formData.country,
    };
    
    axios
      .post("http://ls.bizbybot.com/api/company", companyData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .then((companyResponse) => {
        const companyId = companyResponse.data.data.id;
        console.log("Company created:", companyResponse.data);

        axios
          .post(
            "http://ls.bizbybot.com/api/jobs",
            { ...postData, company_id: companyId },
            { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
          )
          .then((jobResponse) => {
            toast.success("Job posted successfully!");
            console.log("Job posted:", jobResponse.data);
            navigate("/posted-job")
          })
          .catch((error) => {
            if (error.response) {
              toast.error(error.response.data.message);
            } else {
              toast.error("An error occurred.");
            }
          });
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data.message === "Company already exists." &&
          error.response.data.data?.id
        ) {
          const companyId = error.response.data.data.id;
          console.log("Company already exists, using existing ID:", companyId);

          axios
            .post(
              "http://ls.bizbybot.com/api/jobs",
              { ...postData, company_id: companyId },
              { headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` } }
            )
            .then((jobResponse) => {
              toast.success("Job posted successfully!");
              console.log("Job posted:", jobResponse.data);
              navigate("/posted-job")
            })
            .catch((error) => {
              if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error("An error occurred.");
              }
            });
        } else {
          toast.error(error.response?.data?.message || "An error occurred.");
        }
      });
  }
};

  return (
    <div>
      <Navbar />
      <section className="job-post-main-section">
        <div className="container">
          <Jobheader />
          <div className="row">
            <form
              className="col-md-8"
              method="POST"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                type="hidden"
                name="_token"
                autoComplete="off"/>
              <p className="post-pages-heading">Job Information</p>
              <div className="row pe-lg-5">
                {/* Job Title  */}
                <div className="col-md-6 mt-4">
                  <div className="each-animatted-input-div mt-0">
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Job Title"
                      value={formData.title}
                      onChange={handleChange}/>
                    <span
                      className="text-danger error-text"
                      id="title-error"
                    >{errors.title}</span>
                  </div>
                </div>

                {/* Job Location  */}
                <div className="col-md-6 mt-4">
                  <div className="each-animatted-input-div mt-0">
                    <input
                      type="text"
                      id="jobLocation"
                      name="location"
                      placeholder="Job Location"
                      value={formData.location}  
                      onChange={handleChange}/>
                    <span
                      className="text-danger error-text"
                      id="location-error"
                    >{errors.location}</span>
                  </div>
                </div>

                {/* Job Description  */}
                <div className="col-md-12 mt-4">
                  <label className="formlabel">Job Description</label>
                  <div id="jobDescriptionEditor"></div>
                  {errors.description && <span className="text-danger error-text">{errors.description}</span>}
                </div>

                {/* Job Category Dropdown */}
                <div className="col-md-12 mt-4">
                  <label htmlFor="selectJobCategory" className="formlabel">
                    Job Category
                  </label>
                  <div
                    className={`select-menu options-main-div ${
                      activeDropdown === "jobCategory" ? "active" : ""
                    }`}
                  >
                    <div
                      className="select-btn"
                      onClick={() => handleDropdownClick("jobCategory")}
                    >
                      <input
                        id="selectJobCategory"
                        type="text"
                        className="sBtn-text"
                        placeholder="Select Job Category"
                        readOnly
                        value={
                          formData.job_category
                            ? industryTypes.find(
                                (type) => type.id === formData.job_category
                              )?.name || ""
                            : ""
                        }/>
                      <i>
                        <img
                          src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg"
                          alt="Chevron"/>
                      </i>
                    </div>
                    {activeDropdown === "jobCategory" && (
                      <ul className="options py-0">
                        {industryTypes.map((industryType) => (
                          <li
                            key={industryType.id}
                            className="option"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                job_category: industryType.id,
                              });
                            
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                job_category: industryType.id ? "" : prevErrors.job_category,
                              }));
                            
                              setActiveDropdown(null);
                            }}>
                            <span className="option-text">
                              {industryType.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="text-danger error-text">{errors.job_category}</span>
                </div>

                {/* Job Skill Dropdown */}
                <div className="col-md-12 mt-4">
                  <label className="formlabel" for="jobSkillInput">
                    Job Skill
                  </label>
                  <div
                    className={`select-menu options-main-div ${
                      activeDropdown === "jobSkill" ? "active" : ""
                    }`}
                  >
                    <div
                      className="select-btn"
                      onClick={() => handleDropdownClick("jobSkill")}>
                      <input
                        type="text"
                        className="sBtn-text"
                        placeholder="Job Skill"
                        readOnly
                        value={formData.skills.join(", ")}/>
                      <i>
                        <img
                          src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg"
                          alt="Chevron"/>
                      </i>
                    </div>
                    {activeDropdown === "jobSkill" && (
                      <ul className="options py-0">
                        {jobSkills.length > 0 ? (
                          jobSkills.map((skill) => (
                            <li
                              key={skill.id}
                              className="option"
                              onClick={() => {
                                const updatedSkills = formData.skills.includes(skill.name)
                                  ? formData.skills.filter((name) => name !== skill.name)
                                  : [...formData.skills, skill.name];

                                setFormData({ ...formData, skills: updatedSkills });

                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  skills: updatedSkills.length > 0 ? "" : prevErrors.skills,
                                }));
                              }}
                            >
                              <span className="option-text">{skill.name}</span>
                            </li>
                          ))
                        ) : (
                          <li className="option">No skills available</li>
                        )}
                      </ul>
                    )}
                  <span className="text-danger error-text">{errors.skills}</span>
                  </div>

                  <span
                    className="text-danger error-text"
                    id="skills-error"
                  ></span>
                </div>
                {/* Industry type  */}
                <div className="col-md-6 mt-4">
                  <label
                    className="formlabel"
                    htmlFor="industryTypeInput"
                    id="industryTypeLabel"
                  >
                    Industry Type
                  </label>
                  <div
                    className={`select-menu options-main-div ${
                      activeDropdown === "industryType" ? "active" : ""
                    }`}
                  >
                    <div
                      className="select-btn"
                      onClick={() => handleDropdownClick("industryType")}
                    >
                      <input
                        type="text"
                        className="sBtn-text"
                        id="industryTypeInput"
                        placeholder="Industry Type"
                        readOnly
                        value={formData.industry_types.join(", ")}/>
                      <i>
                        <img
                          src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg"
                          alt="Chevron"/>
                      </i>
                    </div>
                    <ul className="options py-0">
                      {activeDropdown === "industryType" &&
                      industryTypes.length > 0
                        ? industryTypes.map((industry) => (
                            <li
                              key={industry.id}
                              className="option"
                              onClick={() => {
                                const updatedIndustries = [...formData.industry_types, industry.name];
                              
                                setFormData({
                                  ...formData,
                                  industry_types: updatedIndustries,
                                });
                              
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  industry_types: updatedIndustries.length > 0 ? "" : prevErrors.industry_types,
                                }));
                              
                                setActiveDropdown(null);
                              }}
                              
                            >
                              {industry.name}
                            </li>
                          ))
                        : activeDropdown === "industryType" && (
                            <li className="option">
                              No industry types available
                            </li>
                          )}
                    </ul>
                  </div>
                  <span className="text-danger error-text">{errors.industry_types}</span>
                </div>

                {/* Job type  */}
                <div className="col-md-6 mt-4">
                  <label htmlFor="selectJobType" className="formlabel">
                    Job Type
                  </label>
                  <div
                    className={`select-menu options-main-div ${
                      activeDropdown === "jobType" ? "active" : ""
                    }`}
                  >
                    <div
                      className="select-btn"
                      onClick={() => handleDropdownClick("jobType")}
                    >
                      <input
                        type="text"
                        className="sBtn-text"
                        id="selectJobType"
                        placeholder="Select Job Type"
                        readOnly
                        value={formData.job_types.join(", ")}/>
                      <i>
                        <img
                          src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg"
                          alt="Chevron"/>
                      </i>
                    </div>
                    {activeDropdown === "jobType" && (
                      <ul className="options py-0">
                        {jobTypes.length > 0 ? (
                          jobTypes.map((jobType) => (
                            <li
                              key={jobType.id}
                              className="option"
                              onClick={() => {
                                const updatedJobTypes = [...formData.job_types, jobType.name];
                              
                                setFormData({
                                  ...formData,
                                  job_types: updatedJobTypes,
                                });
                              
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  job_types: updatedJobTypes.length > 0 ? "" : prevErrors.job_types,
                                }));
                              
                                setActiveDropdown(null);
                              }}
                              
                            >
                              {jobType.name}
                            </li>
                          ))
                        ) : (
                          <li className="option">No Job types available</li>
                        )}
                      </ul>
                    )}
                  </div>
                  <span className="text-danger error-text">{errors.job_types}</span>
                </div>

                {/* Workplace Type Dropdown */}
                <div className="col-md-6 mt-4">
                  <label className="formlabel">
                    Workplace Type
                  </label>
                  <div
                    className={`select-menu options-main-div ${
                      activeDropdown === "workplaceType" ? "active" : ""
                    }`}
                  >
                    <div
                      className="select-btn"
                      onClick={() => handleDropdownClick("workplaceType")}
                    >
                      <input
                        type="text"
                        className="sBtn-text"
                        id="workPlaceTypeInput"
                        placeholder="Workplace Type"
                        readOnly
                        value={formData.workplace_types.join(", ")}/>
                      <i>
                        <img
                          src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg"
                          alt="Chevron"/>
                      </i>
                    </div>
                    {activeDropdown === "workplaceType" && (
                      <ul className="options py-0">
                        {workplacetypes.length > 0 ? (
                          workplacetypes.map((workplaceType) => (
                            <li
                              key={workplaceType.id}
                              className="option"
                              onClick={() => {
                                const updatedWorkplaceTypes = [...formData.workplace_types, workplaceType.name];
                              
                                setFormData({
                                  ...formData,
                                  workplace_types: updatedWorkplaceTypes,
                                });
                              
                                setErrors((prevErrors) => ({
                                  ...prevErrors,
                                  workplace_types: updatedWorkplaceTypes.length > 0 ? "" : prevErrors.workplace_types,
                                }));
                              
                                setActiveDropdown(null);
                              }}                              
                            >
                              {workplaceType.name}
                            </li>
                          ))
                        ) : (
                          <li className="option">
                            No Workplace types available
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  <span className="text-danger error-text">{errors.workplace_types}</span>
                </div>

                {/* Experience  */}
                <div className="col-md-6 mt-4">
                  <label htmlFor="experience" className="formlabel">
                    Experience (In Years)
                  </label>
                  <div className="row">
                    <div className="col-6">
                      <div className="each-animatted-input-div mt-0">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        max="99"
                        id="experience_min"
                        name="experience_min"
                        placeholder="Min"
                        value={formData.experience_min || ""}
                        onChange={handleExperienceChange}
                      />
                      {errors.experience_min && (
                        <span className="text-danger error-text">{errors.experience_min}</span>
                      )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="each-animatted-input-div mt-0">
                      <input
                        type="number"
                        min="0"
                        step="1"
                        max="99"
                        id="experience_max"
                        name="experience_max"
                        placeholder="Max"
                        value={formData.experience_max || ""}
                        onChange={handleExperienceChange}
                      />
                      {errors.experience_max && (
                        <span className="text-danger error-text">{errors.experience_max}</span>
                      )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary  */}
                <div className="col-12 col-md-4 mt-4">
                  <label htmlFor="selectCurrency" className="formlabel">
                    Salary
                  </label>
                  <div className={`select-menu options-main-div ${activeDropdown === "salaryCurrency" ? "active" : ""}`}>
                    <div className="select-btn" onClick={() => handleDropdownClick("salaryCurrency")}>
                      <input
                        type="text"
                        className="sBtn-text"
                        id="selectCurrency"
                        placeholder="Select Currency"
                        readOnly
                        value={formData.salary_currency || ""}
                      />
                      <i>
                        <img src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg" alt="Chevron" />
                      </i>
                    </div>
                    {activeDropdown === "salaryCurrency" && (
                      <ul className="options py-0">
                        <li className="option" onClick={() => handleCurrencySelect("USD($)")}>USD($)</li>
                        <li className="option" onClick={() => handleCurrencySelect("INR(₹)")}>INR(₹)</li>
                      </ul>
                    )}
                  </div>
                  {errors.salary_currency && <span className="text-danger error-text">{errors.salary_currency}</span>}
                </div>
                {/* Salary Min */}
                <div className="col-md-4 mt-4">
                  <label htmlFor="minSalary" className="formlabel d-none d-md-block">&nbsp;</label>
                  <div className="each-animatted-input-div mt-0">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      id="minSalary"
                      name="salary_min"
                      placeholder="Min"
                      value={formData.salary_min || ""}
                      onChange={handleSalaryChange}
                    />
                    {errors.salary_min && <span className="text-danger error-text">{errors.salary_min}</span>}
                  </div>
                </div>
                {/* Salary Max */}
                <div className="col-md-4 mt-4">
                  <label htmlFor="maxSalary" className="formlabel d-none d-md-block">&nbsp;</label>
                  <div className="each-animatted-input-div mt-0">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      id="maxSalary"
                      name="salary_max"
                      placeholder="Max"
                      value={formData.salary_max || ""}
                      onChange={handleSalaryChange}
                    />
                    {errors.salary_max && <span className="text-danger error-text">{errors.salary_max}</span>}
                  </div>
                </div>
                
                {/* Qualifications  */}
                <div className="col-md-12 mt-4">
                  <label className="formlabel">Qualifications</label>
                  <div id="jobQualificationEditor"></div>
                  {errors.qualifications && <span className="text-danger error-text">{errors.qualifications}</span>}
                </div>
              </div>

              <p className="post-pages-heading">Company Information</p>
              <div className="row">
                <div class="col-12">
                  <ul class="nav course-tab-ul existing-add-company-ul" id="myTab" role="tablist">
                      <li class="nav-item" role="presentation">
                          <button type="button" className={`create-new-existing ${activeTab === "existing" ? "active" : ""}`} id="existing-tab"
                          onClick={() => setActiveTab("existing")}>Select existing company</button>
                      </li>
                      <li class="nav-item" role="presentation">
                          <button type="button" className={`create-new-existing ${activeTab === "new" ? "active" : ""}`} id="video-tab"
                          onClick={() => setActiveTab("new")}>Add new company</button>
                      </li>
                  </ul>
                </div>
                <div className="col-12">
                  <div className="tab-content" id="myTabContent">
                    {/* Existing Company  */}
                    <div className={`tab-pane fade ${activeTab === "existing" ? "active show" : ""}`} id="existingCompany">
                      <div className="col-md-6 mt-4">
                          <label htmlFor="existingCompanyInp" className="formlabel">
                              Existing company
                          </label>
                          <div className={`select-menu options-main-div ${activeDropdown === "existingCompany" ? "active" : ""}`}>
                              <div className="select-btn" onClick={() => handleDropdownClick("existingCompany")}>
                                  <input hidden id="existing_company_id" className="input-class" name="company_id" value={selectedCompanyId || ""} />
                                  <input id="existingCompanyInp" type="text" className="sBtn-text input-class" placeholder="Select existing company" readOnly value={companies.find(company => company.id === selectedCompanyId)?.name || ""} />
                                  <i><img src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg" alt="Chevron" /></i>
                              </div>
                              {activeDropdown === "existingCompany" && (
                                  <ul className="options py-0">
                                      {companies.map((company) => (
                                          <li key={company.id} className="option select-existing-company-dropdown-options" onClick={() => {
                                            handleCompanySelect(company.id);
                                          
                                            setErrors((prevErrors) => ({
                                              ...prevErrors,
                                              company: company.id ? "" : prevErrors.company, 
                                            }));
                                          
                                            setActiveDropdown(null);
                                          }}>
                                              <span className="option-text">{company.name}</span>
                                          </li>
                                      ))}
                                  </ul>
                              )}
                          </div>
                          <span
                      className="text-danger error-text"
                      id="location-error"
                    >{errors.company}</span>
                      </div>
                  </div>
                    {/* New Company  */}
                    <div className={`tab-pane fade ${activeTab === "new" ? "active show" : ""}`} id="newCompany">
                      <div className="row pe-lg-5">
                        <div className="col-md-6 mt-4">
                          <div className="each-animatted-input-div mt-0">
                            <input
                              type="text"
                              id="companyName"
                              name="name"
                              placeholder="Company Name"
                              value={formData.name || ""}
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="name-error"
                            ></span>
                          </div>
                        </div>

                        <div className="col-md-6 mt-4">
                          <div className="each-animatted-input-div mt-0">
                            <input
                              type="text"
                              id="companyWebsite"
                              name="website"
                              placeholder="Company Website"
                              value={formData.website || ""}
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="website-error"
                            ></span>
                          </div>
                        </div>
                        <div className="col-md-12 mt-4">
                          <label className="formlabel">About Company</label>
                          <div id="aboutCompanyEditor">
                          </div><span className="text-danger error-text">{errors.company_about}</span>
                        </div>
                        <div className="col-md-6 mt-4">
                          <div className="each-animatted-input-div mt-0">
                            <input
                              type="text"
                              id="contactPersonName"
                              name="contact_person"
                              placeholder="Contact Person Name"
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="contact_person-error"
                            ></span>
                          </div>
                        </div>
                        <div className="col-md-6 mt-4">
                          <div className="each-animatted-input-div mt-0">
                            <input
                              type="text"
                              id="contactEmail"
                              name="contact_email"
                              placeholder="Contact Email"
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="contact_email-error"
                            ></span>
                          </div>
                        </div>
                        <div className="col-md-6 mt-4">
                          <div className="each-animatted-input-div mt-0">
                            <InputMask
                              type="tel"
                              name="phone"
                              mask="(___)-(___)-____"
                              replacement={{ _: /\d/ }}
                              id="contact_phone"
                              required=""
                              inputMode="text"
                              placeholder=" Contact Phone No."
                              fdprocessedid="qs4yt"
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="contact_phone-error"
                            ></span>
                          </div>
                        </div>
                        <div className="col-md-12 mt-4">
                          <div className="each-animatted-input-div mt-0">
                            <input
                              type="text"
                              id="address"
                              name="address_line_1"
                              placeholder="Address"
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="address_line_1-error"
                            ></span>
                          </div>
                        </div>
                        <div className="col-md-4 mt-4">
                          <label htmlFor="ticketPrice" className="formlabel">
                            &nbsp;
                          </label>
                          <div className="each-animatted-input-div mt-0">
                            <input
                              type="text"
                              id="city"
                              name="city"
                              placeholder="City"
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="city-error"
                            ></span>
                          </div>
                        </div>

                        <div className="col-md-5 mt-4">
                          <label htmlFor="country" className="formlabel">
                            Select Country
                          </label>
                          <div
                            className={`select-menu options-main-div ${
                              activeDropdown === "country" ? "active" : ""
                            }`}
                          >
                            <div
                              className="select-btn"
                              onClick={() => handleDropdownClick("country")}
                            >
                              <input
                                type="text"
                                className="sBtn-text"
                                id="country"
                                placeholder="Country"
                                readOnly
                                value={formData.country || ""}/>
                              <i>
                                <img
                                  src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg"
                                  alt="Chevron"/>
                              </i>
                            </div>
                            {activeDropdown === "country" && (
                              <ul className="options py-0">
                                <li
                                  className="option"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      country: "USA",
                                    });
                                    setActiveDropdown(null);
                                  }}
                                >
                                  USA
                                </li>
                                <li
                                  className="option"
                                  onClick={() => {
                                    setFormData({
                                      ...formData,
                                      country: "India",
                                    });
                                    setActiveDropdown(null);
                                  }}
                                >
                                  India
                                </li>
                              </ul>
                            )}
                          </div>
                          <span
                            className="text-danger error-text"
                            id="country-error"
                          ></span>
                        </div>

                        <div className="col-md-3 mt-4">
                          <label htmlFor="ticketPrice" className="formlabel">
                            &nbsp;
                          </label>
                          <div className="each-animatted-input-div mt-0">
                            <input
                              type="text"
                              id="zip"
                              name="pincode"
                              placeholder="Postcode"
                              onChange={handleChange}/>
                            <span
                              className="text-danger error-text"
                              id="pincode-error"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button className="btn submit-application-btn"> POST THE JOB NOW</button>
            </form>
          </div>
        </div>
      </section>
      <Newsletter />
      <Footer />
    </div>
  );
}
