"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiMenuFold4Fill } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import react from 'react';
import { CgProfile } from "react-icons/cg";
import { logout } from '@/app/slices/userSlice';




export default function HeaderTwo() {


    //navbaar toggle manage
    let dispatcher = useDispatch()
    let [navopen, setNavopen] = useState(false)

    let [userData, setUserData] = useState(null);
    let router = useRouter()

    let user = useSelector((store) => store.userStore.loginDetails)
    //console.log(userData)


    useEffect(() => {
        return setUserData(user)
    }, []);


    let navLinks = (
        <>

            {/* if user  admin */}
            {(userData && userData.role == 'admin') && (
                <>
                    <Link href={'/'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide"></span>
                        home
                    </Link>
                    <Link href={'/pages/properties'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide "></span>
                        Properties
                    </Link>
                    <Link href={'/admin/pages/overview'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide  "></span>
                        Admin Panel
                    </Link>
                </>
            )}

            {/* if user seller */}
            {(userData && userData.role == 'seller') && (
                <>
                    <Link href={'/'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide"></span>
                        home
                    </Link>
                    <Link href={'/pages/properties'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide "></span>
                        Properties
                    </Link>
                    <Link href={'/saler/pages/dashboard'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide  "></span>
                        Dashboard
                    </Link>
                </>
            )}

            {/* if user not login */}
            {(!userData) && (
                <>
                    <Link href={'/'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide"></span>
                        home
                    </Link>
                    <Link href={'/pages/properties'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide"></span>
                        Properties
                    </Link>
                </>
            )}


            {/* for buyer */}
            {(userData && userData.role == 'buyer') && (
                <>
                    <Link href={'/'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide"></span>
                        home
                    </Link>
                    <Link href={'/pages/properties'} onClick={() => setNavopen(false)} className='nav-title ' >
                        <span className="nav-slide"></span>
                        Properties
                    </Link>
                    <Link href={'/pages/message'} onClick={() => setNavopen(false)} className='nav-title '>
                        <span className="nav-slide"></span>
                        Message
                    </Link>
                    <Link href={'/pages/contact-us'} onClick={() => setNavopen(false)} className='nav-title '>
                        <span className="nav-slide"></span>
                        Contact Us
                    </Link>
                    <Link href={'/pages/wishlist'} onClick={() => setNavopen(false)} className='nav-title '>
                        <span className="nav-slide"></span>
                        Wishlist
                    </Link>
                </>
            )}
        </>
    )


    // header-scrolling
    let [header, setHeader] = useState(false);

    let handleScroll = () => {
        let scrolled = window.scrollY;
        setHeader(scrolled >= 50);
    };

    // useEffect(() => {
    //   handleScroll();
    //   window.addEventListener("scroll", handleScroll);
    //   return () => window.removeEventListener("scroll", handleScroll);
    // }, []);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <>


            {/* header for desktop */}
            <header className={`sticky top-0 w-full z-2 md:block hidden px-4  py-2 duration-300
        bg-[#0F056E]`} >
                <div className=' max-w-[1320px] mx-auto flex justify-between items-center  text-white ' >

                    {/* logo */}
                    <div className=' ' >
                       Real_Estate
                    </div>



                    {/* navigation */}
                    <div className='  '  >
                        <div className={'flex sm:flex-row flex-col md:gap-5 gap-2 sm:items-center '} >
                            {navLinks}
                        </div>
                    </div>

                    {/* login & logout profile */}
                    <div className='flex items-center gap-3 ' >
                        {
                            userData
                                ?
                                <>
                                    <Link href='/pages/profile' className='text-[25px] ' >
                                        <CgProfile />
                                    </Link>
                                    <button onClick={() => {
                                        window.location.href = '/';
                                        dispatcher(logout())
                                        setNavopen(false)
                                    }} className='nav-title cursor-pointer ' >
                                        <span className="nav-slide"></span>
                                        Logout
                                    </button>
                                </>
                                :
                                <Link href='/pages/auth' className='nav-title  ' >
                                    <span className="nav-slide"></span>
                                    Login
                                </Link>
                        }
                    </div>
                </div>
            </header>




            {/* header for mobile & tab */}
            <header className={`sticky top-0 w-full z-2 md:hidden block px-4 py-4  bg-[#0F056E] `}  >
                <div className='text-white flex items-center justify-between ' >

                    {/* Logo & menu icon */}
                    <div className='flex items-center gap-3   ' >
                        <RiMenuFold4Fill className='text-[20px] ' onClick={() => setNavopen(true)} />
                        <span>
                           Real_Estate
                        </span>
                    </div>


                    {/* login & logout */}
                    <ul className='flex items-center gap-2 ' >
                        {
                            userData
                                ?
                                <>
                                    <li className=' ' >
                                        <Link href='/pages/profile' className='text-[25px] ' >
                                            <CgProfile />
                                        </Link>
                                    </li>
                                </>
                                :
                                <li>
                                    <Link href='/profile' >
                                        Login
                                    </Link>
                                </li>
                        }
                    </ul>

                </div>




                {/* navbaar toggle slide */}
                <div className={`fixed top-0 bg-white w-[90%] bg-gradient-to-r p-4 from-[#392BFB] to-[#0F056E]  h-screen duration-400 text-black
           ${navopen ? 'left-0' : 'left-[-100%]'} 
          `} >
                    <aside className=' flex flex-col gap-2 w-[100%] text-black
       
        ' suppressHydrationWarning >

                        <header className='flex  items-center justify-between sticky top-0 shadow-2xl pb-2   ' >

                            {/* logo */}
                            <div className=' text-[25px] text-white font-semibold ' >
                                <Link href={'/'}  >
                                   Real_Estate
                                </Link>
                            </div>
                            {/* dahsboard-navbaar close icon */}
                            <RiMenuFold3Fill className='text-[26px] md:hidden block text-white font-bold ' suppressHydrationWarning
                                onClick={() => setNavopen(false)} />

                        </header>



                        {/* navigation */}
                        <div className=' '  >
                            <div className={'flex flex-col md:gap-5 gap-2 text-white '} >
                                {navLinks}
                            </div>
                        </div>

                        {
                            userData
                                ?
                                <>
                                    <button onClick={() => {
                                        window.location.href = '/';
                                        dispatcher(logout())
                                        setNavopen(false)
                                    }} className='p-2 rounded-[12px] font-semibold bg-indigo-100  ' >
                                        Logout
                                    </button>
                                </>
                                :
                                ''
                        }

                    </aside>

                </div>

            </header>

        </>
    )
}
