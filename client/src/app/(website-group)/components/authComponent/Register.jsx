"use client"

import React, { useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { saveUser } from '@/app/slices/userSlice';



export default function Register({ setUserData, setOTPafterSignUp, setDivOpen, userData }) {
    let [checkBox, setCheckBox] = useState(-1)

    let [loader, setLoader] = useState(false)
    let [success, setSuccess] = useState('')

    let [error, setError] = useState('')
    let [status, setStatus] = useState(undefined)
    let [radioCheck, setRadioCheck] = useState(-1)
    let [showPassWord, setShowPassWord] = useState(false)
    let dispatcher = useDispatch()

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let otpSend = (event) => {
        event.preventDefault()
        setLoader(true)
        setError('')
        let obj = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            email: event.target.email.value,
            role: event.target.role.value,
            password: event.target.password.value,
        }
        // console.log(obj)
        setUserData(obj)


        axios.post(`${apiBaseUrl}web/auth/veryemail`, obj)
            .then(res => res.data)
            .then((finalRes) => {

                if (finalRes.status) {
                    dispatcher(saveUser({
                        user: finalRes.data,
                    }))
                    setLoader(false)
                    setOTPafterSignUp(true)
                }
                else {

                    setStatus(finalRes.status)
                    setError(finalRes.message)
                    console.log(finalRes.message)
                }
                setLoader(false)
            })


    }

    return (


        <div className=" w-[100%] border-2 border-white p-6 backdrop-blur-[5px]
         rounded-[10px]  ">

            <h3 className=" md:text-2xl sm:text-[22px] text-[18px] font-bold mb-3 text-center ">Create an Account!</h3>

            <form onSubmit={otpSend}
                className="  ">

                <div className='flex flex-col md:gap-5 gap-4 ' >

                    {/* user-name */}
                    <div className='grid sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 ' >

                        <div className="flex flex flex-col gap-2">
                            <label className="block  text-sm font-bold text-white" >
                                First Name
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" name='firstName' required placeholder="First Name" />
                        </div>
                        <div className="flex flex flex-col gap-2">
                            <label className="block text-sm font-bold text-white" >
                                Last Name
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text" name='lastName' placeholder="Last Name" />
                        </div>
                    </div>


                    {/* user-email */}
                    <div className="flex flex-col gap-2">
                        <label className="block  text-sm font-bold text-white" >
                            Email
                        </label>
                        <input className="w-full px-3 py-2 text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" name='email' required placeholder="Email" />
                    </div>


                    {/* user-role */}
                    <div className='grid grid-cols-3 md:gap-4 gap-2 ' >

                        <div
                            onClick={() => setCheckBox(1)}
                            className={` rounded  flex items-center justify-center p-2 cursor-pointer relative
                            ${checkBox == 1 ? 'border-indigo-600 border-2  ' : 'border-2 border-white '}
                            `}>

                            <input
                                onChange={() => setCheckBox(1)}
                                className=" absolute left-0 top-0 cursor-pointer rounded  focus:outline-none focus:shadow-outline appearance-none  " type="radio" name='role' value='buyer'
                                checked={checkBox == 1 ? true : false} />
                            <label className=" cursor-pointer  text-sm font-bold text-white" >
                                Buyer
                            </label>

                        </div>


                        <div
                            onClick={() => setCheckBox(2)}
                            className={` rounded  flex items-center justify-center p-2 cursor-pointer relative
                            ${checkBox == 2 ? 'border-indigo-600 border-2  ' : 'border-2 border-white '}
                            `}>

                            <input
                                onChange={() => setCheckBox(2)}
                                className=" absolute left-0 top-0 cursor-pointer rounded  focus:outline-none focus:shadow-outline appearance-none  " type="radio" name='role' required value='seller'
                                checked={checkBox == 2 ? true : false} />
                            <label className=" cursor-pointer  text-sm font-bold text-white" >
                                seller
                            </label>


                        </div>


                        <div
                            onClick={() => setCheckBox(3)}
                            className={` rounded  flex items-center justify-center p-2 cursor-pointer relative
                            ${checkBox == 3 ? 'border-indigo-600 border-2  ' : 'border-2 border-white '}
                            `}>

                            <input
                                onChange={() => setCheckBox(3)}
                                className=" absolute left-0 top-0 cursor-pointer rounded  focus:outline-none focus:shadow-outline appearance-none  " type="radio" name='role' required value='admin'
                                checked={checkBox == 3 ? true : false} />
                            <label className=" cursor-pointer  text-sm font-bold text-white" >
                                Admin
                            </label>


                        </div>

                    </div>


                    {/* user-password */}
                    <div className="grid grid-cols-1 md:gap-4 gap-2 items-center">
                        <div className="flex flex-col gap-2  ">
                            <label className="block  text-sm font-bold text-white"> Password</label>
                            <div className='relative' >
                                <input
                                    required
                                    className="w-full px-3 py-2  text-sm leading-tight text-white border rounded shadow appearance-none focus:outline-none 
                                   " name='password'
                                    type={showPassWord ? 'text' : 'password'} placeholder='0000000' />
                                <button
                                    onClick={() => setShowPassWord(showPassWord ? false : true)} className='text-[13px] underline font-medium absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer' type='button'  >
                                    {showPassWord ? 'hide' : 'Show'}
                                </button>
                            </div>

                        </div>
                    </div>

                    {
                        error != '' && <div className="flex sm:flex-row flex-col items-center justify-center sm:text-[14px] text-[10px] gap-2 font-bold tracking-widest text-red-400 uppercase bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/25 relative ">
                            <div className="sm:hidden block absolute left-[50%] translate-x-[-50%]   w-4 h-4 bg-red-900 rounded-full animate-ping inset-0 top-1.5 " >

                            </div>
                            <MdErrorOutline className=" w-4 h-4 " />
                            <p> {error}</p>

                        </div>
                    }

                    {
                        loader ?
                            <button type="" className="cursor-pointer flex items-center justify-center gap-3 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
                                <span className='spinner' >
                                </span>
                                <span>
                                    Proccesing...
                                </span>
                            </button>
                            :
                            <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
                                Submit
                            </button>
                    }


                    <div className="text-center flex justify-center items-center gap-1 ' ">
                        <p className="inline-block text-sm text-white align-baseline " >
                            Already have an account?
                        </p>
                        <button onClick={() => setDivOpen(false)} className='hover:underline cursor-pointer ' >
                            Login!
                        </button>

                    </div>


                </div>


            </form>
        </div>


    )
}
