import React, { useContext, useState } from 'react';
import { Context } from '../../index';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link,Navigate} from 'react-router-dom';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import {MdOutlineMailOutline} from 'react-icons/md';
import {FaPhoneFlip} from 'react-icons/fa6';
import { RiLock2Fill } from 'react-icons/ri';
import RegImg from '../../images/image_register.png';


export const Register=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [name,setName]=useState("");
    const [role,setRole]=useState("");

    const {isAuthorized,setIsAuthorized}=useContext(Context);
    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            const {data}=await axios.post(`${window.location.origin}/api/v1/user/register`,{name,email,password,phone,role},{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
            toast.success(data.message);
            setName("");
            setEmail("");
            setPassword("");
            setPhone("");
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
                    {/*<img src='/image_register.png' alt="logo"/> */}
                    <h3>CREATE NEW ACCOUNT</h3>
                </div>
                <form>
                    <div className='inputTag'>
                        <label>Register As</label>
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
                        <label>Name</label>
                        <div>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'/>
                            <FaPencilAlt/>
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Email</label>
                        <div>
                            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'/>
                            <MdOutlineMailOutline/>
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Phone Number</label>
                        <div>
                            <input type="number" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder='Phone'/>
                            <FaPhoneFlip/>
                        </div>
                    </div>
                    <div className='inputTag'>
                        <label>Password</label>
                        <div>
                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'/>
                            <RiLock2Fill/>
                        </div>
                    </div>
                    <button onClick={handleRegister} type="submit">Register</button>
                    <Link to={"/login"}>Login Now</Link>
                </form>
            </div>
            <div className='banner'>
                <img src={RegImg} alt='register'/>
            </div>
           </div>
        </div>
    )
}