import React, { useContext } from 'react';
import { Context } from '../../index';
import { Navigate } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { PopularCategory } from './PopularCategory';
import { PopularCompany } from './PopularCompany';
import { HowItWorks } from './HowItWorks';

export const Home=()=>{
    const {isAuthorized}=useContext(Context);
    if(!isAuthorized){
        return <Navigate to={'/login'}/>
    }
    return(
        <section className='homePage page'>
            <HeroSection/>
            <HowItWorks/>
            <PopularCategory/>
            <PopularCompany/>
        </section>
    )
}