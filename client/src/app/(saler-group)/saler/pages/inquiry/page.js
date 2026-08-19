"use client"

import React, { useEffect, useState } from 'react'
import { MdAccessTime } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import { RiMessage2Fill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Link from 'next/link';






export default function Inquiry() {

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.userStore.token)
    let user = useSelector((store) => store.userStore.loginDetails)
    let [inquiry, setInquiry] = useState([])

    let viewSellerInquiry = () => {
        axios.get(`${apiBaseUrl}web/inquiry/view`, {
            headers: { Authorization: ` Bearer ${token} ` }
        })
            .then((res) => res.data)
            .then((finalRes) => {

                setInquiry(finalRes.data)
            })


    }
    useEffect(() => {
        viewSellerInquiry()
    }, [token, user])


    return (
        <section className='flex flex-col  lg:px-6 px-4 gap-3 ' >
            {/* Team -header */}
            <header className='flex px-2 text-black sticky top-[52px] md:top-[0px] bg-indigo-50 py-4 ' >

                <div className='  flex flex-col  ' >
                    <h2 className='text-[25px]  font-semibold ' >
                        Contact Request
                    </h2>
                    <p className='text-gray-600 ' >
                        Read and Manage Inquiries From Platform Users
                    </p>
                    <span className=' mt-4 text-[18px] font-semibold   ' >
                        Inbox
                    </span>
                </div>

            </header>



            <div className='   ' >

                <div className='grid  grid lg:grid-cols-2 grid-cols-1 gap-5  py-4  ' >

                    {
                        inquiry.length >= 1 ?
                            inquiry.map((inquiry, index) =>
                                <EnquiryRow key={index} inquiry={inquiry} apiBaseUrl={apiBaseUrl} token={token} viewSellerInquiry={viewSellerInquiry} />
                            )
                            :
                            'no inquiries found'
                    }


                </div>

            </div>


        </section>
    )
}


// EnquiryRow 
function EnquiryRow({ inquiry, apiBaseUrl, viewSellerInquiry }) {
   
    let token = useSelector((store) => store.userStore.token)
    let markIsRead = (inqId) => {

        axios.post(`${apiBaseUrl}web/inquiry/read/${inqId}`)
            .then((res) => res.data)
            .then((finalRes) => {
                viewSellerInquiry()
                console.log(finalRes)
            })

    }

    return (
        <div className=' flex flex-col gap-4 bg-white p-4 rounded-[10px] ' >
            <div className=" flex items-center gap-4 
                          " suppressHydrationWarning>
                <div className='w-fit' >
                    <span className='flex items-center justify-center h-[45px] w-[45px] rounded-full text-white bg-indigo-600  ' >
                        {inquiry.buyer.firstName.charAt(0).toUpperCase()}
                    </span>
                </div>

                <div className='flex flex-col gap-2 leading-[16px]  w-full  ' >

                    <span className=' font-semibold flex items-center gap-3  '  >
                        <span className='flex-wrap flex' >
                            {inquiry.property.title}
                        </span>
                        <span className="bg-indigo-100 text-indigo-600 px-2 py-1 
                        rounded text-xs " suppressHydrationWarning>
                            New
                        </span>
                    </span>

                    <div className=' flex sm:flex-row flex-col gap-5 ' >
                        <div className=" flex items-center gap-1 ">
                            <CgProfile className=' text-indigo-600 ' />
                            <span className='text-[14px]  ' >
                                {inquiry.buyer.firstName.charAt(0).toUpperCase() + inquiry.buyer.firstName.slice(1)} {inquiry.buyer.lastName}
                            </span>
                        </div>
                        <div className=" flex items-center gap-1 ">
                            <MdOutlineMail className=' text-indigo-600 ' />
                            <span className='text-[14px]  ' >
                                {inquiry.buyer.email}
                            </span>
                        </div>
                        <div className=" flex items-center gap-1 ">
                            <IoCallOutline className=' text-indigo-600 ' />
                            <span className='text-[14px]  ' >
                                {inquiry.buyer.phone ? inquiry.buyer.phone : 'Not Provided'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            <div className=' flex flex-col gap-2  ' >
                <span className='text-gray-700  text-[14px] p-2 rounded-s border-s-2 shadow-lg capitalize ' >
                    {inquiry.message}
                </span>
                <span className='flex items-center gap-3 text-[13px] text-gray-800 ' >
                    <MdDateRange />
                    <span>
                        {
                            new Date(inquiry.createdAt).toLocaleString([], {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                            })
                        }
                    </span>
                </span>


                <div className=' grid sm:grid-cols-3 grid-cols-1 gap-2  ' >
                    <Link href={`/pages/property-details/${inquiry.property._id}`} className=' p-2 cursor-pointer rounded font-semibold text-[14px] text-center gap-2 border border-[grey] ' >
                        <span>View Property</span>
                    </Link >
                    <button disabled={inquiry.isRead ? true : false}
                        onClick={() => markIsRead(inquiry._id)}
                        className={` p-2 
                             rounded   font-semibold text-[14px]
                        ${inquiry.isRead ? 'disabled:opacity-50 cursor-not-allowed bg-gray-300 text-gray-400' : 'bg-[green] text-white cursor-pointer'}
                        ` }>
                        Mark as Read
                    </button>

                    <Link href={`/saler/pages/message/${inquiry.buyer._id}`} className=' p-2 cursor-pointer rounded bg-indigo-600 text-white font-semibold text-[14px] flex items-center gap-2 justify-center ' >
                        <RiMessage2Fill />
                        <span>Message</span>
                    </Link>

                </div>

            </div>


        </div>
    )
}