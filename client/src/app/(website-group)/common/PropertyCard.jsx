"use client"

import React, { useEffect, useState } from 'react'
import { MdOutlineMyLocation } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";

import Link from 'next/link';
import axios from 'axios';
import PageLoader from './PageLoader';


export default function PropertyCard() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [display, setDisplay] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let [pageLoader, setPageLoader] = useState(true)

    useEffect(() => {



        axios.post(`${apiBaseUrl}web/property/view`)
            .then((res) => res.data)
            .then((finalRes) => {

                setDisplay(finalRes.data)
                setStaticPath(finalRes.staticPath)
                setPageLoader(false)
            })

    }, [])

    return (
        <>
            {
                pageLoader ?

                    <PageLoader />

                    :


                    display.map((data, index) => {
                       
                        return (
                            <div key={index} className='bg-white rounded-[8px_8px_0px_0px] relative  '  >

                                <div className='relative ' >

                                    <div className=' absolute top-2 px-3 flex justify-between items-center w-full ' >

                                        <div className='flex items-center gap-3' >

                                            {/* property available or not */}
                                            <span className={`rounded-[8px_0px_8px_0px] text-white py-1 px-2 justify-center md:text-[13px] sm:text-[14px] text-[10px] font-semibold '
                     ${data.status == 'Sale' ? 'bg-[green]' : 'bg-red-600'} `} >
                                                {data.status}
                                            </span>

                                            {/* bhk tag */}
                                            <div className=' flex items-center gap-2 bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-[8px_0px_8px_0px] text-white py-1 px-2 justify-center md:text-[13px] sm:text-[14px] text-[10px] font-semibold ' >
                                                <span>
                                                    <IoHomeOutline />
                                                </span>
                                                <span >
                                                    <span  >
                                                        {data.bhk}BHK
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        {/* wishlist-icons */}
                                        <div className='z-1 flex items-center bg-gray-200  justify-center sm:text-[25px] text-[15px] sm:w-[35px] sm:h-[35px] w-[24px] h-[24px] rounded-[100%] cursor-pointer ' >

                                            <CiHeart />
                                        </div>



                                    </div>


                                    {/* price tag */}
                                    <div className=' absolute bottom-2 px-3 flex justify-between items-center w-full ' >
                                        <h2 className=' sm:text-[20px] text-[12px] font-semibold text-white   ' >
                                            $  {data.price}
                                        </h2>

                                        <div className=' flex items-center font-semibold gap-1 text-white ' >

                                            <FaEye className='text-[18px]  ' />
                                            <span className='text-[12px] mt-[1px] ' >
                                                2
                                            </span>
                                        </div>

                                    </div>


                                    <img src={`${apiBaseUrl}${data.images[0]}`} alt="" className='rounded-[8px_8px_0px_0px] h-[200px] w-full ' />

                                </div>


                                <div className=' p-2  ' >

                                    <h2 className='font-semibold sm:text-[16px] text-[13px] ' >
                                        {data.title.slice(0, 18)}...
                                    </h2>
                                    <div className='flex items-center gap-2 mt-1 ' >
                                        <span className='text-[14px] mt-[1px] ' >
                                            <MdOutlineMyLocation />
                                        </span>
                                        <p className='sm:text-[13px] text-gray-800 text-[10px] ' >
                                            {data.city} {data.area}
                                        </p>
                                    </div>


                                    <div className=' grid grid-cols-3 text-center items-center mt-5  ' >

                                        <div className='flex flex-col items-center   ' >
                                            <div className=' text-center flex justify-center ' >
                                                <IoHomeOutline />
                                            </div>
                                            <div className=' text-center flex justify-center font-semibold text-[15px] mt-1  ' >
                                                {data.bhk}
                                            </div>
                                            <div className={` text-center flex justify-center text-[13px]
                             font-semibold `} >
                                                BEDS
                                            </div>
                                        </div>

                                        <div className='flex flex-col items-center border-x-[0.2px] border-[#aca090]   ' >
                                            <div className=' text-center flex justify-center ' >
                                                <IoHomeOutline />
                                            </div>
                                            <div className=' text-center flex justify-center font-semibold text-[15px] mt-1  ' >
                                                {data.bathrooms}
                                            </div>
                                            <div className={` text-center flex justify-center text-[13px] font-semibold `} >
                                                BATH
                                            </div>
                                        </div>

                                        <div className='flex flex-col items-center   ' >
                                            <div className=' text-center flex justify-center ' >
                                                <TbRulerMeasure />
                                            </div>
                                            <div className=' text-center flex justify-center font-semibold text-[15px] mt-1  ' >
                                                {data.areaSize}
                                            </div>
                                            <div className={` text-center flex justify-center text-[13px] font-semibold `} >
                                                SQ FT
                                            </div>
                                        </div>

                                    </div>


                                    <button className='w-full bg-gradient-to-r from-[#392BFB] to-[#0F056E] cursor-pointer rounded-2 py-1  mt-1 ' >
                                        <Link href={`/pages/property-details/${data._id}`}
                                            className={` text-[white] md:text-[20px] text-[16px]
                        font-semibold `}
                                        >
                                            View Details
                                        </Link>
                                    </button>

                                </div>

                            </div>
                        )
                    })
            }

        </>
    )
}
