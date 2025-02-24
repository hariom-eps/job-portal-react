import React from 'react'
import { Link , useLocation} from 'react-router'

export default function Jobheader() {
    const location=useLocation();
  return (
    <div>
      <div className="related-link-tabs-main-div mt-1">
            <Link to="/post-job" className={location.pathname==='/post-job'?'active':''}>Add New Job</Link>
            <Link to="/posted-job" className={location.pathname==='/posted-job'?'active':''}>Job Posted</Link>
            <Link to="/applied-jobs" className={location.pathname==='/applied-jobs'?'active':''}>Jobs Applied</Link>
          </div>
    </div>
  )
}
