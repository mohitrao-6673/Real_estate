"use client"

import React from 'react'
import React, { useEffect, useState } from 'react'
import { MdOutlineMyLocation } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";

import Link from 'next/link';
import axios from 'axios';
import PageLoader from './PageLoader';



const Hello = async() => {

    let res = await axios.get("http://localhost:8800/api/posts/timeline/64e31eb40a9c1595ef8f425b");
let instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_APIBASEURL
    });

    
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
        <div>
   {


                pageLoader ?

                    <PageLoader />

                    :


                    display.map((data, index) => {

                        return (
                            <div key={index} className='bg-white rounded-[8px_8px_0px_0px] relative  '  >

                                <div className='relative ' >

                                    <div className=' absolute top-2 px-3 flex justify-between items-center w-full ' >

                                        <div className=' flex items-center gap-2 bg-[url(/background.png)] bg-cover rounded-[8px_0px_8px_0px] text-white py-1 px-2 justify-center md:text-[13px] sm:text-[14px] text-[10px] font-semibold ' >
                                            <span>
                                                <IoHomeOutline />
                                            </span>
                                            <span className='' >
                                                <span  >
                                                    {data.bhk}BHK
                                                </span>
                                            </span>
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


                                    <img src={`${apiBaseUrl}${staticPath}${data.images[0]}`} alt="" className='rounded-[8px_8px_0px_0px] h-[200px] w-full ' />

                                </div>


                                <div className=' p-2  ' >

                                    <h2 className='font-semibold sm:text-[16px] text-[13px] ' >
                                        {data.title}
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


                                    <button className='w-full bg-[url(/background2.png)] cursor-pointer rounded-2 py-1 bg-cover mt-1 ' >
                                        <Link href={`/pages/property-details/${data._id}`}
                                            className={` text-[white] sm:text-[20px] text-[16px]
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

        </div>
    )
}

export default Hello
