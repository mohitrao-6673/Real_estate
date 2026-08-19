"use client"

import React, { useEffect, useState } from 'react'
import Team from '../component/Team'
import { RiMenuFold3Fill } from "react-icons/ri";
import OwnProperty from '../component/OwnProperty';
import { MdDashboard } from "react-icons/md";
import Link from 'next/link';
import { PiGitPullRequestBold } from "react-icons/pi";
import { IoMdChatbubbles } from "react-icons/io";
import { FaUser } from "react-icons/fa";




export default function SideBaar({ setDashboardSideBaar }) {


    let sideNavBaar = [
        {
            title: 'Overview',
            icon: MdDashboard,
            path: '/admin/pages/overview'
        },
        {
            title: 'Seller Request',
            icon: PiGitPullRequestBold,
            path: '/admin/pages/seller-request'
        },
        {
            title: 'Contact',
            icon: IoMdChatbubbles,
            path: '/admin/pages/contact'
        },
        {
            title: 'User',
            icon: FaUser,
            path: '/admin/pages/user'
        },
    ]

    let [viewModule, setViewModule] = useState(-1)
    return (
        <aside className=' flex flex-col gap-5 w-[100%] text-black
       
        ' suppressHydrationWarning >


            <header className='flex bg-gradient-to-r from-[#392BFB] to-[#0F056E] items-center justify-between px-2 sticky top-0 shadow-2xl ' >

                {/* logo */}
                <div className=' text-[25px] text-white font-semibold py-2 ' >
                    <Link href={'/'}  >
                        Luxury_Yard
                    </Link>
                </div>
                {/* dahsboard-navbaar close icon */}
                <RiMenuFold3Fill className='text-[26px] md:hidden block text-white font-bold ' suppressHydrationWarning
                    onClick={() => setDashboardSideBaar(false)} />

            </header>





            {/* sidebaar navigation */}
            <div className=' mt-4 flex flex-col gap-3 ' >


                {
                    sideNavBaar.map((items, index) => {

                        return (
                            <div onClick={() => setViewModule(-1)} key={index} className={`cursor-pointer hover:bg-white rounded-[12px] hover:text-black   duration-100 w-[100%] text-white `} >


                                {/* menu */}
                                <Link href={`${items.path}`} className={`flex items-center gap-4 px-2 py-3  relative hover:text-black
                        
                        `} onClick={() => setDashboardSideBaar(false)}>

                                    <items.icon className='text-[22px]' />
                                    <span className={`text-[17px]`}> {items.title} </span>

                                </Link>

                            </div>
                        )

                    })
                }




                <OwnProperty viewModule={viewModule} setViewModule={setViewModule} setDashboardSideBaar={setDashboardSideBaar} />
                <Team viewModule={viewModule} setViewModule={setViewModule} setDashboardSideBaar={setDashboardSideBaar} />
            </div>


        </aside>
    )
}

