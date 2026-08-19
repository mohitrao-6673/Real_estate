import Link from 'next/link'
import React from 'react'
import { CiSearch } from "react-icons/ci";


export default function Banner() {
    return (

        <section className='md:h-screen  h-[500px] w-full relative ' >
            <img src="/banner-section3.png" className=' h-[100%] w-[100%] ' alt="" />

            {/* black overlay */}
            <div className='h-[100%] w-[100%] absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]  ' >


                <div className='max-w-[1320px] mx-auto border-white
                 mt-[200px] ' suppressHydrationWarning  >

                    <div className=' max-w-[500px] md:px-0 px-2 md:absolute-none absolute  top-[50%]  translate-y-[-50%] 
                    lg:left-[6.5%] left-[50%] lg:translate-x-0 translate-x-[-50%]
                    ' suppressHydrationWarning>
                        <h1 className='text-white md:text-[50px] text-[32px] md:leading-15
                        leading-9 md:tracking-[8px] tracking-[5px] md:text-left text-center  ' suppressHydrationWarning>
                            Discover Your
                            <span className=' text-sky-600 ml-3 ' >
                                Dream House
                            </span>

                        </h1>
                        <p className='md:text-left text-center text-[20px] text-white my-3 ' >
                            Experience The Most Advanced Rreal Estate Plarform. Discovor Verified Lisiting
                        </p>

                        <div className='md:w-auto w-[100%] md:justify-start justify-center gap-4
                        md:text-[16px] text-[14px] flex sm:flex-row flex-col items-center bg-gradient-to-r from-[#392BFB] to-[#0F056E]  px-6 py-4 rounded-[12px]
                        ' suppressHydrationWarning>

                            <span className=' text-white font-semibold ' >
                                Search By Location
                            </span>
                            <div className='flex itmes-center px-4 py-2 rounded-[12px] bg-white text-black ' >
                                <input type="text" className=' w-full h-full outline-none py-2 px-3 ' placeholder='Search Here....' />
                                <button className='text-[22px] cursor-pointer ' >
                                    <CiSearch />
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}
