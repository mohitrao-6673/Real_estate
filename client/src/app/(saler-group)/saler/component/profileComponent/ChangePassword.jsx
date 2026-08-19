"use client"

import React, { useState } from 'react'
import { MdErrorOutline } from "react-icons/md";

export default function ChangePassword({ loader, setChangePasswordDiv, changePasswordDiv, changePassword, error }) {

    let [showOldPassword, setShowOldPassword] = useState(false)
    let [showNewPassword, setShowNewPassword] = useState(false)


    return (

        < div className={`${changePasswordDiv ? "block" : "hidden"} border rounded border-black mt-4 p-4  w-full`
        } >
            <form onSubmit={changePassword} >

                <h1 className='text-[20px] font-semibold mb-3 '>Change Password</h1>
                <div className='space-y-4'>


                    {/* user-password */}
                    <div className="grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2 items-center">

                        <div className="flex flex-col gap-2 ">
                            <label className="block  text-sm font-bold " >
                                Old Password
                            </label>
                            <div className='relative' >
                                <input
                                    required
                                    className="w-full px-3 py-2  text-sm leading-tight  border rounded appearance-none focus:outline-none"
                                    name='oldPassword'
                                    type={showOldPassword ? 'text' : 'password'} placeholder='0000000' />
                                <button
                                    onClick={() => setShowOldPassword(showOldPassword ? false : true)} className='text-[13px] underline font-medium absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer' type='button'  >
                                    {showOldPassword ? 'hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 ">
                            <label className="block  text-sm font-bold " >
                                New Password
                            </label>
                            <div className='relative' >
                                <input
                                    required
                                    className="w-full px-3 py-2  text-sm leading-tight  border rounded appearance-none focus:outline-none"
                                    name='newPassword'
                                    type={showNewPassword ? 'text' : 'password'} placeholder='0000000' />
                                <button
                                    onClick={() => setShowNewPassword(showNewPassword ? false : true)} className='text-[13px] underline font-medium absolute right-3 top-[50%] translate-y-[-50%] cursor-pointer' type='button'  >
                                    {showNewPassword ? 'hide' : 'Show'}
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* show-aler */}
                    {
                        error != '' && <div className=" flex sm:flex-row flex-col items-center justify-center sm:text-[14px] text-[10px] gap-2 font-bold tracking-widest text-red-400 uppercase bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/25 relative ">
                            <div className="sm:hidden block absolute left-[50%] translate-x-[-50%]   w-4 h-4 bg-red-900 rounded-full animate-ping inset-0 top-1.5 " >

                            </div>
                            <MdErrorOutline className=" w-4 h-4 " />
                            <p> {error}</p>

                        </div>
                    }



                    <div className='flex items-center gap-4 '>
                        {
                            loader ?
                                <button type="" className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
                                    <span className='spinner' >
                                    </span>
                                    <span>
                                        Proccessing...
                                    </span>
                                </button>
                                :
                                <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
                                    Change Password
                                </button>
                        }
                    </div>
                </div>


                <button onClick={() => {
                    setChangePasswordDiv(false)
                }} className=' text-sm mt-2 font-semibold  cursor-pointer hover:underline hover:text-indigo-600 ' type='reset' suppressHydrationWarning>Go Back</button>
            </form>

        </div >
    )
}
