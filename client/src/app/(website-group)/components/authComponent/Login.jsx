"use client"


import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import { useDispatch, useSelector } from 'react-redux';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { MdErrorOutline } from "react-icons/md";
import AlertErrorBox from '../../common/AlertErrorBox';
import { saveUser } from '@/app/slices/userSlice';

export default function Login({ setDivOpen, setUserData, divOpen, userData, setOTPafterSignUp, setForGotPasswordDiv }) {
    let [loader, setLoader] = useState(false)
    let [error, setError] = useState('')
    let [status, setStatus] = useState(undefined)
    let [success, setSuccess] = useState('')
    let [showPassWord, setShowPassWord] = useState(false)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let router = useRouter()
    let dispatcher = useDispatch()
    let data = useSelector((store) => store.userStore.loginDetails)



    let userLogin = (event) => {
        event.preventDefault()
        setLoader(true)
        setError('')
        setSuccess('')
        let obj = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
        axios.post(`${apiBaseUrl}web/auth/login`, obj)
            .then((res) => res.data)
            .then((finalRes) => {
                setLoader(false)
                setUserData(finalRes.data)
                if (finalRes.status) {
                    dispatcher(saveUser({
                        user: finalRes.data,
                        token: finalRes.token
                    }))
                    setStatus(finalRes.status)
                    toast.success(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                    if (finalRes.data.role == 'buyer') {
                        return setTimeout(() => {
                            router.push('/')
                        }, 1000);
                    }
                    if (finalRes.data.role == 'seller') {
                        return setTimeout(() => {
                            userdashboard
                            router.push('/saler/pages/dashboard')
                        }, 1000);
                    }
                    if (finalRes.data.role == 'admin') {
                        return setTimeout(() => {
                            userdashboard
                            router.push('/admin/pages/overview')
                        }, 1000);
                    }

                }
                else {
                    setStatus(finalRes.status)
                    setError(finalRes.message)
                }

                setLoader(false)
            })
    }


    // let veryFiedEmail = () => {
    //     let obj = { ...userData }
    //     console.log(userData)
    //     axios.post(`${apiBaseUrl}web/user/register`)

    // }



    return (


        <div className=" w-[100%]  my-[131px] sm:my-0  border-2 border-white p-6 backdrop-blur-[5px] rounded-[10px]">

            <h3 className=" md:text-2xl sm:text-[22px] text-[18px] font-bold mb-3 text-center ">Login Your Account!</h3>

            <form onSubmit={userLogin}
                className="  ">

                <div className='flex flex-col md:gap-4 gap-2.5 ' >


                    <div className='grid grid-cols-1 md:gap-4 gap-2  ' >


                        <div className="flex flex-col gap-2">
                            <label className="block   font-bold text-white" >
                                Email
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="email" name='email' required placeholder="Email" />
                        </div>
                        <div className="relative flex flex-col gap-2 ">
                            <label className="block font-bold text-white" >
                                Password
                            </label>
                            <div className='relative' >
                                <input
                                    required
                                    className={`w-full px-3 py-2  text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none 
                                   `} name='password'
                                    type={showPassWord ? 'text' : 'password'} placeholder='0000000' />
                                <button
                                    onClick={() => setShowPassWord(!showPassWord)} className='text-[13px] underline font-medium absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer' type='button'  >
                                    {showPassWord ? 'hide' : 'Show'}
                                </button>
                            </div>


                            {/* forgot password button */}
                            <div onClick={() => setForGotPasswordDiv(true)} className="relative bottom-0 left-0  cursor-pointer text-sm font-medium text-white hover:text-blue-500 underline transition-colors duration-100 ">

                                Forgot Password
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
                                    Loading..
                                </span>
                            </button>
                            :
                            <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
                                Login
                            </button>
                    }


                    <div className="text-center flex justify-center items-center gap-1 ' ">
                        <p className="inline-block text-sm text-white align-baseline " >
                            Dont havn't account
                        </p>
                        <button onClick={() => setDivOpen(true)} className='hover:underline cursor-pointer' >
                            Register
                        </button>
                    </div>
                </div>


            </form>
        </div>

    )
}









// {/* <div className=" w-[100%]  my-[131px] sm:my-0  border-2 border-white p-6 backdrop-blur-[5px] rounded-[10px]">

//     <h3 className=" md:text-2xl sm:text-[22px] text-[18px] font-bold mb-3 text-center ">Forgot your password?</h3>
//     <p className=' text-center  ' >
//         Type in your email in the field below and we will send you a code to reset your password.
//     </p>

//     <form
//         className="  ">

//         <div className='flex flex-col md:gap-4 gap-2.5 ' >


//             <div className='grid grid-cols-1 md:gap-4 gap-2 ' >


//                 <div className="">
//                     <label className="block mb-2 text-sm font-bold text-white" >
//                         Email
//                     </label>
//                     <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="email" name='email' required placeholder="Email" />
//                 </div>
//                 <div className="">
//                     <label className="block mb-2 text-sm font-bold text-white" >
//                         Password
//                     </label>
//                     <input className="w-full px-3 py-2 mb-3 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="password" name='password' required placeholder="********" />
//                 </div>
//             </div>


//             <div onClick={() => setOpenForgotPasswordDiv(true)} className="relative bottom-[2px] left-[0px]   flex items-center justify-start">
//                 <span
//                     className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors duration-200"
//                 >
//                     Go Back
//                 </span>
//             </div>


//             {
//                 loader ?
//                     <button type="" className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
//                         <span className='spinner' >
//                         </span>
//                         <span>
//                             Loading..
//                         </span>
//                     </button>
//                     :
//                     <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
//                         Login
//                     </button>
//             }


//             {/* {
//                         verify ?
//                             ''
//                             :
//                             <span
//                                 onClick={veryFiedEmail}
//                                 className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
//                                 Verify Your Email
//                             </span>
//                     } */}


//         </div>


//     </form>
// </div> */}