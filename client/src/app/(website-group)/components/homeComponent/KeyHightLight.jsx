"use client"

import React from 'react'
import { useState } from 'react';

export default function KeyHightLight() {




    return (
        <section className=' py-[40px] bg-[aqua] ' >
            <div className=' w-[1420px] mx-auto' >

                {/* header-part */}
                <h1 className="text-center lg:block hidden text-[42px] font-700 ">key Highlights</h1>
                <p className="lg:text-[21px] font-600 text-center lg:text-black text-white ">Your Dream Home Awaits you to Own
                    xquisite Site in The medallion</p>



                <div className='flex items-center gap-2 w-full border-2 h-[80vh] mt-[20px]  ' >



                    <div className='relative w-[65%] bg-[url(/about-image1.png)] h-full bg-cover bg-center ' >

                        <div className=' absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] h-full w-full ' >
                        </div>

                        <h2
                            className="text-[20.22px] font-700 absolute bottom-[320px] left-[20px] text-white flex gap-4 duration-300 uppercase  ">
                            <span>
                                24X7</span>
                            <span>
                                SECURITY
                            </span>
                        </h2>
                        <p className="text-[20px] font-600 text-white absolute left-[20px]  bottom-[30px]   ">
                            A 5-tier security system, including 24x7 CCTV surveillance, ensures a safe living environment.
                        </p>
                    </div>




                    <div className='relative w-[100px] bg-[url(/about-image2.png)] h-full bg-cover bg-center ' >

                        <div className=' absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] h-full w-full ' >
                        </div>

                        <h2
                            className="text-[20.22px] font-700 absolute bottom-[106px] left-[-30px] text-white flex rotate-[270deg] gap-4 duration-300 uppercase  ">
                            <span>
                                24X7</span>
                            <span>
                                SECURITY
                            </span>
                        </h2>
                        <p className="text-[20px] font-600 text-white absolute left-[20px]  bottom-[30px] hidden  ">
                            A 5-tier security system, including 24x7 CCTV surveillance, ensures a safe living environment.
                        </p>
                    </div>



                </div>





            </div>
        </section>
    )
}
