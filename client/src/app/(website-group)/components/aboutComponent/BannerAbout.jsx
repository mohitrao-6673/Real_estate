import Link from 'next/link'
import React from 'react'

export default function BannerAbout() {
    return (
        <>
            <section className='md:h-screen sm:h-[500px] h-[300px] w-full relative    ' >
                <img src="/about-banner1.png" className=' h-full w-full ' alt="" />

                {/* black overlay */}
                <div className='h-full w-full top-0 left-0 bg-[rgba(0,0,0,0.1)] absolute ' >


                    <div className='left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] absolute flex flex-col items-center gap-4 ' >
                        <h1 className='text-white md:text-[50px] md:text-[32px] text-[22px] text-center capitalize  
                       ' >
                            from contact to creation
                        </h1>

                      
                            <button className=' border-2 border-white rounded-[12px]  text-white sm:text-[23px] sm:text-[20px] text-[16px] py-2 px-4 hover:bg-white hover:text-black font-semibold  cursor-pointer duration-300  ' >
                                <Link href={'/pages/contact-us'} >
                                    Contact Us
                                </Link>
                            </button>


                    </div>


                </div>


            </section>
        </>
    )
}
