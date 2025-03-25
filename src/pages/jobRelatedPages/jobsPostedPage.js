import React, { useEffect, useState } from "react";
import Navbar from "../../components/homeNavbar";
import Jobheader from "../../components/jobNavbar";
import "../../css/style.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { apiUrl } from "../../helperURL";
import { assetUrl } from "../../helperASSET";

export default function Postedjob() {
  const [postedJobs, setPostedJobs] = useState([]);
  const token = localStorage.getItem("Token");
  const user = JSON.parse(localStorage.getItem("User"));
  const userId = user?.id ? Number(user.id) : null;
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  useEffect(() => {
    if (!token || userId === null) {
      toast.error("User not authenticated");
      return;
    }

    axios
      .get(`${apiUrl}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const jobsData = response.data?.data || [];
        const filteredJobs = jobsData.filter((job) => {
          const jobCreatedBy = Number(job.created_by);
          return jobCreatedBy === userId;
        });
        setPostedJobs(filteredJobs);
      })
      .catch((error) => console.error("Error fetching Jobs:", error));
  }, []);

  const handleOpenDeleteModal = (jobId) => {
    setJobIdToDelete(jobId);
  };

  const handleDeleteJob = () => {
    if (jobIdToDelete) {
      axios
        .delete(`${apiUrl}/api/jobs/${jobIdToDelete}/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setPostedJobs(postedJobs.filter((job) => job.id !== jobIdToDelete));
            toast.success("Job deleted successfully");
            setJobIdToDelete(null);
          } else {
            console.error("Delete API Error (Non-200):", response);
            toast.error("Error deleting job: Server returned an error.");
            setJobIdToDelete(null);
          }
        })
        .catch((error) => {
          console.error("Error deleting job (axios error):", error);
          toast.error("Error deleting job: Network or server error.", error);
          setJobIdToDelete(null);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <section className="applied-job-main-section">
        <div className="container">
          <Jobheader />
          <div className="row mt-5">
            <div className="col-lg-8">
              <p className="applied-job-heading" data-total="1">
                Jobs Posted ({postedJobs.length})
              </p>
              {postedJobs.length > 0 ? (
                postedJobs.map((job) => (
                  <div
                    className="each-applied-job"
                    id={`jobid-${job.id}`}
                    key={job.id}
                  >
                    <div className="heading-div">
                      <h3>{job.title}</h3>
                      <label>{job.job_types.join(", ") || "N/A"}</label>
                    </div>
                    <div className="all-details">
                      <span className="gapfortiles">
                        <img
                          src={`${assetUrl}/front/images/icons/company.svg`}
                          alt="company"
                        />
                        <span>{job.company_info?.name || "Company Name"}</span>
                      </span>
                      <span className="gapfortiles">
                        <img
                          src={`${assetUrl}/front/images/icons/time-period.svg`}
                          alt="Time"
                        />
                        {job.experience_min} -{" "}
                        {job.experience_max || "Max Experience"} Years
                      </span>
                      <span className="gapfortiles">
                        <img
                          src={`${assetUrl}/front/images/icons/gross-sale.svg`}
                          alt="Salary"
                        />
                        {job.salary_min
                          ? `${(job.salary_min / 1000).toFixed(0)}K`
                          : "Salary"}{" "}
                        -
                        {job.salary_max
                          ? `${(job.salary_max / 1000).toFixed(0)}K`
                          : "Salary"}
                        &nbsp;{job.salary_currency}&nbsp;per year
                      </span>
                      <span className="gapfortiles">
                        <img
                          src={`${assetUrl}/front/images/icons/job-type.svg`}
                          alt="Job Type"
                        />
                        {job.job_types.join(", ") || "Job type"}
                      </span>
                      <span className="gapfortiles">
                        <img
                          src={`${assetUrl}/front/images/icons/location.svg`}
                          alt="Job Location"
                        />
                        {job.location || "Job Location"}
                      </span>
                    </div>
                    <div className="button-with-applied-date posted-job-btns-div">
                      <div className="view-job-btn">
                        <Link to={`/jobs/${job.id}`}>View Job Description</Link>
                        <div className="d-flex flex-column">
                          <span>
                            Posted on{" "}
                            {new Date(job.created_at).toLocaleDateString(
                              "en-GB"
                            ) || "DD/MM"}
                          </span>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/post-job/${job.id}/update`}
                          className="edit-btn"
                        >
                          EDIT JOB
                        </Link>
                        <a
                          className="edit-btn click-button"
                          onClick={() => handleOpenDeleteModal(job.id)}
                        >
                          <img
                            src={`${assetUrl}/front/images/icons/delete.svg`}
                            className="img-fluid"
                            alt="Delete"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="">
                  <div className="">
                    <div className="no-result-area">
                      <h3>No Jobs posted yet</h3>
                    </div>
                  </div>
                  <div className="col-lg-4"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Delete model  */}
      <div
        className={`modal fade delete-modal-main-div fadeit ${
          jobIdToDelete ? "show blurred-background transition-modal" : ""
        }`}
        id="deleteModal"
        style={{
          transition: "transform 0.3s ease-in-out",
          display: jobIdToDelete ? "block" : "none",
        }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0">
            <div className="modal-body">
              <button
                className="modal-close-btn"
                onClick={() => setJobIdToDelete(null)}
              >
                <img
                  src={`${assetUrl}/front/images/icons/modal-close.svg`}
                  alt="Close"
                />
              </button>

              <div className="delete-main-inputes-div">
                <p className="main-heading">Delete?</p>
                <p className="sub-heading">
                  Are you sure you want to delete this job?
                </p>
                <p className="sub-heading">
                  If you delete this job, job associated data will be deleted
                  permanently?
                </p>
                <div className="delete-modal-cancel-del-btns">
                  <button
                    className="btn cancel-btn"
                    onClick={() => setJobIdToDelete(null)}
                  >
                    Cancel
                  </button>
                  <button className="btn delete-btn" onClick={handleDeleteJob}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
