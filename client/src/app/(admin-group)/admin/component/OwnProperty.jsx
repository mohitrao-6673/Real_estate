"use client"

import React, { useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { SiTarget } from "react-icons/si";
import Link from 'next/link';
import { FaHouseDamage } from "react-icons/fa";

export default function OwnProperty({ viewModule, setViewModule ,setDashboardSideBaar}) {

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
                    <Link onClick={() => setDashboardSideBaar(false)} href={'/admin/pages/own-property/add-property'} className='flex items-center gap-4  rounded-[18px] px-5 py-2 duration-100 hover:text-white hover:bg-gradient-to-r from-[#392BFB] to-[#0F056E]  ' >
                        <SiTarget className='text-[12px]' />
                        <span>Add Property</span>
                    </Link>
                </li>
                <li >
                    <Link onClick={() => setDashboardSideBaar(false)} href={'/admin/pages/own-property/view-property'} className='flex items-center gap-4 rounded-[18px] px-5 py-2 hover:text-white hover:bg-gradient-to-r from-[#392BFB] to-[#0F056E] ' >
                        <SiTarget className='text-[12px]' />
                        <span>View Property</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
