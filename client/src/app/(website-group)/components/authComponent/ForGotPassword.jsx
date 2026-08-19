"use client"


import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Flip, toast, ToastContainer } from 'react-toastify';
import AlertSuccessBox from '../../common/AlertSuccessBox';
import AlertErrorBox from '../../common/AlertErrorBox';

export default function ForGotPassword({ setUserData
    , userData, setForGotPasswordDiv }) {


    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let router = useRouter()

    let [loader, setLoader] = useState(false)
    let [success, setSuccess] = useState('')
    let [error, setError] = useState('')
    let [status, setStatus] = useState(null)

    let forGotPassword = (event) => {
        event.preventDefault()
        setLoader(true)
        setError('')
        setSuccess('')
        let email = event.target.email.value
        let obj = { email }
        setUserData(obj)
        axios.post(`${apiBaseUrl}web/auth/forgot-password`, obj)
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
        <>
            <section>


                {
                    status ?

                        <AlertSuccessBox status={status} success={success} />
                        :

                        <div className=" w-[100%]  my-[131px] sm:my-0  border-2 border-white p-6 backdrop-blur-[5px] rounded-[10px]">

                            <h3 className=" md:text-2xl sm:text-[22px] text-[18px] font-bold mb-3 text-center capitalize ">forgot Your password!</h3>
                            <p className=' text-gray-200 text-center text-sm mb-3 ' >
                                Type in your email in the field below and we will send you a Link to reset your password
                            </p>



                            <form onSubmit={forGotPassword}
                                className="  ">




                                <div className='flex flex-col md:gap-4 gap-2.5 ' >


                                    <div className='grid grid-cols-1  md:gap-4 gap-2  ' >
                                        <div className="relative flex flex-col gap-2 ">
                                            <label className="block  font-bold text-white" >
                                                Email
                                            </label>
                                            <input className="w-full px-3 py-2  text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="email" name='email' required placeholder="Enter Your Email" />


                                            {/* forgot password button */}
                                            <div onClick={() => setForGotPasswordDiv(false)} className="relative bottom-0 left-0  cursor-pointer text-sm font-medium text-white hover:text-blue-500 underline transition-colors duration-100 ">

                                                Go Back
                                            </div>
                                        </div>

                                    </div>

                                    {
                                        error != '' &&
                                        <AlertErrorBox status={status} error={error} />

                                    }

                                    {
                                        loader ?
                                            <button type="" className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
                                                <span className='spinner' >
                                                </span>
                                                <span>
                                                    Sending...
                                                </span>
                                            </button>
                                            :
                                            <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
                                                Send Verfication Link
                                            </button>
                                    }



                                </div>


                            </form>
                        </div >
                }




            </section>
        </>


    )
}



// function OtpBox({ loader, veryfyOtp }) {



//     return (
//         <div className=" w-[100%] my-[173px] sm:my-0 border-2 border-white p-6 backdrop-blur-[5px] rounded-[10px]  ">
//             <header className="flex flex-col gap-1 mb-3 text-center ">
//                 <h1 className="md:text-2xl sm:text-[22px] text-[18px] font-bold  ">
//                     Reset Password Verification</h1>
//                 <p className="text-[15px] text-gray-200 capitalize ">
//                     Enter the 6-digit verification code that was sent to your email.</p>
//             </header>
//             <form onSubmit={veryfyOtp} id="otp-form " >
//                 <div className="flex items-center justify-center gap-3">
//                     <input
//                         type="text"
//                         className="w-[50%] h-14 px-3 py-2 mb-3 text-xl text-center    text-white border rounded shadow appearance-none focus:outline-none   "
//                         maxLength='6' name='Otp' />

//                 </div>




//                 {
//                     loader ?
//                         <button type="" className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
//                             <span className='spinner' >
//                             </span>
//                             <span>
//                                 Proccessing...
//                             </span>
//                         </button>
//                         :
//                         <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
//                             Submit
//                         </button>
//                 }
//             </form>
//         </div>
//     )
// }



