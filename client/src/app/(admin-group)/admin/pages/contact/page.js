"use client"

import React, { useEffect, useState } from 'react'
import { MdAccessTime } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { MdDeleteOutline } from "react-icons/md";
import { Flip, toast, ToastContainer } from 'react-toastify';


export default function contact() {

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.userStore.token)
    let [loader, setLoader] = useState(true)
    let [contact, setContact] = useState([])

    let getContact = () => {
        setLoader(true)
        axios.get(`${apiBaseUrl}web/contact/view`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setContact(finalRes.data)
                }
                else {
                    console.log(finalRes.message)
                }
                setLoader(false)
            })
    }

    useEffect(() => {
        setLoader(true)
        getContact()
    }, [token])


    return (
        <section className='flex flex-col  lg:px-6 px-4 gap-3 ' >
            <ToastContainer />
            {/* Team -header */}
            <header className='flex px-2 text-black sticky top-[52px] md:top-[0px] bg-indigo-50 py-4 z-1 ' >

                <div className='  flex flex-col  ' >
                    <h2 className='text-[25px]  font-semibold ' >
                        Contact Request
                    </h2>
                    <p className='text-gray-600 ' >
                        Read and Manage Inquiries From Platform Users
                    </p>
                    <span className=' mt-4 text-[18px] font-semibold   ' >
                        Inbox ({contact.length})
                    </span>
                </div>

            </header>



            <div className='grid grid-cols-1 gap-3  ' >

                {
                    loader ?

                        // contact loading card
                        <div className='h-[200px] flex items-center justify-center gap-4 bg-white p-4 rounded-[10px] ' suppressHydrationWarning >

                            <div className="cursor-pointer flex items-center justify-center gap-2  rounded-full text-black font-semibold    " suppressHydrationWarning >
                                <span className='spinner' >
                                </span>
                                <span className='' >
                                    Contact Fetching...
                                </span>
                            </div>

                        </div>

                        :
                        // contact fetch
                        <>
                            {
                                contact.length >= 1 ?
                                    contact.map((contact, index) => {
                                        return (
                                            <ContactRow key={index} contact={contact} apiBaseUrl={apiBaseUrl} token={token} getContact={getContact} />
                                        )
                                    })

                                    :

                                    <div className='h-[200px] flex items-center justify-center gap-4 bg-white p-4 rounded-[10px] ' suppressHydrationWarning >

                                        <p className=' text-[20px]  ' >
                                            No Contacts Found
                                        </p>

                                    </div>
                            }
                        </>
                }

            </div>


        </section>
    )
}


// ContactRow 
function ContactRow({ contact, apiBaseUrl, token, getContact }) {

    let contactDelete = (contactId) => {
        axios.delete(`${apiBaseUrl}web/contact/delete/${contactId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                    getContact()
                }
                else {
                    toast.error(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                }
            })
    }
    return (
        <div className='relative flex flex-col gap-4 bg-white p-4 rounded-[10px] ' >


            {/* contact delete button */}
            <span
                onClick={() => contactDelete(contact._id)}
                className='absolute top-2 right-2 text-[22px] duration-300 flex items-center justify-center p-2 rounded-full cursor-pointer text-[red] hover:bg-red-100  ' >
                <MdDeleteOutline className=' ' />
            </span>


            {/* conatct information */}
            <div className=" flex items-center gap-4" suppressHydrationWarning >
                <span className={`flex items-center justify-center h-[45px] w-[45px] rounded-full text-white 
                    ${contact.role == 'buyer' ? 'bg-indigo-600' : 'bg-green-600'}
                    `} >
                    {contact.name.charAt(0).toUpperCase()}
                </span>
                <div className='flex flex-col gap-2 leading-[16px] ' >

                    <span className=' font-semibold flex items-center gap-3 '  >
                        <span> {contact.name.charAt(0).toUpperCase() + contact.name.slice(1)}</span>
                        <span className={` px-2 py-1 rounded-full text-xs
                            ${contact.role == 'buyer' ? 'bg-indigo-100' : 'bg-green-100'}
                            `} >
                            {contact.role}
                        </span>
                    </span>

                    <div className=' flex md:flex-row flex-col gap-4 ' >
                        <div className=" flex items-center gap-1 ">
                            <MdOutlineMail className=' text-red-600 ' />
                            <span className='text-[14px]  ' >
                                {contact.email}
                            </span>
                        </div>
                        <div className=" flex items-center gap-1 ">
                            <IoCallOutline className=' text-green-600 ' />
                            <span className='text-[14px]  ' >
                                {contact.phone}
                            </span>
                        </div>
                        <div className=" flex items-center gap-1 ">
                            <MdAccessTime className=' text-blue-600 ' />
                            <span className='text-[14px]  ' >
                                {new Date(contact.createdAt).toLocaleString([], {
                                    dateStyle: 'medium',
                                    timeStyle: 'short'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>


            <span>
                Message
            </span>
            <span className='text-gray-700  text-[14px] p-2 rounded-s border-s-2 shadow-lg ' >
                {contact.message}
            </span>
        </div>
    )
}