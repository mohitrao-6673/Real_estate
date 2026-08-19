"use client"



import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileCompo from '../../components/userProfile/ProfileCompo';

export default function profile() {

    const [userData, setUserData] = useState(null);
    let data = useSelector((store) => store.userStore.loginDetails)

    useEffect(() => {
        setUserData(data)
    }, [data])

    return (
        <>

            <section className=' min-h-screen p-4 bg-gray-50 ' >
                <header className=' max-w-fit mx-auto  my-[20px]    ' >
                    <h1 className='sm:text-[40px] text-[28px]  text-center font-semibold tracking-tight ' > Personal Profile </h1>
                    <p className='text-[17px] text-gray-600 text-center  ' >
                        Manage Your Personal Information and Account Settings.
                    </p>
                </header>


                {/* <!-- Real Estate Contact Form with Tailwind CSS --> */}
                <div className="  flex items-center justify-center ">

                    <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl  ">


                        <ProfileCompo />


                    </div>
                </div>

            </section>


        </>
    )
}






