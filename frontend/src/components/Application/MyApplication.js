import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export const MyApplication=()=>{
    const [applications,setApplications]=useState([]);
    const {user,isAuthorized}=useContext(Context);

    const navigateTo=useNavigate();
    useEffect(()=>{
        try{
            if(user && user.role==="Employeer"){
                axios.get(`${window.location.origin}/api/v1/application/employeer/getall`,{withCredentials:true})
                .then((res)=>{
                    setApplications(res.data.applications);
                })
            }
            else{
                axios.get(`${window.location.origin}/api/v1/application/jobseeker/getall`,{withCredentials:true})
                .then((res)=>{
                    setApplications(res.data.applications);
                })
            }
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    },[isAuthorized])

    if(!isAuthorized){
        navigateTo("/login");
    }

    return(
        <>
          <section className='my_applications page'>
            {
                user && user.role==="Job Seeker" ? (
                    <div className='container'>
                        <div className='mp_app_h3'>
                           <h3>MY APPLICATIONS</h3>
                        </div>
                        {applications.length<=0 ?
                        (
                            <>
                              {" "}
                              <h4>No Application Found</h4>{" "}
                            </>
                        ):(
                            applications && applications.map((element)=>{
                                return (
                                    <div className='job_seeker_card'>
                                       <div className='detail'>
                                         <p>
                                            <span>Job:</span>
                                            {element.address}
                                         </p>
                                         <p>
                                            <span>Name:</span>
                                            {element.name}
                                         </p>
                                         <p>
                                            <span>Email:</span>
                                            {element.email}
                                         </p>
                                         <p>
                                            <span>Phone:</span>
                                            {element.phone}
                                         </p>
                                         <p>
                                            <span>Resume Link:</span>
                                            {element.resume_link}
                                         </p>
                                        </div>
                                    </div>
                                )
                            })
                        )
                        }
                    </div>
                ):(
                    <div className='container'>
                        <div className='mp_app_h3'>
                            <h3>APPLICATION FROM APPLICANTS</h3>
                        </div>
                        {
                            
                            applications.length<=0?(
                                <>
                                  {" "}
                                  <h4>No Application Found</h4>{" "}
                                </>
                            ):(
                            applications && applications.map((element)=>{
                                return (
                                    <div className='job_seeker_card'>
                                       <div className='detail'>
                                         <p>
                                            <span>Job:</span>
                                            {element.address}
                                         </p>
                                         <p>
                                            <span>Name:</span>
                                            {element.name}
                                         </p>
                                         <p>
                                            <span>Email:</span>
                                            {element.email}
                                         </p>
                                         <p>
                                            <span>Phone:</span>
                                            {element.phone}
                                         </p>
                                         <p>
                                            <span>Resume Link:</span>
                                            {element.resume_link}
                                         </p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )
            }
          </section>
        </>
    )
}

