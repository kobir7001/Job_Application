import React from 'react';
import { FaUserPlus } from 'react-icons/fa';
import { MdFindInPage } from 'react-icons/md';
import { IoMdSend } from 'react-icons/io';

export const HowItWorks=()=>{
    return(
        <div className='howitworks'>
            <div className='container'>
                <h3>How GetJob Works</h3>
                <div className='banner'>
                    <div className='card'>
                        <FaUserPlus/>
                        <p>Create Account</p>
                        <p>Welcome to JobConnect, your ultimate job-finding app. Discover tailored job opportunities, connect with top employers, and streamline your job search process. Our user-friendly interface and smart algorithms ensure you find the perfect match quickly. Join JobConnect today and take the next step in your career journey!</p>
                    </div>
                    <div className='card'>
                        <MdFindInPage/>
                        <p>Find a Job/Post a Job</p>
                        <p>Welcome to JobConnect, your ultimate job-finding app. Discover tailored job opportunities, connect with top employers, and streamline your job search process. Our user-friendly interface and smart algorithms ensure you find the perfect match quickly. Join JobConnect today and take the next step in your career journey!</p>
                    </div>
                    <div className='card'>
                        <IoMdSend/>
                        <p>Apply for the Job</p>
                        <p>Welcome to JobConnect, your ultimate job-finding app. Discover tailored job opportunities, connect with top employers, and streamline your job search process. Our user-friendly interface and smart algorithms ensure you find the perfect match quickly. Join JobConnect today and take the next step in your career journey!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}