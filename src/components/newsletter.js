import React from 'react'

export default function newsletter() {
  return (
    <section className="cta-main-section">
            <img src="http://ls.bizbybot.com/front/images/icons/cta-design-1.svg" className="img-fluid design-1" alt="Half Circle"/>
            <img src="http://ls.bizbybot.com/front/images/icons/cta-design-2.svg" className="img-fluid design-2" alt="Half Circle"/>
            <div className="container">
                <div className="cta-content-area subscribe-us-container">
                    <h5>Subscribe and get the latest updates directly to your email</h5>
                    <div className="cta-form-div">
                        <div className="input-div">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <g clipPath="url(#clip0_22_392)">
                                    <path d="M2.72333 3.70557H23.2233C24.1893 3.70557 24.9733 4.48957 24.9733 5.45557V19.4556C24.9733 19.9197 24.789 20.3648 24.4608 20.693C24.1326 21.0212 23.6875 21.2056 23.2233 21.2056H2.72333C2.2592 21.2056 1.81408 21.0212 1.48589 20.693C1.1577 20.3648 0.973328 19.9197 0.973328 19.4556V5.45557C0.973328 4.48957 1.75733 3.70557 2.72333 3.70557ZM2.47333 8.11757V19.4556C2.47333 19.5936 2.58533 19.7056 2.72333 19.7056H23.2233C23.2896 19.7056 23.3532 19.6792 23.4001 19.6323C23.447 19.5855 23.4733 19.5219 23.4733 19.4556V8.11757L13.9533 14.5506C13.3613 14.9506 12.5853 14.9506 11.9933 14.5506L2.47333 8.11757ZM2.47333 5.45557V6.30757L12.8333 13.3076C12.8747 13.3355 12.9234 13.3504 12.9733 13.3504C13.0232 13.3504 13.072 13.3355 13.1133 13.3076L23.4733 6.30757V5.45557C23.4733 5.38926 23.447 5.32567 23.4001 5.27879C23.3532 5.23191 23.2896 5.20557 23.2233 5.20557H2.72333C2.65702 5.20557 2.59344 5.23191 2.54655 5.27879C2.49967 5.32567 2.47333 5.38926 2.47333 5.45557Z" fill="#666666" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_22_392">
                                        <rect width="24" height="24" fill="white" transform="translate(0.973328 0.705566)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <input type="email" name="email" placeholder="Enter your email address" />
                        </div>
                        <button className="btn cta-btn">SUBSCRIBE</button>
                    </div>
                </div>
            </div>
        </section>
  )
}
