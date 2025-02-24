import React from 'react';
import { Link } from 'react-router-dom';
import FooterLogo from '../images/footer-logo.png'

export default function footer() {
  return (
    <footer >
        <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
            <Link to='/'>
                <img src={FooterLogo} alt="Footer"className="img-fluid footer-logo" width="277" height="75"/>
            </Link>
                <p className="footer-large-para">Whether you are actively looking or just curious about what your next career move could be, we are here to help you navigate your career journey with confidence</p>
                <div className="social-div">
                    <p>Follow us on:</p>
                    <ul>
                        <li>
                            <Link to="https://www.facebook.com/LegalSpiel" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20">
                                <path d="M3.46085 19.526V10.4474H0.991333V7.17874H3.46085V4.38684C3.46085 2.19294 4.9196 0.178223 8.28088 0.178223C9.64181 0.178223 10.6481 0.305047 10.6481 0.305047L10.5689 3.35746C10.5689 3.35746 9.54255 3.34775 8.42259 3.34775C7.21046 3.34775 7.01626 3.89075 7.01626 4.79198V7.17874H10.6652L10.5064 10.4474H7.01626V19.526H3.46085Z" fill="#3B5998" />
                                </svg>
                            </Link>
                        </li>
                        <li>
                            <Link to="https://www.linkedin.com/company/legal-spiel/" target="_blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19">
                                <path d="M4.90856 18.6334H1.21557V6.74079H4.90856V18.6334ZM3.05984 5.11855C1.8791 5.11855 0.921021 4.14011 0.921021 2.95937C0.921021 2.39212 1.14636 1.84811 1.54747 1.447C1.94857 1.0459 2.49259 0.820557 3.05984 0.820557C3.62708 0.820557 4.1711 1.0459 4.57221 1.447C4.97331 1.84811 5.19865 2.39212 5.19865 2.95937C5.19865 4.14011 4.24057 5.11855 3.05984 5.11855ZM18.7301 18.6334H15.0453V12.8442C15.0453 11.4644 15.0174 9.69518 13.1254 9.69518C11.2054 9.69518 10.9109 11.194 10.9109 12.745V18.6334H7.22168V6.74079H10.7633V8.36303H10.8148C11.3078 7.42849 12.5121 6.44242 14.3087 6.44242C18.0462 6.44242 18.7332 8.90378 18.7332 12.1006V18.6334H18.7301Z" fill="#0A66C2" />
                                </svg>
                            </Link>
                        </li>
                         
                    </ul>
                </div>
            </div>
            <div className='col-md-3'>
            <div className="col-md-3">
                <div className="each-link-div">
                    <p>Links</p>
                    <ul>
                        <li><a href="https://legalspiel.com/about/">About Us</a></li>
                        <li><a href="https://legalspiel.com/services/">Services</a></li>
                        <li><a href="http://ls.bizbybot.com">Events</a></li>
                        <li><a href="http://ls.bizbybot.com/courses">Courses</a></li>
                        <li><a href="http://ls.bizbybot.com/jobs">Jobs</a></li>
                    </ul>
                </div>
            </div>
            </div>
            <div className='col-md-3'>
            <div className="each-link-div">
                            <p>Company</p>
                            <ul>
                                <li>
                                    <a href="https://legalspiel.com/contact/">Contact Us</a>
                                </li>
                                <li>
                                    <a href="https://legalspiel.com/privacy-policy/">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="tel:+444-555-6666">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
                                            <g clipPath="url(#clip0_22_371)">
                                                <path d="M10.4364 19.0119H15.2364M6.43643 23.8119H19.2364C19.6608 23.8119 20.0677 23.6433 20.3678 23.3432C20.6679 23.0432 20.8364 22.6362 20.8364 22.2119V3.01187C20.8364 2.58752 20.6679 2.18055 20.3678 1.88049C20.0677 1.58044 19.6608 1.41187 19.2364 1.41187H6.43643C6.01208 1.41187 5.60511 1.58044 5.30505 1.88049C5.005 2.18055 4.83643 2.58752 4.83643 3.01187V22.2119C4.83643 22.6362 5.005 23.0432 5.30505 23.3432C5.60511 23.6433 6.01208 23.8119 6.43643 23.8119Z" stroke="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_22_371">
                                                    <rect width="24" height="24" fill="white" transform="translate(0.836426 0.611816)" />
                                                </clipPath>
                                            </defs>
                                        </svg> +444-555-6666 </a>
                                </li>
                                <li>
                                    <a href="mailto:info@legalspiel.com">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="19" >
                                            <path d="M0.836426 3.72607C0.836426 2.93042 1.1525 2.16736 1.71511 1.60475C2.27771 1.04214 3.04078 0.726074 3.83643 0.726074H21.8364C22.6321 0.726074 23.3951 1.04214 23.9577 1.60475C24.5204 2.16736 24.8364 2.93042 24.8364 3.72607V15.7261C24.8364 16.5217 24.5204 17.2848 23.9577 17.8474C23.3951 18.41 22.6321 18.7261 21.8364 18.7261H3.83643C3.04078 18.7261 2.27771 18.41 1.71511 17.8474C1.1525 17.2848 0.836426 16.5217 0.836426 15.7261V3.72607ZM3.83643 2.22607C3.4386 2.22607 3.05707 2.38411 2.77577 2.66541C2.49446 2.94672 2.33643 3.32825 2.33643 3.72607V4.05157L12.8364 10.3516L23.3364 4.05157V3.72607C23.3364 3.32825 23.1784 2.94672 22.8971 2.66541C22.6158 2.38411 22.2343 2.22607 21.8364 2.22607H3.83643ZM23.3364 5.80057L16.2744 10.0381L23.3364 14.3836V5.80057ZM23.2854 16.1146L14.8254 10.9081L12.8364 12.1006L10.8474 10.9081L2.38743 16.1131C2.47266 16.4323 2.6609 16.7144 2.92291 16.9156C3.18492 17.1169 3.50604 17.226 3.83643 17.2261H21.8364C22.1666 17.2261 22.4876 17.1172 22.7496 16.9162C23.0116 16.7153 23.1999 16.4335 23.2854 16.1146ZM2.33643 14.3836L9.39843 10.0381L2.33643 5.80057V14.3836Z" fill="white" />
                                        </svg>
                                        <span >info@legalspiel.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>     
                    
            </div>
            <p className="footer-bottom-para">Copyright © 2025 Legal Spiel</p>
        </div>
    </div>     
    </footer>
  )
}
