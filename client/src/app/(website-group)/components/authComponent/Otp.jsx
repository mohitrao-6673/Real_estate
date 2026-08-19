"use client"

import React, { useState } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { TiArrowRight } from "react-icons/ti";
import Link from 'next/link'
import axios from 'axios';
import { Flip, toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import AlertErrorBox from '../../common/AlertErrorBox';

// otp-component
export default function Otp({ userData, setOTPafterSignUp, setDivOpen }) {
    let [loader, setLoader] = useState(false)
    let [success, setSuccess] = useState('')
    let [error, setError] = useState('')
    let [status, setStatus] = useState(undefined)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let router = useRouter()

    let saveUser = (event) => {
        event.preventDefault()
        setLoader(true)
        setError('')
        let code = event.target.code.value

        let obj = { ...userData }
        obj['code'] = code

        axios.post(`${apiBaseUrl}web/auth/register`, obj)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                    setTimeout(() => {
                        router.push('/pages/auth')
                    }, 1000);
                    setStatus(finalRes.status)
                    setDivOpen(false)
                    setOTPafterSignUp(false)
                }
                else {
                    setStatus(finalRes.status)
                    setError(finalRes.message)
                    console.log(finalRes.message)
                }
                setLoader(false)

            })
    }


    // let saveUser = (event) => {
    //     event.preventDefault()

    //     let input1 = event.target.input1.value
    //     let input2 = event.target.input2.value
    //     let input3 = event.target.input3.value
    //     let input4 = event.target.input4.value

    //     let otp = input1 + input2 + input3 + input4
    //     let obj = { ...registerData }
    //     obj['otp'] = otp



    //     axios.post(`${apiBaseUrl}web/user/register`, obj)
    //         .then((res) => {
    //             if (res.data.status) {
    //                 swal({
    //                     title: "good job",
    //                     text: res.data.message,
    //                     icon: "success",
    //                 })
    //                 router.push('/pages/auth/login')
    //             }
    //             else {
    //                 swal({
    //                     text: res.data.message,
    //                     icon: "warning",
    //                 })
    //             }
    //         })

    // }



    return (
        <div className=" w-[100%] my-[173px] sm:my-0 border-2 border-white p-6 backdrop-blur-[5px] rounded-[10px]  ">
            <header className="flex flex-col gap-2 mb-5 text-center ">
                <h1 className="md:text-2xl sm:text-[22px] text-[18px] font-bold  ">Mobile Phone Verification</h1>
                <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase   rounded-full ">Enter the 4-digit verification code that was sent to your email.</p>
            </header>



            <form onSubmit={saveUser} id="otp-form " >
                <div className="flex items-center justify-center gap-3  ">
                    <input
                        type="text"
                        className="w-[50%] h-14 px-3 py-2 mb-3 text-xl text-center    text-white border rounded shadow appearance-none focus:outline-none   "
                        maxLength='6' name='code' />

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
                            Registerd Account
                        </button>
                }
            </form>
        </div>
    )
}

