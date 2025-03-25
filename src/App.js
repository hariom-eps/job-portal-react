import { BrowserRouter, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Toaster } from 'react-hot-toast';

import RequireAuth from './requireauth';
import RequireAuthLogin from './requireauthlogin';

import Home from './pages/homePage';
import Login from './pages/loginPage';
import Signup from './pages/signupPage';
import ResetPassword from './pages/resetPasswordPage';
import Postjob from './pages/jobRelatedPages/postAJobPage';
import Postedjob from './pages/jobRelatedPages/jobsPostedPage';
import Profile from './pages/profilePage';
import JobDescription from './pages/jobRelatedPages/jobDescriptionPage';
import ForgotPassword from './pages/forgotPasswordPage'
import Appliedjobs from './pages/jobRelatedPages/jobsAppliedPage';
import Appliedsuccessfully from './pages/jobRelatedPages/appliedSuccessfullyPage';
import Notfound from './pages/notFoundPage';
import Applyjob from './pages/jobRelatedPages/jobApplyPage';
import UpdateJob from './pages/jobRelatedPages/jobUpdatePage';
import TopCategory from './pages/jobRelatedPages/jobTopCategory'
import Scrolltotop from './Scrolltotop';

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
       <BrowserRouter>
       <Scrolltotop/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/jobs' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path='/forgotpassword'element={<ForgotPassword/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path='/post-job' element={<RequireAuth><Postjob/></RequireAuth>}/>
          <Route path='/posted-job' element={<RequireAuth><Postedjob/></RequireAuth>}/>
          <Route path='/applied-jobs' element={<RequireAuth><Appliedjobs/></RequireAuth>}/>
          <Route path='/applied-successfully' element={<RequireAuth><Appliedsuccessfully/></RequireAuth>}/>
          <Route path='/jobs/:jobID' element={<JobDescription/>}/>
          <Route path='/jobs/apply/:jobID' element={<RequireAuthLogin><Applyjob/></RequireAuthLogin>}/>
          <Route path='/post-job/:jobID/update' element={<RequireAuth><UpdateJob/></RequireAuth>}/>
          <Route path='/jobs/top-categories/:categoryID' element={<TopCategory/>}/>

          <Route path='*' element={<Notfound/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
