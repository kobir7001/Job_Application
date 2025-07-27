import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
export const Application=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [resume_link,setResume_link]=useState("");

    const {isAuthorized,user}=useContext(Context);
    const navigateTo=useNavigate();

    const {id}=useParams();

    const handleApplication=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post(`${window.location.origin}/api/v1/application/post`,{name,email,phone,address,resume_link,jobId:id},{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
            setName("");
            setEmail("");
            setPhone("");
            setAddress("");
            setResume_link("");
            toast.success(data.message);
            navigateTo("/job/getall");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }

    if(!isAuthorized || (user && user.role==="Employeer")){
        navigateTo("/");
    }
    return(
        <>
          <section className='application'>
            <div className='container'>
                <h3>Application Form</h3>
                <form onSubmit={handleApplication}>
                    <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="number" placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                    <input type="text" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    <input type="text" placeholder='Resume Drive Link' value={resume_link} onChange={(e)=>setResume_link(e.target.value)}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
          </section>
        </>
    )
}