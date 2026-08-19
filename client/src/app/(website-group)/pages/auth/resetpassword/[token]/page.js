"use client"

import React, { useState } from 'react'
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import AlertSuccessBox from '@/app/(website-group)/common/AlertSuccessBox';
import AlertErrorBox from '@/app/(website-group)/common/AlertErrorBox';





export default function page({ setUserData, setOTPafterSignUp, setDivOpen }) {

    let [loader, setLoader] = useState(false)
    let [success, setSuccess] = useState('')
    let [error, setError] = useState('')
    let [status, setStatus] = useState(undefined)
    let [showNewPassWord, setShowNewPassWord] = useState(false)
    let [showConfirmPassWord, setShowConfirmPassWord] = useState(false)


    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let router = useRouter()
    let { token } = useParams()
    let resetPassword = (event) => {
        event.preventDefault()
        setLoader(true)
        setError('')
        setSuccess('')
        let conFirmPassword = event.target.conFirmPassword.value
        let newPassword = event.target.newPassword.value
        let obj = {
            conFirmPassword,
            newPassword
        }
        axios.post(`${apiBaseUrl}web/auth/changepassword/${token}`, obj)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setSuccess(finalRes.message)
                    setStatus(finalRes.status)
                }
                else {
                    setStatus(finalRes.status)
                    setError(finalRes.message)
                }
                setLoader(false)
            })
    }


    return (

        <section >
            <ToastContainer />


            <div className=" bg-[url('/banner-section4.png')] bg-no-repeat bg-center bg-cover  sm:h-screen h-auto   ">
                {/* black overlay */}
                <div className=' relative h-full  w-full bg-[rgba(0,0,0,0.6)]  py-5 ' >

                    <div className=' sm:w-[450px] sm:relative static sm:top-[50%] sm:translate-y-[-50%]  mx-auto w-[90%]    text-white      ' >

                        {
                            status ?

                                <AlertSuccessBox status={status} success={success}
                                    button={'You Can Login'}
                                />
                                :
                                <div className=" w-[100%] border-2 border-white p-6 backdrop-blur-[5px]
         rounded-[10px]  ">

                                    <h3 className=" md:text-2xl sm:text-[22px] text-[18px] font-bold mb-3 text-center ">Reset Your Password</h3>

                                    <form onSubmit={resetPassword}
                                        className="  ">

                                        <div className='flex flex-col md:gap-5 gap-4 ' >

                                            {/* user-name */}

                                            {/* user-password */}
                                            <div className="grid grid-cols-1 md:gap-4 gap-2 items-center">

                                                <div className="flex flex-col gap-2 ">
                                                    <label className="block  text-sm font-bold text-white" >
                                                        New Password
                                                    </label>
                                                    <div className='relative' >
                                                        <input
                                                            required
                                                            className="w-full px-3 py-2  text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none"
                                                            name='newPassword'
                                                            type={showNewPassWord ? 'text' : 'password'} placeholder='0000000' />
                                                        <button
                                                            onClick={() => setShowNewPassWord(showNewPassWord ? false : true)} className='text-[13px] underline font-medium absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer' type='button'  >
                                                            {showNewPassWord ? 'hide' : 'Show'}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2 ">
                                                    <label className="block  text-sm font-bold text-white" >
                                                        Re confirm Password
                                                    </label>
                                                    <div className='relative' >
                                                        <input
                                                            required
                                                            className="w-full px-3 py-2  text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none"
                                                            name='conFirmPassword'
                                                            type={showConfirmPassWord ? 'text' : 'password'} placeholder='0000000' />
                                                        <button
                                                            onClick={() => setShowConfirmPassWord(showConfirmPassWord ? false : true)} className='text-[13px] underline font-medium absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer' type='button'  >
                                                            {showConfirmPassWord ? 'hide' : 'Show'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>



                                            {
                                                error != '' &&
                                                <AlertErrorBox status={status} error={error} />

                                            }



                                            {
                                                loader ?
                                                    <button type="" className="cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
                                                        <span className='spinner' >
                                                        </span>
                                                        <span>
                                                            Changing Password...
                                                        </span>
                                                    </button>
                                                    :
                                                    <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
                                                        Change Password
                                                    </button>
                                            }




                                        </div>


                                    </form>
                                </div>
                        }



                    </div>


                </div>
            </div>





        </section>






    )
}
