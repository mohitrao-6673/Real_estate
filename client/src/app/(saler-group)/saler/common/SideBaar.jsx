"use client"

import React, { useState } from 'react'
import { RiMenuFold3Fill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import Link from 'next/link';
import { IoMdChatbubbles } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineSupport } from "react-icons/hi";
import { FaChevronRight } from "react-icons/fa";
import { SiTarget } from "react-icons/si";
import { FaHouseDamage } from "react-icons/fa";




export default function SideBaar({ setDashboardSideBaar }) {


    let sideNavBaar = [
        {
            title: 'Dashboard',
            icon: MdDashboard,
            path: '/saler/pages/dashboard'
        },
        {
            title: 'Inquiry',
            icon: IoMdChatbubbles,
            path: '/saler/pages/inquiry'
        },
        {
            title: 'Message',
            icon: MdMessage,
            path: '/saler/pages/message'
        },
        {
            title: 'Profile',
            icon: CgProfile,
            path: '/saler/pages/profile'
        },
        {
            title: 'Support',
            icon: HiOutlineSupport,
            path: '/saler/pages/support'
        }
    ]

    let [viewModule, setViewModule] = useState(-1)
    return (
        <aside className=' flex flex-col gap-5 w-[100%] text-black
       
        ' suppressHydrationWarning >


            <header className='flex bg-gradient-to-r from-[#392BFB] to-[#0F056E] items-center justify-between px-2 sticky top-0 shadow-2xl ' >

                {/* logo */}
                <div className=' text-[25px] text-white font-semibold py-2 ' >
                    <Link href={'/'}  >
                        Real_Estate
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

            </div>


        </aside>
    )
}



function OwnProperty({ viewModule, setViewModule, setDashboardSideBaar }) {
    return (

        <div className={`cursor-pointer hover:bg-white rounded-[12px] hover:text-black   duration-100 w-[100%] ${viewModule == 1 ? ' bg-white text-black ' : ''} `} >

            {/* menu */}
            <div className={`flex items-center gap-4 px-2 py-3  relative hover:text-black
                 ${viewModule == 1 ? ' text-black ' : 'text-white'}
                `} onClick={() => setViewModule(viewModule == 1 ? -1 : 1)}>
                <FaHouseDamage className='text-[22px]' />
                <span className={`text-[17px]
                   
                    `}>Own Property</span>
            </div>
            {/* sub-menu */}
            <ul className={`px-2 flex flex-col text-black  gap-2 lg:text-[15px] text-[12px] duration-300 ${viewModule == 1 ? 'max-h-[120px] visible opacity-100 py-2' : 'max-h-0 invisible opacity-0'}  `} >
                <li>
                    <Link onClick={() => setDashboardSideBaar(false)} href={'/saler/pages/own-property/add-property'} className='flex items-center gap-4  rounded-[18px] px-5 py-2 duration-100 hover:text-white hover:bg-gradient-to-r from-[#392BFB] to-[#0F056E]  ' >
                        <SiTarget className='text-[12px]' />
                        <span>Add Property</span>
                    </Link>
                </li>
                <li >
                    <Link onClick={() => setDashboardSideBaar(false)} href={'/saler/pages/own-property/view-property'} className='flex items-center gap-4 rounded-[18px] px-5 py-2 hover:text-white hover:bg-gradient-to-r from-[#392BFB] to-[#0F056E] ' >
                        <SiTarget className='text-[12px]' />
                        <span>View Property</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}