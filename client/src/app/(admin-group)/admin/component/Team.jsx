"use client"

import React, { useState } from 'react'
import { SiTarget } from "react-icons/si";
import Link from 'next/link';
import { MdGroupAdd } from "react-icons/md";




export default function Team({ viewModule, setViewModule,setDashboardSideBaar }) {

    return (

        <div className={`cursor-pointer hover:bg-white hover:text-black rounded-[12px] text-white   duration-100 w-[100%] ${viewModule == 2 ? ' bg-white text-black ' : ''} `} >


            {/* menu */}
            <div className={`flex items-center gap-4 px-2 py-3 relative hover:text-black
                 ${viewModule == 2 ? ' text-black ' : 'text-white'}
                `} onClick={() => setViewModule(viewModule == 2 ? -1 : 2)}>
                <MdGroupAdd className='text-[22px]' />
                <span className='text-[17px]'>Team</span>
            </div>


            {/* sub-menu */}
            <ul className={`px-2 flex flex-col text-black gap-2 lg:text-[15px] text-[12px] duration-300 ${viewModule == 2 ? 'max-h-[120px] visible opacity-100 py-2' : 'max-h-0 invisible opacity-0'}  `} >
                <li>
                    <Link onClick={() => setDashboardSideBaar(false)} href={'/admin/pages/team/add-team'} className='flex items-center gap-4  rounded-[18px] px-5 py-2 hover:text-white hover:bg-gradient-to-r from-[#392BFB] to-[#0F056E]   ' >
                        <SiTarget className='text-[12px]' />
                        <span>Add Team</span>
                    </Link>
                </li>
                <li >
                    <Link onClick={() => setDashboardSideBaar(false)} href={'/admin/pages/team/view-team'} className='flex items-center gap-4 rounded-[18px] px-5 py-2 hover:text-white hover:bg-gradient-to-r from-[#392BFB] to-[#0F056E] ' >
                        <SiTarget className='text-[12px]' />
                        <span>View Team</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
