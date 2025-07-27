import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link,Navigate} from 'react-router-dom';
import {FaRegUser } from 'react-icons/fa';
import {MdOutlineMailOutline} from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import LoginImg from '../../images/favicon.png';


export const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("");

    const {isAuthorized,setIsAuthorized}=useContext(Context);
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post(`${window.location.origin}/api/v1/user/login`,{email,password,role},{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
            toast.success(data.message);
            setEmail("");
            setPassword("");
            setRole("");
            setIsAuthorized(true);
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    }
    if(isAuthorized){
        return <Navigate to={'/'}/>
    }
    return(
        <div className='reg'>
           <div className='authPage auth'>
            <div className='container log'>
                <div className='header'>
                    {/* <img src="./favicon.png" alt="logo"/> */}
                    <h3>LOGIN TO YOUR ACCOUNT</h3>
                </div>
                <form>
                    <div className='inputTag'>
                        <label>Login As</label>
                        <div>
                            <select value={role} onChange={(e)=>setRole(e.target.value)}>
                                <option value="">Select Role</option>
                                <option value="Employeer">Employeer</option>
                                <option value="Job Seeker">Job Seeker</option>
                            </select>
                            <FaRegUser/>
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Email</label>
                        <div>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email'/>
                            <MdOutlineMailOutline/>
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Password</label>
                        <div>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/>
                            <RiLock2Fill/>
                        </div>
                    </div>
                    <button onClick={handleLogin} type="submit">Login</button>
                    <Link to={"/register"}>Register Now</Link>
                </form>
            </div>
            <div className='banner'>
                <img src={LoginImg} alt='login'/>
            </div>
           </div>
        </div>
    )
}