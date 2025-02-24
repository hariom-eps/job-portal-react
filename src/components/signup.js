import React from 'react'
import { Link } from 'react-router'

export default function signup() {
  const token=localStorage.getItem('Token');
  return (
    <div className={token?'d-none':''}>
      <section className="signup-cta-main-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <p className="para">Sign Up now to find your dream job, it’s free and easy!</p>
                        <Link to={"/signup"} data-bs-toggle="modal" data-bs-target="#signupModal"
                            className="btn">SIGN UP NOW</Link>
                    </div>
                    <div className="col-md-5 mt-3 mt-md-0 position-relative">
                        <img src="http://ls.bizbybot.com/front/images/cta-image2.png" alt="Call to action"
                            className="img-fluid signup-cta-img"/>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
