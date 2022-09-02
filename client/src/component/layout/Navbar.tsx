import React, { useRef, useLayoutEffect } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
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
    {
        title: 'Log In',
        to: '/login-form'
    },
    {
        title: 'Most Active',
        to: '/most-active-symbols'
    },
]

const Navbar = () => {

    return (
        <div className='overflow-hidden'>
            <div className='fixed z-10'>
                <div className='w-screen bg-[#d07920] px-[10%] py-3 font-["Poppins", Sans-serif] flex items-center text-white'>
                    <div className="grow font-medium flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                        </svg>
                        <p className='pl-2'>Apply coupon AUG10 during checkout</p>
                    </div>
                    <div className="flex-none font-['Poppins', Sans-serif]">
                        Use AUG10 coupon for 10% off
                    </div>
                    <div className='flex-none pl-5 font-medium flex'>
                        $0.00 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </div>
                </div>
                <div className='w-screen bg-[#010066] px-[10%] font-["Poppins", Sans-serif] flex items-center text-white'>
                    <div className="grow font-medium">
                        <img src='https://s2n6y7u3.rocketcdn.me/wp-content/uploads/2022/07/HistoricalOptionData-with-rays1.png' width={350} alt='Historical Option Data Logo' />
                    </div>
                    <div className="flex-none font-['Poppins', Sans-serif] font-bold">
                        {
                            navLinks.map((link) =>
                                <NavLink
                                    key={link.title}
                                    to={link.to}
                                    className={({isActive}) => 
                                        `mx-2 transition-all duration-300 ${isActive ? 'text-[#d07920]' : 'hover:text-[#d07920]'}`
                                    }
                                >
                                    {link.title}
                                </NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className='w-screen bg-[#d07920] px-[10%] py-3 font-["Poppins", Sans-serif] flex items-center text-white'>
                    <div className="grow font-medium flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                        </svg>
                        <p className='pl-2'>Apply coupon AUG10 during checkout</p>
                    </div>
                    <div className="flex-none font-['Poppins', Sans-serif]">
                        Use AUG10 coupon for 10% off
                    </div>
                    <div className='flex-none pl-5 font-medium flex'>
                        $0.00 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </div>
                </div>
                <div className='w-screen bg-[#010066] px-[10%] font-["Poppins", Sans-serif] flex items-center text-white'>
                    <div className="grow font-medium">
                        <img src='https://s2n6y7u3.rocketcdn.me/wp-content/uploads/2022/07/HistoricalOptionData-with-rays1.png' width={350} alt='Historical Option Data Logo' />
                    </div>
                    <div className="flex-none font-['Poppins', Sans-serif] font-bold">
                        {
                            navLinks.map((link) =>
                                <NavLink
                                    key={link.title}
                                    to={link.to}
                                    className={({isActive}) => 
                                        `mx-2 transition-all duration-300 ${isActive ? 'text-[#d07920]' : 'hover:text-[#d07920]'}`
                                    }
                                >
                                    {link.title}
                                </NavLink>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar