import React from 'react'
import '../css/style.css'
import { Link } from 'react-router'

export default function Notfound() {
  return (
    <div>
       <div className="not-found-container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-4 text-light">404 | NOT FOUND</h1>
      <p className="text-light mt-3">UH OH! You're lost.</p>
      <p className="text-light text-center">
        The page you are looking for does not exist, <br />
        but you can click the button below to go back to the homepage.
      </p>
      <Link to="/" className="btn btn-primary mt-4">
        Go Back to Homepage
      </Link>
    </div>
    </div>
  )
}
