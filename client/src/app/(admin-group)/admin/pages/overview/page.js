"use client"

import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { TbLayoutNavbarInactive } from "react-icons/tb";
import { FaCheckToSlot } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function overview() {

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.userStore.token)
    let [stats, setStats] = useState({
        totalProperties: 0,
        totalUsers: 0,
        activeListing: 0,
        soldProperties: 0
    })

    let getAllStats = () => {
        axios.get(`${apiBaseUrl}admin/dashboard/view-stats`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                setStats(finalRes.stats)
               // console.log(finalRes.stats)
            })
    }
    useEffect(() => {
        getAllStats()
    }, [token])

    let stateCard = [
        {
            title: 'Total Users',
            icon: FaUsers,
            count: stats.totalUsers || 0,
            color: '#0000FF ',
            bg: '#ccfbf1 '
        },
        {
            title: 'Total Properties',
            icon: FaHome,
            count: stats.totalProperties || 0,
            color: '#BA8E23  ',
            bg: '#fef3c7 '
        },
        {
            title: 'Active Listing',
            icon: TbLayoutNavbarInactive,
            count: stats.activeListing || 0,
            color: '#00008B ',
            bg: '#dbeafe '
        },
        {
            title: 'Sold Properties',
            icon: FaCheckToSlot,
            count: stats.soldProperties || 0,
            color: '#008000 ',
            bg: '#dcfce7 '
        },
    ]


    return (
        <section className='flex flex-col gap-4  lg:px-6 px-4  gap-5  ' >
            {/* Team -header */}
            <header className='px-2 text-black sticky top-[52px] md:top-[0px] bg-indigo-50 py-4 ' >

                <div className='  flex flex-col  ' >
                    <h2 className='text-[25px] font-semibold ' >
                        Admin Overview
                    </h2>
                    <p className='text-gray-600 ' >
                        Here's Toady Summary
                    </p>
                </div>

            </header>



            <div className='  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ' >

                {
                    stateCard.map((stateCard, index) => {
                        return (
                            <StateCard key={index} stateCard={stateCard} />
                        )
                    })
                }


            </div>




            <div className=' grid md:grid-cols-2 grid-cols-1 gap-5  ' >

                <div className='border flex flex-col p-4 rounded-xl border-indigo-600 gap-4  ' >
                    <h1 className=' text-[18px] font-semibold ' >
                        System Health
                    </h1>

                    <div className='flex flex-col gap-3 ' >

                        <div className=' flex items-center justify-between ' >
                            <span className=' font-semibold ' >
                                Database
                            </span>
                            <div className='text-green-700 font-semibold flex items-center gap-2 ' >
                                <FaCircle className='text-[11px] ' />
                                <span className='  ' >
                                    Online
                                </span>
                            </div>
                        </div>
                        <div className=' flex items-center justify-between ' >
                            <span className=' font-semibold ' >
                                Database
                            </span>
                            <div className='text-green-700 font-semibold flex items-center gap-2 ' >
                                <FaCircle className='text-[11px] ' />
                                <span className='  ' >
                                    Online
                                </span>
                            </div>
                        </div>
                        <div className=' flex items-center justify-between ' >
                            <span className=' font-semibold ' >
                                Database
                            </span>
                            <div className='text-green-700 font-semibold flex items-center gap-2 ' >
                                <FaCircle className='text-[11px] ' />
                                <span className='  ' >
                                    Online
                                </span>
                            </div>
                        </div>
                        <div className=' flex items-center justify-between ' >
                            <span className=' font-semibold ' >
                                Database
                            </span>
                            <div className='text-green-700 font-semibold flex items-center gap-2 ' >
                                <FaCircle className='text-[11px] ' />
                                <span className='  ' >
                                    Online
                                </span>
                            </div>
                        </div>

                    </div>
                </div>


                <div className=' flex flex-col p-4 rounded-xl bg-gradient-to-r from-[#392BFB] to-[#0F056E]  gap-1 text-white  ' >
                    <h1 className=' text-[18px] font-semibold ' >
                        Admin Tools
                    </h1>
                    <p>
                        Quickly Manage Platform Resorces and Tasks
                    </p>

                    <div className='flex flex-col gap-3 mt-2 ' >

                        <div className=' p-2  bg-[#392BFB] rounded-md   ' >
                            <span className=' font-semibold ' >
                                Database
                            </span>
                        </div>
                        <div className=' p-2  bg-[#392BFB] rounded-md   ' >
                            <span className=' font-semibold ' >
                                Database
                            </span>
                        </div>


                    </div>
                </div>
            </div>




        </section>
    )
}



function StateCard({ stateCard }) {


   // console.log(stateCard)

    return (
        <div className=" bg-white rounded-xl overflow-hidden transition-shadow duration-300  px-5 border-indigo-600 py-8 text-center border ">
            <div
                style={{
                    color: stateCard.color,
                    backgroundColor: stateCard.bg
                }}
                className={`flex justify-center items-center w-14 h-14 mx-auto bg-indigo-50 rounded-full mb-4`} suppressHydrationWarning>
                {/* <!-- users Icon/--> */}
                < stateCard.icon />
            </div>

            <p className="text-sm text-gray-500 mb-1"> {stateCard.title} </p>
            <h3 className="text-lg font-semibold text-gray-800" suppressHydrationWarning >
                {stateCard.count}
            </h3>
        </div>
    )
}




