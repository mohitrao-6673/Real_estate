"use client"

import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import ApprovalPending from '../../common/ApprovalPending';




export default function overview() {

    let refresh = () => {
        window.location.reload()
    }

    return (
        <section className='flex flex-col gap-4  lg:px-6 px-4  gap-5  ' >
            {/* Team -header */}
            <header className='flex flex-col px-2 text-black sticky top-[52px] md:top-[0px] bg-indigo-50 py-4 ' >
                <h2 className='text-[25px] font-semibold ' >
                    Saler Dashboard
                </h2>
                <p className='text-gray-600 ' >
                    Here's Toady Summary
                </p>
            </header>



            <div className='  grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ' >

                <OverViewCard />
                <OverViewCard />
                <OverViewCard />
                <OverViewCard />

            </div>




            <div className=' flex flex-col gap-2' >


                {/* property listing and serach header */}
                <header className='flex sm:flex-row flex-col sm:items-center items-start justify-between sm:gap-0 gap-3 ' >
                    <h1 className=' text-[18px] font-semibold  ' >
                        Proprty Listing
                    </h1>


                    <span className=' flex items-center gap-2 px-2 py-1 border border-gray-400 h-full rounded ' >
                        <CiSearch className=' text-[20px] text-gray-500 ' />
                        <input type='text' name='serach' placeholder='Search Properties...' className=' outline-none w-full h-full  ' />
                    </span>

                </header>




                <div className='grid  grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5  py-4  ' >
                    <div className=' h-[200px] w-auto border rounded ' >
                    </div>
                    <div className=' h-[200px] w-auto border rounded ' >
                    </div>
                    <div className=' h-[200px] w-auto border rounded ' >
                    </div>
                </div>


            </div>




        </section>
    )
}



function OverViewCard() {
    return (
        <div className=" bg-white rounded-xl overflow-hidden transition-shadow duration-300  px-5 border-indigo-600 py-8 text-center cursor-pointer border ">
            <div className="flex justify-center items-center w-14 h-14 mx-auto bg-indigo-50 text-indigo-600 rounded-full mb-4">
                {/* <!-- users Icon/--> */}
                < FaUsers />
            </div>

            <p className="text-sm text-gray-500 mb-1">8 Properties</p>
            <h3 className="text-lg font-semibold text-gray-800">10</h3>
        </div>
    )
}




