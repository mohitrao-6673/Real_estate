"use client"


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flip, toast, ToastContainer } from 'react-toastify'
import { MdErrorOutline } from "react-icons/md";
import { MdCancel } from "react-icons/md";


export default function ProfileCompo() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [changePasswordDiv, setChangePasswordDiv] = useState(false)
    let [profileUpdateDiv, setprofileUpdateDiv] = useState(false)
    let token = useSelector((store) => store.userStore.token)
    let [error, setError] = useState('')
    let [loader, setLoader] = useState(false)



    // change password function
    let changePassword = (event) => {
        event.preventDefault()
        setError('')
        setLoader(true)
        let obj = {
            oldPassword: event.target.oldPassword.value,
            newPassword: event.target.newPassword.value
        }
        axios.post(`${apiBaseUrl}web/auth/changepassword-after-login`, obj, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    event.target.reset()
                    toast.success(finalRes.message, {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "dark",
                        transition: Flip,
                    });
                }
                else {
                    setError(finalRes.message)
                }
                setLoader(false)
            })
    }



    let [staticPath, setStaticPath] = useState('')
    let [user, setUser] = useState([])
    let gerProfile = () => {
        axios.get(`${apiBaseUrl}web/user/get-profile`, {
            headers: { authorization: `Bearer ${token}` }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    setUser(finalRes.data)
                    setStaticPath(finalRes.staticpath)
                }
                else {
                    console.log(finalRes.message)
                }

            })
    }
    useEffect(() => {
        gerProfile()
    }, [token])



    return (
        <>
            <section className=' rounded-[12px] sm:p-4 p-2  ' >
                <ToastContainer />


                {/* profile pic and name */}
                <div className=' flex items-center gap-6 mb-6 ' >
                    <div className='w-[100px] h-[100px]  ' >
                        <img
                            src={` ${apiBaseUrl}${staticPath}${user.profilePic} `}
                            alt="" className=' w-full h-full rounded-full ' />

                    </div>
                    <div className=' flex flex-col gap-2 ' >
                        <h1 className=' sm:text-[20px] text-[17px] font-semibold ' >
                            {user.firstName} {user.lastName}

                        </h1>
                        <span className=' py-1 px-2 font-semibold rounded text-center w-fit text-[14px] bg-indigo-100 text-indigo-600 ' >
                            {user.role}
                        </span>
                    </div>
                </div>



                <PersonalInfoBox changePasswordDiv={changePasswordDiv} setChangePasswordDiv={setChangePasswordDiv} setprofileUpdateDiv={setprofileUpdateDiv} user={user} />



                <ChangePasswordBox changePasswordDiv={changePasswordDiv} setChangePasswordDiv={setChangePasswordDiv} error={error} changePassword={changePassword} loader={loader} />



                <UpdateProfileBox setprofileUpdateDiv={setprofileUpdateDiv} profileUpdateDiv={profileUpdateDiv} gerProfile={gerProfile} />


            </section>



        </>
    )
}


// PersonalInfoBox 
function PersonalInfoBox({ changePasswordDiv, setChangePasswordDiv, setprofileUpdateDiv, profileUpdateDiv, user }) {

    return (
        <div  >

            {/* personal information */}
            <div className=' flex gap-4 ' >
                <div className=' flex flex-col gap-3 ' >
                    <h2 className=' font-semibold  ' >
                        Phone
                    </h2>
                    <h2 className=' font-semibold  ' >
                        Email
                    </h2>
                    <h2 className=' font-semibold  ' >
                        Address
                    </h2>
                </div>

                <div className=' flex flex-col gap-3  ' >
                    <p className='  ' >
                        {user.phone ? user.phone : ' not provided'}
                    </p>
                    <p className='  ' >
                        {user.email ? user.email : ' not provided'}
                    </p>
                    <p className=' flex flex-wrap  ' >
                        not provided
                    </p>
                </div>
            </div>



            <div className=' flex items-center gap-2 text-[14px] '>
                <button onClick={() => {
                    setprofileUpdateDiv(true)
                    setChangePasswordDiv(false)
                }} className=' font-semibold py-2 px-2 w-fit hover:bg-indigo-500 rounded bg-indigo-600 text-white mt-4 cursor-pointer ' >
                    Update Profile
                </button>

                <button onClick={() => {
                    setChangePasswordDiv(true)
                    setprofileUpdateDiv(false)
                }} className=' font-semibold py-2 px-2 w-fit hover:bg-indigo-500 rounded bg-indigo-600 text-white mt-4 cursor-pointer ' >
                    change password
                </button>
            </div>

        </div>

    )
}




{/*change-password-div */ }
function ChangePasswordBox({ loader, setChangePasswordDiv, changePasswordDiv, changePassword, error }) {

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




{/*update-profile-div */ }
function UpdateProfileBox({ profileUpdateDiv, setprofileUpdateDiv, gerProfile }) {

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


