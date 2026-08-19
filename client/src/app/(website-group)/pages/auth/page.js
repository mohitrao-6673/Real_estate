"use client"

import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import ForGotPassword from '../../components/authComponent/ForGotPassword'
import Otp from '../../components/authComponent/Otp'
import Register from '../../components/authComponent/Register'
import Login from '../../components/authComponent/Login'

export default function page() {



    let [divOpen, setDivOpen] = useState(false)
    let [otpAfterSignUp, setOTPafterSignUp] = useState(false)
    let [forGotPasswordDiv, setForGotPasswordDiv] = useState(false)
    let [userData, setUserData] = useState(null)
    return (
        <section >
            <ToastContainer />

            <div className=" bg-[url('/banner-section4.png')] bg-no-repeat bg-center bg-cover  sm:h-screen h-auto   ">
                {/* black overlay */}
                <div className=' relative h-full  w-full bg-[rgba(0,0,0,0.6)]  py-5 ' >

                    <div className=' sm:w-[450px] sm:relative static sm:top-[50%] sm:translate-y-[-50%]  mx-auto w-[90%]    text-white      ' >


                        {

                            <>
                                {
                                    forGotPasswordDiv ?

                                        <ForGotPassword
                                            setUserData={setUserData}
                                            setForGotPasswordDiv={setForGotPasswordDiv}
                                            forGotPasswordDiv={forGotPasswordDiv}
                                        />

                                        :
                                        <>
                                            {
                                                divOpen ?


                                                    // register && Otp component 
                                                    <>
                                                        {
                                                            otpAfterSignUp ?

                                                                <Otp userData={userData} setOTPafterSignUp={setOTPafterSignUp} setDivOpen={setDivOpen} />
                                                                :
                                                                <Register
                                                                    setOTPafterSignUp={setOTPafterSignUp}
                                                                    setUserData={setUserData}
                                                                    setDivOpen={setDivOpen}
                                                                    divOpen={divOpen}
                                                                    userData={userData}



                                                                />
                                                        }
                                                    </>

                                                    :
                                                    // login component
                                                    <Login
                                                        userData={userData}
                                                        setDivOpen={setDivOpen}
                                                        setOTPafterSignUp={setOTPafterSignUp}
                                                        setUserData={setUserData}
                                                        divOpen={divOpen}
                                                        setForGotPasswordDiv={setForGotPasswordDiv}

                                                    />
                                            }
                                        </>
                                }
                            </>


                        }




                    </div>


                </div>
            </div>

        </section>
    )
}




