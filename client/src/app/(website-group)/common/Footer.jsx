"use client"



import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa6'

export default function Footer() {
  
    return (
        <>

            <footer className='   bg-[url(/banner-section.jpg)] bg-cover bg-center ' >


                {/* black-overlay */}


                <div className=' max-w-[1000px] mx-auto h-[100%] py-5 px-4 ' >

                    <div className=' grid sm:grid-cols-[40%_auto] gap-4' >

                        {/* footer-left */}
                        <div className='  sm:p-6 p-2 bg-black text-white
                             rounded-[18px] ' suppressHydrationWarning={true} >

                            <h1 className='text-center text-[30px] ' >
                                Let Connect
                            </h1>

                            <div className='flex gap-4 mt-4 text-[13px] text-gray-200 ' >
                                <div className='flex flex-col gap-3 ' >
                                    <span  >
                                        Phone
                                    </span>
                                    <span  >
                                        Email
                                    </span>
                                    <span  >
                                        Address
                                    </span>
                                </div>

                                <div className='flex flex-col gap-3 ' >
                                    <Link href={'/'} >
                                        +91 8319164902
                                    </Link>
                                    <Link href={'/'} >
                                        mohirao56722@gmail.com
                                    </Link>
                                    <Link href={'/'} >
                                        india, MP Bhopal
                                    </Link>
                                </div>
                            </div>

                            <div className='flex items-center  gap-3 mt-7 ' >
                                <Link href={'/'} >
                                    <FaFacebook />
                                </Link>
                                <Link href={'/'} >
                                    <FaInstagram />
                                </Link>
                                <Link href={'/'} >
                                    <FaWhatsapp />
                                </Link>
                            </div>

                        </div>


                        {/* footer-right */}
                        <div className=' bg-white p-6 rounded-[18px] ' >
                            <h1 className='text-center sm:text-[30px] text-[20px] text-black' >
                                We’d love to hear from you
                            </h1>

                            <div className=' mt-5 ' >
                                <form  action="">

                                    <div className='grid grid-cols-2 gap-2 ' >
                                        <input type="text" placeholder='Your Name' name='name' className='border-b-[0.5px] py-2 outline-none ' fdprocessedid="t8gvbh" />
                                        <input type="text" placeholder='Email' name='Email' className='border-b-[0.5px] py-2 outline-none  ' fdprocessedid="n8x01v" />
                                    </div>

                                    <div className='mt-4' >
                                        <textarea name="message" id="" placeholder='type Your Message Here' className='w-full py-3 border-b-[0.5px] outline-none h-[50px]  ' >
                                        </textarea>

                                        <p className='mt-4' >
                                            i accept the terms and conditions
                                        </p>
                                    </div>

                                    <button type='submit' className='
                                    bg-[url(/background.png)] bg-cover  text-white px-3 py-1 rounded-[18px] mt-4 w-[100px] font-semibold text-[18px] cursor-pointer focus:outline-none ' fdprocessedid="w9xwd" suppressHydrationWarning={true} >
                                        Send
                                    </button>
                                </form>
                            </div>

                        </div>

                    </div>






                    <div className='mt-5 bg-[rgba(0,0,0,0.8)] text-white py-4 ' >

                        <div className=' flex items-center justify-center sm:text-[12px] text-[10px] text-gray-300 gap-4 ' >
                            <span>
                                Disclaimer
                            </span>
                            <span>
                                TERM & conditions
                            </span>
                            <span>
                                PRIVACY POLICY
                            </span>
                        </div>

                    </div>

                </div>


            </footer>

        </>
    )
}
