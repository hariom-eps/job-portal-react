import React from 'react'

import NavbarTop from "../components/navbar";
import Newsletter from "../components/newsletter";
import Footer from '../components/footer';
import Signup from '../components/signup';

import HeroBackground3 from '../images/HeroBackground3.png';

export default function courses() {
  return (
    <div>
        <NavbarTop/>
        {/* Hero Section  */}

        <section className="main-hero-section"> 
        <img src={HeroBackground3} alt="Hero Image" className="img-fluid hero-bg-image" />
        <div className="container hero-content-area">
            <h1 className="hero-head">Continuing Education leads to better opportunities</h1>
            <p className="hero-para">Investing in Professional Development increases your marketability</p>
        </div>
        </section>
        {/* Search Section  */}

        <section className="main-search-section">
            <div className="container">
                <div className="search-form-div-main">
                    <div className="search-area-each-input">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M21.8364 21.1692L17.4934 16.8262M17.4934 16.8262C18.2363 16.0834 18.8256 15.2014 19.2277 14.2308C19.6297 13.2602 19.8367 12.2198 19.8367 11.1692C19.8367 10.1186 19.6297 9.07833 19.2277 8.1077C18.8256 7.13707 18.2363 6.25513 17.4934 5.51224C16.7506 4.76936 15.8686 4.18006 14.898 3.77802C13.9274 3.37597 12.8871 3.16904 11.8364 3.16904C10.7858 3.16904 9.74553 3.37597 8.7749 3.77802C7.80427 4.18006 6.92234 4.76936 6.17945 5.51224C4.67912 7.01257 3.83624 9.04746 3.83624 11.1692C3.83624 13.291 4.67912 15.3259 6.17945 16.8262C7.67978 18.3266 9.71466 19.1694 11.8364 19.1694C13.9582 19.1694 15.9931 18.3266 17.4934 16.8262Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input type="text" name="title" value="" placeholder="Course Title"/>
                    </div>
                    <div className="select-menu options-main-div">
                        <div className="select-btn">
                            <input hidden id="sBtn-text-value" className="input-class" name="category_id" value="" />
                            <input id="selectJobCategory" type="text" name="category" className="sBtn-text" value="" placeholder="Category" readonly/>
                            <i>
                                <img src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg" alt="Chevron" />
                            </i>
                        </div>
                        <ul className="options py-0">
                            <li className="select-search-inp-li">
                                <input type="text" placeholder="Type to search" className="filter-input"/>
                            </li>
                            <li className="option job-category " value="1">
                                <span className="option-text"> Legal </span>
                            </li>
                            <li className="option job-category " value="2">
                                <span className="option-text"> Tax </span>
                            </li>
                            <li className="option job-category " value="3">
                                <span className="option-text"> Human Resources </span>
                            </li>
                            <li className="option job-category " value="4">
                                <span className="option-text"> Accountancy and Finance </span>
                            </li>
                            <li className="option job-category " value="5">
                                <span className="option-text"> Financial services and Insurance </span>
                            </li>
                            <li className="option job-category " value="6">
                                <span className="option-text"> Technology and IT </span>
                            </li>
                            <li className="option job-category " value="7">
                                <span className="option-text"> Banking </span>
                            </li>
                            <li className="option job-category " value="8">
                                <span className="option-text"> Compliance </span>
                            </li>
                            <li className="option job-category " value="9">
                                <span className="option-text"> Business Services </span>
                            </li>
                            <li className="option job-category " value="10">
                                <span className="option-text"> Engineering </span>
                            </li>
                            <li className="option job-category " value="11">
                                <span className="option-text"> Office Support </span>
                            </li>
                            <li className="option job-category " value="12">
                                <span className="option-text"> Healthcare </span>
                            </li>
                            <li className="option job-category " value="13">
                                <span className="option-text"> Aviation </span>
                            </li>
                            <li className="option job-category " value="14">
                                <span className="option-text"> Life Sciences </span>
                            </li>
                            <li className="d-none no-result-li">
                                <img src="http://ls.bizbybot.com/front/images/icons/sad-icon.svg" alt="Sad" /> No search results!
                            </li>
                        </ul>
                    </div>
                    <div className="select-menu">
                        <div className="select-btn">
                            <input type="text" className="sBtn-text" value="" name="tags" placeholder="Level" readonly/>
                            <i>
                                <img src="http://ls.bizbybot.com/front/images/icons/select-drop-arrow.svg" alt="Chevron"/>
                            </i>
                        </div>
                        <ul className="options">
                            <li className="option">
																													<span className=" option-text">Beginner</span>
                            </li>
                            <li className="option">
																													<span className=" option-text">Intermediate</span>
                            </li>
                            <li className="option">
																													<span className=" option-text">Experienced</span>
                            </li>
                        </ul>
                    </div>
                    <button type="submit" className="btn search-submit-btn"> SEARCH </button>
                </div>
            </div>
        </section>
        {/* Course section  */}

        <section className="card-carousel-main-section">
        <div className="container position-relative">
            <p className="common-slider-heading">Latest Course (O)</p>
        <div className="">
            <div className="">
                <div className="no-result-area">
                    <h3>
                        There are no Latest Course to be displayed here.
                    </h3>
                </div>
            </div>
        </div>
        </div>
        </section>
        <section className="card-carousel-main-section">
        <div className="container position-relative">
            <p className="common-slider-heading">Popular course (O)</p>
        <div className="">
            <div className="">
                <div className="no-result-area">
                    <h3>
                        There are no Popular course to be displayed here.
                    </h3>
                </div>
            </div>
        </div>
        </div>
        </section>

        <section className="top-department-catogiries-main-section">
          <div className="container">
              <p className="heading-para">Top Categories</p>
                            <div className="row px-0 px-lg-5">
                      <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/MQ==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/3e725023e4c44df35608222dee97bd44.png" />
                  <p>Legal</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/Mg==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/d99c14ba9fc23337e435d36a4ccd46c1.png" />
                  <p>Tax</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/Mw==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/7f4695636960e146c915b1490d296324.png" />
                  <p>Human Resources</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/NA==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/985db3dcfd9a1a3173c34257d7873daf.png" />
                  <p>Accountancy and Finance</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/NQ==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/a60ea0ce2d74029a94d74bbd4eba08ea.png" />
                  <p>Financial services and Insurance</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/Ng==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/05225099e80ca952df1198a3a28169fe.png" />
                  <p>Technology and IT</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/Nw==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/56aa7e9d549302a87cc8758977fe6ea2.png" />
                  <p>Banking</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/OA==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/29f13381471fc463109fd71862c00c65.png" />
                  <p>Compliance</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/OQ==">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/b68fc45c41320aa5460177c7a64e5afa.png" />
                  <p>Business Services</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/MTA=">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/4f29082c9e780d8acc63dd857a58dd1e.png" />
                  <p>Engineering</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/MTE=">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/17a53ce4723db844a4d0522455b5162c.png" />
                  <p>Office Support</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/MTI=">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/fad25355b43e6acd92a9d038e6d396cb.png" />
                  <p>Healthcare</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/MTM=">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/c1c92b225dda676d3894748483df5d5c.png" />
                  <p>Aviation</p>
              </div>
          </a>
      </div>
    <div className="col-md-6 col-lg-4 mt-3">
          <a href="http://ls.bizbybot.com/jobs/top-categories/MTQ=">
              <div className="each-category">
                  <img src="https://stagingeps.s3.ap-south-1.amazonaws.com/legal-spiel/industry_icon/5a73abc51771b77ec989040fdfddcbf6.png" />
                  <p>Life Sciences</p>
              </div>
          </a>
      </div>
                  </div>
                    </div>
        </section>

        <Signup/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}
