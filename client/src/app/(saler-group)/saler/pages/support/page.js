"use client"

import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Flip, toast } from 'react-toastify'

export default function support() {

    let user = useSelector((store) => store.userStore.loginDetails)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let token = useSelector((store) => store.userStore.token)
    let [loader, setLoader] = useState(false)
    let [success, setSuccess] = useState('')
    let [status, setStatus] = useState(null)

    let sendInquiry = (event) => {
        event.preventDefault()
        setLoader(true)
        setSuccess('')
        let obj = {
            name: event.target.name.value,
            role: event.target.role.value,
            email: event.target.email.value,
            phone: event.target.phone.value,
            message: event.target.message.value,
        }

        axios.post(`${apiBaseUrl}web/contact/send`, obj, {
            headers: { Authorization: ` Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    // console.log(finalRes.data)
                    setSuccess(finalRes.message)
                    setStatus(finalRes.status)
                    event.target.reset()
                }
                else {
                    setStatus(finalRes.status)
                    toast.error(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                }
                setLoader(false)
            })
    }




    return (
        <>
            <section className=' min-h-screen p-4  ' >
                <header className=' max-w-fit mx-auto  my-[20px]    ' >
                    <h1 className='sm:text-[40px] text-[28px]  text-center font-semibold tracking-tight ' >GET IN TOUCH</h1>
                    <p className='text-[17px] text-gray-600 text-center  ' >
                        Have Question or Feedback? We’d love to hear from you
                    </p>
                </header>










                {/* <!-- Real Estate Contact Form with Tailwind CSS --> */}
                <div className="  flex items-center justify-center ">




                    <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl grid lg:grid-cols-12 overflow-hidden">

                        {/* <!-- Left Panel: Info --> */}
                        <div className="lg:col-span-5 bg-gradient-to-r from-[#392BFB] to-[#0F056E] sm:p-10 p-4 text-white flex flex-col gap-4 justify-between">
                            <div>
                                <h2 className="text-3xl font-bold">Contact Our Agents</h2>
                                <p className="mt-4 text-indigo-200">Find your dream home or list your property with Us.</p>
                                <div className="mt-8 space-y-4 text-sm">
                                    <p>📍 742 Evergreen Terrace</p>
                                    <p>📞 +1 (555) 234-5678</p>
                                    <p>✉️ listings@primeestate.com</p>
                                </div>
                            </div>

                            <div className=' bg-white flex flex-col p-6 gap-2  justify-center  h-full w-full rounded-[12px] shadow-xl ' >
                                <h1 className='sm:text-[28px] text-[22px] text-black  text-center font-semibold tracking-tight ' > Quick Support </h1>
                                <p className='text-[17px] text-gray-600 text-center  ' >
                                    Available 24/7 For Our Member.
                                    Your Sticfaction is Our Priority.
                                </p>
                            </div>

                        </div>



                        {/* <!-- Right Panel: Form --> */}
                        <div className="lg:col-span-7 sm:p-10 p-4">
                            <form onSubmit={sendInquiry} className="space-y-4">
                                <input type="text" placeholder="Full Name" className="w-full border p-2 rounded-lg" required name='name' />

                                <input type="email" placeholder="Email" className="w-full border p-2 rounded-lg" required name='email' />

                                <input type="tel" placeholder="Phone" className="w-full border p-2 rounded-lg" name='phone' />

                                <select className="w-full border p-2 rounded-lg" name='role' >
                                    <option>buyer</option>
                                    <option>seller</option>
                                </select>

                                <textarea placeholder="Message" className="w-full border p-2 rounded-lg resize-none " required name='message' rows="4"></textarea>



                                {
                                    status &&
                                    <p className="text-xs font-semibold tracking-widest text-green-600 text-center uppercase bg-emerald-500/10 px-3 py-2 rounded-full ">
                                        {success}
                                    </p>
                                }


                                <div className='flex items-center gap-4 '>
                                    {
                                        loader ?
                                            <button type="button" className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
                                                <span className='spinner' >
                                                </span>
                                                <span>
                                                    Sending...
                                                </span>
                                            </button>
                                            :
                                            <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
                                                Send
                                            </button>
                                    }
                                </div>




                            </form>
                        </div>
                    </div>
                </div>

            </section>




        </>
    )
}
