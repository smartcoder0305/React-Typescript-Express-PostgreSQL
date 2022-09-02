import React from 'react'
import { NavLink } from 'react-router-dom'

const usefulLinks = [
    {
        title: 'Home',
        to: '/'
    },
    {
        title: 'Data Structure',
        to: '/data-structure'
    },
    {
        title: 'Prices',
        to: '/shop'
    },
    {
        title: 'Free Data',
        to: '/free-data'
    },
]

const Footer = () => {
    return (
        <>
            <div className='py-20 md:px-[20%] px-4 bg-[#1C3147] flex md:flex-row md:items-center flex-col items-start'>
                <div>
                    <img src='https://s2n6y7u3.rocketcdn.me/wp-content/uploads/2022/07/HistoricalOptionData-with-rays1.png' alt='Historical Option Data Logo' className='mr-10 md:w-[287px] w-[450px]' />
                </div>
                <div className='flex flex-col font-["Poppins", Sans-serif] text-white'>
                    <p className='my-3 text-lg font-bold'>Useful Links</p>
                    <div className='mx-2 flex flex-col'>
                    {
                        usefulLinks.map((link) => 
                            <NavLink
                                key={link.title}
                                to={link.to}
                                className='py-1'
                            >
                                {link.title}
                            </NavLink>
                        )
                    }
                    </div>
                </div>
            </div>
            <div className='md:px-[20%] px-4 py-4 bg-[#d07920] text-white font-medium'>
                Copyright © 2022 historical option Data | Powered by DeltaNeutral.com
            </div>
        </>
    )
}

export default Footer