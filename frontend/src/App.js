import React, { useContext, useEffect } from 'react';
import './App.css';
import {Toaster} from 'react-hot-toast';
import axios from 'axios';
import {Context} from './index';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Home } from './components/Home/Home';
import { Jobs } from './components/Job/Jobs';
import { JobDetails } from './components/Job/JobDetails';
import { Application } from './components/Application/Application';
import { MyApplication } from './components/Application/MyApplication';
import { PostJob } from './components/Job/PostJob';
import { MyJobs } from './components/Job/MyJobs';
import { NotFound } from './components/NotFound/NotFound';
import { Navbar } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';

function App() {
  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context);

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const response=await axios.get(`${window.location.origin}/api/v1/user/getuser`,{withCredentials:true});
        setUser(response.data.user);
        setIsAuthorized(true);
      }
      catch(error){
        setIsAuthorized(false);
      }
    }
    fetchUser();
  },[isAuthorized]);



  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/job/getall" element={<Jobs/>}/>
          <Route path="/job/:id" element={<JobDetails/>}/>
          <Route path="/job/post" element={<PostJob/>}/>
          <Route path="/job/me" element={<MyJobs/>}/>
          <Route path="/application/:id" element={<Application/>}/>
          <Route path="/application/me" element={<MyApplication/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
        <Toaster/>
      </Router>
    </>
  );
}

export default App;
