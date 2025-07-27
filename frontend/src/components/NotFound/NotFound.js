import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundImg from '../../images/notfound.png';

export const NotFound=()=>{
    return(
        <section className='page notfound'>
            <div className='content'>
                <img src={NotFoundImg} alt="notfound"/>
                <Link to={"/"}>RETURN TO HOME</Link>
            </div>
        </section>
    )
}