import { BrowserRouter, Route, Routes } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

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

function App() {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/jobs' element={<Home/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/forgotpassword'element={<ForgotPassword/>}/>
          <Route path='/resetpassword' element={<ResetPassword/>}/>
          <Route path='/post-job' element={<Postjob/>}/>
          <Route path='/posted-job' element={<Postedjob/>}/>
          <Route path='/applied-jobs' element={<Appliedjobs/>}/>
          <Route path='/applied-successfully' element={<Appliedsuccessfully/>}/>
          <Route path='/jobs/:jobID' element={<JobDescription/>}/>
          <Route path='/jobs/apply/:jobID' element={<Applyjob/>}/>
          <Route path='*' element={<Notfound/>}/>
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
