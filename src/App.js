import { BrowserRouter, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

import RequireAuth from './requireauth';
import RequireAuthLogin from './requireauthlogin';

import Home from './pages/home';
import Events from './pages/events';
import Courses from './pages/courses';
import Login from './pages/loginpage';
import Signup from './pages/signuppage';
import ResetPassword from './pages/resetpassword';
import Postjob from './pages/jobrelated/postjob';
import Postedjob from './pages/jobrelated/postedjob';
import Profile from './pages/profile';
import JobDescription from './pages/jobrelated/jobdescription';
import ForgotPassword from './pages/forgotpasswordpage'
import Appliedjobs from './pages/jobrelated/appliedjobs';
import Appliedsuccessfully from './pages/jobrelated/appliedsuccessfully';
import Notfound from './pages/notfound';
import Applyjob from './pages/jobrelated/applyjob';
import UpdateJob from './pages/jobrelated/updatejob';
import Tempnavbar from './components/tempnavbar';
import TopCategory from './pages/jobrelated/topcategory'
import Scrolltotop from './Scrolltotop';
import TempPage from './pages/temppage'

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
          <Route path='/temp' element={<TempPage/>}/>

        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
