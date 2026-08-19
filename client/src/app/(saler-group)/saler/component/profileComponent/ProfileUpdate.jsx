"use client"

import axios from 'axios';
import React, { useState } from 'react'
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { Flip, toast } from 'react-toastify';

export default function ProfileUpdate({ profileUpdateDiv, setprofileUpdateDiv,
    gerProfile, user, staticPath }) {



    let [error, setError] = useState('')
    let [loader, setLoader] = useState(false)
    let token = useSelector((store) => store.userStore.token)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    //  image preview-function
    let [previewImage, setPreviewImage] = useState('/image-preview.webp')
    let imagePreview = (event) => {
        try {
            let imageUrl = URL.createObjectURL(event.target.files[0])
            // let imageUrl = URL.createObjectURL(event.target.files[0])
            setPreviewImage(imageUrl)
        }
        catch {
            setPreviewImage('/image-preview.webp')
        }
    }
    // image-remove-function
    let removeImage = () => {
        setPreviewImage('/image-preview.webp')
    }


    let updateProfile = (event) => {
        event.preventDefault()
        setLoader(true)
        let formData = new FormData(event.target)
        axios.put(`${apiBaseUrl}web/user/update-profile`, formData, {
            headers: { authorization: `Bearer ${token} ` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    gerProfile()
                    toast.success(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                }
                else {
                    toast.error(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        transition: Flip,
                    });
                }
                setLoader(false)
                //console.log(finalRes)
            })
    }


    return (
        < div className={`${profileUpdateDiv ? "block" : "hidden"} border rounded border-black mt-4 p-4  w-full`
        } >
            <form onSubmit={updateProfile} >

                <h1 className=' text-[20px] font-semibold mb-3 '>
                    Update Profile
                </h1>
                <div className='space-y-4  '>

                    {/* update information here */}
                    <div className='grid sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 ' >
                        <div className="flex flex flex-col gap-2">
                            <label className="block  text-sm font-bold" >
                                First Name
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight border   rounded appearance-none focus:outline-none " type="text" name='firstName' required placeholder="First Name" />
                        </div>
                        <div className="flex flex flex-col gap-2">
                            <label className="block text-sm font-bold" >
                                Last Name
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight border rounded  appearance-none focus:outline-none " type="text" name='lastName' placeholder="Last Name" />
                        </div>
                    </div>

                    <div className='grid sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 ' >
                        <div className="flex  flex-col gap-2">
                            <label className="block  text-sm font-bold" >
                                Phone
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight border   rounded appearance-none focus:outline-none " type="tel" name='phone' placeholder="Phone" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="block text-sm font-bold" >
                                Email
                            </label>
                            <input className="w-full px-3 py-2 text-sm leading-tight border rounded  appearance-none focus:outline-none " type="email" name='email' placeholder="Email" />
                        </div>
                    </div>


                    {/* profile image preview */}
                    <div className='grid sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 ' >
                        <div className="flex  flex-col gap-2">
                            <label
                                className="py-2 w-[200px] text-center cursor-pointer rounded bg-indigo-600 text-white font-semibold">
                                <span>
                                    Upload Profile
                                </span>
                                <input
                                    onChange={imagePreview}
                                    type="file"
                                    name='removeProfilePic'
                                    id='uploadFile1' className="hidden" />
                            </label>
                            {/* image-upload */}
                            <div className='w-[200px] relative ' >
                                <img src={previewImage} alt="" className='border rounded-full
                            h-[200px] w-full ' suppressHydrationWarning />


                                <MdCancel onClick={removeImage} className='cursor-pointer absolute text-[40px] top-[-2px] right-[-10px] text-[red] ' />

                            </div>

                        </div>
                    </div>




                    {/* submit button */}
                    <div className='flex items-center gap-4 '>
                        {
                            loader ?
                                <div className="cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full   " >
                                    <span className='spinner' >
                                    </span>
                                    <span>
                                        Proccessing...
                                    </span>
                                </div>
                                :
                                <button className="w-full px-4 py-2 font-bold text-white bg-gradient-to-r from-[#392BFB] to-[#0F056E] rounded-full  focus:outline-none  cursor-pointer " type="submit" >
                                    Update
                                </button>
                        }
                    </div>
                </div>


                <button onClick={() => {
                    setprofileUpdateDiv(false)
                }} className=' text-sm mt-2 font-semibold  cursor-pointer hover:underline hover:text-indigo-600 ' type='reset' suppressHydrationWarning>Go Back</button>
            </form>

        </div >
    )
}
