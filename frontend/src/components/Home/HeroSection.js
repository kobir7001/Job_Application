import React from 'react';
import {FaSuitcase,FaBuilding,FaUsers,FaUserPlus} from 'react-icons/fa';
import HeroImg from '../../images/heroS.jpg';

export const HeroSection=()=>{
    const details = [
        {
          id: 1,
          title: "1,23,441",
          subTitle: "Live Job",
          icon: <FaSuitcase />,
        },
        {
          id: 2,
          title: "91220",
          subTitle: "Companies",
          icon: <FaBuilding />,
        },
        {
          id: 3,
          title: "2,34,200",
          subTitle: "Job Seekers",
          icon: <FaUsers />,
        },
        {
          id: 4,
          title: "1,03,761",
          subTitle: "Employers",
          icon: <FaUserPlus />,
        },
    ];
    
    return(
        <div className='heroSection'>
            <div className='container'>
                <div className='title'>
                    <h1>Find a job that suits</h1>
                    <h1>your interest and skills</h1>
                    <p>Effortlessly locate lost items with our FOB Finding App – a smart solution designed to track and recover your valuables with precision and ease, ensuring you never lose sight again.</p>
                </div>
                <div className='image'>
                    <img src={HeroImg} alt='heros'/>
                </div>
            </div>
            <div className='details'>
                {
                    details.map(element=>{
                        return(
                            <div className='card' key={element.id}>
                                <div className='icon'>{element.icon}</div>
                                <div className='content'>
                                    <p>{element.title}</p>
                                    <p>{element.subTitle}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
