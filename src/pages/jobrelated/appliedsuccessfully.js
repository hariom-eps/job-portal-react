import React from 'react'
import { Link } from 'react-router';
import '../../css/style.css'

import Navbar from "../../components/navbar";
import Footer from '../../components/footer';

export default function Appliedsuccessfully() {
  return (
    <div>
        <Navbar/>
        <section className="single-job-main-section successfull-section">
        <div className="container">
            <div className="row">
                <div className="col-md-8 right-padding">
                    <svg className="tick-svg" xmlns="http://www.w3.org/2000/svg" width="75" height="76" viewBox="0 0 75 76" fill="none">
                        <g clip-path="url(#clip0_82_2910)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M60.922 10.0845C61.6141 9.66769 62.4407 9.5351 63.2284 9.71455C64.0162 9.894 64.7038 10.3716 65.147 11.047L68.2408 15.7658C68.6449 16.3825 68.818 17.1223 68.7293 17.8543C68.6407 18.5863 68.2961 19.2633 67.7564 19.7658L67.747 19.7783L67.7033 19.8189L67.5252 19.9845L66.822 20.6564C62.9314 24.4301 59.1587 28.3237 55.5095 32.3314C48.6439 39.8814 40.4908 49.7626 35.0033 59.3501C33.472 62.0251 29.7314 62.6001 27.5127 60.2908L7.24703 39.2345C6.95661 38.9326 6.72984 38.5755 6.58021 38.1842C6.43057 37.793 6.36112 37.3756 6.37599 36.957C6.39086 36.5384 6.48974 36.127 6.66675 35.7474C6.84377 35.3677 7.0953 35.0275 7.40641 34.747L13.5314 29.222C14.0697 28.7367 14.7598 28.4536 15.4838 28.4211C16.2078 28.3886 16.9206 28.6088 17.5002 29.0439L27.8408 36.797C43.9908 20.8689 53.1533 14.7564 60.922 10.0845ZM61.5783 17.0095C54.422 21.4845 45.4908 27.9751 30.3345 43.1283C29.8027 43.6601 29.0968 43.9823 28.3466 44.0357C27.5963 44.0891 26.852 43.8701 26.2502 43.4189L15.8064 35.5876L13.9908 37.2251L30.6064 54.4939C36.3752 44.9001 44.3158 35.3501 50.8877 28.1251C54.3483 24.3234 57.9175 20.6219 61.5908 17.0251L61.5783 17.0095Z" fill="#0A66C2"></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_82_2910">
                                <rect width="75" height="75" fill="white" transform="translate(0 0.293945)"></rect>
                            </clipPath>
                        </defs>
                    </svg>
                    <h2 className="success-heading">You have successfully applied the job.</h2>
                    <p className="congrate-para pe-lg-5 me-lg-5">Congratulations! We have successfully submitted your
                        application to
                        the company. The HR executive from the
                        company will directly contact you soon once your resume gets shortlisted for the desired
                        position.
                        Meanwhile, you can look for other related or similar jobs that suit you as per your job profile.
                    </p>
                    <div className="goback-job-btn-div">
                        <button onclick="history.back()">Go Back</button>
                        <Link to="/jobs">Go to Jobs Page</Link>
                    </div>
                </div>
                <div className="col-md-4 mt-5 mt-md-0">
                </div>
            </div>
        </div>
    </section>
    <Footer/>
    </div>
  )
}
