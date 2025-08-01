import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../index';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Jobs=()=>{
    const [jobs,setJobs]=useState([]);
    const {isAuthorized}=useContext(Context);
    const navigateTo=useNavigate();

    useEffect(()=>{
        try{
            axios.get(`${window.location.origin}/api/v1/job/getall`,{withCredentials:true})
            .then((res)=>{
                setJobs(res.data);
            })
        }
        catch(error){
            console.log(error);
        }
    },[])

    if(!isAuthorized){
        navigateTo("/login");
    }
    return(
        <>
          <section className='jobs page'>
            <div className='container'>
                <h1>ALL AVAILABLE JOBS</h1>
                <div className='banner'>
                    {
                        jobs.jobs && jobs.jobs.map((element)=>{
                            return(
                                <div className='card' key={element._id}>
                                    <p>{element.title}</p>
                                    <p>{element.category}</p>
                                    <p>{element.country}</p>
                                    <Link to={`/job/${element._id}`}>Job Details</Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
          </section>
        </>
    )
}